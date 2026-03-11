// Global variables
let htmlEditor, cssEditor, jsEditor;
let currentSection = 'code';

// Apply saved theme immediately to prevent flash of wrong mode
(function() {
    if (localStorage.getItem('themeMode') === 'light') {
        document.body.classList.add('light-mode');
    }
})();

// Delete a saved snippet from the profile
function deleteSnippet(id) {
    if (!confirm('Delete this snippet? This cannot be undone.')) return;
    let userSnippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
    userSnippets = userSnippets.filter(s => s.id !== id);
    localStorage.setItem(getUserSnippetsKey(), JSON.stringify(userSnippets));
    loadProfileData();
    showNotification('Snippet deleted.', 'info');
}

// Open a saved snippet in the Code Editor
function openSnippetInEditor(id) {
    const userSnippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
    const snippet = userSnippets.find(s => s.id === id);
    if (!snippet) return;
    localStorage.setItem('pendingEditorSnippet', JSON.stringify(snippet));
    window.location.href = '/editor';
}

// Returns a user-specific localStorage key so snippets are isolated per account
function getUserSnippetsKey() {
    try {
        const stored = localStorage.getItem('codeCollabUser') || sessionStorage.getItem('codeCollabUser');
        if (stored) {
            const u = JSON.parse(stored);
            return 'userSnippets_' + (u.id || u.email || 'guest');
        }
    } catch(e) {}
    return 'userSnippets_guest';
}
let autoRunEnabled = true;
let debounceTimer = null;

// Sample data for demo
const sampleSnippets = [
    {
        id: 1,
        title: 'Animated Button',
        author: 'Alice Johnson',
        authorInitial: 'A',
        likes: 24,
        views: 156,
        date: '2 days ago',
        language: 'html',
        html: '<button class="animated-btn">Hover Me!</button>',
        css: '.animated-btn { padding: 15px 30px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; border-radius: 25px; font-size: 16px; cursor: pointer; transition: all 0.3s ease; } .animated-btn:hover { transform: scale(1.1); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5); }',
        js: ''
    },
    {
        id: 2,
        title: 'Card Component',
        author: 'Bob Smith',
        authorInitial: 'B',
        likes: 42,
        views: 320,
        date: '5 days ago',
        language: 'html',
        html: '<div class="card"><h3>Card Title</h3><p>This is a beautiful card component with smooth animations.</p></div>',
        css: '.card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); max-width: 300px; transition: transform 0.3s; } .card:hover { transform: translateY(-10px); } .card h3 { color: #333; margin-bottom: 15px; } .card p { color: #666; line-height: 1.6; }',
        js: ''
    },
    {
        id: 3,
        title: 'Loading Spinner',
        author: 'Carol White',
        authorInitial: 'C',
        likes: 18,
        views: 98,
        date: '1 week ago',
        language: 'html',
        html: '<div class="spinner"></div>',
        css: '.spinner { width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }',
        js: ''
    },
    {
        id: 4,
        title: 'Gradient Background',
        author: 'David Lee',
        authorInitial: 'D',
        likes: 56,
        views: 412,
        date: '3 days ago',
        language: 'html',
        html: '<div class="gradient-bg"><h1>Beautiful Gradients</h1></div>',
        css: 'body { margin: 0; } .gradient-bg { height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; } .gradient-bg h1 { color: white; font-size: 48px; font-family: Arial, sans-serif; }',
        js: ''
    },
    {
        id: 5,
        title: 'Interactive Counter',
        author: 'Emma Davis',
        authorInitial: 'E',
        likes: 31,
        views: 245,
        date: '4 days ago',
        language: 'javascript',
        html: '<div class="counter-container"><h2 id="count">0</h2><div><button onclick="decrement()">-</button><button onclick="increment()">+</button></div></div>',
        css: '.counter-container { text-align: center; padding: 40px; font-family: Arial; } #count { font-size: 72px; margin: 20px 0; color: #667eea; } button { padding: 10px 25px; margin: 0 10px; font-size: 24px; border: none; background: #667eea; color: white; border-radius: 5px; cursor: pointer; }',
        js: 'let count = 0; function increment() { count++; document.getElementById("count").textContent = count; } function decrement() { count--; document.getElementById("count").textContent = count; }'
    },
    {
        id: 6,
        title: 'CSS Grid Layout',
        author: 'Frank Miller',
        authorInitial: 'F',
        likes: 67,
        views: 534,
        date: '1 week ago',
        language: 'html',
        html: '<div class="grid"><div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div><div class="item">5</div><div class="item">6</div></div>',
        css: '.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px; } .item { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 40px; text-align: center; font-size: 32px; border-radius: 10px; }',
        js: ''
    },
    {
        id: 7,
        title: 'Fibonacci Sequence',
        author: 'Grace Hopper',
        authorInitial: 'G',
        likes: 45,
        views: 310,
        date: '3 days ago',
        language: 'python',
        isCodeSnippet: true,
        code: 'def fibonacci(n):\n    """Generate Fibonacci sequence up to n terms."""\n    sequence = []\n    a, b = 0, 1\n    for _ in range(n):\n        sequence.append(a)\n        a, b = b, a + b\n    return sequence\n\n\ndef fibonacci_recursive(n):\n    """Recursive approach (elegant but slower for large n)."""\n    if n <= 0:\n        return []\n    if n == 1:\n        return [0]\n    if n == 2:\n        return [0, 1]\n    prev = fibonacci_recursive(n - 1)\n    prev.append(prev[-1] + prev[-2])\n    return prev\n\n\n# Generate first 10 Fibonacci numbers\nresult = fibonacci(10)\nprint("Fibonacci sequence:", result)\n# Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n\n# Using list comprehension with generator\ndef fib_generator(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fib_generator(10)))',
        html: '', css: '', js: ''
    },
    {
        id: 8,
        title: 'Data Class & Type Hints',
        author: 'Henry Adams',
        authorInitial: 'H',
        likes: 38,
        views: 275,
        date: '5 days ago',
        language: 'python',
        isCodeSnippet: true,
        code: 'from dataclasses import dataclass, field\nfrom typing import List, Optional\nfrom datetime import datetime\n\n\n@dataclass\nclass User:\n    name: str\n    email: str\n    age: int\n    tags: List[str] = field(default_factory=list)\n    created_at: datetime = field(default_factory=datetime.now)\n    bio: Optional[str] = None\n\n    def __post_init__(self):\n        if self.age < 0:\n            raise ValueError("Age cannot be negative")\n        self.email = self.email.lower()\n\n    def is_adult(self) -> bool:\n        return self.age >= 18\n\n    def add_tag(self, tag: str) -> None:\n        if tag not in self.tags:\n            self.tags.append(tag)\n\n    def __repr__(self) -> str:\n        return f"User({self.name!r}, age={self.age})"\n\n\n# Usage\nuser = User(name="Alice", email="Alice@Example.com", age=28)\nuser.add_tag("developer")\nuser.add_tag("python")\nprint(user)           # User(\'Alice\', age=28)\nprint(user.is_adult()) # True\nprint(user.email)     # alice@example.com',
        html: '', css: '', js: ''
    },
    {
        id: 9,
        title: 'Binary Search Tree',
        author: 'Ivan Petrov',
        authorInitial: 'I',
        likes: 72,
        views: 489,
        date: '1 week ago',
        language: 'cpp',
        isCodeSnippet: true,
        code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nstruct Node {\n    int value;\n    unique_ptr<Node> left, right;\n    explicit Node(int v) : value(v) {}\n};\n\nclass BST {\npublic:\n    void insert(int val) {\n        root = insertNode(move(root), val);\n    }\n\n    bool search(int val) const {\n        return searchNode(root.get(), val);\n    }\n\n    void inorder() const {\n        inorderTraversal(root.get());\n        cout << endl;\n    }\n\nprivate:\n    unique_ptr<Node> root;\n\n    unique_ptr<Node> insertNode(unique_ptr<Node> node, int val) {\n        if (!node) return make_unique<Node>(val);\n        if (val < node->value)\n            node->left = insertNode(move(node->left), val);\n        else if (val > node->value)\n            node->right = insertNode(move(node->right), val);\n        return node;\n    }\n\n    bool searchNode(const Node* node, int val) const {\n        if (!node) return false;\n        if (val == node->value) return true;\n        return val < node->value\n            ? searchNode(node->left.get(), val)\n            : searchNode(node->right.get(), val);\n    }\n\n    void inorderTraversal(const Node* node) const {\n        if (!node) return;\n        inorderTraversal(node->left.get());\n        cout << node->value << " ";\n        inorderTraversal(node->right.get());\n    }\n};\n\nint main() {\n    BST tree;\n    for (int v : {5, 3, 7, 1, 4, 6, 8})\n        tree.insert(v);\n    tree.inorder();           // 1 2 3 4 5 6 7 8\n    cout << tree.search(4);   // 1 (true)\n    cout << tree.search(9);   // 0 (false)\n}',
        html: '', css: '', js: ''
    },
    {
        id: 10,
        title: 'Lambda & STL Algorithms',
        author: 'Julia Chen',
        authorInitial: 'J',
        likes: 53,
        views: 401,
        date: '4 days ago',
        language: 'cpp',
        isCodeSnippet: true,
        code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\n#include <ranges>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {5, 2, 8, 1, 9, 3, 7, 4, 6};\n\n    // Sort ascending\n    sort(nums.begin(), nums.end());\n\n    // Filter even numbers using ranges (C++20)\n    auto evens = nums | views::filter([](int n){ return n % 2 == 0; });\n    cout << "Evens: ";\n    for (int n : evens) cout << n << " ";  // 2 4 6 8\n    cout << endl;\n\n    // Transform: square each element\n    vector<int> squared;\n    transform(nums.begin(), nums.end(), back_inserter(squared),\n              [](int n){ return n * n; });\n\n    // Sum with reduce\n    int total = reduce(nums.begin(), nums.end(), 0);\n    cout << "Sum: " << total << endl;  // 45\n\n    // Find max with lambda comparator\n    auto maxIt = max_element(squared.begin(), squared.end(),\n                             [](int a, int b){ return a < b; });\n    cout << "Max squared: " << *maxIt << endl;  // 81\n\n    // Count values greater than 5\n    int count = count_if(nums.begin(), nums.end(),\n                         [](int n){ return n > 5; });\n    cout << "Count > 5: " << count << endl;  // 4\n}',
        html: '', css: '', js: ''
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    checkAuthentication();
    initializeNavigation();
    loadUserProfile();
    loadExploreSnippets();
    loadProfileData();
    loadCollaborations();
    
    // Check for section parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section) {
        switchSection(section);
    }

    // Show email verified toast
    if (urlParams.get('verified') === '1') {
        setTimeout(() => showNotification('\u2705 Email verified! Welcome to CodeCollab!', 'success'), 500);
        history.replaceState({}, '', '/home');
    }
    
    // Real-time profile update when code editor saves a snippet in another tab
    window.addEventListener('storage', (e) => {
        if (e.key === getUserSnippetsKey()) {
            loadProfileData();
        }
    });
});

// Check authentication
function checkAuthentication() {
    const storedUser = localStorage.getItem('codeCollabUser') || sessionStorage.getItem('codeCollabUser');
    
    if (storedUser) {
        window.currentUser = JSON.parse(storedUser);
        updateUserInfo();
    } else {
        // For demo purposes, create a guest user
        window.currentUser = {
            name: 'Guest User',
            email: 'guest@codecollab.com',
            loginTime: new Date().toISOString()
        };
    }
}

// Update user info in sidebar
function updateUserInfo() {
    const userInfo = document.getElementById('userInfo');
    const initial = window.currentUser.name.charAt(0).toUpperCase();
    
    userInfo.querySelector('.user-avatar').textContent = initial;
    userInfo.querySelector('.user-name').textContent = window.currentUser.name;
    userInfo.querySelector('.user-email').textContent = window.currentUser.email;
    
    // Update welcome stats
    updateWelcomeStats();
}

// Update welcome page statistics
function updateWelcomeStats() {
    const snippets = JSON.parse(localStorage.getItem('snippets') || '[]');
    const userSnippets = snippets.filter(s => s.author === window.currentUser.name);
    
    const statsSnippets = document.getElementById('statsSnippets');
    const statsViews = document.getElementById('statsViews');
    const statsLikes = document.getElementById('statsLikes');
    
    if (statsSnippets) statsSnippets.textContent = userSnippets.length;
    if (statsViews) statsViews.textContent = userSnippets.reduce((sum, s) => sum + (s.views || 0), 0);
    if (statsLikes) statsLikes.textContent = userSnippets.reduce((sum, s) => sum + (s.likes || 0), 0);
}


// Handle editor changes with debouncing
function handleEditorChange() {
    // auto-run removed
}

// Switch editor tabs
function switchEditorTab(lang) {
    document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    document.querySelectorAll('.code-editor').forEach(e => e.classList.remove('active'));
    document.getElementById(`${lang}EditorWrapper`).classList.add('active');
    
    // Refresh the active editor
    setTimeout(() => {
        if (lang === 'html') htmlEditor.refresh();
        if (lang === 'css') cssEditor.refresh();
        if (lang === 'js') jsEditor.refresh();
    }, 100);
}

// Initialize navigation
function initializeNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);
        });
    });
}

// Switch sections
function switchSection(section) {
    currentSection = section;
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const navItem = document.querySelector(`[data-section="${section}"]`);
    if (navItem) navItem.classList.add('active');
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    const contentSection = document.getElementById(`${section}Section`);
    if (contentSection) contentSection.classList.add('active');
    
    // Always refresh profile data when navigating to profile
    if (section === 'profile') {
        loadProfileData();
    }
}

// Run code
function runCode() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();
    
    const preview = document.getElementById('preview');
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>
                // Override console.log to capture output
                (function() {
                    const originalLog = console.log;
                    const originalError = console.error;
                    const originalWarn = console.warn;
                    
                    console.log = function(...args) {
                        originalLog.apply(console, args);
                        window.parent.postMessage({
                            type: 'console',
                            level: 'info',
                            message: args.join(' ')
                        }, '*');
                    };
                    
                    console.error = function(...args) {
                        originalError.apply(console, args);
                        window.parent.postMessage({
                            type: 'console',
                            level: 'error',
                            message: args.join(' ')
                        }, '*');
                    };
                    
                    console.warn = function(...args) {
                        originalWarn.apply(console, args);
                        window.parent.postMessage({
                            type: 'console',
                            level: 'warning',
                            message: args.join(' ')
                        }, '*');
                    };
                    
                    window.onerror = function(msg, url, lineNo, columnNo, error) {
                        window.parent.postMessage({
                            type: 'console',
                            level: 'error',
                            message: 'Error: ' + msg
                        }, '*');
                        return false;
                    };
                })();
                
                ${js}
            <\/script>
        </body>
        </html>
    `;
    
    preview.srcdoc = content;
    logToConsole('Preview updated', 'success');
}

// Listen for console messages from iframe
window.addEventListener('message', (event) => {
    if (event.data.type === 'console') {
        logToConsole(event.data.message, event.data.level);
    }
});

// Log to console
function logToConsole(message, type = 'info') {
    const consoleContent = document.getElementById('consoleContent');
    if (!consoleContent) return;
    
    const timestamp = new Date().toLocaleTimeString();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `console-message ${type}`;
    messageDiv.innerHTML = `
        <span class="timestamp">[${timestamp}]</span>
        <span>${message}</span>
    `;
    
    consoleContent.appendChild(messageDiv);
    consoleContent.scrollTop = consoleContent.scrollHeight;
}

// Clear console
function clearConsole() {
    const consoleContent = document.getElementById('consoleContent');
    if (consoleContent) {
        consoleContent.innerHTML = '';
        logToConsole('Console cleared', 'info');
    }
}

// Refresh preview
function refreshPreview() {
    runCode();
}

// Save snippet
function saveSnippet() {
    const name = document.getElementById('snippetName').value || 'Untitled';
    const snippet = {
        id: Date.now(),
        title: name,
        author: window.currentUser.name,
        authorInitial: window.currentUser.name.charAt(0),
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
        js: jsEditor.getValue(),
        date: new Date().toISOString(),
        likes: 0,
        views: 0
    };
    
    // Get existing snippets
    let snippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
    snippets.push(snippet);
    localStorage.setItem(getUserSnippetsKey(), JSON.stringify(snippets));
    
    showNotification('Snippet saved successfully!', 'success');
    logToConsole('Snippet saved: ' + name, 'success');
    loadProfileData(); // Refresh profile data
}

// Returns the shared global key for published (explore) snippets
function getPublishedSnippetsKey() {
    return 'publishedSnippets';
}

// Publish a saved snippet to the Explore feed
function publishToExplore(id) {
    const userSnippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
    const snippet = userSnippets.find(s => s.id === id);
    if (!snippet) return;

    const published = JSON.parse(localStorage.getItem(getPublishedSnippetsKey()) || '[]');
    if (published.some(s => s.id === id)) {
        showNotification('This snippet is already published to Explore!', 'info');
        return;
    }

    published.push({ ...snippet, published: true });
    localStorage.setItem(getPublishedSnippetsKey(), JSON.stringify(published));

    // Mark as published in user's own list so button shows correct state
    const updated = userSnippets.map(s => s.id === id ? { ...s, published: true } : s);
    localStorage.setItem(getUserSnippetsKey(), JSON.stringify(updated));

    showNotification('Snippet published to Explore!', 'success');
    loadProfileData();
}

// Load explore snippets (optionally filtered)
function loadExploreSnippets(searchTerm = '', langFilter = 'all') {
    const exploreGrid = document.getElementById('exploreGrid');
    const publishedSnippets = JSON.parse(localStorage.getItem(getPublishedSnippetsKey()) || '[]');
    let allSnippets = [...sampleSnippets, ...publishedSnippets];

    // Apply language filter
    if (langFilter !== 'all') {
        allSnippets = allSnippets.filter(s => (s.language || '').toLowerCase() === langFilter);
    }

    // Apply search filter
    if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        allSnippets = allSnippets.filter(s =>
            (s.title || '').toLowerCase().includes(term) ||
            (s.author || '').toLowerCase().includes(term) ||
            (s.language || '').toLowerCase().includes(term) ||
            (s.code || s.html || '').toLowerCase().includes(term)
        );
    }

    if (allSnippets.length === 0) {
        exploreGrid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-secondary);">
                <svg width="48" height="48" viewBox="0 0 16 16" fill="currentColor" style="opacity:0.3;margin-bottom:16px;display:block;margin-left:auto;margin-right:auto;">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <p>No snippets found. Try a different search or filter.</p>
            </div>`;
        return;
    }

    const langColors = { python: '#3776ab', cpp: '#00599c', javascript: '#f7df1e', html: '#e34f26', css: '#1572b6', react: '#61dafb' };
    const langLabels = { python: 'Python', cpp: 'C++', javascript: 'JavaScript', html: 'HTML/CSS', css: 'CSS', react: 'React' };

    exploreGrid.innerHTML = allSnippets.map(snippet => {
        const isCode = snippet.isCodeSnippet || (snippet.code && !snippet.html);
        const lang = (snippet.language || '').toLowerCase();
        const langColor = langColors[lang] || '#61dafb';
        const langLabel = langLabels[lang] || lang.toUpperCase();

        const thumbnail = isCode
            ? `<div class="snippet-thumbnail snippet-code-thumb" style="background:#1e1e2e;">
                    <div class="code-lang-badge" style="background:${langColor};">${langLabel}</div>
                    <pre class="code-thumb-preview">${(snippet.code || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').substring(0, 300)}</pre>
               </div>`
            : `<div class="snippet-thumbnail">
                    <iframe srcdoc="<style>${snippet.css || ''}</style>${snippet.html || ''}"></iframe>
               </div>`;

        return `
        <div class="snippet-card" onclick="viewSnippet(${snippet.id})">
            ${thumbnail}
            <div class="snippet-info">
                <div class="snippet-title">${snippet.title}</div>
                <div class="snippet-author">
                    <div class="author-avatar-small">${snippet.authorInitial || (snippet.author || '?').charAt(0).toUpperCase()}</div>
                    <span class="author-name-small">${snippet.author || 'Unknown'}</span>
                </div>
                <div class="snippet-stats">
                    <div class="snippet-stat">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z"/>
                        </svg>
                        ${snippet.likes || 0}
                    </div>
                    <div class="snippet-stat">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        </svg>
                        ${snippet.views || 0}
                    </div>
                    <div class="snippet-stat" style="font-size:11px;color:${langColor};font-weight:600;">${langLabel}</div>
                </div>
            </div>
        </div>`;
    }).join('');
}

// Currently viewed snippet data
let _currentSnippet = null;

const _langColors = { python: '#3776ab', cpp: '#00599c', javascript: '#f7df1e', html: '#e34f26', css: '#1572b6', react: '#61dafb' };
const _langLabels = { python: 'Python', cpp: 'C++', javascript: 'JavaScript', html: 'HTML/CSS', css: 'CSS', react: 'React' };

// View snippet
function viewSnippet(id) {
    const userSnippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
    const publishedSnippets = JSON.parse(localStorage.getItem(getPublishedSnippetsKey()) || '[]');
    const allSnippets = [...sampleSnippets, ...publishedSnippets, ...userSnippets];
    // deduplicate by id - prefer most recent
    const seen = new Set();
    const deduped = allSnippets.filter(s => { if (seen.has(s.id)) return false; seen.add(s.id); return true; });
    const snippet = deduped.find(s => s.id === id);

    if (!snippet) return;
    _currentSnippet = snippet;

    const modal = document.getElementById('snippetModal');
    document.getElementById('modalSnippetTitle').textContent = snippet.title;

    const isCode = snippet.isCodeSnippet || (snippet.code && !snippet.html);
    const lang = (snippet.language || '').toLowerCase();
    const langColor = _langColors[lang] || '#61dafb';
    const langLabel = _langLabels[lang] || lang.toUpperCase();

    const tabsContainer = document.querySelector('.snippet-view-tabs');

    if (isCode) {
        // Code-only snippet (Python, C++, etc.) — show one "Code" tab
        tabsContainer.innerHTML = `
            <button class="snippet-tab active" onclick="switchSnippetTab('code', this)" style="color:${langColor};border-bottom-color:${langColor};">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg>
                ${langLabel} Code
            </button>`;

        // Show code view immediately
        document.getElementById('snippetPreview').style.display = 'none';
        const codeView = document.getElementById('snippetCodeView');
        const codeContent = document.getElementById('snippetCodeContent');
        const escaped = (snippet.code || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        codeContent.innerHTML = escaped || `<span style="color:#888;">No code available.</span>`;
        codeView.setAttribute('data-lang', lang);
        codeView.style.display = '';
    } else {
        // HTML/CSS/JS snippet — restore normal tabs
        const jsTab = snippet.js
            ? `<button class="snippet-tab" onclick="switchSnippetTab('js', this)" id="snippetJsTab">
                   <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M10.068.87a.5.5 0 0 0-.237.445v.01c0 .01 0 .027.002.048.004.068.012.157.024.258.023.198.06.46.112.726.098.518.261 1.04.494 1.385.233.344.578.555.882.602a.52.52 0 0 0 .122.01h.009a.5.5 0 0 0 .494-.5V3.5c0-.275-.223-.5-.5-.5h-.5a.5.5 0 0 0-.5.5v.004c-.002.004-.005.007-.008.01-.003.003-.006.005-.009.008-.01.009-.018.017-.025.025a.5.5 0 0 0 .023.7.5.5 0 0 0 .703-.03A.5.5 0 0 0 11 3.504z"/><path d="M7.5 0a7.5 7.5 0 1 0 0 15A7.5 7.5 0 0 0 7.5 0zm0 1a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z"/></svg>
                   JS
               </button>`
            : '';

        tabsContainer.innerHTML = `
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
            ${jsTab}`;

        // Show preview by default
        document.getElementById('snippetPreview').style.display = '';
        document.getElementById('snippetCodeView').style.display = 'none';
        _renderSnippetPreview(snippet);
    }

    modal.classList.add('open');
}

function _renderSnippetPreview(snippet) {
    const previewContent = `<!DOCTYPE html><html><head><style>${snippet.css || ''}</style></head><body>${snippet.html || ''}<script>${snippet.js || ''}<\/script></body></html>`;
    document.getElementById('snippetPreview').innerHTML = `<iframe srcdoc="${previewContent.replace(/"/g, '&quot;')}"></iframe>`;
}

// Switch tabs in snippet modal
function switchSnippetTab(tab, btn) {
    if (!_currentSnippet) return;

    document.querySelectorAll('.snippet-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const preview = document.getElementById('snippetPreview');
    const codeView = document.getElementById('snippetCodeView');
    const codeContent = document.getElementById('snippetCodeContent');
    const lang = (_currentSnippet.language || '').toLowerCase();

    if (tab === 'preview') {
        preview.style.display = '';
        codeView.style.display = 'none';
        _renderSnippetPreview(_currentSnippet);
    } else if (tab === 'code') {
        // Full code for Python/C++
        const raw = _currentSnippet.code || '';
        const escaped = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        codeContent.innerHTML = escaped || `<span style="color:#888;">No code available.</span>`;
        codeView.setAttribute('data-lang', lang);
        preview.style.display = 'none';
        codeView.style.display = '';
    } else {
        const codeMap = { html: _currentSnippet.html || '', css: _currentSnippet.css || '', js: _currentSnippet.js || '' };
        const langLabel = { html: 'HTML', css: 'CSS', js: 'JavaScript' };
        const raw = codeMap[tab] || '';
        const escaped = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        codeContent.innerHTML = escaped || `<span style="color:#888;">No ${langLabel[tab]} code in this snippet.</span>`;
        codeView.setAttribute('data-lang', tab);
        preview.style.display = 'none';
        codeView.style.display = '';
    }
}

// Copy code from current tab
function copySnippetCode() {
    const pre = document.getElementById('snippetCodeContent');
    if (!pre) return;
    navigator.clipboard.writeText(pre.innerText || pre.textContent).then(() => {
        showNotification('Code copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy code.', 'error');
    });
}

// Close snippet modal
function closeSnippetModal() {
    document.getElementById('snippetModal').classList.remove('open');
    _currentSnippet = null;
}

// Load user profile
function loadUserProfile() {
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileAvatar = document.getElementById('profileAvatar');
    
    if (profileName) profileName.textContent = window.currentUser.name;
    if (profileEmail) profileEmail.textContent = window.currentUser.email;
    if (profileAvatar) profileAvatar.textContent = window.currentUser.name.charAt(0).toUpperCase();
}

// Load profile data
function loadProfileData() {
    const userSnippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
    
    // Update snippet count immediately from localStorage
    const snippetsCount = document.getElementById('snippetsCount');
    if (snippetsCount) snippetsCount.textContent = userSnippets.length;

    // Fetch real collaboration stats from API
    const localCompletedKey = 'completedProjects_' + (window.currentUser ? (window.currentUser.id || window.currentUser.email || 'guest') : 'guest');
    const localCompleted = JSON.parse(localStorage.getItem(localCompletedKey) || '[]');
    fetch('/api/collaborations/stats')
        .then(r => r.json())
        .then(stats => {
            const collaborationsCount = document.getElementById('collaborationsCount');
            const completedCount = document.getElementById('completedCount');
            if (collaborationsCount) collaborationsCount.textContent = stats.total;
            if (completedCount) completedCount.textContent = (stats.completed || 0) + localCompleted.length;
        })
        .catch(() => {
            // Fallback: read from localStorage only
            const completedCount = document.getElementById('completedCount');
            if (completedCount) completedCount.textContent = localCompleted.length;
        });
    
    // Load my snippets
    const mySnippets = document.getElementById('mySnippets');
    if (!mySnippets) return;
    
    if (userSnippets.length === 0) {
        mySnippets.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">No snippets yet. Save one from the Code Editor!</p>';
    } else {
        mySnippets.innerHTML = userSnippets.slice().reverse().slice(0, 6).map(snippet => {
            const isCode = snippet.isCodeSnippet || (snippet.code && !snippet.html);
            const timeAgo = getTimeAgo(snippet.date);
            const lang = (snippet.language || 'python').toUpperCase();
            const publishBtn = snippet.published
                ? `<button disabled style="margin-top:6px;padding:5px 12px;font-size:12px;background:#444;color:#aaa;border:none;border-radius:6px;cursor:not-allowed;width:100%;">✓ Published to Explore</button>`
                : `<button onclick="publishToExplore(${snippet.id})" style="margin-top:6px;padding:5px 12px;font-size:12px;background:linear-gradient(135deg,#20c997,#0dcaf0);color:#fff;border:none;border-radius:6px;cursor:pointer;width:100%;">↑ Publish to Explore</button>`;

            if (isCode) {
                // Code editor snippet — show code preview
                const escaped = (snippet.code || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                return `
                    <div class="snippet-card" style="cursor:default;">
                        <div class="snippet-thumbnail" style="background:#1e1e1e;display:flex;align-items:flex-start;padding:10px;overflow:hidden;">
                            <pre style="color:#d4d4d4;font-size:10px;font-family:monospace;margin:0;white-space:pre-wrap;overflow:hidden;max-height:85px;line-height:1.4;">${escaped.substring(0,400)}</pre>
                        </div>
                        <div class="snippet-info">
                            <div class="snippet-title">${snippet.title || snippet.name || 'Untitled'}</div>
                            <div class="snippet-stats">
                                <div class="snippet-stat" style="font-size:11px;color:#888;">${lang} &bull; ${timeAgo}</div>
                            </div>
                            <button onclick="openSnippetInEditor(${snippet.id})" style="margin-top:8px;padding:5px 12px;font-size:12px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:6px;cursor:pointer;width:100%;">Open in Editor</button>
                            ${publishBtn}
                            <button onclick="deleteSnippet(${snippet.id})" style="margin-top:6px;padding:5px 12px;font-size:12px;background:linear-gradient(135deg,#e53935,#b71c1c);color:#fff;border:none;border-radius:6px;cursor:pointer;width:100%;">🗑 Delete</button>
                        </div>
                    </div>`;
            } else {
                // HTML/CSS snippet — show iframe preview
                return `
                    <div class="snippet-card">
                        <div class="snippet-thumbnail">
                            <iframe srcdoc="<style>${snippet.css||''}</style>${snippet.html||''}"></iframe>
                        </div>
                        <div class="snippet-info">
                            <div class="snippet-title">${snippet.title || snippet.name || 'Untitled'}</div>
                            <div class="snippet-stats">
                                <div class="snippet-stat">❤️ ${snippet.likes||0}</div>
                                <div class="snippet-stat">👁️ ${snippet.views||0}</div>
                                <div class="snippet-stat" style="font-size:11px;color:#888;">${timeAgo}</div>
                            </div>
                            ${publishBtn}
                            <button onclick="deleteSnippet(${snippet.id})" style="margin-top:6px;padding:5px 12px;font-size:12px;background:linear-gradient(135deg,#e53935,#b71c1c);color:#fff;border:none;border-radius:6px;cursor:pointer;width:100%;">🗑 Delete</button>
                        </div>
                    </div>`;
            }
        }).join('');
    }
    
    // Load activity timeline
    loadActivityTimeline();
}

// Helper: human-readable time ago
function getTimeAgo(dateStr) {
    if (!dateStr) return 'recently';
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    if (diff < 604800) return Math.floor(diff / 86400) + 'd ago';
    return new Date(dateStr).toLocaleDateString();
}

// Load activity timeline
function loadActivityTimeline() {
    const timeline = document.getElementById('activityTimeline');
    if (!timeline) return;
    
    const userSnippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
    
    const activities = [
        ...userSnippets.slice().reverse().slice(0, 5).map(s => ({
            title: 'Saved snippet "' + (s.title || s.name || 'Untitled') + '"',
            time: getTimeAgo(s.date),
            icon: '💻'
        })),
        { title: 'Joined CodeCollab platform', time: '1 day ago', icon: '🎉' },
    ];
    
    timeline.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// Load collaborations
async function loadCollaborations() {
    const collabGrid = document.getElementById('collabGrid');
    
    try {
        const response = await fetch('/api/collaborations');
        const collaborations = await response.json();
        
        if (collaborations.length === 0) {
            collabGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
                    <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style="opacity: 0.3; margin-bottom: 16px;">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                    </svg>
                    <p>No collaborations yet. Start a new one!</p>
                </div>
            `;
            return;
        }
        
        collabGrid.innerHTML = collaborations.map(collab => {
            // Parse members if it's a string
            let members = [];
            if (collab.members) {
                members = typeof collab.members === 'string' ? JSON.parse(collab.members) : collab.members;
            }
            
            const memberInitials = members.slice(0, 3).map(m => m.charAt(0).toUpperCase());
            const createdDate = new Date(collab.created_at).toLocaleDateString();
            
            return `
                <div class="collab-card">
                    <div class="collab-header">
                        <div class="collab-title">${collab.title}</div>
                        <div class="collab-status ${collab.status}">${collab.status}</div>
                    </div>
                    <div class="collab-members">
                        ${memberInitials.length > 0 ? memberInitials.map(m => `<div class="member-avatar">${m}</div>`).join('') : '<div class="member-avatar">👤</div>'}
                        ${members.length > 3 ? `<div class="member-avatar">+${members.length - 3}</div>` : ''}
                    </div>
                    <div class="collab-date">Created ${createdDate}</div>
                    <div class="collab-actions">
                        <button class="btn btn-primary" onclick="openCollaboration(${collab.id})">Open</button>
                        <button class="btn btn-secondary" onclick="deleteCollaboration(${collab.id})">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        collabGrid.innerHTML = '<p style="color: var(--error-color);">Failed to load collaborations.</p>';
    }
}

// Edit profile
// ─── Theme Toggle ────────────────────────────────────────────────────────────
function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('themeMode', isLight ? 'light' : 'dark');
    updateThemeButton(isLight);
}

function updateThemeButton(isLight) {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    if (isLight) {
        btn.querySelector('.theme-icon').textContent = '☀️';
        btn.querySelector('.theme-label').textContent = 'Light Mode';
    } else {
        btn.querySelector('.theme-icon').textContent = '🌙';
        btn.querySelector('.theme-label').textContent = 'Dark Mode';
    }
}

function initTheme() {
    const saved = localStorage.getItem('themeMode');
    const isLight = saved === 'light';
    if (isLight) document.body.classList.add('light-mode');
    updateThemeButton(isLight);
}

function editProfile() {
    const modal = document.getElementById('editProfileModal');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    
    // Pre-fill form with current user data
    if (window.currentUser) {
        editName.value = window.currentUser.name;
        editEmail.value = window.currentUser.email;
    }
    
    // Clear password fields
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    modal.style.display = 'flex';
}

// Close edit profile modal
function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    modal.style.display = 'none';
}

// Handle profile form submission
document.getElementById('editProfileForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate password fields if changing password
    if (newPassword || confirmPassword) {
        if (!currentPassword) {
            showNotification('Current password is required to change password', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
        
        if (newPassword.length < 8) {
            showNotification('New password must be at least 8 characters', 'error');
            return;
        }
    }
    
    // Build request body
    const body = { name, email };
    
    if (newPassword) {
        body.current_password = currentPassword;
        body.password = newPassword;
        body.password_confirmation = confirmPassword;
    }
    
    try {
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify(body)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Update current user
            window.currentUser = data.user;
            
            // Update profile display
            loadUserProfile();
            
            // Close modal
            closeEditProfileModal();
            
            showNotification('Profile updated successfully!', 'success');
        } else {
            // Show error message
            const errorMessage = data.message || 'Failed to update profile';
            showNotification(errorMessage, 'error');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        showNotification('Error updating profile', 'error');
    }
});

// Start new collaboration
async function startNewCollaboration() {
    const title = prompt('Enter collaboration title:');
    if (!title) return;
    
    const description = prompt('Enter description (optional):');
    
    try {
        const response = await fetch('/api/collaborations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify({ title, description })
        });
        
        if (response.ok) {
            showNotification('Collaboration created successfully!', 'success');
            loadCollaborations();
        } else {
            showNotification('Failed to create collaboration', 'error');
        }
    } catch (error) {
        showNotification('Error creating collaboration', 'error');
    }
}

// Open collaboration
function openCollaboration(id) {
    window.location.href = `/editor?collab=${id}`;
}

// Delete collaboration
async function deleteCollaboration(id) {
    if (!confirm('Are you sure you want to delete this collaboration?')) return;
    
    try {
        const response = await fetch(`/api/collaborations/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            }
        });
        
        if (response.ok) {
            showNotification('Collaboration deleted successfully', 'success');
            loadCollaborations();
        } else {
            showNotification('Failed to delete collaboration', 'error');
        }
    } catch (error) {
        showNotification('Error deleting collaboration', 'error');
    }
}

// Snippet actions
function likeSnippet() {
    showNotification('Snippet liked!', 'success');
}

function forkSnippet() {
    showNotification('Snippet forked!', 'success');
}

function shareSnippet() {
    showNotification('Share link copied to clipboard!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#61dafb'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Search functionality
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const langFilter = document.getElementById('filterSelect')?.value || 'all';
    loadExploreSnippets(e.target.value, langFilter);
});

document.getElementById('filterSelect')?.addEventListener('change', (e) => {
    const searchTerm = document.getElementById('searchInput')?.value || '';
    loadExploreSnippets(searchTerm, e.target.value);
});

// Format Code
function formatCode() {
    const currentLang = document.querySelector('.editor-tab.active').dataset.lang;
    let editor;
    
    if (currentLang === 'html') editor = htmlEditor;
    else if (currentLang === 'css') editor = cssEditor;
    else if (currentLang === 'js') editor = jsEditor;
    
    if (!editor) return;
    
    const code = editor.getValue();
    
    // Basic formatting
    if (currentLang === 'html') {
        const formatted = code.replace(/></g, '>\n<').replace(/\n\s*\n/g, '\n');
        editor.setValue(formatted);
    } else if (currentLang === 'css') {
        const formatted = code
            .replace(/\{/g, ' {\n  ')
            .replace(/\}/g, '\n}\n')
            .replace(/;/g, ';\n  ')
            .replace(/\n\s*\n/g, '\n');
        editor.setValue(formatted);
    } else if (currentLang === 'js') {
        const formatted = code
            .replace(/\{/g, ' {\n  ')
            .replace(/\}/g, '\n}\n')
            .replace(/;/g, ';\n')
            .replace(/\n\s*\n/g, '\n');
        editor.setValue(formatted);
    }
    
    showNotification('Code formatted!', 'success');
}

// Clear Editor
function clearEditor() {
    if (confirm('Are you sure you want to clear all code?')) {
        htmlEditor.setValue('');
        cssEditor.setValue('');
        jsEditor.setValue('');
        document.getElementById('snippetName').value = '';
        showNotification('Editor cleared!', 'success');
        updatePreview();
    }
}

// Download Code
function downloadCode() {
    const snippetName = document.getElementById('snippetName').value || 'untitled';
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();
    
    const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${snippetName}</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
    <script>
${js}
    </script>
</body>
</html>`;
    
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${snippetName}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Code downloaded!', 'success');
}

// Change Theme
function changeTheme(theme) {
    htmlEditor.setOption('theme', theme);
    cssEditor.setOption('theme', theme);
    jsEditor.setOption('theme', theme);
    showNotification(`Theme changed to ${theme}!`, 'success');
}

// Toggle Fullscreen
function toggleFullscreen() {
    const editor = document.querySelector('.editor-container');
    
    if (!document.fullscreenElement) {
        editor.requestFullscreen().then(() => {
            showNotification('Fullscreen mode', 'success');
        }).catch(() => {});
    } else {
        document.exitFullscreen();
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter to run code
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        runCode();
    }
    
    // Ctrl + S to save
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveSnippet();
    }
    
    // Ctrl + Shift + F to format
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        formatCode();
    }
});

// Tutorial Dropdown Toggle
window.toggleTutorialDropdown = function() {
    const dropdown = document.getElementById('tutorialDropdown');
    const toggle = document.querySelector('.nav-dropdown-toggle');
    
    if (dropdown && toggle) {
        dropdown.classList.toggle('open');
        toggle.classList.toggle('open');
    }
}
