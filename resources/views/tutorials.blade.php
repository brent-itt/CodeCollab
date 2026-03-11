<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tutorials - CodeCollab</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path d='M15 5L5 15L15 25L25 15Z' fill='%2361dafb'/></svg>">
    <link rel="stylesheet" href="{{ asset('css/tutorials.css') }}">
</head>
<body>
    <div class="tutorial-wrapper">
        <header class="top-header">
            <div class="header-content">
                <h1>Programming Tutorials</h1>
                <div style="display:flex;gap:10px;align-items:center;">
                    <button class="btn btn-theme-toggle theme-toggle-btn" onclick="toggleTheme()" title="Toggle Light/Dark Mode">
                        <span class="theme-icon">🌙</span>
                        <span class="theme-label">Dark Mode</span>
                    </button>
                    <button class="btn btn-home" onclick="window.location.href='{{ route('home') }}'">Back to Homepage</button>
                </div>
            </div>
        </header>

        <nav class="top-nav">
            <div class="nav-dropdown">
                <button class="nav-dropdown-btn" onclick="toggleLanguageMenu()">
                    <span id="current-language">HTML</span>
                    <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
                <div class="nav-dropdown-menu" id="languageMenu">
                    <a href="#html" class="nav-link active" onclick="showTutorial('html'); return false;">HTML</a>
                    <a href="#css" class="nav-link" onclick="showTutorial('css'); return false;">CSS</a>
                    <a href="#javascript" class="nav-link" onclick="showTutorial('javascript'); return false;">JavaScript</a>
                    <a href="#python" class="nav-link" onclick="showTutorial('python'); return false;">Python</a>
                    <a href="#java" class="nav-link" onclick="showTutorial('java'); return false;">Java</a>
                    <a href="#cpp" class="nav-link" onclick="showTutorial('cpp'); return false;">C++</a>
                    <a href="#csharp" class="nav-link" onclick="showTutorial('csharp'); return false;">C#</a>
                    <a href="#php" class="nav-link" onclick="showTutorial('php'); return false;">PHP</a>
                    <a href="#ruby" class="nav-link" onclick="showTutorial('ruby'); return false;">Ruby</a>
                    <a href="#go" class="nav-link" onclick="showTutorial('go'); return false;">Go</a>
                    <a href="#rust" class="nav-link" onclick="showTutorial('rust'); return false;">Rust</a>
                    <a href="#swift" class="nav-link" onclick="showTutorial('swift'); return false;">Swift</a>
                    <a href="#kotlin" class="nav-link" onclick="showTutorial('kotlin'); return false;">Kotlin</a>
                    <a href="#typescript" class="nav-link" onclick="showTutorial('typescript'); return false;">TypeScript</a>
                    <a href="#sql" class="nav-link" onclick="showTutorial('sql'); return false;">SQL</a>
                </div>
            </div>
        </nav>

        <main class="main-content">
            <div class="content-title" id="contentTitle" style="display: none;">
                <h2 id="page-title">HTML Tutorial</h2>
            </div>
            
            <div class="landing-page" id="landingPage">
                <div class="landing-content">
                    <div class="welcome-icon">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
                        </svg>
                    </div>
                    <h1 class="welcome-title">Welcome to Programming Tutorials</h1>
                    <p class="welcome-subtitle">Learn, Build, and Master Your Coding Skills</p>
                    
                    <div class="feature-grid">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                            </div>
                            <h3>15+ Languages</h3>
                            <p>From web development to system programming</p>
                        </div>
                        
                        <div class="feature-card">
                            <div class="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                            </div>
                            <h3>Step-by-Step</h3>
                            <p>Clear examples and practical exercises</p>
                        </div>
                        
                        <div class="feature-card">
                            <div class="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <h3>Learn Anytime</h3>
                            <p>Self-paced learning at your convenience</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tutorial-content" id="tutorialContent" style="display: none;">
                <!-- Content will be loaded dynamically -->
            </div>
        </main>
    </div>

    <script src="{{ asset('js/theme.js') }}"></script>
    <script src="{{ asset('js/tutorials.js') }}"></script>
</body>
</html>

