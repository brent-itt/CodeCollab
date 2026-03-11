<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Code Editor - CodeCollab</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path d='M15 5L5 15L15 25L25 15Z' fill='%2361dafb'/></svg>">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
    <link rel="stylesheet" href="{{ asset('css/code_editor-styles.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/dracula.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/monokai.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/material.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/nord.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/eclipse.min.css">
    <style>
        .language-selector {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: auto;
        }
        .language-selector label {
            font-size: 13px;
            color: var(--text-secondary);
        }
        .language-selector select {
            padding: 7px 12px;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-color);
            font-size: 13px;
            outline: none;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .language-selector select:hover {
            border-color: var(--primary-color);
            background: rgba(0, 0, 0, 0.5);
        }
        .language-selector select:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(97, 218, 251, 0.15);
        }
        .btn-complete {
            background: linear-gradient(135deg, #9c27b0, #7b1fa2);
            color: #fff;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .btn-complete:hover {
            background: linear-gradient(135deg, #ba68c8, #9c27b0);
        }
        .btn-complete.completed {
            background: linear-gradient(135deg, #4caf50, #388e3c);
            cursor: default;
        }
    </style>
</head>
<body>
    <div class="editor-container">
        <div class="editor-header">
            <input type="text" id="snippetName" placeholder="Untitled Snippet" class="snippet-input">
            <button class="btn btn-primary" onclick="saveSnippet()">Save Snippet</button>
            <button id="markCompleteBtn" class="btn btn-complete" onclick="markProjectComplete()" title="Mark this project as complete">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
                Mark Complete
            </button>
            <button id="saveCollabBtn" class="btn btn-success" onclick="saveCollaboration(true)" style="display: none; background: linear-gradient(135deg, #28a745, #20c997);">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 4px;">
                    <path d="M8 1a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"/>
                    <path d="M8 4a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
                </svg>
                Save Collab
            </button>
            <span id="saveIndicator" style="display: none; font-size: 13px; color: #666; margin-left: 8px; font-weight: 500;"></span>
            <button id="refreshCollabBtn" class="btn btn-secondary" onclick="manualRefresh()" style="display: none;" title="Refresh code from server">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
            </button>
            <button id="debugBtn" class="btn btn-secondary" onclick="toggleDebugInfo()" style="display: none; font-size: 11px; padding: 5px 10px;" title="Show debug info">
                🐛 Debug
            </button>
            <div class="language-selector">
                <label for="languageSelect">Language:</label>
                <select id="languageSelect" onchange="changeLanguage(this.value)">
                    <option value="python" selected>Python</option>
                </select>
            </div>
            <button class="btn btn-secondary btn-home" onclick="window.location.href='{{ route('home') }}'">Back to Home</button>
            <button class="btn btn-theme-toggle theme-toggle-btn" onclick="toggleTheme()" title="Toggle Light/Dark Mode">
                <span class="theme-icon">🌙</span>
                <span class="theme-label">Dark Mode</span>
            </button>
        </div>
        
        <!-- Debug Info Panel -->
        <div id="debugInfo" style="display: none; position: fixed; top: 60px; right: 20px; background: rgba(0,0,0,0.95); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); max-width: 400px; font-size: 12px; z-index: 10000; color: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong style="color: var(--primary-color);">🐛 Collaboration Debug</strong>
                <button onclick="toggleDebugInfo()" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 16px;">✕</button>
            </div>
            <div style="font-family: monospace; font-size: 11px; line-height: 1.8;">
                <div><strong>Collab ID:</strong> <span id="debug-collab-id">-</span></div>
                <div><strong>Last Synced:</strong> <span id="debug-synced-length">-</span> chars</div>
                <div><strong>Current Code:</strong> <span id="debug-current-length">-</span> chars</div>
                <div><strong>Sync Status:</strong> <span id="debug-sync-status">-</span></div>
                <div><strong>Language:</strong> <span id="debug-language">-</span></div>
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #444;">
                    <button onclick="forceSync()" class="btn btn-primary" style="width: 100%; padding: 8px; font-size: 11px;">Force Sync Now</button>
                </div>
            </div>
        </div>

        <div class="editor-layout">
            <div class="editor-toolbar">
                <button class="btn-run" onclick="runCode()" title="Run Code (Ctrl+Enter)">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 2v12l10-6L4 2z"/>
                    </svg>
                    Run
                </button>
            </div>

            <div class="editor-panels">
                <div class="editor-panel">
                    <div class="code-editors">
                        <div class="code-editor active">
                            <textarea id="codeEditor"></textarea>
                        </div>
                    </div>
                </div>

                <div class="preview-panel">
                    <div class="preview-header">
                        <span id="previewTitle">Live Preview</span>
                        <div class="preview-controls">
                            <button class="btn-icon" onclick="refreshPreview()" title="Refresh Preview">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <iframe id="preview"></iframe>
                    
                    <!-- Interactive Terminal for Python -->
                    <div id="interactiveTerminal" style="display: none;">
                        <div id="terminalOutput"></div>
                        <div class="terminal-input-line" id="inputLine" style="display: none;">
                            <span class="prompt">▶</span>
                            <input type="text" id="terminalInput" placeholder="Type here and press Enter..." autocomplete="off" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="console">
                <div class="console-header">
                    <span>Console</span>
                    <button class="btn-icon" onclick="clearConsole()" style="padding: 4px; font-size: 10px;">Clear</button>
                </div>
                <div class="console-content" id="consoleContent">
                    <div class="console-message info">
                        <span class="timestamp">[00:00:00]</span>
                        <span>Welcome to CodeCollab! Start coding...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/python/python.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/clike/clike.min.js"></script>
    <script src="{{ asset('js/theme.js') }}"></script>
    <script src="{{ asset('js/code_editor.js') }}"></script>
</body>
</html>

