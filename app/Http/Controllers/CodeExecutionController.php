<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class CodeExecutionController extends Controller
{
    private function resolveCompilerPath(string $binary): ?string
    {
        $where = @shell_exec("where {$binary} 2>NUL");
        if (is_string($where)) {
            $first = trim(strtok($where, "\n"));
            if ($first !== '' && file_exists($first)) {
                return $first;
            }
        }

        $localAppData = getenv('LOCALAPPDATA');
        if (!$localAppData) {
            return null;
        }

        $patterns = [
            $localAppData . "\\Microsoft\\WinGet\\Packages\\BrechtSanders.WinLibs.*\\mingw64\\bin\\{$binary}.exe",
            $localAppData . "\\Microsoft\\WinGet\\Packages\\MartinStorsjo.LLVM-MinGW.*\\bin\\{$binary}.exe",
        ];

        foreach ($patterns as $pattern) {
            $matches = glob($pattern);
            if (!empty($matches) && file_exists($matches[0])) {
                return $matches[0];
            }
        }

        return null;
    }

    private function buildLangConfig(): array
    {
        $gpp = $this->resolveCompilerPath('g++');
        $gcc = $this->resolveCompilerPath('gcc');
        $javac = $this->resolveCompilerPath('javac') ?? 'javac';

        return [
            'python' => ['ext' => '.py', 'compile' => null, 'run' => ['py', '-3']],
            'c++' => ['ext' => '.cpp', 'compile' => $gpp ? [$gpp, '-o'] : null, 'run' => []],
            'c' => ['ext' => '.c', 'compile' => $gcc ? [$gcc, '-o'] : null, 'run' => []],
            'java' => ['ext' => '.java', 'compile' => [$javac], 'run' => ['java']],
        ];
    }

    // Store active sessions in a simple file-based cache
    private function getSessionPath($sessionId) {
        $dir = storage_path('app/code_sessions');
        if (!file_exists($dir)) {
            mkdir($dir, 0755, true);
        }
        return $dir . '/' . preg_replace('/[^a-zA-Z0-9_-]/', '', $sessionId) . '.json';
    }
    
    private function getSession($sessionId) {
        $path = $this->getSessionPath($sessionId);
        if (file_exists($path)) {
            return json_decode(file_get_contents($path), true);
        }
        return null;
    }
    
    private function saveSession($sessionId, $data) {
        file_put_contents($this->getSessionPath($sessionId), json_encode($data));
    }
    
    private function deleteSession($sessionId) {
        $path = $this->getSessionPath($sessionId);
        if (file_exists($path)) {
            unlink($path);
        }
    }

    public function execute(Request $request)
    {
        $code = $request->input('code');
        $language = $request->input('language', 'python');
        $stdin = $request->input('stdin', '');
        
        // Map language to file extension and compiler
        $langConfig = $this->buildLangConfig();
        
        if (!isset($langConfig[$language])) {
            return response()->json([
                'output' => "Language '$language' is not supported for local execution.",
                'error' => true
            ]);
        }
        
        $config = $langConfig[$language];
        // Use Laravel's storage directory instead of system temp (permission issues)
        $tempDir = storage_path('app/code_sessions/exec_' . uniqid());
        mkdir($tempDir, 0755, true);
        
        try {
            if ($language === 'java') {
                // Extract class name for Java
                preg_match('/public\s+class\s+(\w+)/', $code, $matches);
                $className = $matches[1] ?? 'Main';
                $sourceFile = $tempDir . '/' . $className . '.java';
            } else {
                $sourceFile = $tempDir . '/main' . $config['ext'];
            }
            
            file_put_contents($sourceFile, $code);
            
            // Set environment variables to use our temp directory (fixes Windows permission issues)
            $env = [
                'TEMP' => $tempDir,
                'TMP' => $tempDir,
                'TMPDIR' => $tempDir,
                'PATH' => getenv('PATH'),
            ];

            // For MinGW toolchains on Windows, include compiler bin so runtime DLLs are resolvable.
            if (in_array($language, ['c', 'c++']) && !empty($config['compile'][0]) && file_exists($config['compile'][0])) {
                $compilerBin = dirname($config['compile'][0]);
                $env['PATH'] = $compilerBin . PATH_SEPARATOR . $env['PATH'];
            }
            
            // Compile if needed
            if ($language !== 'python' && $config['compile'] === null) {
                return response()->json([
                    'output' => "Compiler for {$language} is not installed or not found.",
                    'error' => true
                ]);
            }

            if ($config['compile']) {
                if ($language === 'java') {
                    $compileCmd = array_merge($config['compile'], [$sourceFile]);
                } else {
                    $outputFile = $tempDir . '/program.exe';
                    $compileCmd = array_merge($config['compile'], [$outputFile, $sourceFile]);
                }
                
                $compile = new Process($compileCmd, $tempDir, $env);
                $compile->setTimeout(30);
                $compile->run();
                
                if (!$compile->isSuccessful()) {
                    $this->cleanupDir($tempDir);
                    return response()->json([
                        'output' => "Compilation Error:\n" . $compile->getErrorOutput(),
                        'error' => true
                    ]);
                }
            }
            
            // Run
            if ($language === 'java') {
                $runCmd = array_merge($config['run'], [$className]);
            } elseif ($config['compile']) {
                $runCmd = [$tempDir . '/program.exe'];
            } else {
                $runCmd = array_merge($config['run'], [$sourceFile]);
            }
            
            $process = new Process($runCmd, $tempDir, $env);
            $process->setInput($stdin);
            $process->setTimeout(10);
            $process->run();
            
            $output = $process->getOutput();
            $error = $process->getErrorOutput();
            
            $this->cleanupDir($tempDir);
            
            return response()->json([
                'output' => $output . ($error ? "\n" . $error : ''),
                'error' => !$process->isSuccessful(),
                'exit_code' => $process->getExitCode()
            ]);
            
        } catch (\Exception $e) {
            $this->cleanupDir($tempDir);
            return response()->json([
                'output' => 'Execution error: ' . $e->getMessage(),
                'error' => true
            ]);
        }
    }
    
    /**
     * Start an interactive execution session
     */
    public function startInteractive(Request $request)
    {
        $code = $request->input('code');
        $language = $request->input('language', 'python');
        
        $sessionId = uniqid('session_', true);
        $tempDir = storage_path('app/code_sessions/files_' . $sessionId);
        mkdir($tempDir, 0755, true);
        
        $langConfig = $this->buildLangConfig();
        
        if (!isset($langConfig[$language])) {
            return response()->json([
                'error' => "Language '$language' not supported for interactive mode.",
                'session_id' => null
            ]);
        }
        
        $config = $langConfig[$language];
        $sourceFile = $tempDir . '/main' . $config['ext'];

        // Detect input calls from the original user code (before any preamble injection)
        $hasInputCalls = (bool) preg_match('/\binput\s*\(|\bcin\s*>>|\bscanf\s*\(|\bgetline\s*\(|\bScanner\b/', $code);

        // For Python: prepend a sentinel wrapper around input().
        // When stdin is exhausted (Windows: input() returns '' instead of blocking),
        // flush stdout then call os._exit(42) so PHP reliably detects mid-execution
        // stdin exhaustion — even when user code wraps input() in try/except.
        if ($language === 'python') {
            $preamble = "import sys as _s,builtins as _b,os as _o\n" .
                        "def _i(p=''):\n" .
                        " _s.stdout.write(str(p));_s.stdout.flush()\n" .
                        " l=_s.stdin.readline()\n" .
                        " if not l:_s.stdout.flush();_o._exit(42)\n" .
                        " return l.rstrip('\\n').rstrip('\\r')\n" .
                        "_b.input=_i\n";
            file_put_contents($sourceFile, $preamble . $code);
        } else {
            file_put_contents($sourceFile, $code);
        }
        
        // Set environment variables to use our temp directory
        $env = [
            'TEMP' => $tempDir,
            'TMP' => $tempDir,
            'TMPDIR' => $tempDir,
            'PATH' => getenv('PATH'),
        ];

        // For MinGW toolchains on Windows, include compiler bin so runtime DLLs are resolvable.
        if (in_array($language, ['c', 'c++']) && !empty($config['compile'][0]) && file_exists($config['compile'][0])) {
            $compilerBin = dirname($config['compile'][0]);
            $env['PATH'] = $compilerBin . PATH_SEPARATOR . $env['PATH'];
        }
        
        // Compile if needed
        if ($language !== 'python' && $config['compile'] === null) {
            $this->cleanupDir($tempDir);
            return response()->json([
                'error' => "Compiler for {$language} is not installed or not found.",
                'session_id' => null
            ]);
        }

        if ($config['compile']) {
            $outputFile = $tempDir . '/program.exe';
            $compileCmd = array_merge($config['compile'], [$outputFile, $sourceFile]);
            
            $compile = new Process($compileCmd, $tempDir, $env);
            $compile->setTimeout(30);
            $compile->run();
            
            if (!$compile->isSuccessful()) {
                $this->cleanupDir($tempDir);
                return response()->json([
                    'error' => "Compilation Error:\n" . $compile->getErrorOutput(),
                    'session_id' => null
                ]);
            }
            $executablePath = $outputFile;
        } else {
            $executablePath = $sourceFile;
            $config['run'] = ['py', '-3', '-u']; // -u = unbuffered stdout/stderr
        }
        
        // Save session data
        $this->saveSession($sessionId, [
            'language' => $language,
            'temp_dir' => $tempDir,
            'executable' => $executablePath,
            'run_cmd' => $config['run'],
            'inputs' => [],
            'env' => $env,
            'has_input_calls' => $hasInputCalls,
            'created_at' => time()
        ]);
        
        return response()->json([
            'session_id' => $sessionId,
            'message' => 'Session started. Program compiled successfully.',
            'error' => null
        ]);
    }
    
    /**
     * Send input and get output for interactive session
     */
    public function sendInput(Request $request)
    {
        $sessionId = $request->input('session_id');
        $input = $request->input('input', '');
        
        $session = $this->getSession($sessionId);
        if (!$session) {
            return response()->json([
                'error' => 'Session not found or expired',
                'completed' => true
            ]);
        }
        
        // Add new input
        $session['inputs'][] = $input;
        $this->saveSession($sessionId, $session);
        
        // Build run command
        if (!empty($session['run_cmd'])) {
            $runCmd = array_merge($session['run_cmd'], [$session['executable']]);
        } else {
            $runCmd = [$session['executable']];
        }
        
        // Get environment from session or create default
        $env = $session['env'] ?? [
            'TEMP' => dirname($session['executable']),
            'TMP' => dirname($session['executable']),
            'TMPDIR' => dirname($session['executable']),
            'PATH' => getenv('PATH'),
        ];
        
        // For first run with empty input on C/C++, ask for input immediately
        // because cin blocks indefinitely
        $allInputs = $session['inputs'];
        $language = $session['language'] ?? 'c++';
        
        // Filter out empty strings and join with newlines
        $realInputs = array_values(array_filter($allInputs, fn($i) => $i !== ''));
        $hasRealInput = !empty($realInputs);
        $stdinInput = implode("\n", $realInputs);
        
        // Execute with all inputs so far
        $process = new Process($runCmd, dirname($session['executable']), $env);
        $process->setInput($stdinInput === '' ? '' : $stdinInput . "\n");
        $process->setTimeout(2); // Short timeout to quickly detect when program is waiting for more input
        
        $timedOut = false;
        try {
            $process->run();
        } catch (\Symfony\Component\Process\Exception\ProcessTimedOutException $e) {
            $timedOut = true; // Process is waiting for more input
        } catch (\Exception $e) {
            // Other error
        }
        
        $output = $process->getOutput();
        $stderr = $process->getErrorOutput();
        $exitCode = $process->getExitCode();
        
        // On Windows, Python input() returns '' on empty stdin instead of blocking/raising EOFError.
        // So the probe run exits cleanly (code 0) but used empty values for all inputs.
        // Detect this case: no real input given yet AND the code has input() calls.
        $hasInputCalls = $session['has_input_calls'] ?? false;
        $needsMoreInput = $timedOut || $exitCode === null || $exitCode === -1
            || $exitCode === 42  // Python sentinel: stdin exhausted mid-execution
            || strpos($stderr, 'EOFError') !== false
            || strpos($stderr, 'EOF when reading') !== false
            || (!$hasRealInput && $exitCode !== 0 && $exitCode !== null)
            || (!$hasRealInput && $hasInputCalls); // fallback for non-Python languages
        
        $completed = !$needsMoreInput && $exitCode !== null;
        
        if ($completed) {
            // Clean up session
            $this->cleanupDir($session['temp_dir']);
            $this->deleteSession($sessionId);
        }

        // Discard probe output only in the old fallback case (Windows input()→'', exit 0).
        // When our Python sentinel fired (exit 42), the output is valid and should be shown.
        $isWindowsProbe = !$hasRealInput && $hasInputCalls && !$timedOut
            && $exitCode !== 42
            && strpos($stderr, 'EOFError') === false
            && strpos($stderr, 'EOF when reading') === false;
        $outputToReturn = ($needsMoreInput && $isWindowsProbe) ? '' : $output;
        
        return response()->json([
            'output' => $outputToReturn,
            'stderr' => ($exitCode === 42) ? '' : $stderr, // hide sentinel traceback if any
            'waiting_for_input' => $needsMoreInput,
            'completed' => $completed,
            'exit_code' => $process->getExitCode()
        ]);
    }
    
    /**
     * Run program with all inputs at once (simpler approach)
     */
    public function runWithInputs(Request $request)
    {
        $code = $request->input('code');
        $language = $request->input('language', 'c++');
        $inputs = $request->input('inputs', []);
        $stdin = is_array($inputs) ? implode("\n", $inputs) : $inputs;
        
        // Create a new request with merged data
        $request->merge([
            'code' => $code,
            'language' => $language,
            'stdin' => $stdin
        ]);
        
        return $this->execute($request);
    }
    
    public function executeInteractive(Request $request)
    {
        $code = $request->input('code');
        $language = $request->input('language', 'python');
        $sessionId = $request->input('session_id', uniqid());
        $userInput = $request->input('input', '');
        
        // Get or create session
        $session = $this->getSession($sessionId);
        
        if (!$session) {
            // New session - compile code first
            $request->merge(['code' => $code, 'language' => $language]);
            $startResult = $this->startInteractive($request);
            
            $data = json_decode($startResult->getContent(), true);
            if (isset($data['error']) && $data['error']) {
                return response()->json([
                    'output' => $data['error'],
                    'error' => true,
                    'completed' => true
                ]);
            }
            
            $sessionId = $data['session_id'];
            $session = $this->getSession($sessionId);
        }
        
        // Send the input
        $request->merge(['session_id' => $sessionId, 'input' => $userInput]);
        $result = $this->sendInput($request);
        
        $data = json_decode($result->getContent(), true);
        
        return response()->json([
            'output' => $data['output'] ?? '',
            'stderr' => $data['stderr'] ?? '',
            'waiting_for_input' => $data['waiting_for_input'] ?? false,
            'completed' => $data['completed'] ?? true,
            'session_id' => $sessionId,
            'error' => isset($data['error'])
        ]);
    }
    
    private function cleanupDir($dir) {
        if (!file_exists($dir)) return;
        $files = array_diff(scandir($dir), ['.', '..']);
        foreach ($files as $file) {
            $path = $dir . '/' . $file;
            is_dir($path) ? $this->cleanupDir($path) : unlink($path);
        }
        rmdir($dir);
    }
}
