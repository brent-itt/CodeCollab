// ===== CHAT HISTORY =====
const HISTORY_KEY = 'chatbotHistory';
let currentChatId = null;

function getHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}

function saveHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function startNewChat() {
    // Save current chat if it has messages
    persistCurrentChat();

    currentChatId = generateId();
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = `
        <div class="message bot-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>Hello! I'm your AI coding assistant. How can I help you today?</p>
                <div class="message-time">Just now</div>
            </div>
        </div>`;
    renderHistoryList();
}

function persistCurrentChat() {
    if (!currentChatId) return;
    const messagesContainer = document.getElementById('chatMessages');
    const messageDivs = messagesContainer.querySelectorAll('.message:not(#typing-indicator)');
    if (messageDivs.length <= 1) return; // only the greeting, don't save

    const history = getHistory();
    const existing = history.find(s => s.id === currentChatId);

    // Build title from first user message
    let title = 'New Chat';
    const firstUser = messagesContainer.querySelector('.user-message .message-content p');
    if (firstUser) {
        title = firstUser.textContent.slice(0, 40) + (firstUser.textContent.length > 40 ? '...' : '');
    }

    const messages = [];
    messageDivs.forEach(div => {
        const isBot = div.classList.contains('bot-message');
        const p = div.querySelector('.message-content p');
        const pre = div.querySelector('.message-content pre');
        const text = p ? p.textContent : (pre ? pre.textContent : '');
        const time = div.querySelector('.message-time')?.textContent || '';
        if (text) messages.push({ role: isBot ? 'bot' : 'user', text, time });
    });

    const session = { id: currentChatId, title, date: new Date().toISOString(), messages };

    if (existing) {
        Object.assign(existing, session);
    } else {
        history.unshift(session);
        // Keep max 30 sessions
        if (history.length > 30) history.pop();
    }
    saveHistory(history);
}

function loadChat(id) {
    persistCurrentChat();
    const history = getHistory();
    const session = history.find(s => s.id === id);
    if (!session) return;

    currentChatId = id;
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = '';

    session.messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.role}-message`;
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = msg.role === 'bot' ? '🤖' : '👤';
        const content = document.createElement('div');
        content.className = 'message-content';
        if (msg.text.includes('```')) {
            content.innerHTML = formatCodeBlocks(msg.text);
        } else {
            const p = document.createElement('p');
            p.textContent = msg.text;
            content.appendChild(p);
        }
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = msg.time;
        content.appendChild(time);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    renderHistoryList();
}

function deleteChat(id, event) {
    event.stopPropagation();
    const history = getHistory().filter(s => s.id !== id);
    saveHistory(history);
    if (currentChatId === id) {
        startNewChat();
    } else {
        renderHistoryList();
    }
}

function renderHistoryList() {
    const list = document.getElementById('chatHistoryList');
    if (!list) return;
    const history = getHistory();

    if (history.length === 0) {
        list.innerHTML = '<div class="history-empty">No chat history yet</div>';
        return;
    }

    list.innerHTML = history.map(session => {
        const date = new Date(session.date);
        const now = new Date();
        const diffDays = Math.floor((now - date) / 86400000);
        const dateLabel = diffDays === 0 ? 'Today' : diffDays === 1 ? 'Yesterday' : date.toLocaleDateString();
        const isActive = session.id === currentChatId;
        return `
            <div class="history-item ${isActive ? 'active' : ''}" onclick="loadChat('${session.id}')">
                <span class="history-item-icon">💬</span>
                <div class="history-item-info">
                    <div class="history-item-title">${escapeHtml(session.title)}</div>
                    <div class="history-item-date">${dateLabel} &bull; ${session.messages.length} msgs</div>
                </div>
                <button class="history-delete-btn" onclick="deleteChat('${session.id}', event)" title="Delete">✕</button>
            </div>`;
    }).join('');
}

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo();
    autoResizeTextarea();
    handleEnterKey();
    currentChatId = generateId();
    renderHistoryList();
    // Auto-save on page unload
    window.addEventListener('beforeunload', persistCurrentChat);
});

// Load user info
function loadUserInfo() {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        document.getElementById('userName').textContent = user.name || 'User';
        document.getElementById('userEmail').textContent = user.email || 'user@email.com';
    }
}

// Auto-resize textarea
function autoResizeTextarea() {
    const textarea = document.getElementById('messageInput');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 150) + 'px';
    });
}

// Handle Enter key
function handleEnterKey() {
    const textarea = document.getElementById('messageInput');
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Collect current conversation history from the DOM for context
function getConversationHistory() {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDivs = messagesContainer.querySelectorAll('.message:not(#typing-indicator)');
    const history = [];
    messageDivs.forEach(div => {
        const isBot = div.classList.contains('bot-message');
        // Extract text: prefer <p>, fall back to <pre code> for code blocks
        const p = div.querySelector('.message-content > p');
        const codeEl = div.querySelector('.message-content pre code');
        let text = p ? p.textContent.trim() : (codeEl ? codeEl.textContent.trim() : '');
        // Also grab inline code mixed with text
        if (!text) {
            const contentEl = div.querySelector('.message-content');
            if (contentEl) text = contentEl.innerText.trim();
        }
        if (text) history.push({ role: isBot ? 'assistant' : 'user', content: text });
    });
    // Keep last 20 messages (10 exchanges) to stay within token limits
    return history.slice(-20);
}

// Send message
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Capture history BEFORE adding the new user message
    const history = getConversationHistory();
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Call AI backend with full conversation history for context
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ message: message, history: history })
        });
        
        const data = await response.json();
        
        removeTypingIndicator();
        
        if (data.success && data.response) {
            addMessage(data.response, 'bot');
        } else {
            const errorMessage = data.error || 'Sorry, I encountered an error. Please try again.';
            addMessage(errorMessage, 'bot');
        }
        // Auto-save after each exchange
        persistCurrentChat();
        renderHistoryList();
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessage('Sorry, I\'m having trouble connecting right now. Please check your connection and try again.', 'bot');
        persistCurrentChat();
        renderHistoryList();
    }
}

// Send quick message
function sendQuickMessage(text) {
    document.getElementById('messageInput').value = text;
    sendMessage();
}

// Add message to chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'bot' ? '🤖' : '👤';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const messageText = document.createElement('p');
    
    // Check if message contains code
    if (text.includes('```')) {
        content.innerHTML = formatCodeBlocks(text);
    } else {
        messageText.textContent = text;
        content.appendChild(messageText);
    }
    
    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    content.appendChild(time);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Format code blocks
function formatCodeBlocks(text) {
    return text.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    }).replace(/`([^`]+)`/g, '<code>$1</code>');
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Generate AI response (mock - replace with actual AI API)
function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! How can I assist you with your coding today?";
    }
    
    if (lowerMessage.includes('explain') || lowerMessage.includes('what is')) {
        return "I'd be happy to explain! Could you please specify what concept or code you'd like me to explain?";
    }
    
    if (lowerMessage.includes('bug') || lowerMessage.includes('error')) {
        return "I can help you debug! Please paste your code and describe the error you're encountering. I'll analyze it and suggest fixes.";
    }
    
    if (lowerMessage.includes('optimize')) {
        return "Great! I can help optimize your code. Please share the code you'd like me to review, and I'll suggest performance improvements.";
    }
    
    if (lowerMessage.includes('document')) {
        return "I can help write documentation! Share your code and I'll generate clear comments and documentation for it.";
    }
    
    if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
        return `Here's a JavaScript example:\n\n\`\`\`javascript\nfunction greet(name) {\n    return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));\n\`\`\`\n\nWould you like me to explain this code?`;
    }
    
    if (lowerMessage.includes('python')) {
        return `Here's a Python example:\n\n\`\`\`python\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))\n\`\`\`\n\nPython is great for beginners! What would you like to know?`;
    }
    
    // Default response
    return "I understand you're asking about: '" + userMessage + "'. I'm here to help with code explanations, debugging, optimization, and more. Could you provide more details or share some code?";
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear Supabase session from localStorage
        Object.keys(localStorage).filter(k => k.startsWith('sb-')).forEach(k => localStorage.removeItem(k));
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/';
    }
}
