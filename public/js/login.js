// Authentication state
let currentUser = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();

    // Show error if email verification link was invalid
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('verified') === 'invalid') {
        setTimeout(() => showToast('Verification link is invalid or expired. Please request a new one.', 'error'), 500);
        history.replaceState({}, '', '/');
    }
});

// Initialize authentication
function initializeAuth() {
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
    });

    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword) {
        signupPassword.addEventListener('input', checkPasswordStrength);
    }

    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) {
        confirmPassword.addEventListener('input', validateConfirmPassword);
    }
}

// Switch between login and signup tabs
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById(`${tab}Form`).classList.add('active');
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const submitBtn = event.target.querySelector('.btn-submit');
    
    setButtonLoading(submitBtn, true);

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCSRFToken()
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json().then(data => ({ ok: response.ok, status: response.status, data })))
    .then(({ ok, status, data }) => {
        if (!ok) {
            setButtonLoading(submitBtn, false);
            if (status === 403 && data.unverified) {
                showOtpForm('loginForm', email, data.user_id);
            } else {
                showToast('Invalid email or password.', 'error');
            }
            return;
        }
        localStorage.setItem('codeCollabUser', JSON.stringify(data.user));
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => window.location.href = '/home', 1500);
    })
    .catch(() => {
        setButtonLoading(submitBtn, false);
        showToast('Invalid email or password.', 'error');
    });
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const submitBtn = event.target.querySelector('.btn-submit');

    if (!agreeTerms) {
        showToast('Please agree to the Terms & Conditions', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    if (password.length < 8) {
        showToast('Password must be at least 8 characters long', 'error');
        return;
    }

    setButtonLoading(submitBtn, true);

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCSRFToken()
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
        if (!ok) {
            setButtonLoading(submitBtn, false);
            showToast(data.message || 'Registration failed. Email may already be in use.', 'error');
            return;
        }
        if (data.pending) {
            showOtpForm('signupForm', email, data.user_id);
            return;
        }
        // Fallback (should not normally reach here)
        showToast('Account created! Redirecting...', 'success');
        setTimeout(() => window.location.href = '/home', 1500);
    })
    .catch(() => {
        setButtonLoading(submitBtn, false);
        showToast('Registration failed. Email may already be in use.', 'error');
    });
}

// Check password strength
function checkPasswordStrength(event) {
    const password = event.target.value;
    const strengthBar = document.getElementById('passwordStrength');
    
    if (!password) {
        strengthBar.className = 'password-strength';
        return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) {
        strengthBar.className = 'password-strength weak';
    } else if (strength <= 4) {
        strengthBar.className = 'password-strength medium';
    } else {
        strengthBar.className = 'password-strength strong';
    }
}

// Validate confirm password
function validateConfirmPassword(event) {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = event.target.value;
    const formGroup = event.target.closest('.form-group');
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    formGroup.classList.remove('error');

    if (confirmPassword && password !== confirmPassword) {
        formGroup.classList.add('error');
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.innerHTML = '⚠️ Passwords do not match';
        formGroup.appendChild(errorMsg);
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/></svg>';
    } else {
        input.type = 'password';
        button.innerHTML = '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>';
    }
}

// ── OTP Verification helpers ──────────────────────────────────────────────────

function showOtpForm(containerId, email, userId) {
    const container = document.getElementById(containerId);
    // Make sure the container's tab is active
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    container.classList.add('active');
    const tabName = containerId === 'loginForm' ? 'login' : 'signup';
    const matchingTab = document.querySelector(`.auth-tab[data-tab="${tabName}"]`);
    if (matchingTab) matchingTab.classList.add('active');

    container.innerHTML = `
        <div style="text-align:center;padding:1.5rem 0.5rem;">
            <div style="font-size:3rem;margin-bottom:0.5rem;">📧</div>
            <h3 style="color:#a78bfa;margin:0 0 0.4rem;">Verify Your Email</h3>
            <p style="color:#ccc;margin:0 0 0.3rem;font-size:0.95rem;">We sent a 6-digit code to</p>
            <p style="color:#61dafb;font-weight:700;margin:0 0 1.4rem;font-size:1.05rem;">${email}</p>
            <div style="display:flex;gap:8px;justify-content:center;margin-bottom:1.2rem;" id="otpInputs">
                ${[0,1,2,3,4,5].map(i => `<input id="otp${i}" maxlength="1" inputmode="numeric" pattern="[0-9]"
                    style="width:44px;height:54px;text-align:center;font-size:1.5rem;font-weight:700;border:2px solid #3e3e52;border-radius:10px;background:#1e1e2e;color:#fff;outline:none;transition:border-color 0.2s;"
                    oninput="otpAdvance(this,${i})" onkeydown="otpBack(event,${i})" onfocus="this.style.borderColor='#7c3aed'" onblur="this.style.borderColor='#3e3e52'">`).join('')}
            </div>
            <div id="otpError" style="color:#ef4444;font-size:0.85rem;min-height:1.2rem;margin-bottom:0.7rem;"></div>
            <button id="verifyBtn" onclick="submitOtp(${userId})"
                style="width:100%;padding:13px;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;border-radius:10px;color:#fff;font-size:1rem;font-weight:600;cursor:pointer;margin-bottom:0.8rem;transition:opacity 0.2s;">
                Verify Code
            </button>
            <button id="resendBtn" onclick="resendOtp(${userId}, this)"
                style="background:none;border:none;color:#888;font-size:0.85rem;cursor:pointer;text-decoration:underline;">
                Didn't get it? Resend code
            </button>
            <p style="color:#666;font-size:0.78rem;margin-top:1rem;">Code expires in 15 minutes</p>
        </div>
    `;
    document.getElementById('otp0').focus();
}

function otpAdvance(input, index) {
    input.value = input.value.replace(/[^0-9]/g, '').slice(-1);
    if (input.value && index < 5) {
        document.getElementById('otp' + (index + 1)).focus();
    }
}

function otpBack(e, index) {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
        document.getElementById('otp' + (index - 1)).focus();
    }
}

function getOtpValue() {
    return [0,1,2,3,4,5].map(i => {
        const el = document.getElementById('otp' + i);
        return el ? el.value : '';
    }).join('');
}

function submitOtp(userId) {
    const code = getOtpValue();
    const errorEl = document.getElementById('otpError');
    const btn = document.getElementById('verifyBtn');

    if (code.length !== 6) {
        errorEl.textContent = 'Please enter all 6 digits.';
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Verifying…';
    errorEl.textContent = '';

    fetch('/api/email/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCSRFToken() },
        body: JSON.stringify({ user_id: userId, code })
    })
    .then(r => r.json().then(d => ({ ok: r.ok, d })))
    .then(({ ok, d }) => {
        if (ok) {
            if (d.user) {
                try { localStorage.setItem('codeCollabUser', JSON.stringify(d.user)); } catch(e) {}
            }
            showToast('Email verified! Welcome to CodeCollab 🎉', 'success');
            setTimeout(() => window.location.href = '/home', 1200);
        } else {
            btn.disabled = false;
            btn.textContent = 'Verify Code';
            errorEl.textContent = d.message || 'Invalid code. Please try again.';
            if (d.expired) {
                errorEl.textContent = 'Code expired. Click "Resend code" to get a new one.';
            }
        }
    })
    .catch(() => {
        btn.disabled = false;
        btn.textContent = 'Verify Code';
        errorEl.textContent = 'Network error. Please try again.';
    });
}

function resendOtp(userId, btn) {
    btn.disabled = true;
    btn.textContent = 'Sending…';
    const errorEl = document.getElementById('otpError');
    errorEl.textContent = '';

    fetch('/api/email/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCSRFToken() },
        body: JSON.stringify({ user_id: userId })
    })
    .then(r => r.json().then(d => ({ ok: r.ok, d })))
    .then(({ ok, d }) => {
        if (ok) {
            showToast(d.message || 'New code sent! Check your email.', 'success');
            btn.textContent = 'Resend code (wait 60s)';
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = "Didn't get it? Resend code";
            }, 60000);
        } else {
            btn.disabled = false;
            btn.textContent = "Didn't get it? Resend code";
            errorEl.textContent = d.message || 'Could not resend. Try again.';
        }
    })
    .catch(() => {
        btn.disabled = false;
        btn.textContent = "Didn't get it? Resend code";
        errorEl.textContent = 'Network error. Please try again.';
    });
}

// Logout
function logout() {
    // Clear Supabase session from localStorage
    Object.keys(localStorage).filter(k => k.startsWith('sb-')).forEach(k => localStorage.removeItem(k));
    fetch('/api/logout', {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': getCSRFToken() }
    }).then(() => {
        localStorage.removeItem('codeCollabUser');
        window.location.href = '/';
    });
}

// Utility functions
function setButtonLoading(button, loading) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]')?.content || '';
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Export functions
window.logout = logout;


// Initialize authentication

// Forgot Password modal
function openForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    modal.style.display = 'flex';
    setTimeout(() => document.getElementById('forgotEmail').focus(), 50);
}

function closeForgotPassword() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('forgotEmail').value = '';
}

function handleForgotPassword() {
    const email = (document.getElementById('forgotEmail').value || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }

    const sendBtn = document.querySelector('#forgotPasswordModal button');
    if (sendBtn) { sendBtn.disabled = true; sendBtn.textContent = 'Sending...'; }

    fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCSRFToken() },
        body: JSON.stringify({ email })
    })
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
        closeForgotPassword();
        showToast(data.message, ok ? 'success' : 'error');
    })
    .catch(() => {
        closeForgotPassword();
        showToast('Failed to send reset email. Please try again.', 'error');
    })
    .finally(() => {
        if (sendBtn) { sendBtn.disabled = false; sendBtn.textContent = 'Send Reset Link'; }
    });
}

// Terms & Conditions modal
function openTermsModal() {
    document.getElementById('termsModal').style.display = 'flex';
}

function closeTermsModal() {
    document.getElementById('termsModal').style.display = 'none';
}

function acceptTerms() {
    const checkbox = document.getElementById('agreeTerms');
    if (checkbox) checkbox.checked = true;
    closeTermsModal();
    showToast('Terms accepted!', 'success');
}

// Check for stored authentication
function checkStoredAuth() {
    const storedUser = localStorage.getItem('codeCollabUser') || 
                       sessionStorage.getItem('codeCollabUser');
    
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }
}

// Check if user is authenticated (for use in main app)
function isAuthenticated() {
    return currentUser !== null || 
           localStorage.getItem('codeCollabUser') !== null || 
           sessionStorage.getItem('codeCollabUser') !== null;
}

// Get current user (for use in main app)
function getCurrentUser() {
    if (!currentUser) {
        const storedUser = localStorage.getItem('codeCollabUser') || 
                          sessionStorage.getItem('codeCollabUser');
        if (storedUser) {
            currentUser = JSON.parse(storedUser);
        }
    }
    return currentUser;
}

// Export functions for use in other scripts
window.logout = logout;
window.isAuthenticated = isAuthenticated;
window.getCurrentUser = getCurrentUser;

console.log('Login page initialized');
