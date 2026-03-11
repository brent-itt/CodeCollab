<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>CodeCollab - Home</title>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
    <link rel="stylesheet" href="{{ asset('css/homepage-styles.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/dracula.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/monokai.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/material.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/nord.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/eclipse.min.css">
</head>
<body>
    <div class="dashboard">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
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

            <nav class="nav-menu">
                <button class="nav-item active" onclick="window.location.href='{{ route('home') }}'">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 6.293V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146z"/>
                    </svg>
                    <span>Dashboard</span>
                </button>

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

                <button class="nav-item" data-section="explore">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <span>Explore Code</span>
                </button>

                <button class="nav-item" data-section="profile">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                    <span>Profile</span>
                </button>

                <button class="nav-item" onclick="window.location.href='{{ route('collaboration') }}'">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                    </svg>
                    <span>Collaborations</span>
                </button>

                <button class="nav-item" onclick="window.location.href='{{ route('chatbot') }}'">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
                        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
                    </svg>
                    <span>AI Chatbot</span>
                </button>

                <div class="nav-divider"></div>

                <button class="nav-item" onclick="window.location.href='{{ route('tutorials') }}'">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                    </svg>
                    <span>Tutorials</span>
                </button>
            </nav>

            <div class="sidebar-footer">
                <div class="user-info" id="userInfo">
                    <div class="user-avatar">U</div>
                    <div class="user-details">
                        <div class="user-name">Guest User</div>
                        <div class="user-email">guest@example.com</div>
                    </div>
                </div>
                <button class="btn-logout" onclick="logout()">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                    Logout
                </button>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="main-content">
            <!-- Welcome Section -->
            <section class="content-section active" id="welcomeSection">
                <div class="welcome-container">
                    <div class="welcome-header">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="welcomeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#61dafb;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#21a1f1;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <!-- Background Circle -->
                            <circle cx="50" cy="50" r="45" fill="url(#welcomeGradient)" opacity="0.1"/>
                            <!-- First C -->
                            <path d="M 35 25 Q 20 25 20 40 Q 20 50 20 60 Q 20 75 35 75" 
                                  stroke="url(#welcomeGradient)" 
                                  stroke-width="8" 
                                  fill="none" 
                                  stroke-linecap="round"/>
                            <!-- Second C -->
                            <path d="M 65 25 Q 50 25 50 40 Q 50 50 50 60 Q 50 75 65 75" 
                                  stroke="url(#welcomeGradient)" 
                                  stroke-width="8" 
                                  fill="none" 
                                  stroke-linecap="round"/>
                        </svg>
                        <h1>Welcome to CodeCollab</h1>
                        <p>Your collaborative code playground for learning and sharing</p>
                    </div>

                    <div class="feature-grid">
                        <div class="feature-card" onclick="window.location.href='{{ route('editor') }}'" style="cursor:pointer;">
                            <div class="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
                                </svg>
                            </div>
                            <h3>Code Editor</h3>
                            <p>Write Python with live preview and syntax highlighting</p>
                        </div>

                        <div class="feature-card" onclick="switchSection('explore')" style="cursor:pointer;">
                            <div class="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </div>
                            <h3>Explore Snippets</h3>
                            <p>Discover code snippets shared by the community and learn from others</p>
                        </div>

                        <div class="feature-card" onclick="window.location.href='{{ route('collaboration') }}'" style="cursor:pointer;">
                            <div class="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                </svg>
                            </div>
                            <h3>Collaborate</h3>
                            <p>Share your work and collaborate with classmates in real-time</p>
                        </div>

                        <div class="feature-card" onclick="switchSection('profile')" style="cursor:pointer;">
                            <div class="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                            </div>
                            <h3>Your Profile</h3>
                            <p>Track your progress, view your snippets, and manage your account</p>
                        </div>

                        <div class="feature-card" onclick="window.location.href='{{ route('chatbot') }}'" style="cursor:pointer;">
                            <div class="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
                                    <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
                                </svg>
                            </div>
                            <h3>AI Chatbot</h3>
                            <p>Get instant coding help, explanations, and suggestions from your AI assistant</p>
                        </div>

                        <div class="feature-card" onclick="window.location.href='{{ route('tutorials') }}'" style="cursor:pointer;">
                            <div class="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                </svg>
                            </div>
                            <h3>Tutorials</h3>
                            <p>Learn programming step-by-step with guides covering 15+ languages</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Explore Section -->
            <section class="content-section" id="exploreSection">
                <div class="section-header">
                    <h1>Explore Code</h1>
                    <div class="search-bar">
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        <input type="text" placeholder="Search snippets..." id="searchInput">
                    </div>
                    <select class="filter-select" id="filterSelect">
                        <option value="all">All Languages</option>
                        <option value="html">HTML/CSS</option>
                        <option value="javascript">JavaScript</option>
                        <option value="react">React</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>

                <div class="explore-grid" id="exploreGrid">
                    <!-- Code snippets will be loaded here -->
                </div>
            </section>

            <!-- Profile Section -->
            <section class="content-section" id="profileSection">
                <div class="section-header">
                    <h1>Profile Dashboard</h1>
                </div>

                <div class="profile-layout">
                    <!-- Profile Info Card -->
                    <div class="profile-card">
                        <div class="profile-banner"></div>
                        <div class="profile-info">
                            <div class="profile-avatar-large" id="profileAvatar">U</div>
                            <h2 id="profileName">Guest User</h2>
                            <p id="profileEmail">guest@example.com</p>
                            <p class="profile-joined">Joined January 2026</p>
                            <div class="profile-actions">
                                <button class="btn btn-secondary" onclick="editProfile()">Edit Profile</button>
                                <button class="btn btn-theme-toggle" id="themeToggleBtn" onclick="toggleTheme()" title="Toggle Light/Dark Mode">
                                    <span class="theme-icon">🌙</span>
                                    <span class="theme-label">Dark Mode</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Stats Grid -->
                    <div class="stats-grid">
                        <div class="stat-card" onclick="window.location.href='{{ route('snippets') }}'" style="cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 6px 20px rgba(97,218,251,0.2)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                            <div class="stat-icon" style="background: rgba(97, 218, 251, 0.2);">
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="#61dafb">
                                    <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
                                </svg>
                            </div>
                            <div class="stat-info">
                                <h3 id="snippetsCount">0</h3>
                                <p>Code Snippets</p>
                            </div>
                        </div>

                        <div class="stat-card" onclick="window.location.href='{{ route('collaboration') }}'" style="cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 6px 20px rgba(76,175,80,0.2)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                            <div class="stat-icon" style="background: rgba(76, 175, 80, 0.2);">
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="#4caf50">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </div>
                            <div class="stat-info">
                                <h3 id="collaborationsCount">0</h3>
                                <p>Collaborations</p>
                            </div>
                        </div>

                        <div class="stat-card" onclick="window.location.href='{{ route('completed-projects') }}'" style="cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 6px 20px rgba(156,39,176,0.2)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                            <div class="stat-icon" style="background: rgba(156, 39, 176, 0.2);">
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="#9c27b0">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                </svg>
                            </div>
                            <div class="stat-info">
                                <h3 id="completedCount">0</h3>
                                <p>Projects Completed</p>
                            </div>
                        </div>
                    </div>

                    <!-- My Snippets -->
                    <div class="profile-section">
                        <h3>My Recent Snippets</h3>
                        <div class="my-snippets" id="mySnippets">
                            <!-- User's snippets will be loaded here -->
                        </div>
                    </div>

                    <!-- Activity Timeline -->
                    <div class="profile-section">
                        <h3>Recent Activity</h3>
                        <div class="activity-timeline" id="activityTimeline">
                            <!-- Activity will be loaded here -->
                        </div>
                    </div>
                </div>
            </section>

            <!-- Collaborations Section -->
            <section class="content-section" id="collaborateSection">
                <div class="section-header">
                    <h1>My Collaborations</h1>
                    <button class="btn btn-primary" onclick="startNewCollaboration()">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        New Session
                    </button>
                </div>

                <div class="collab-grid" id="collabGrid">
                    <!-- Collaboration sessions will be loaded here -->
                </div>
            </section>
        </main>
    </div>

    <!-- Snippet Detail Modal -->
    <div class="modal" id="snippetModal">
        <div class="modal-content large">
            <div class="modal-header">
                <h2 id="modalSnippetTitle">Snippet Title</h2>
                <button class="modal-close" onclick="closeSnippetModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="snippet-meta">
                    <div class="author-info">
                        <div class="author-avatar">A</div>
                        <div>
                            <div class="author-name">Author Name</div>
                            <div class="snippet-date">2 days ago</div>
                        </div>
                    </div>
                    <div class="snippet-actions">
                        <button class="btn-icon-text" onclick="shareSnippet()">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                            </svg>
                            Share
                        </button>
                    </div>
                </div>
                <div class="snippet-view-tabs">
                    <button class="snippet-tab active" onclick="switchSnippetTab('preview', this)">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/></svg>
                        Preview
                    </button>
                    <button class="snippet-tab" onclick="switchSnippetTab('html', this)">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg>
                        HTML
                    </button>
                    <button class="snippet-tab" onclick="switchSnippetTab('css', this)">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M1.975 8.274a.5.5 0 0 0 .05.768l1.5 1.25a.5.5 0 0 0 .638-.766L2.848 8.5l1.315-1.026A.5.5 0 0 0 3.525 6.726l-1.5 1.25a.5.5 0 0 0-.05.298zm10.05.514a.5.5 0 0 0 .05-.768l-1.5-1.25a.5.5 0 0 0-.638.766L11.152 8.5l-1.315 1.026a.5.5 0 0 0 .638.766l1.5-1.25a.5.5 0 0 0 .05-.254zM6.854 6.146a.5.5 0 0 0-.708.708l2.5 2.5a.5.5 0 0 0 .708-.708l-2.5-2.5z"/></svg>
                        CSS
                    </button>
                    <button class="snippet-tab" onclick="switchSnippetTab('js', this)" id="snippetJsTab">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M10.068.87a.5.5 0 0 0-.237.445v.01c0 .01 0 .027.002.048.004.068.012.157.024.258.023.198.06.46.112.726.098.518.261 1.04.494 1.385.233.344.578.555.882.602a.52.52 0 0 0 .122.01h.009a.5.5 0 0 0 .494-.5V3.5c0-.275-.223-.5-.5-.5h-.5a.5.5 0 0 0-.5.5v.004c-.002.004-.005.007-.008.01-.003.003-.006.005-.009.008-.01.009-.018.017-.025.025a.5.5 0 0 0 .023.7.5.5 0 0 0 .703-.03A.5.5 0 0 0 11 3.504z"/><path d="M7.5 0a7.5 7.5 0 1 0 0 15A7.5 7.5 0 0 0 7.5 0zm0 1a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z"/></svg>
                        JS
                    </button>
                </div>
                <div class="snippet-preview" id="snippetPreview">
                    <!-- Preview iframe will be loaded here -->
                </div>
                <div class="snippet-code-view" id="snippetCodeView" style="display:none;">
                    <button class="snippet-copy-btn" onclick="copySnippetCode()" title="Copy code">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/></svg>
                        Copy
                    </button>
                    <pre id="snippetCodeContent"></pre>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Profile Modal -->
    <div class="modal" id="editProfileModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Edit Profile</h2>
                <button class="modal-close" onclick="closeEditProfileModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="editProfileForm">
                    <div class="form-group">
                        <label for="editName">Full Name</label>
                        <input type="text" id="editName" class="form-input" required>
                    </div>

                    <div class="form-group">
                        <label for="editEmail">Email Address</label>
                        <input type="email" id="editEmail" class="form-input" required>
                    </div>

                    <div class="form-divider">
                        <span>Change Password (optional)</span>
                    </div>

                    <div class="form-group">
                        <label for="currentPassword">Current Password</label>
                        <input type="password" id="currentPassword" class="form-input" placeholder="Required to change password">
                    </div>

                    <div class="form-group">
                        <label for="newPassword">New Password</label>
                        <input type="password" id="newPassword" class="form-input" placeholder="Leave blank to keep current">
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">Confirm New Password</label>
                        <input type="password" id="confirmPassword" class="form-input" placeholder="Confirm new password">
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeEditProfileModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/htmlmixed/htmlmixed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/css/css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/javascript/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/xml/xml.min.js"></script>
    <script src="{{ asset('js/login.js') }}"></script>
    <script src="{{ asset('js/theme.js') }}"></script>
    <script src="{{ asset('js/homepage.js') }}"></script>
</body>
</html>

