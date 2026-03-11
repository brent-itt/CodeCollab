<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>My Snippets - CodeCollab</title>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link rel="stylesheet" href="{{ asset('css/homepage-styles.css') }}">
    <style>
        body { overflow: auto; }
        .page-wrapper { display: flex; height: 100vh; }
        .main-content { flex: 1; overflow-y: auto; padding: 30px; }
        .page-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28px;
            flex-wrap: wrap;
            gap: 12px;
        }
        .page-header h1 {
            font-size: 26px;
            background: linear-gradient(135deg, #61dafb, #21a1f1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .snippets-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }
        .snippet-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .snippet-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(97, 218, 251, 0.15);
        }
        .snippet-thumb {
            background: #1e1e2e;
            padding: 14px;
            height: 120px;
            overflow: hidden;
            position: relative;
        }
        .snippet-thumb pre {
            color: #d4d4d4;
            font-size: 10px;
            font-family: 'Consolas', monospace;
            margin: 0;
            white-space: pre-wrap;
            line-height: 1.5;
            overflow: hidden;
            max-height: 92px;
        }
        .lang-badge {
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 2px 8px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 600;
            color: #fff;
        }
        .snippet-body {
            padding: 14px;
        }
        .snippet-title {
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .snippet-meta {
            font-size: 12px;
            color: var(--text-secondary);
            margin-bottom: 12px;
        }
        .snippet-actions {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .btn-action {
            padding: 6px 12px;
            font-size: 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            width: 100%;
            font-weight: 500;
            transition: opacity 0.2s;
        }
        .btn-action:hover { opacity: 0.85; }
        .btn-open { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
        .btn-delete { background: linear-gradient(135deg, #e53935, #b71c1c); color: #fff; }
        .empty-state {
            grid-column: 1 / -1;
            text-align: center;
            padding: 80px 20px;
            color: var(--text-secondary);
        }
        .empty-state svg { opacity: 0.25; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto; }
        .empty-state p { font-size: 16px; margin-bottom: 20px; }
        .search-bar-wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        .search-input {
            padding: 8px 14px;
            background: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-color);
            font-size: 14px;
            outline: none;
            width: 220px;
        }
        .search-input:focus { border-color: var(--primary-color); }
        .filter-select {
            padding: 8px 12px;
            background: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-color);
            font-size: 14px;
            outline: none;
            cursor: pointer;
        }
        .stats-bar {
            display: flex;
            gap: 20px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }
        .stats-pill {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 8px 18px;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .stats-pill span { font-weight: 700; color: var(--primary-color); font-size: 16px; }
    </style>
</head>
<body>
    <div class="page-wrapper">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header" onclick="window.location.href='{{ route('home') }}'" style="cursor:pointer;">
                <svg width="35" height="35" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="ccGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#61dafb;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#21a1f1;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <path d="M 35 25 Q 20 25 20 40 Q 20 50 20 60 Q 20 75 35 75" stroke="url(#ccGradient)" stroke-width="8" fill="none" stroke-linecap="round"/>
                    <path d="M 65 25 Q 50 25 50 40 Q 50 50 50 60 Q 50 75 65 75" stroke="url(#ccGradient)" stroke-width="8" fill="none" stroke-linecap="round"/>
                </svg>
                <h2>CodeCollab</h2>
            </div>
            <nav class="nav-menu">
                <button class="nav-item" onclick="window.location.href='{{ route('home') }}'">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 6.293V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146z"/></svg>
                    <span>Dashboard</span>
                </button>
                <button class="nav-item nav-dropdown-toggle open" id="editorDropdownToggle" onclick="this.classList.toggle('open');document.getElementById('editorDropdown').classList.toggle('open')">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg>
                    <span>Code Editor</span>
                    <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
                </button>
                <div class="nav-dropdown-content open" id="editorDropdown">
                    <button class="nav-dropdown-item" onclick="window.location.href='{{ route('editor') }}'">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg>
                        <span>Open Editor</span>
                    </button>
                    <button class="nav-dropdown-item" onclick="window.location.href='{{ route('snippets') }}'" style="color:var(--primary-color);background:rgba(97,218,251,0.08);">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/></svg>
                        <span>My Snippets</span>
                    </button>
                    <button class="nav-dropdown-item" onclick="window.location.href='{{ route('completed-projects') }}'">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>
                        <span>Completed Projects</span>
                    </button>
                </div>
                <button class="nav-item" onclick="window.location.href='{{ route('collaboration') }}'">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/><path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg>
                    <span>Collaborations</span>
                </button>
                <button class="nav-item" onclick="window.location.href='{{ route('chatbot') }}'">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/><path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/></svg>
                    <span>AI Chatbot</span>
                </button>
                <div class="nav-divider"></div>
                <button class="nav-item" onclick="window.location.href='{{ route('tutorials') }}'">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/></svg>
                    <span>Tutorials</span>
                </button>
            </nav>
            <div class="sidebar-footer">
                <div class="user-info" id="userInfo">
                    <div class="user-avatar" id="userAvatar">U</div>
                    <div class="user-details">
                        <div class="user-name" id="userName">Guest User</div>
                        <div class="user-email" id="userEmail">guest@example.com</div>
                    </div>
                </div>
                <button class="btn-logout" onclick="logout()">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/><path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/></svg>
                    Logout
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="page-header">
                <h1>
                    <svg width="26" height="26" viewBox="0 0 16 16" fill="#61dafb" style="vertical-align:middle;margin-right:8px;">
                        <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
                    </svg>
                    My Saved Snippets
                </h1>
                <div class="search-bar-wrapper">
                    <input type="text" id="searchInput" class="search-input" placeholder="Search snippets..." oninput="renderSnippets()">
                    <select id="langFilter" class="filter-select" onchange="renderSnippets()">
                        <option value="all">All Languages</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="html">HTML/CSS</option>
                        <option value="c++">C++</option>
                        <option value="java">Java</option>
                        <option value="php">PHP</option>
                    </select>
                    <button class="btn btn-primary" onclick="window.location.href='{{ route('editor') }}'">
                        + New Snippet
                    </button>
                </div>
            </div>

            <div class="stats-bar" id="statsBar">
                <div class="stats-pill">Total: <span id="totalCount">0</span></div>
                <div class="stats-pill" style="color:#61dafb;">Showing: <span id="showingCount">0</span></div>
            </div>

            <div class="snippets-grid" id="snippetsGrid">
                <div class="empty-state">
                    <svg width="56" height="56" viewBox="0 0 16 16" fill="currentColor"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg>
                    <p>Loading snippets...</p>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Apply saved theme
        if (localStorage.getItem('themeMode') === 'light') document.body.classList.add('light-mode');

        const langColors = { python:'#3776ab', cpp:'#00599c', 'c++':'#00599c', javascript:'#f7df1e', html:'#e34f26', css:'#1572b6', react:'#61dafb', java:'#ed8b00', php:'#777bb4', ruby:'#cc342d', go:'#00add8', rust:'#f74c00', swift:'#fa7343', kotlin:'#7f52ff', typescript:'#3178c6' };

        function getUserSnippetsKey() {
            try {
                const stored = localStorage.getItem('codeCollabUser') || sessionStorage.getItem('codeCollabUser');
                if (stored) { const u = JSON.parse(stored); return 'userSnippets_' + (u.id || u.email || 'guest'); }
            } catch(e) {}
            return 'userSnippets_guest';
        }

        function getTimeAgo(dateStr) {
            if (!dateStr) return 'some time ago';
            const diff = Date.now() - new Date(dateStr).getTime();
            const mins = Math.floor(diff / 60000);
            if (mins < 1) return 'just now';
            if (mins < 60) return mins + 'm ago';
            const hrs = Math.floor(mins / 60);
            if (hrs < 24) return hrs + 'h ago';
            const days = Math.floor(hrs / 24);
            return days + 'd ago';
        }

        function renderSnippets() {
            const search = (document.getElementById('searchInput').value || '').toLowerCase();
            const langFilter = document.getElementById('langFilter').value;
            const all = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]').reverse();
            document.getElementById('totalCount').textContent = all.length;

            let filtered = all.filter(s => {
                const matchLang = langFilter === 'all' || (s.language || '').toLowerCase() === langFilter;
                const matchSearch = !search || (s.title || '').toLowerCase().includes(search) || (s.language || '').toLowerCase().includes(search) || (s.code || '').toLowerCase().includes(search);
                return matchLang && matchSearch;
            });

            document.getElementById('showingCount').textContent = filtered.length;
            const grid = document.getElementById('snippetsGrid');

            if (filtered.length === 0) {
                grid.innerHTML = `<div class="empty-state">
                    <svg width="56" height="56" viewBox="0 0 16 16" fill="currentColor"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg>
                    <p>${all.length === 0 ? 'No snippets saved yet.' : 'No snippets match your search.'}</p>
                    ${all.length === 0 ? '<button class="btn btn-primary" onclick="window.location.href=\'/editor\'">Open Code Editor</button>' : ''}
                </div>`;
                return;
            }

            grid.innerHTML = filtered.map(s => {
                const lang = (s.language || 'code').toLowerCase();
                const color = langColors[lang] || '#61dafb';
                const label = lang.toUpperCase();
                const escaped = (s.code || s.html || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').substring(0, 400);
                return `
                <div class="snippet-card">
                    <div class="snippet-thumb">
                        <pre>${escaped || '<span style="color:#555;">// empty snippet</span>'}</pre>
                        <div class="lang-badge" style="background:${color};">${label}</div>
                    </div>
                    <div class="snippet-body">
                        <div class="snippet-title" title="${(s.title||'Untitled').replace(/"/g,'')}">${s.title || 'Untitled'}</div>
                        <div class="snippet-meta">${getTimeAgo(s.date)} &bull; ${(s.code || s.html || '').length} chars</div>
                        <div class="snippet-actions">
                            <button class="btn-action btn-open" onclick="openInEditor(${s.id})">Open in Editor</button>
                            <button class="btn-action btn-delete" onclick="deleteSnippet(${s.id})">🗑 Delete</button>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        function openInEditor(id) {
            const snippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
            const s = snippets.find(x => x.id === id);
            if (!s) return;
            localStorage.setItem('pendingEditorSnippet', JSON.stringify(s));
            window.location.href = '/editor';
        }

        function deleteSnippet(id) {
            if (!confirm('Delete this snippet? This cannot be undone.')) return;
            let snippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
            snippets = snippets.filter(s => s.id !== id);
            localStorage.setItem(getUserSnippetsKey(), JSON.stringify(snippets));
            renderSnippets();
        }

        function logout() {
            fetch('/api/logout', { method: 'POST', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content } })
                .finally(() => { localStorage.removeItem('codeCollabUser'); sessionStorage.removeItem('codeCollabUser'); window.location.href = '/'; });
        }

        // Init user info
        const storedUser = localStorage.getItem('codeCollabUser') || sessionStorage.getItem('codeCollabUser');
        if (storedUser) {
            const u = JSON.parse(storedUser);
            document.getElementById('userName').textContent = u.name || 'User';
            document.getElementById('userEmail').textContent = u.email || '';
            document.getElementById('userAvatar').textContent = (u.name || 'U').charAt(0).toUpperCase();
        }

        renderSnippets();
    </script>
</body>
</html>
