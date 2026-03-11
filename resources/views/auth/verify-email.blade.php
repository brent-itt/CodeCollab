<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Verify Email - CodeCollab</title>
    <link rel="stylesheet" href="{{ asset('css/login-styles.css') }}">
    <style>
        .verify-card {
            text-align: center;
        }

        .verify-icon {
            width: 80px;
            height: 80px;
            background: rgba(97, 218, 251, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 25px;
            border: 2px solid rgba(97, 218, 251, 0.3);
        }

        .verify-icon svg {
            color: #61dafb;
        }

        .verify-card h2 {
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 12px;
        }

        .verify-card p {
            color: #888;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .verify-card .email-highlight {
            color: #61dafb;
            font-weight: 600;
        }

        .verify-steps {
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
            padding: 18px 20px;
            text-align: left;
            margin-bottom: 25px;
            border: 1px solid #3e3e42;
        }

        .verify-steps ol {
            margin: 0;
            padding-left: 20px;
            color: #aaa;
            font-size: 14px;
            line-height: 1.8;
        }

        .verify-steps ol li {
            margin-bottom: 4px;
        }

        .btn-resend {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #61dafb, #21a1f1);
            border: none;
            border-radius: 8px;
            color: #000;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
            margin-bottom: 15px;
        }

        .btn-resend:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(97, 218, 251, 0.4);
        }

        .btn-resend:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .btn-back {
            width: 100%;
            padding: 12px;
            background: transparent;
            border: 1px solid #3e3e42;
            border-radius: 8px;
            color: #888;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-back:hover {
            color: #fff;
            border-color: #61dafb;
            background: rgba(97, 218, 251, 0.05);
        }

        .resend-countdown {
            font-size: 13px;
            color: #888;
            margin-bottom: 15px;
            min-height: 20px;
        }

        .resend-countdown span {
            color: #61dafb;
        }

        .alert-success {
            background: rgba(76, 175, 80, 0.1);
            border: 1px solid rgba(76, 175, 80, 0.3);
            border-radius: 8px;
            padding: 12px 16px;
            color: #4caf50;
            font-size: 14px;
            margin-bottom: 20px;
            display: none;
        }

        .alert-success.show {
            display: block;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <!-- Background Animation -->
        <div class="background-animation">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>

        <!-- Verify Card -->
        <div class="login-box verify-card">
            <!-- Logo -->
            <div class="logo-section" style="margin-bottom: 30px;">
                <svg width="50" height="50" viewBox="0 0 100 100" class="logo-icon">
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#61dafb;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#21a1f1;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.1"/>
                    <path d="M 35 25 Q 20 25 20 40 Q 20 50 20 60 Q 20 75 35 75"
                          stroke="url(#logoGradient)" stroke-width="8" fill="none" stroke-linecap="round"/>
                    <path d="M 65 25 Q 50 25 50 40 Q 50 50 50 60 Q 50 75 65 75"
                          stroke="url(#logoGradient)" stroke-width="8" fill="none" stroke-linecap="round"/>
                </svg>
                <h1 style="font-size:26px;">CodeCollab</h1>
            </div>

            <!-- Email Icon -->
            <div class="verify-icon">
                <svg width="36" height="36" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                </svg>
            </div>

            <h2>Check Your Email</h2>
            <p>
                We sent a verification link to<br>
                <span class="email-highlight" id="userEmail">your email address</span>.<br>
                Click the link in the email to activate your account.
            </p>

            <div class="verify-steps">
                <ol>
                    <li>Open your email inbox</li>
                    <li>Find the email from <strong>CodeCollab</strong></li>
                    <li>Click the <strong>"Verify Email Address"</strong> button</li>
                    <li>You'll be redirected back here automatically</li>
                </ol>
            </div>

            <div class="alert-success" id="resendSuccess">
                &#10003; Verification email resent! Please check your inbox.
            </div>

            <div class="resend-countdown" id="countdownText"></div>

            <button class="btn-resend" id="resendBtn" onclick="resendVerification()">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                    <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>
                Resend Verification Email
            </button>

            <button class="btn-back" onclick="window.location.href='/'">
                &larr; Back to Login
            </button>

            <div class="login-footer" style="margin-top:20px;">
                <p>© 2026 CodeCollab. Built for collaborative learning.</p>
            </div>
        </div>
    </div>

    <!-- Notification Toast -->
    <div class="toast" id="toast">
        <span id="toastMessage"></span>
    </div>

    <script>
        // Show stored email if available
        const storedUser = localStorage.getItem('pendingVerificationEmail');
        if (storedUser) {
            document.getElementById('userEmail').textContent = storedUser;
        }

        let countdown = 0;
        let countdownTimer = null;

        function startCountdown(seconds) {
            countdown = seconds;
            const btn = document.getElementById('resendBtn');
            const text = document.getElementById('countdownText');
            btn.disabled = true;

            countdownTimer = setInterval(() => {
                countdown--;
                text.innerHTML = `You can resend again in <span>${countdown}s</span>`;
                if (countdown <= 0) {
                    clearInterval(countdownTimer);
                    btn.disabled = false;
                    text.textContent = '';
                }
            }, 1000);
        }

        function resendVerification() {
            const btn = document.getElementById('resendBtn');
            btn.disabled = true;

            fetch('/email/resend-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
            .then(res => res.json())
            .then(data => {
                const alert = document.getElementById('resendSuccess');
                alert.textContent = '\u2713 ' + data.message;
                alert.classList.add('show');
                setTimeout(() => alert.classList.remove('show'), 5000);
                startCountdown(60);
            })
            .catch(() => {
                showToast('Failed to resend. Please try again.', 'error');
                btn.disabled = false;
            });
        }

        function showToast(message, type = 'info') {
            const toast = document.getElementById('toast');
            const msg = document.getElementById('toastMessage');
            msg.textContent = message;
            toast.className = `toast show ${type}`;
            setTimeout(() => toast.className = 'toast', 4000);
        }
    </script>
</body>
</html>
