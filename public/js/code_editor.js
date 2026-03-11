let codeEditor;
let debounceTimer = null;

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
let currentLanguage = 'python';
let interactiveSession = null;
let pendingInputs = [];
let currentCollabId = null;
let saveTimer = null;
let syncTimer = null;
let lastSyncedCode = '';
let isSyncing = false;
let isLoadingCollab = false;

// Get collaboration ID from URL
function getCollabId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('collab');
}

// Load collaboration data
async function loadCollaboration(collabId) {
    try {
        isLoadingCollab = true; // Prevent auto-save during loading
        logToConsole(`🔄 Loading collaboration ID: ${collabId}...`, 'info');
        
        const response = await fetch(`/api/collaborations/${collabId}`);
        if (response.ok) {
            const collab = await response.json();
            currentCollabId = collabId;
            
            logToConsole(`📄 Collaboration data received: ${collab.title}`, 'info');
            logToConsole(`📝 Code length: ${collab.code ? collab.code.length : 0} characters`, 'info');
            
            // Set the code
            if (collab.code) {
                codeEditor.setValue(collab.code);
                lastSyncedCode = collab.code;
                logToConsole('✅ Code loaded into editor', 'info');
            } else {
                logToConsole('⚠️ No code in collaboration yet', 'info');
                lastSyncedCode = '';
            }
            
            // Set the language
            if (collab.language) {
                changeLanguage(collab.language);
                document.getElementById('languageSelect').value = collab.language;
                logToConsole(`🔤 Language set to: ${collab.language}`, 'info');
            }
            
            // Update page title and snippet name
            document.title = `${collab.title} - CodeCollab`;
            const snippetInput = document.getElementById('snippetName');
            if (snippetInput) {
                snippetInput.value = collab.title;
            }
            
            // Show the Save Collab button and sync indicator
            const saveBtn = document.getElementById('saveCollabBtn');
            if (saveBtn) {
                saveBtn.style.display = 'inline-flex';
            }
            
            const saveIndicator = document.getElementById('saveIndicator');
            if (saveIndicator) {
                saveIndicator.style.display = 'inline';
            }
            
            const refreshBtn = document.getElementById('refreshCollabBtn');
            if (refreshBtn) {
                refreshBtn.style.display = 'inline-flex';
            }
            
            const debugBtn = document.getElementById('debugBtn');
            if (debugBtn) {
                debugBtn.style.display = 'inline-flex';
            }
            
            // Start real-time sync
            startCollaborationSync();
            
            logToConsole(`✅ Loaded collaboration: ${collab.title}`, 'info');
            
            // Loading complete - now changes can trigger auto-save
            isLoadingCollab = false;
            logToConsole(`🔄 Real-time sync active - checking every 3 seconds`, 'info');
            showSaveStatus('synced');
            
            // Run the code if it's a web language
            if (['htmlmixed', 'css', 'javascript'].includes(collab.language || currentLanguage)) {
                setTimeout(() => runCode(), 500);
            }
            
            return collab;
        } else {
            logToConsole(`❌ Failed to load collaboration: ${response.status}`, 'error');
            isLoadingCollab = false; // Reset flag even on error
        }
    } catch (error) {
        console.error('Failed to load collaboration:', error);
        logToConsole('❌ Failed to load collaboration', 'error');
        isLoadingCollab = false; // Reset flag even on error
    }
    return null;
}

// Save collaboration code
async function saveCollaboration(showMessage = false) {
    if (!currentCollabId) return;
    
    try {
        showSaveStatus('saving');
        
        const response = await fetch(`/api/collaborations/${currentCollabId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify({
                code: codeEditor.getValue(),
                language: currentLanguage
            })
        });
        
        if (response.ok) {
            lastSyncedCode = codeEditor.getValue();
            showSaveStatus('synced');
            if (showMessage) {
                logToConsole('💾 Code saved successfully!', 'info');
            }
        } else {
            showSaveStatus('error');
            logToConsole('❌ Failed to save code', 'error');
        }
    } catch (error) {
        console.error('Failed to save:', error);
        showSaveStatus('error');
        logToConsole('❌ Failed to save code', 'error');
    }
}

// Auto-save with debounce
function autoSave() {
    if (!currentCollabId || isLoadingCollab) return; // Skip if loading
    
    clearTimeout(saveTimer);
    showSaveStatus('unsaved');
    
    saveTimer = setTimeout(() => {
        saveCollaboration(false);
    }, 2000);
}

// Start real-time collaboration sync
function startCollaborationSync() {
    if (!currentCollabId) return;
    
    // Stop any existing sync
    stopCollaborationSync();
    
    logToConsole('🔄 Starting real-time sync (every 3 seconds)...', 'info');
    
    // Do first check immediately
    setTimeout(() => checkForUpdates(), 1000);
    
    // Then check for updates every 3 seconds
    syncTimer = setInterval(async () => {
        await checkForUpdates();
    }, 3000);
}

// Stop real-time sync
function stopCollaborationSync() {
    if (syncTimer) {
        clearInterval(syncTimer);
        syncTimer = null;
    }
}

// Check for updates from other users
async function checkForUpdates() {
    if (!currentCollabId || isSyncing) return;
    
    try {
        isSyncing = true;
        const response = await fetch(`/api/collaborations/${currentCollabId}`);
        
        if (response.ok) {
            const collab = await response.json();
            const remoteCode = collab.code || '';
            const localCode = codeEditor.getValue();
            
            // Update if remote code is different from local code AND
            // (remote code is different from what we last synced OR we haven't synced yet)
            if (remoteCode !== localCode) {
                // Check if user has made local edits since last sync
                const hasLocalEdits = lastSyncedCode && localCode !== lastSyncedCode;
                
                // Only auto-update if there are no local edits
                if (!hasLocalEdits) {
                    const cursorPos = codeEditor.getCursor();
                    codeEditor.setValue(remoteCode);
                    codeEditor.setCursor(cursorPos); // Restore cursor position
                    lastSyncedCode = remoteCode;
                    
                    showNotification('📥 Code updated by another user', 'info');
                    logToConsole('📥 Code synced from server', 'info');
                } else {
                    // Show warning that there are remote changes
                    console.log('⚠️ Remote changes detected but you have local edits. Click refresh to get latest.');
                }
            }
            
            // Also sync language if changed
            if (collab.language && collab.language !== currentLanguage) {
                changeLanguage(collab.language);
                document.getElementById('languageSelect').value = collab.language;
            }
        }
    } catch (error) {
        console.error('Failed to check for updates:', error);
    } finally {
        isSyncing = false;
    }
}

// Show save status indicator
function showSaveStatus(status) {
    const indicator = document.getElementById('saveIndicator');
    if (!indicator) return;
    
    const icons = {
        'synced': '✓ Synced',
        'saving': '⏳ Saving...',
        'unsaved': '● Unsaved',
        'error': '⚠ Error'
    };
    
    const colors = {
        'synced': '#4caf50',
        'saving': '#2196f3',
        'unsaved': '#ff9800',
        'error': '#f44336'
    };
    
    indicator.textContent = icons[status] || '';
    indicator.style.color = colors[status] || '#666';
}

// Show notification helper
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.code-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `code-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'info' ? '#2196f3' : type === 'error' ? '#f44336' : '#4caf50'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize editor
function initializeEditors() {
    codeEditor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
        mode: 'python',
        theme: document.body.classList.contains('light-mode') ? 'eclipse' : 'dracula',
        lineNumbers: true,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
    });

    // Check if we're opening a collaboration
    const collabId = getCollabId();
    if (collabId) {
        loadCollaboration(collabId);
    } else {
        // Set default example content
        codeEditor.setValue(`# Python Example
def greet(name):
    return f'Hello, {name}!'

print(greet('World'))
print('Welcome to CodeCollab!')`);
    }

    // Add change listener for auto-save
    codeEditor.on('change', handleEditorChange);

    // Set the dropdown to match initial language
    document.getElementById('languageSelect').value = 'javascript';

    // Initial run (only if not loading collab)
    if (!collabId) {
        setTimeout(() => runCode(), 500);
    }
}

// Wait for all resources to load
window.addEventListener('load', () => {
    initializeEditors();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopCollaborationSync();
    // Save one last time if there are unsaved changes
    if (currentCollabId && codeEditor.getValue() !== lastSyncedCode) {
        // Use sendBeacon for reliable last-minute save
        const data = JSON.stringify({
            code: codeEditor.getValue(),
            language: currentLanguage
        });
        navigator.sendBeacon(`/api/collaborations/${currentCollabId}`, data);
    }
});

// Manual refresh function
async function manualRefresh() {
    if (!currentCollabId) return;
    
    const refreshBtn = document.getElementById('refreshCollabBtn');
    if (refreshBtn) {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="animation: spin 1s linear infinite;"><path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>';
    }
    
    try {
        const response = await fetch(`/api/collaborations/${currentCollabId}`);
        if (response.ok) {
            const collab = await response.json();
            const cursorPos = codeEditor.getCursor();
            
            if (collab.code) {
                codeEditor.setValue(collab.code);
                codeEditor.setCursor(cursorPos);
                lastSyncedCode = collab.code;
                showNotification('✅ Code refreshed successfully', 'success');
                logToConsole('✅ Code refreshed from server', 'info');
            }
            
            if (collab.language && collab.language !== currentLanguage) {
                changeLanguage(collab.language);
                document.getElementById('languageSelect').value = collab.language;
            }
        }
    } catch (error) {
        console.error('Failed to refresh:', error);
        showNotification('❌ Failed to refresh code', 'error');
    } finally {
        if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>';
        }
    }
}

// Debug functions
function toggleDebugInfo() {
    const debugInfo = document.getElementById('debugInfo');
    const debugBtn = document.getElementById('debugBtn');
    
    if (debugInfo && debugBtn) {
        if (debugInfo.style.display === 'none') {
            debugInfo.style.display = 'block';
            updateDebugInfo();
            // Update debug info every second while open
            window.debugInterval = setInterval(updateDebugInfo, 1000);
        } else {
            debugInfo.style.display = 'none';
            if (window.debugInterval) {
                clearInterval(window.debugInterval);
            }
        }
    }
}

function updateDebugInfo() {
    if (!currentCollabId) return;
    
    const elements = {
        'debug-collab-id': currentCollabId || 'None',
        'debug-synced-length': lastSyncedCode ? lastSyncedCode.length : 0,
        'debug-current-length': codeEditor ? codeEditor.getValue().length : 0,
        'debug-sync-status': syncTimer ? '🟢 Active' : '🔴 Stopped',
        'debug-language': currentLanguage || 'unknown'
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
}

async function forceSync() {
    logToConsole('🔄 Force sync triggered...', 'info');
    await checkForUpdates();
    updateDebugInfo();
}

// Handle editor changes with debouncing
function handleEditorChange() {
    // Auto-save if in a collaboration
    autoSave();
}

// Run code (supports all languages)
async function runCode() {
    const code = codeEditor.getValue();
    const preview = document.getElementById('preview');
    
    // Handle web languages (HTML, CSS, JS) with iframe
    if (currentLanguage === 'htmlmixed' || currentLanguage === 'css' || currentLanguage === 'javascript') {
        let html = '', css = '', js = '';

        // Determine content based on current language
        if (currentLanguage === 'htmlmixed') {
            html = code;
        } else if (currentLanguage === 'css') {
            css = code;
            html = '<div style="padding: 20px; font-family: sans-serif;">CSS Preview - Add HTML to see styles applied</div>';
        } else if (currentLanguage === 'javascript') {
            js = code;
            html = '<div style="padding: 20px; font-family: sans-serif;">JavaScript Preview - Check console for output</div>';
        }

        const preview = document.getElementById('preview');
        const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <scr`+`ipt>
                window.addEventListener('error', function(e) {
                    parent.postMessage({type: 'error', message: e.message}, '*');
                });
                window.addEventListener('DOMContentLoaded', function() {
                    try {
                        ${js}
                    } catch(e) {
                        parent.postMessage({type: 'error', message: e.message}, '*');
                    }
                });
                
                // Override console methods
                ['log', 'warn', 'error'].forEach(method => {
                    const original = console[method];
                    console[method] = function(...args) {
                        parent.postMessage({
                            type: 'console',
                            method: method,
                            message: args.join(' ')
                        }, '*');
                        original.apply(console, args);
                    };
                });
            <\/script>
        </body>
        </html>
        `;

        preview.srcdoc = content;
        logToConsole('Preview updated', 'info');
        return;
    }

    // Handle compiled/interpreted languages using Piston API
    const languageMap = {
        'python': 'python',
        'java': 'java',
        'c++': 'c++',
        'c': 'c',
        'csharp': 'csharp',
        'kotlin': 'kotlin',
        'scala': 'scala',
        'php': 'php',
        'ruby': 'ruby',
        'go': 'go',
        'rust': 'rust',
        'swift': 'swift',
        'r': 'r',
        'perl': 'perl',
        'shell': 'bash',
        'powershell': 'powershell',
        'lua': 'lua',
        'dart': 'dart',
        'sql': 'sql',
        'typescript': 'typescript'
    };

    const language = languageMap[currentLanguage];
    
    if (!language) {
        preview.srcdoc = `
            <html>
                <body style="padding: 20px; font-family: monospace; background: #1e1e1e; color: #fff;">
                    <h3>Preview Not Available</h3>
                    <p>Code execution is not available for ${currentLanguage}.</p>
                </body>
            </html>
        `;
        logToConsole(`Execution not supported for ${currentLanguage}`, 'info');
        return;
    }

    // Show loading state
    preview.srcdoc = `
        <html>
            <body style="padding: 20px; font-family: monospace; background: #1e1e1e; color: #fff;">
                <h3>Executing ${currentLanguage}...</h3>
                <p>Please wait...</p>
            </body>
        </html>
    `;
    logToConsole(`Executing ${currentLanguage} code...`, 'info');

    try {
        // For Python with input(), use interactive terminal (type input AFTER running)
        if (language === 'python' && code.match(/input\s*\(/i)) {
            console.log('Detected Python with input() - launching interactive terminal');
            await runLocalInteractive(code, language);
            return;
        }
        
        // For C/C++ with cin/scanf/getline/gets, use interactive terminal
        if ((language === 'c++' || language === 'c') && code.match(/\b(cin\s*>>|cin\s*\.\s*get|cin\s*\.\s*getline|scanf\s*\(|getline\s*\(|gets\s*\(|getchar\s*\()/)) {
            console.log('Detected C/C++ with input - launching interactive terminal');
            await runLocalInteractive(code, language);
            return;
        }
        
        // For Java with Scanner/BufferedReader, use interactive terminal
        if (language === 'java' && code.match(/\b(Scanner|BufferedReader|System\.in)/)) {
            console.log('Detected Java with input - launching interactive terminal');
            await runLocalInteractive(code, language);
            return;
        }
        
        // For locally supported languages without interactive input, use backend execution
        if (language === 'python' || language === 'java' || language === 'c++' || language === 'c') {
            await runLocalExecution(code, language);
            return;
        }
        
        // Use Piston API for other languages
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: language,
                version: '*',
                files: [{
                    name: 'main',
                    content: code
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        let output = '';
        let hasError = false;
        
        // Check for compilation errors
        if (result.compile && result.compile.code !== 0) {
            output = result.compile.output || result.compile.stderr || 'Compilation failed';
            hasError = true;
        }
        // Check for runtime output
        else if (result.run) {
            if (result.run.stdout) {
                output += result.run.stdout;
            }
            if (result.run.stderr) {
                output += (output ? '\n' : '') + result.run.stderr;
                hasError = result.run.code !== 0;
            }
            if (result.run.output) {
                output = result.run.output;
            }
        }
        // Fallback to any available output
        else if (result.output) {
            output = result.output;
        }
        
        if (!output) {
            output = 'Program executed successfully with no output.';
        }

        // Display output in preview
        const escapedOutput = output
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');

        preview.srcdoc = `
            <html>
                <head>
                    <style>
                        body {
                            padding: 15px;
                            font-family: 'Consolas', 'Monaco', monospace;
                            background: #1e1e1e;
                            color: #d4d4d4;
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.6;
                        }
                        .output-content {
                            white-space: pre-wrap;
                            word-wrap: break-word;
                        }
                        .empty {
                            color: #888;
                            font-style: italic;
                        }
                        .error {
                            color: #ff6b6b;
                        }
                    </style>
                </head>
                <body>
                    <div class="output-content ${hasError ? 'error' : ''}">
${escapedOutput}
                    </div>
                </body>
            </html>
        `;

        logToConsole(`Execution completed${hasError ? ' with errors' : ''}`, hasError ? 'error' : 'success');
        if (output) {
            logToConsole(output.substring(0, 200) + (output.length > 200 ? '...' : ''), 'info');
        }

    } catch (error) {
        preview.srcdoc = `
            <html>
                <body style="padding: 20px; font-family: monospace; background: #1e1e1e; color: #ff6b6b;">
                    <h3>Execution Error</h3>
                    <p>${error.message}</p>
                    <p style="color: #888; font-size: 12px;">Make sure you have an internet connection.</p>
                </body>
            </html>
        `;
        logToConsole(`Error: ${error.message}`, 'error');
    }
}

// Listen for console messages from iframe
window.addEventListener('message', (e) => {
    if (e.data.type === 'console') {
        logToConsole(e.data.message, e.data.method === 'error' ? 'error' : 'info');
    } else if (e.data.type === 'error') {
        logToConsole(e.data.message, 'error');
    }
});

// Log to console
function logToConsole(message, type = 'info') {
    const consoleContent = document.getElementById('consoleContent');
    const timestamp = new Date().toLocaleTimeString();
    const messageDiv = document.createElement('div');
    messageDiv.className = `console-message ${type}`;
    messageDiv.innerHTML = `<span class="timestamp">[${timestamp}]</span><span>${message}</span>`;
    consoleContent.appendChild(messageDiv);
    consoleContent.scrollTop = consoleContent.scrollHeight;
}

// Clear console
function clearConsole() {
    document.getElementById('consoleContent').innerHTML = '';
}

// Refresh preview
function refreshPreview() {
    runCode();
}

// Share snippet
function shareSnippet() {
    const snippetName = document.getElementById('snippetName').value || 'Untitled Snippet';
    alert(`Share feature coming soon!\n\nSnippet: ${snippetName}`);
}

// Save snippet
function getCompletedProjectsKey() {
    try {
        const stored = localStorage.getItem('codeCollabUser') || sessionStorage.getItem('codeCollabUser');
        if (stored) {
            const u = JSON.parse(stored);
            return 'completedProjects_' + (u.id || u.email || 'guest');
        }
    } catch(e) {}
    return 'completedProjects_guest';
}

function markProjectComplete() {
    const snippetName = (document.getElementById('snippetName')?.value || '').trim() || 'Untitled Project';
    const completedKey = getCompletedProjectsKey();
    const completedProjects = JSON.parse(localStorage.getItem(completedKey) || '[]');

    if (completedProjects.some(p => p.title === snippetName)) {
        alert(`"${snippetName}" is already marked as complete!`);
        return;
    }

    completedProjects.push({
        title: snippetName,
        language: currentLanguage,
        completedAt: new Date().toISOString()
    });
    localStorage.setItem(completedKey, JSON.stringify(completedProjects));

    // Update button state
    const btn = document.getElementById('markCompleteBtn');
    if (btn) {
        btn.classList.add('completed');
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg> Completed!`;
        btn.onclick = null;
    }

    logToConsole(`🎉 "${snippetName}" marked as project complete!`, 'success');
    alert(`🎉 "${snippetName}" marked as Project Complete!\nVisit your Dashboard → Profile to see the updated count.`);
}

function saveSnippet() {
    const snippetName = (document.getElementById('snippetName')?.value || '').trim() || 'Untitled Snippet';
    const code = codeEditor.getValue();

    // Get author from localStorage (set by login)
    let authorName = 'User';
    try {
        const storedUser = localStorage.getItem('codeCollabUser') || sessionStorage.getItem('codeCollabUser');
        if (storedUser) {
            const u = JSON.parse(storedUser);
            authorName = u.name || 'User';
        }
    } catch(e) {}

    const snippet = {
        id: Date.now(),
        title: snippetName,
        name: snippetName,
        code: code,
        language: currentLanguage,
        date: new Date().toISOString(),
        likes: 0,
        views: 0,
        author: authorName,
        authorInitial: authorName.charAt(0).toUpperCase(),
        isCodeSnippet: true
    };

    // Save to userSnippets — the key the profile page reads from
    const userSnippets = JSON.parse(localStorage.getItem(getUserSnippetsKey()) || '[]');
    userSnippets.push(snippet);
    localStorage.setItem(getUserSnippetsKey(), JSON.stringify(userSnippets));

    logToConsole(`Snippet "${snippetName}" saved! Visit your Profile to see it.`, 'success');
    alert(`Snippet "${snippetName}" saved!\nGo to Dashboard → Profile to see it.`);
}



// Change language mode
function changeLanguage(language) {
    // Get the select element to check for special C-like languages
    const selectElement = document.getElementById('languageSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const submode = selectedOption.dataset.submode;

    // Map language to CodeMirror mode
    let mode = language;
    let mimeType = null;

    // Handle direct c++ language value
    if (language === 'c++') {
        mimeType = 'text/x-c++src';
    }

    // Handle C-like languages with specific MIME types
    if (language === 'clike' && submode) {
        switch(submode) {
            case 'java':
                mimeType = 'text/x-java';
                break;
            case 'c++':
                mimeType = 'text/x-c++src';
                break;
            case 'c':
                mimeType = 'text/x-csrc';
                break;
            case 'csharp':
                mimeType = 'text/x-csharp';
                break;
            case 'kotlin':
                mimeType = 'text/x-kotlin';
                break;
            case 'scala':
                mimeType = 'text/x-scala';
                break;
            case 'objective-c':
                mimeType = 'text/x-objectivec';
                break;
            default:
                mimeType = 'text/x-java';
        }
    }

    // Handle JavaScript variants
    if (language === 'javascript' && submode) {
        if (submode === 'typescript') {
            mimeType = 'text/typescript';
        } else if (submode === 'json') {
            mimeType = 'application/json';
        }
    }

    // Set the mode
    if (mimeType) {
        codeEditor.setOption('mode', mimeType);
    } else {
        codeEditor.setOption('mode', mode);
    }

    // Track current language
    currentLanguage = submode || language;

    // Update placeholder content based on language
    updateEditorPlaceholder(language, submode);
    
    logToConsole(`Language changed to: ${submode || language}`, 'info');
}

// Update editor with sample code for selected language
function updateEditorPlaceholder(language, submode) {

    const samples = {
        'htmlmixed': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`,
        'python': `# Python Example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
print("Welcome to Python!")`,
        'java': `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        'c++': `// C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Welcome to CodeCollab!" << endl;
    cout << "Start coding in C++ here." << endl;
    return 0;
}`,
        'c': `// C Example
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
        'csharp': `// C# Example
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
        'php': `<?php
// PHP Example
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>`,
        'ruby': `# Ruby Example
def greet(name)
  "Hello, #{name}!"
end

puts greet("World")`,
        'go': `// Go Example
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
        'rust': `// Rust Example
fn main() {
    println!("Hello, World!");
}`,
        'sql': `-- SQL Example
SELECT * FROM users
WHERE active = 1
ORDER BY created_at DESC;`,
        'markdown': `# Markdown Example

## Welcome to Markdown

This is **bold** and this is *italic*.

- List item 1
- List item 2
- List item 3`,
        'xml': `<?xml version="1.0" encoding="UTF-8"?>
<root>
    <message>Hello, World!</message>
</root>`,
        'typescript': `// TypeScript Example
interface Person {
    name: string;
    age: number;
}

function greet(person: Person): string {
    return \`Hello, \${person.name}!\`;
}

const user: Person = { name: "World", age: 25 };
console.log(greet(user));`,
        'kotlin': `// Kotlin Example
fun main() {
    val name = "World"
    println("Hello, $name!")
    
    val numbers = listOf(1, 2, 3, 4, 5)
    numbers.forEach { println(it) }
}`,
        'scala': `// Scala Example
object HelloWorld {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
    
    val numbers = List(1, 2, 3, 4, 5)
    numbers.foreach(println)
  }
}`,
        'swift': `// Swift Example
import Foundation

func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

print(greet(name: "World"))

let numbers = [1, 2, 3, 4, 5]
numbers.forEach { print($0) }`,
        'objective-c': `// Objective-C Example
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"Hello, World!");
        
        NSArray *numbers = @[@1, @2, @3];
        for (NSNumber *num in numbers) {
            NSLog(@"%@", num);
        }
    }
    return 0;
}`,
        'r': `# R Example
greet <- function(name) {
  paste("Hello,", name, "!")
}

print(greet("World"))

numbers <- c(1, 2, 3, 4, 5)
print(numbers)
print(sum(numbers))`,
        'perl': `# Perl Example
#!/usr/bin/perl
use strict;
use warnings;

sub greet {
    my $name = shift;
    return "Hello, $name!";
}

print greet("World") . "\\n";

my @numbers = (1, 2, 3, 4, 5);
foreach my $num (@numbers) {
    print "$num\\n";
}`,
        'shell': `#!/bin/bash
# Shell/Bash Example

greet() {
    echo "Hello, $1!"
}

greet "World"

# Array example
numbers=(1 2 3 4 5)
for num in "\${numbers[@]}"; do
    echo "$num"
done`,
        'powershell': `# PowerShell Example

function Greet {
    param([string]$Name)
    Write-Host "Hello, $Name!"
}

Greet -Name "World"

$numbers = 1..5
foreach ($num in $numbers) {
    Write-Host $num
}`,
        'lua': `-- Lua Example
function greet(name)
    return "Hello, " .. name .. "!"
end

print(greet("World"))

local numbers = {1, 2, 3, 4, 5}
for i, num in ipairs(numbers) do
    print(num)
end`,
        'dart': `// Dart Example
void main() {
  String greet(String name) {
    return 'Hello, $name!';
  }
  
  print(greet('World'));
  
  var numbers = [1, 2, 3, 4, 5];
  numbers.forEach((num) => print(num));
}`,
        'yaml': `# YAML Example
application:
  name: MyApp
  version: 1.0.0
  
database:
  host: localhost
  port: 5432
  name: mydb
  
users:
  - name: Alice
    role: admin
  - name: Bob
    role: user`,
        'json': `{
  "name": "MyApp",
  "version": "1.0.0",
  "description": "Example JSON",
  "dependencies": {
    "express": "^4.18.0",
    "react": "^18.0.0"
  },
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  }
}`
    };

    const languageKey = submode || language;
    if (samples[languageKey]) {
        codeEditor.setValue(samples[languageKey]);
    }
}

// ============================================
// LOCAL INTERACTIVE EXECUTION (Like Programiz)
// ============================================

let localSession = {
    sessionId: null,
    running: false,
    language: null,
    lastOutput: ''
};

// Run with local server - real interactive like Programiz
async function runLocalInteractive(code, language) {
    const preview = document.getElementById('preview');
    
    // Create terminal UI
    preview.srcdoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    background: #1e1e1e;
                    color: #d4d4d4;
                    font-family: 'Consolas', 'Courier New', monospace;
                    padding: 15px;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                #terminal {
                    flex: 1;
                    overflow-y: auto;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    font-size: 14px;
                    line-height: 1.5;
                }
                .output { color: #d4d4d4; }
                .error { color: #f44336; }
                .input-text { color: #4fc3f7; }
                .success { color: #4caf50; }
                .info { color: #ffd700; }
                #inputLine {
                    display: flex;
                    align-items: center;
                    background: #2d2d2d;
                    padding: 10px;
                    border-radius: 4px;
                    margin-top: 10px;
                }
                #inputLine.hidden { display: none; }
                .prompt { color: #4caf50; margin-right: 8px; font-weight: bold; }
                #userInput {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: #4fc3f7;
                    font-family: inherit;
                    font-size: 14px;
                    outline: none;
                }
                #status {
                    padding: 8px;
                    background: #2d2d2d;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    font-size: 13px;
                }
            </style>
        </head>
        <body>
            <div id="status" class="info">⏳ Compiling...</div>
            <div id="terminal"></div>
            <div id="inputLine" class="hidden">
                <span class="prompt">➤</span>
                <input type="text" id="userInput" placeholder="Type input and press Enter..." autofocus />
            </div>
            <script>
                const terminal = document.getElementById('terminal');
                const inputLine = document.getElementById('inputLine');
                const userInput = document.getElementById('userInput');
                const status = document.getElementById('status');
                
                function appendOutput(text, className = 'output') {
                    const span = document.createElement('span');
                    span.className = className;
                    span.textContent = text;
                    terminal.appendChild(span);
                    terminal.scrollTop = terminal.scrollHeight;
                }
                
                function showInput() {
                    inputLine.classList.remove('hidden');
                    userInput.focus();
                    status.textContent = '⌨️ Waiting for input...';
                    status.className = 'info';
                }
                
                function hideInput() {
                    inputLine.classList.add('hidden');
                }
                
                window.addEventListener('message', (e) => {
                    const data = e.data;
                    if (data.type === 'compiling') {
                        status.textContent = '⏳ Compiling...';
                    } else if (data.type === 'running') {
                        status.textContent = '▶️ Running...';
                        status.className = 'success';
                    } else if (data.type === 'output') {
                        appendOutput(data.text, 'output');
                    } else if (data.type === 'error') {
                        appendOutput(data.text, 'error');
                    } else if (data.type === 'waiting') {
                        appendOutput(data.text || '', 'output');
                        showInput();
                    } else if (data.type === 'done') {
                        appendOutput(data.text || '', data.success ? 'success' : 'error');
                        hideInput();
                        status.textContent = data.success ? '✓ Program finished' : '✗ Program ended with error';
                        status.className = data.success ? 'success' : 'error';
                    }
                });
                
                userInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const value = userInput.value;
                        console.log('Enter pressed, sending:', value);
                        appendOutput(value + '\\n', 'input-text');
                        userInput.value = '';
                        hideInput();
                        status.textContent = '⏳ Processing...';
                        parent.postMessage({ type: 'user-input', value: value }, '*');
                        console.log('Message sent to parent');
                    }
                });
            <\/script>
        </body>
        </html>
    `;
    
    // Wait for iframe to load
    preview.onload = async () => {
        const iframe = preview.contentWindow;
        
        // Start the interactive session
        try {
            iframe.postMessage({ type: 'compiling' }, '*');
            
            const response = await fetch('/api/execute-start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ code, language })
            });
            
            const result = await response.json();
            
            if (result.error) {
                iframe.postMessage({ type: 'error', text: result.error }, '*');
                iframe.postMessage({ type: 'done', success: false }, '*');
                return;
            }
            
            localSession.sessionId = result.session_id;
            localSession.running = true;
            localSession.language = language;
            localSession.lastOutput = '';
            
            iframe.postMessage({ type: 'running' }, '*');
            
            // Run first time with empty input to get initial output (first prompt)
            await sendLocalInput('');
            
        } catch (error) {
            iframe.postMessage({ type: 'error', text: 'Error: ' + error.message }, '*');
            iframe.postMessage({ type: 'done', success: false }, '*');
        }
    };
}

// Send input to local server
async function sendLocalInput(input) {
    console.log('sendLocalInput called with:', input, 'Session ID:', localSession.sessionId);
    if (!localSession.sessionId) {
        console.error('No session ID available');
        return;
    }
    
    const preview = document.getElementById('preview');
    const iframe = preview.contentWindow;
    
    try {
        const response = await fetch('/api/execute-input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                session_id: localSession.sessionId,
                input: input
            })
        });
        
        const result = await response.json();
        
        // Only show NEW output (avoid duplicates - backend re-runs full script each time)
        const fullOutput = result.output || '';
        const newOutput = fullOutput.substring(localSession.lastOutput.length);
        localSession.lastOutput = fullOutput;
        if (newOutput) {
            iframe.postMessage({ type: 'output', text: newOutput }, '*');
        }
        
        if (result.stderr && !result.waiting_for_input) {
            iframe.postMessage({ type: 'error', text: result.stderr }, '*');
        }
        
        if (result.message) {
            iframe.postMessage({ type: 'output', text: result.message + '\n' }, '*');
        }
        
        if (result.waiting_for_input) {
            iframe.postMessage({ type: 'waiting', text: '' }, '*');
        } else if (result.completed) {
            localSession.running = false;
            localSession.sessionId = null;
            iframe.postMessage({ type: 'done', success: result.exit_code === 0, text: '' }, '*');
        }
        
    } catch (error) {
        iframe.postMessage({ type: 'error', text: 'Error: ' + error.message }, '*');
        iframe.postMessage({ type: 'done', success: false }, '*');
    }
}

// Listen for user input from iframe
window.addEventListener('message', async (e) => {
    console.log('Received message from iframe:', e.data);
    if (e.data && e.data.type === 'user-input') {
        console.log('User input received:', e.data.value, 'Session running:', localSession.running, 'Session ID:', localSession.sessionId);
        if (localSession.running && localSession.sessionId) {
            await sendLocalInput(e.data.value);
        } else {
            console.error('Cannot send input - session not running or no session ID');
        }
    }
});

// Simple local execution (no input needed)
async function runLocalExecution(code, language) {
    const preview = document.getElementById('preview');
    
    preview.srcdoc = `
        <html>
            <head><style>
                body { background: #1e1e1e; color: #d4d4d4; font-family: monospace; padding: 15px; }
            </style></head>
            <body><pre>⏳ Compiling and running...</pre></body>
        </html>
    `;
    
    try {
        const response = await fetch('/api/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ code, language, stdin: '' })
        });
        
        const result = await response.json();
        
        const escapedOutput = (result.output || 'No output')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\\n/g, '<br>');
        
        preview.srcdoc = `
            <html>
                <head><style>
                    body { 
                        background: #1e1e1e; 
                        color: ${result.error ? '#f44336' : '#d4d4d4'}; 
                        font-family: 'Consolas', monospace; 
                        padding: 15px;
                        white-space: pre-wrap;
                        font-size: 14px;
                        line-height: 1.5;
                    }
                </style></head>
                <body>${escapedOutput}</body>
            </html>
        `;
        
        logToConsole(result.error ? 'Execution failed' : 'Execution completed', result.error ? 'error' : 'success');
        
    } catch (error) {
        preview.srcdoc = `
            <html>
                <head><style>body { background: #1e1e1e; color: #f44336; font-family: monospace; padding: 15px; }</style></head>
                <body>Error: ${error.message}</body>
            </html>
        `;
    }
}

// ============================================
// PISTON API INTERACTIVE (Fallback)
// ============================================

// Interactive terminal in preview area
let terminalSession = null;

async function runInteractiveInPreview(code, language) {
    console.log('runInteractiveInPreview called with:', { code: code.substring(0, 50), language });
    const preview = document.getElementById('preview');
    console.log('Preview element:', preview);
    
    // Check for pre-defined inputs in the input panel
    const stdinInput = document.getElementById('stdinInput');
    const predefinedInputs = stdinInput && stdinInput.value.trim() ? 
                             stdinInput.value.trim().split('\n') : [];
    
    // If we have predefined inputs, run directly with them
    if (predefinedInputs.length > 0) {
        console.log('Using predefined inputs:', predefinedInputs);
        await runWithPredefinedInputs(code, language, predefinedInputs);
        return;
    }
    
    // For C/C++/Java, use a batch input interface (all inputs at once)
    const isBatchInput = (language === 'c++' || language === 'c' || language === 'java');
    
    // Create terminal interface
    preview.srcdoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    background: #0c0c0c;
                    color: #00ff00;
                    font-family: 'Courier New', monospace;
                    padding: 20px;
                    height: 100vh;
                    overflow-y: auto;
                }
                #output { 
                    white-space: pre-wrap; 
                    word-wrap: break-word;
                    margin-bottom: 15px;
                    font-size: 16px;
                    line-height: 1.6;
                }
                #inputArea {
                    display: flex;
                    align-items: center;
                    background: rgba(0, 255, 0, 0.05);
                    padding: 10px;
                    border: 2px solid #00ff00;
                    border-radius: 4px;
                    margin-top: 10px;
                }
                #batchInputArea {
                    background: rgba(0, 255, 0, 0.05);
                    padding: 15px;
                    border: 2px solid #00ff00;
                    border-radius: 4px;
                    margin-top: 10px;
                }
                #batchInput {
                    width: 100%;
                    min-height: 80px;
                    background: #1a1a1a;
                    border: 1px solid #333;
                    color: #00ff00;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    padding: 10px;
                    border-radius: 4px;
                    resize: vertical;
                }
                #runBtn {
                    margin-top: 10px;
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #4caf50, #45a049);
                    border: none;
                    color: white;
                    font-size: 16px;
                    font-weight: bold;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                }
                #runBtn:hover { background: linear-gradient(135deg, #45a049, #3d8b40); }
                #runBtn:disabled { opacity: 0.5; cursor: not-allowed; }
                .prompt { 
                    color: #4caf50; 
                    margin-right: 10px;
                    font-weight: bold;
                    font-size: 18px;
                }
                #userInput {
                    background: transparent;
                    border: none;
                    color: #00ff00;
                    font-family: 'Courier New', monospace;
                    font-size: 16px;
                    outline: none;
                    flex: 1;
                    caret-color: #00ff00;
                }
                #userInput:disabled {
                    opacity: 0.5;
                }
                .error { color: #ff6b6b; }
                .user-text { color: #61dafb; font-weight: bold; }
                #status {
                    color: #ffd700;
                    font-size: 14px;
                    margin-bottom: 10px;
                    padding: 8px;
                    background: rgba(255, 215, 0, 0.1);
                    border-radius: 4px;
                }
                .batch-label {
                    color: #888;
                    font-size: 12px;
                    margin-bottom: 8px;
                }
            </style>
        </head>
        <body>
            <div id="status">${isBatchInput ? '📝 Enter ALL inputs below (one per line), then click Run' : '⌨️  Interactive Terminal Ready - Type your answers below'}</div>
            <div id="output"></div>
            ${isBatchInput ? `
                <div id="batchInputArea">
                    <div class="batch-label">Enter all inputs (one per line):</div>
                    <textarea id="batchInput" placeholder="Enter each input on a new line...&#10;Example:&#10;John&#10;25&#10;USA"></textarea>
                    <button id="runBtn" onclick="runWithInputs()">▶ Run Program</button>
                </div>
            ` : `
                <div id="inputArea">
                    <span class="prompt">➤</span>
                    <input type="text" id="userInput" placeholder="Type here and press Enter..." autocomplete="off" />
                </div>
            `}
            <script>
                const output = document.getElementById('output');
                const status = document.getElementById('status');
                const isBatch = ${isBatchInput};
                
                if (isBatch) {
                    const batchInput = document.getElementById('batchInput');
                    const runBtn = document.getElementById('runBtn');
                    
                    setTimeout(() => batchInput.focus(), 200);
                    
                    window.runWithInputs = function() {
                        const inputs = batchInput.value.split('\\n');
                        runBtn.disabled = true;
                        batchInput.disabled = true;
                        status.textContent = '⏳ Compiling and running...';
                        output.textContent = '📥 Inputs: ' + inputs.map(i => '"' + i + '"').join(', ') + '\\n\\n';
                        parent.postMessage({ type: 'batch-input', values: inputs }, '*');
                    };
                    
                    // Allow Ctrl+Enter to run
                    batchInput.addEventListener('keydown', (e) => {
                        if (e.ctrlKey && e.key === 'Enter') {
                            runWithInputs();
                        }
                    });
                } else {
                    const userInput = document.getElementById('userInput');
                    let waitingForInput = false;
                    
                    setTimeout(() => userInput.focus(), 200);
                    
                    userInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            const value = userInput.value;
                            if (value.trim()) {
                                output.innerHTML += '<span class="user-text">' + value + '</span>\\n';
                                userInput.value = '';
                                userInput.disabled = true;
                                status.textContent = '⏳ Processing...';
                                parent.postMessage({ type: 'input', value: value }, '*');
                            }
                        }
                    });
                }
                
                window.addEventListener('message', (e) => {
                    if (e.data.type === 'output') {
                        output.textContent += e.data.text;
                        status.textContent = '✓ Program finished';
                        if (!isBatch) {
                            document.getElementById('userInput').disabled = true;
                        }
                    } else if (e.data.type === 'prompt') {
                        output.textContent += e.data.text;
                        if (!isBatch) {
                            const userInput = document.getElementById('userInput');
                            userInput.disabled = false;
                            userInput.focus();
                        }
                        status.textContent = '⌨️  Waiting for input - TYPE NOW!';
                    } else if (e.data.type === 'error') {
                        output.innerHTML += '<span class="error">' + e.data.text + '</span>';
                        status.textContent = '❌ Error occurred';
                    }
                });
            <\/script>
        </body>
        </html>
    `;
    
    terminalSession = {
        code: code,
        language: language,
        inputs: [],
        running: true
    };
    
    // Wait for iframe to load
    preview.onload = () => {
        console.log('Preview iframe loaded');
        // For C/C++/Java, the batch input form is shown - user will click Run
        // For Python, we try to execute and prompt if needed
        const isBatchInput = (language === 'c++' || language === 'c' || language === 'java');
        if (!isBatchInput) {
            setTimeout(() => executeWithInputs(), 500);
        }
        // Batch input languages wait for user to click Run button
    };
}

async function executeWithInputs() {
    console.log('executeWithInputs called, session:', terminalSession);
    if (!terminalSession || !terminalSession.running) return;
    
    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: terminalSession.language,
                version: '*',
                files: [{ content: terminalSession.code }],
                stdin: terminalSession.inputs.join('\n')
            })
        });
        
        const result = await response.json();
        const preview = document.getElementById('preview');
        
        let output = '';
        let hasCompileError = false;
        
        // Check for compilation errors (C/C++)
        if (result.compile && result.compile.stderr) {
            output = result.compile.stderr;
            hasCompileError = true;
        } else if (result.run) {
            output = result.run.stdout || result.run.stderr || result.run.output || '';
        }
        
        // If there's a compile error, show it
        if (hasCompileError) {
            setTimeout(() => {
                if (preview.contentWindow) {
                    preview.contentWindow.postMessage({
                        type: 'error',
                        text: 'Compilation Error:\n' + output
                    }, '*');
                }
            }, 100);
            terminalSession.running = false;
            return;
        }
        
        // Check if program needs more input
        // For Python: EOFError
        // For C/C++: program may hang or return with no output if waiting for input
        const needsMoreInput = output.includes('EOFError') || 
                              (terminalSession.language === 'python' && output.includes('EOF when reading')) ||
                              ((terminalSession.language === 'c++' || terminalSession.language === 'c') && 
                               output === '' && terminalSession.inputs.length === 0);
        
        if (needsMoreInput) {
            const lines = output.split('\n');
            const promptText = lines[0] || 'Enter input:';
            
            // Wait for iframe to be ready
            setTimeout(() => {
                if (preview.contentWindow) {
                    preview.contentWindow.postMessage({
                        type: 'prompt',
                        text: promptText + '\n'
                    }, '*');
                }
            }, 100);
        } else {
            setTimeout(() => {
                if (preview.contentWindow) {
                    preview.contentWindow.postMessage({
                        type: 'output',
                        text: output || 'Program executed with no output.'
                    }, '*');
                }
            }, 100);
            terminalSession.running = false;
        }
    } catch (error) {
        const preview = document.getElementById('preview');
        preview.contentWindow.postMessage({
            type: 'error',
            text: 'Error: ' + error.message
        }, '*');
        terminalSession.running = false;
    }
}

// Run code with predefined inputs (from input panel)
async function runWithPredefinedInputs(code, language, inputs) {
    const preview = document.getElementById('preview');
    
    // Show loading state
    preview.srcdoc = `
        <html>
            <head>
                <style>
                    body {
                        background: #1e1e1e;
                        color: #4caf50;
                        font-family: 'Courier New', monospace;
                        padding: 20px;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <p>⏳ Running ${language} with inputs...</p>
            </body>
        </html>
    `;
    
    try {
        const stdin = inputs.join('\n');
        console.log('Sending to Piston API with stdin:', stdin);
        
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: language,
                version: '*',
                files: [{ content: code }],
                stdin: stdin
            })
        });
        
        const result = await response.json();
        console.log('Piston API result:', result);
        
        let output = '';
        let hasError = false;
        
        // Check for compilation errors (C/C++)
        if (result.compile && result.compile.stderr) {
            output = 'Compilation Error:\n' + result.compile.stderr;
            hasError = true;
        } else if (result.run) {
            output = result.run.stdout || '';
            if (result.run.stderr) {
                output += (output ? '\n' : '') + result.run.stderr;
                hasError = result.run.code !== 0;
            }
            if (!output && result.run.output) {
                output = result.run.output;
            }
        }
        
        if (!output) {
            output = 'Program executed with no output.';
        }
        
        const escapedOutput = output
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');
        
        preview.srcdoc = `
            <html>
                <head>
                    <style>
                        body {
                            padding: 15px;
                            font-family: 'Consolas', 'Monaco', monospace;
                            background: #1e1e1e;
                            color: #d4d4d4;
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.6;
                        }
                        .output-content {
                            white-space: pre-wrap;
                            word-wrap: break-word;
                        }
                        .error { color: #ff6b6b; }
                        .info {
                            color: #888;
                            font-size: 12px;
                            margin-bottom: 10px;
                            padding-bottom: 10px;
                            border-bottom: 1px solid #333;
                        }
                    </style>
                </head>
                <body>
                    <div class="info">📥 Inputs used: ${inputs.map(i => '"' + i + '"').join(', ')}</div>
                    <div class="output-content ${hasError ? 'error' : ''}">${escapedOutput}</div>
                </body>
            </html>
        `;
        
        logToConsole(`Execution completed${hasError ? ' with errors' : ''}`, hasError ? 'error' : 'success');
        
    } catch (error) {
        preview.srcdoc = `
            <html>
                <head>
                    <style>
                        body { background: #1e1e1e; color: #ff6b6b; padding: 20px; font-family: monospace; }
                    </style>
                </head>
                <body>
                    <p>❌ Error: ${error.message}</p>
                </body>
            </html>
        `;
    }
}

// Listen for input from terminal
window.addEventListener('message', (e) => {
    if (e.data.type === 'input' && terminalSession && terminalSession.running) {
        terminalSession.inputs.push(e.data.value);
        executeWithInputs();
    }
    // Handle batch input for C/C++/Java
    if (e.data.type === 'batch-input' && terminalSession && terminalSession.running) {
        terminalSession.inputs = e.data.values || [];
        executeBatchInputs();
    }
});

// Execute with batch inputs (all at once)
async function executeBatchInputs() {
    if (!terminalSession || !terminalSession.running) return;
    
    const preview = document.getElementById('preview');
    const stdin = terminalSession.inputs.join('\n');
    
    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: terminalSession.language,
                version: '*',
                files: [{ content: terminalSession.code }],
                stdin: stdin
            })
        });
        
        const result = await response.json();
        console.log('Piston API result:', result);
        
        let output = '';
        let hasError = false;
        
        // Check for compilation errors
        if (result.compile && result.compile.stderr) {
            output = result.compile.stderr;
            hasError = true;
        } else if (result.run) {
            output = result.run.stdout || '';
            if (result.run.stderr) {
                output += (output ? '\n' : '') + result.run.stderr;
                hasError = result.run.code !== 0;
            }
            if (!output && result.run.output) {
                output = result.run.output;
            }
        }
        
        if (!output) {
            output = 'Program executed with no output.';
        }
        
        // Send result to iframe
        if (preview.contentWindow) {
            preview.contentWindow.postMessage({
                type: hasError ? 'error' : 'output',
                text: output
            }, '*');
        }
        
        terminalSession.running = false;
        logToConsole(`Execution completed${hasError ? ' with errors' : ''}`, hasError ? 'error' : 'success');
        
    } catch (error) {
        if (preview.contentWindow) {
            preview.contentWindow.postMessage({
                type: 'error',
                text: 'Error: ' + error.message
            }, '*');
        }
        terminalSession.running = false;
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
});

// Toggle input panel
function toggleInputPanel() {
    const inputPanel = document.getElementById('inputPanel');
    const stdinInput = document.getElementById('stdinInput');
    
    if (inputPanel.style.display === 'none') {
        inputPanel.style.display = 'flex';
        // Auto-focus and select text for easy typing
        setTimeout(() => {
            stdinInput.focus();
            stdinInput.select();
        }, 100);
        logToConsole('Input panel opened - Type ALL inputs here (one per line)', 'info');
    } else {
        inputPanel.style.display = 'none';
        logToConsole('Input panel closed', 'info');
    }
}

// Run Python code with interactive terminal
async function runPythonInteractive(code, predefinedInput) {
    const preview = document.getElementById('preview');
    const terminal = document.getElementById('interactiveTerminal');
    const terminalOutput = document.getElementById('terminalOutput');
    const inputLine = document.getElementById('inputLine');
    const terminalInput = document.getElementById('terminalInput');
    const previewTitle = document.getElementById('previewTitle');
    
    // Switch to terminal mode
    preview.style.display = 'none';
    terminal.style.display = 'flex';
    previewTitle.textContent = '⌨️ Interactive Terminal - Type Below';
    
    // Clear terminal
    terminalOutput.innerHTML = '<div class="terminal-line success">Python Interactive Terminal Ready...</div>';
    inputLine.style.display = 'none';
    terminalInput.value = '';
    pendingInputs = predefinedInput ? predefinedInput.split('\n').filter(i => i.trim()) : [];
    
    // Initialize session
    interactiveSession = {
        code: code,
        sessionId: Date.now().toString(),
        inputs: [],
        running: true
    };
    
    logToConsole('Running Python code in interactive mode...', 'info');
    
    // Run first iteration
    await executePythonStep();
}

// Execute Python step
async function executePythonStep() {
    if (!interactiveSession || !interactiveSession.running) return;
    
    try {
        const response = await fetch('/api/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify({
                code: interactiveSession.code,
                language: 'python',
                stdin: interactiveSession.inputs.join('\n')
            })
        });

        const result = await response.json();
        const terminalOutput = document.getElementById('terminalOutput');
        const inputLine = document.getElementById('inputLine');
        
        // Display output
        if (result.output) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-line' + (result.error ? ' error' : '');
            outputDiv.textContent = result.output;
            terminalOutput.appendChild(outputDiv);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
        
        // Check if waiting for input (EOFError means input() was called)
        const waitingForInput = result.error && result.output.includes('EOFError');
        
        if (waitingForInput) {
            // Check if we have predefined input
            if (pendingInputs.length > 0) {
                const nextInput = pendingInputs.shift();
                interactiveSession.inputs.push(nextInput);
                
                // Show what was entered
                const inputEcho = document.createElement('div');
                inputEcho.className = 'terminal-line user-input';
                inputEcho.textContent = '▶ ' + nextInput;
                terminalOutput.appendChild(inputEcho);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
                // Continue execution
                setTimeout(() => executePythonStep(), 100);
            } else {
                // Show input prompt
                inputLine.style.display = 'flex';
                const terminalInput = document.getElementById('terminalInput');
                terminalInput.focus();
                terminalInput.value = '';
            }
        } else if (!result.error) {
            // Program completed successfully
            interactiveSession.running = false;
            logToConsole('Program completed successfully', 'success');
        } else {
            // Real error occurred
            interactiveSession.running = false;
            logToConsole('Program terminated with errors', 'error');
        }
        
    } catch (error) {
        const terminalOutput = document.getElementById('terminalOutput');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'terminal-line error';
        errorDiv.textContent = 'Execution error: ' + error.message;
        terminalOutput.appendChild(errorDiv);
        interactiveSession.running = false;
    }
}

// Handle terminal input
document.addEventListener('DOMContentLoaded', () => {
    // Auto-load snippet opened from Profile page
    const pending = localStorage.getItem('pendingEditorSnippet');
    if (pending) {
        localStorage.removeItem('pendingEditorSnippet');
        try {
            const snippet = JSON.parse(pending);
            if (snippet.title || snippet.name) {
                document.getElementById('snippetName').value = snippet.title || snippet.name || '';
            }
            if (snippet.language) {
                const selectElement = document.getElementById('languageSelect');
                for (let i = 0; i < selectElement.options.length; i++) {
                    const option = selectElement.options[i];
                    const optionSubmode = option.dataset.submode;
                    if ((optionSubmode && optionSubmode === snippet.language) ||
                        (!optionSubmode && option.value === snippet.language)) {
                        selectElement.selectedIndex = i;
                        changeLanguage(option.value);
                        break;
                    }
                }
            }
            if (codeEditor && snippet.code) {
                codeEditor.setValue(snippet.code);
            }
            logToConsole(`Snippet "${snippet.title || snippet.name || 'Untitled'}" loaded from profile.`, 'success');
        } catch(e) {}
    }

    const terminalInput = document.getElementById('terminalInput');
    const interactiveTerminal = document.getElementById('interactiveTerminal');
    
    // Click anywhere on terminal to focus input
    if (interactiveTerminal) {
        interactiveTerminal.addEventListener('click', () => {
            const inputLine = document.getElementById('inputLine');
            if (inputLine && inputLine.style.display === 'flex') {
                terminalInput.focus();
            }
        });
    }
    
    if (terminalInput) {
        terminalInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const userInput = terminalInput.value;
                const terminalOutput = document.getElementById('terminalOutput');
                const inputLine = document.getElementById('inputLine');
                
                // Echo input
                const inputEcho = document.createElement('div');
                inputEcho.className = 'terminal-line user-input';
                inputEcho.textContent = '▶ ' + userInput;
                terminalOutput.appendChild(inputEcho);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
                // Clear input field
                terminalInput.value = '';
                inputLine.style.display = 'none';
                
                // Add to session inputs
                if (interactiveSession) {
                    interactiveSession.inputs.push(userInput);
                    await executePythonStep();
                }
            }
        });
    }
});

// Switch back to preview mode
function switchToPreviewMode() {
    const preview = document.getElementById('preview');
    const terminal = document.getElementById('interactiveTerminal');
    const previewTitle = document.getElementById('previewTitle');
    
    preview.style.display = 'block';
    terminal.style.display = 'none';
    previewTitle.textContent = 'Live Preview';
    interactiveSession = null;
}
