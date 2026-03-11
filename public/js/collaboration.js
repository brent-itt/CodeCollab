// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo();
    loadCollaborations();
});

// Load user info from storage
function loadUserInfo() {
    const storedUser = localStorage.getItem('codeCollabUser') || sessionStorage.getItem('codeCollabUser');
    
    if (storedUser) {
        const user = JSON.parse(storedUser);
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        const userAvatar = document.querySelector('.user-avatar');
        
        if (userName) userName.textContent = user.name;
        if (userEmail) userEmail.textContent = user.email;
        if (userAvatar) userAvatar.textContent = user.name.charAt(0).toUpperCase();
    }
}

// Load collaborations from API
async function loadCollaborations() {
    const collabGrid = document.getElementById('collabGrid');
    
    try {
        const response = await fetch('/api/collaborations');
        const collaborations = await response.json();
        
        // Update stats
        updateStats(collaborations);
        
        if (collaborations.length === 0) {
            collabGrid.innerHTML = `
                <div class="empty-state">
                    <div class="icon">👥</div>
                    <h3>No Collaborations Yet</h3>
                    <p>Start your first collaboration session and invite your teammates!</p>
                    <button class="btn btn-primary" onclick="startNewCollaboration()">
                        <span>➕</span> Create Collaboration
                    </button>
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
            
            const memberInitials = members.slice(0, 4).map(m => m.charAt(0).toUpperCase());
            const createdDate = new Date(collab.created_at).toLocaleDateString();
            const updatedDate = collab.updated_at ? new Date(collab.updated_at).toLocaleDateString() : createdDate;
            
            return `
                <div class="collab-card">
                    <div class="collab-header">
                        <div class="collab-title">${escapeHtml(collab.title)}</div>
                        <div class="collab-status ${collab.status || 'active'}">${collab.status || 'active'}</div>
                    </div>
                    ${collab.description ? `<div class="collab-description">${escapeHtml(collab.description)}</div>` : ''}
                    <div class="collab-members">
                        ${memberInitials.length > 0 
                            ? memberInitials.map(m => `<div class="member-avatar">${m}</div>`).join('') 
                            : '<div class="member-avatar">👤</div>'}
                        ${members.length > 4 ? `<div class="member-avatar">+${members.length - 4}</div>` : ''}
                    </div>
                    <div class="collab-meta">
                        <span>📅 Created: ${createdDate}</span>
                        <span>🔄 Updated: ${updatedDate}</span>
                    </div>
                    <div class="collab-actions">
                        <button class="btn btn-primary" onclick="openCollaboration(${collab.id})">
                            Open
                        </button>
                        <button class="btn btn-danger" onclick="deleteCollaboration(${collab.id})">
                            Delete
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Failed to load collaborations:', error);
        collabGrid.innerHTML = `
            <div class="empty-state">
                <div class="icon">⚠️</div>
                <h3>Failed to Load</h3>
                <p>Could not load collaborations. Please try again.</p>
                <button class="btn btn-primary" onclick="loadCollaborations()">
                    Retry
                </button>
            </div>
        `;
    }
}

// Update statistics
function updateStats(collaborations) {
    const totalCollabs = document.getElementById('totalCollabs');
    const activeCollabs = document.getElementById('activeCollabs');
    const completedCollabs = document.getElementById('completedCollabs');
    
    const total = collaborations.length;
    const active = collaborations.filter(c => c.status === 'active' || !c.status).length;
    const completed = collaborations.filter(c => c.status === 'completed').length;
    
    if (totalCollabs) totalCollabs.textContent = total;
    if (activeCollabs) activeCollabs.textContent = active;
    if (completedCollabs) completedCollabs.textContent = completed;
}

// Start new collaboration (shows modal)
function startNewCollaboration() {
    const modal = document.getElementById('createModal');
    if (modal) modal.classList.add('open');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('createModal');
    if (modal) modal.classList.remove('open');
    
    // Reset form
    const form = document.getElementById('createCollabForm');
    if (form) form.reset();
}

// Create collaboration
async function createCollaboration(event) {
    event.preventDefault();
    
    const title = document.getElementById('collabTitle').value.trim();
    const description = document.getElementById('collabDescription').value.trim();
    const membersInput = document.getElementById('collabMembers').value.trim();
    const language = document.getElementById('collabLanguage').value;
    const code = document.getElementById('collabCode').value;
    
    if (!title) {
        showNotification('Please enter a title', 'error');
        return;
    }
    
    // Parse members
    const members = membersInput 
        ? membersInput.split(',').map(m => m.trim()).filter(m => m)
        : [];
    
    try {
        const response = await fetch('/api/collaborations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify({ title, description, members, language, code })
        });
        
        if (response.ok) {
            showNotification('Collaboration created successfully!', 'success');
            closeModal();
            loadCollaborations();
        } else {
            const data = await response.json();
            showNotification(data.message || 'Failed to create collaboration', 'error');
        }
    } catch (error) {
        console.error('Error creating collaboration:', error);
        showNotification('Error creating collaboration', 'error');
    }
}

// Open collaboration in editor
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
        console.error('Error deleting collaboration:', error);
        showNotification('Error deleting collaboration', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Logout function
function logout() {
    // Clear Supabase session from localStorage
    Object.keys(localStorage).filter(k => k.startsWith('sb-')).forEach(k => localStorage.removeItem(k));
    localStorage.removeItem('codeCollabUser');
    sessionStorage.removeItem('codeCollabUser');
    window.location.href = '/';
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('createModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
