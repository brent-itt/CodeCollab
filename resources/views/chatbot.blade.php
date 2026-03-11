<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>AI Chatbot - CodeCollab</title>
    <link rel="stylesheet" href="{{ asset('css/homepage-styles.css') }}">
    <link rel="stylesheet" href="{{ asset('css/chatbot-styles.css') }}">
</head>
<body>
    <div class="chatbot-container">
        <div class="sidebar">
            <div class="sidebar-header" onclick="window.location.href='{{ route('home') }}'" style="cursor: pointer;">
                <svg width="35" height="35" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="ccGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#61dafb;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#21a1f1;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <!-- First C -->
                    <path d="M 35 25 Q 20 25 20 40 Q 20 50 20 60 Q 20 75 35 75" 
                          stroke="url(#ccGradient)" 
                          stroke-width="8" 
                          fill="none" 
                          stroke-linecap="round"/>
                    <!-- Second C -->
                    <path d="M 65 25 Q 50 25 50 40 Q 50 50 50 60 Q 50 75 65 75" 
                          stroke="url(#ccGradient)" 
                          stroke-width="8" 
                          fill="none" 
                          stroke-linecap="round"/>
                </svg>
                <h2>CodeCollab</h2>
            </div>
            <nav class="sidebar-nav">
                <a href="{{ route('home') }}" class="nav-item">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 6.293V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146z"/>
                    </svg>
                    <span>Dashboard</span>
                </a>

                <button class="nav-item nav-dropdown-toggle" id="editorDropdownToggle" onclick="this.classList.toggle('open');document.getElementById('editorDropdown').classList.toggle('open')">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
                    </svg>
                    <span>Code Editor</span>
                    <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
                </button>
                <div class="nav-dropdown-content" id="editorDropdown">
                    <button class="nav-dropdown-item" onclick="window.location.href='{{ route('editor') }}'">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg>
                        <span>Open Editor</span>
                    </button>
                    <button class="nav-dropdown-item" onclick="window.location.href='{{ route('snippets') }}'">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/></svg>
                        <span>My Snippets</span>
                    </button>
                    <button class="nav-dropdown-item" onclick="window.location.href='{{ route('completed-projects') }}'">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>
                        <span>Completed Projects</span>
                    </button>
                </div>

                <a href="{{ route('home') }}" class="nav-item">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <span>Explore Code</span>
                </a>

                <a href="{{ route('home') }}" class="nav-item">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                    <span>Profile</span>
                </a>

                <a href="{{ route('collaboration') }}" class="nav-item">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                    </svg>
                    <span>Collaborations</span>
                </a>

                <a href="{{ route('chatbot') }}" class="nav-item active">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
                        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
                    </svg>
                    <span>AI Chatbot</span>
                </a>

                <div class="nav-divider"></div>

                <a href="{{ route('tutorials') }}" class="nav-item">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                    </svg>
                    <span>Tutorials</span>
                </a>
            </nav>

            <!-- Chat History -->
            <div class="chat-history-section">
                <div class="chat-history-header">
                    <span> Chat History</span>
                    <button class="new-chat-btn" onclick="startNewChat()" title="New Chat">＋</button>
                </div>
                <div class="chat-history-list" id="chatHistoryList">
                    <!-- Sessions rendered by JS -->
                </div>
            </div>
            <div class="sidebar-footer">
                <div class="user-info">
                    <div class="user-avatar">U</div>
                    <div class="user-details">
                        <div class="user-name" id="userName">User</div>
                        <div class="user-email" id="userEmail">user@email.com</div>
                    </div>
                </div>
                <button class="btn-theme-toggle theme-toggle-btn" onclick="toggleTheme()" title="Toggle Light/Dark Mode">
                    <span class="theme-icon">🌙</span>
                    <span class="theme-label">Dark Mode</span>
                </button>
                <button class="logout-btn" onclick="logout()">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                    Logout
                </button>
            </div>
        </div>

        <div class="main-content">
            <div class="chat-header">
                <h1> AI Coding Assistant</h1>
                <p>Ask me anything about programming, debugging, or code optimization!</p>
            </div>

            <div class="chat-messages" id="chatMessages">
                <div class="message bot-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>Hello! I'm your AI coding assistant. How can I help you today?</p>
                        <div class="message-time">Just now</div>
                    </div>
                </div>
            </div>

            <div class="chat-input-container">
                <div class="input-wrapper">
                    <textarea id="messageInput" placeholder="Type your question or paste code here..." rows="1"></textarea>
                    <button id="sendBtn" onclick="sendMessage()">
                        <span>Send</span>
                        <span class="icon">📤</span>
                    </button>
                </div>
                <div class="input-footer">
                    <span class="tip"> Tip: You can paste code snippets for analysis</span>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/theme.js') }}"></script>
    <script src="{{ asset('js/chatbot.js') }}"></script>
</body>
</html>
