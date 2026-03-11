<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    /**
     * Send a message to Groq AI and get a response.
     * Groq offers a generous free tier: 14,400 requests/day
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:10000',
            'history' => 'nullable|array|max:40',
            'history.*.role' => 'required|string|in:user,assistant',
            'history.*.content' => 'required|string|max:10000',
        ]);

        $message = $request->input('message');
        $history = $request->input('history', []);
        $apiKey = env('GROQ_API_KEY');

        if (!$apiKey) {
            return response()->json([
                'error' => 'Groq API key not configured. Please add GROQ_API_KEY to your .env file. Get a free key at https://console.groq.com'
            ], 500);
        }

        try {
            // Retry logic for rate limits
            $maxRetries = 3;
            $retryDelay = 1;
            $response = null;
            
            for ($attempt = 1; $attempt <= $maxRetries; $attempt++) {
                // Build message thread: system prompt + conversation history + new user message
                $messages = [
                    ['role' => 'system', 'content' => $this->getSystemPrompt()]
                ];
                foreach ($history as $h) {
                    $messages[] = ['role' => $h['role'], 'content' => $h['content']];
                }
                $messages[] = ['role' => 'user', 'content' => $message];

                $payload = [
                    'model' => 'llama-3.3-70b-versatile',
                    'messages' => $messages,
                    'temperature' => 0.7,
                    'max_tokens' => 2048,
                ];

                try {
                    // Primary request with certificate verification enabled
                    $response = Http::timeout(60)
                        ->withHeaders([
                            'Authorization' => "Bearer {$apiKey}",
                            'Content-Type' => 'application/json',
                        ])
                        ->post('https://api.groq.com/openai/v1/chat/completions', $payload);
                } catch (\Exception $requestException) {
                    $isLocal = app()->environment('local');
                    $hasTlsError = str_contains($requestException->getMessage(), 'cURL error 60');

                    // Development-only fallback for local CA store issues on Windows
                    if ($isLocal && $hasTlsError) {
                        Log::warning('Groq TLS verification failed in local environment, retrying with verify=false');

                        $response = Http::timeout(60)
                            ->withOptions(['verify' => false])
                            ->withHeaders([
                                'Authorization' => "Bearer {$apiKey}",
                                'Content-Type' => 'application/json',
                            ])
                            ->post('https://api.groq.com/openai/v1/chat/completions', $payload);
                    } else {
                        throw $requestException;
                    }
                }
                
                // If not rate limited, break out of retry loop
                if ($response->status() !== 429) {
                    break;
                }
                
                // If rate limited and not last attempt, wait and retry
                if ($attempt < $maxRetries) {
                    Log::info("Groq rate limited, retrying in {$retryDelay} seconds (attempt {$attempt}/{$maxRetries})");
                    sleep($retryDelay);
                    $retryDelay *= 2;
                }
            }

            if ($response->successful()) {
                $data = $response->json();
                
                // Extract the generated text from Groq's response
                if (isset($data['choices'][0]['message']['content'])) {
                    $aiResponse = $data['choices'][0]['message']['content'];
                    
                    return response()->json([
                        'success' => true,
                        'response' => $aiResponse
                    ]);
                } else {
                    return response()->json([
                        'error' => 'No response generated from AI.',
                        'details' => $data
                    ], 500);
                }
            } else {
                Log::error('Groq API Error', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                
                $errorMessage = 'Failed to get response from AI.';
                $statusCode = $response->status();
                
                if ($statusCode === 429) {
                    $errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
                } elseif ($statusCode === 401 || $statusCode === 403) {
                    $errorMessage = 'Invalid API key. Please check your Groq API key configuration.';
                } elseif ($statusCode === 400) {
                    $errorMessage = 'Invalid request. The message may contain unsupported content.';
                }
                
                return response()->json([
                    'error' => $errorMessage,
                    'details' => $response->json()
                ], $statusCode);
            }
        } catch (\Exception $e) {
            Log::error('Chatbot Exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'An error occurred while processing your request.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get the system prompt for the AI assistant.
     *
     * @return string
     */
    private function getSystemPrompt()
    {
        return "You are a helpful AI assistant integrated into CodeCollab. " .
               "You can help with a wide variety of tasks including:\n" .
               "- Answering general questions\n" .
               "- Having conversations\n" .
               "- Helping with coding and programming (when asked)\n" .
               "- Explaining concepts\n" .
               "- Writing and editing text\n" .
               "- Brainstorming ideas\n\n" .
               "Be conversational and friendly. Only provide code when specifically asked for it. " .
               "Keep responses concise unless more detail is requested.";
    }
}
