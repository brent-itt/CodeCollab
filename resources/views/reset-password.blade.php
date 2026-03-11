<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Reset Password - CodeCollab</title>
    <link rel="stylesheet" href="{{ asset('css/login-styles.css') }}">
</head>
<body>
    <div class="login-container">
        <div class="background-animation">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>

        <div class="login-box">
            <div class="logo-section">
                <svg width="60" height="60" viewBox="0 0 100 100" class="logo-icon">
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#61dafb;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#21a1f1;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.1"/>
                    <path d="M 35 25 Q 20 25 20 40 Q 20 50 20 60 Q 20 75 35 75" stroke="url(#logoGradient)" stroke-width="8" fill="none" stroke-linecap="round"/>
                    <path d="M 65 25 Q 50 25 50 40 Q 50 50 50 60 Q 50 75 65 75" stroke="url(#logoGradient)" stroke-width="8" fill="none" stroke-linecap="round"/>
                </svg>
                <h1>CodeCollab</h1>
                <p class="tagline">Reset your password</p>
            </div>

            <div id="resetForm">
                <div class="form-group">
                    <label>New Password</label>
                    <div class="password-wrapper">
                        <input type="password" id="newPassword" placeholder="Enter new password (min 8 chars)" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Confirm Password</label>
                    <div class="password-wrapper">
                        <input type="password" id="confirmPassword" placeholder="Re-enter new password" required>
                    </div>
                </div>
                <button type="button" class="btn-submit" onclick="submitReset()">
                    <span>Reset Password</span>
                </button>
            </div>

            <div id="successMsg" style="display:none;text-align:center;padding:20px 0;">
                <p style="color:#4caf50;font-size:16px;margin-bottom:20px;">✅ Password reset successfully!</p>
                <a href="/" class="btn-submit" style="text-decoration:none;display:inline-flex;justify-content:center;">Go to Login</a>
            </div>
        </div>
    </div>

    <div class="toast" id="toast"><span id="toastMessage"></span></div>

    <script>
        const _token  = document.querySelector('meta[name="csrf-token"]').content;
        const _params = new URLSearchParams(window.location.search);
        const _email  = _params.get('email') || '';
        const _resetToken = _params.get('token') || '';

        if (!_email || !_resetToken) {
            document.getElementById('resetForm').innerHTML =
                '<p style="color:#f44336;text-align:center;">Invalid or expired reset link. <a href="/" style="color:#61dafb;">Go back</a></p>';
        }

        async function submitReset() {
            const password = document.getElementById('newPassword').value;
            const confirm  = document.getElementById('confirmPassword').value;

            if (password.length < 8) { showToast('Password must be at least 8 characters.', 'error'); return; }
            if (password !== confirm) { showToast('Passwords do not match.', 'error'); return; }

            const btn = document.querySelector('.btn-submit');
            btn.disabled = true;
            btn.querySelector('span').textContent = 'Resetting...';

            try {
                const res = await fetch('/api/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': _token },
                    body: JSON.stringify({
                        token: _resetToken,
                        email: _email,
                        password: password,
                        password_confirmation: confirm
                    })
                });
                const data = await res.json();
                if (res.ok) {
                    document.getElementById('resetForm').style.display = 'none';
                    document.getElementById('successMsg').style.display = 'block';
                } else {
                    showToast(data.message || 'Reset failed. Link may have expired.', 'error');
                    btn.disabled = false;
                    btn.querySelector('span').textContent = 'Reset Password';
                }
            } catch (e) {
                showToast('Network error. Please try again.', 'error');
                btn.disabled = false;
                btn.querySelector('span').textContent = 'Reset Password';
            }
        }

        function showToast(message, type = 'info') {
            const toast = document.getElementById('toast');
            const msg   = document.getElementById('toastMessage');
            toast.className = 'toast show ' + type;
            msg.textContent = message;
            setTimeout(() => toast.classList.remove('show'), 4000);
        }
    </script>
</body>
</html>
