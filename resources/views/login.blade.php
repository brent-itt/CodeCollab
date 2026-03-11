<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login - CodeCollab</title>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="stylesheet" href="{{ asset('css/login-styles.css') }}">
</head>
<body>
    <button class="theme-float-btn theme-toggle-btn" onclick="toggleTheme()" title="Toggle Light/Dark Mode">
        <span class="theme-icon">🌙</span>
        <span class="theme-label">Dark Mode</span>
    </button>
    <div class="login-container">
        <!-- Background Animation -->
        <div class="background-animation">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>

        <!-- Login Box -->
        <div class="login-box">
            <!-- Logo Section -->
            <div class="logo-section">
                <svg width="60" height="60" viewBox="0 0 100 100" class="logo-icon">
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#61dafb;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#21a1f1;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <!-- Background Circle -->
                    <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.1"/>
                    <!-- First C -->
                    <path d="M 35 25 Q 20 25 20 40 Q 20 50 20 60 Q 20 75 35 75" 
                          stroke="url(#logoGradient)" 
                          stroke-width="8" 
                          fill="none" 
                          stroke-linecap="round"/>
                    <!-- Second C -->
                    <path d="M 65 25 Q 50 25 50 40 Q 50 50 50 60 Q 50 75 65 75" 
                          stroke="url(#logoGradient)" 
                          stroke-width="8" 
                          fill="none" 
                          stroke-linecap="round"/>
                </svg>
                <h1>CodeCollab</h1>
                <p class="tagline">Collaborate. Code. Create.</p>
            </div>

            <!-- Tab Switcher -->
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Login</button>
                <button class="auth-tab" data-tab="signup">Sign Up</button>
            </div>

            <!-- Login Form -->
            <div class="auth-form active" id="loginForm">
                <form onsubmit="handleLogin(event)">
                    @csrf
                    <div class="form-group">
                        <label for="loginEmail">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                            </svg>
                            Email Address
                        </label>
                        <input type="email" id="loginEmail" placeholder="your.email@example.com" required>
                    </div>

                    <div class="form-group">
                        <label for="loginPassword">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>
                            Password
                        </label>
                        <div class="password-wrapper">
                            <input type="password" id="loginPassword" placeholder="Enter your password" required>
                            <button type="button" class="toggle-password" onclick="togglePassword('loginPassword')">
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="form-options">
                        <a href="#" class="forgot-password" onclick="openForgotPassword(); return false;">Forgot password?</a>
                    </div>

                    <button type="submit" class="btn-submit">
                        <span>Login</span>
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </button>
                </form>

                <!-- Google OAuth -->
                <div class="social-divider">
                    <span>or continue with</span>
                </div>
                <button type="button" onclick="loginWithGoogle()" class="social-btn google" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-size:15px;font-weight:500;cursor:pointer;transition:all .2s;">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </button>
            </div>

            <!-- Sign Up Form -->
            <div class="auth-form" id="signupForm">
                <form onsubmit="handleSignup(event)">
                    @csrf
                    <div class="form-group">
                        <label for="signupName">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                            Full Name
                        </label>
                        <input type="text" id="signupName" placeholder="John Doe" required>
                    </div>

                    <div class="form-group">
                        <label for="signupEmail">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                            </svg>
                            Email Address
                        </label>
                        <input type="email" id="signupEmail" placeholder="your.email@example.com" required>
                    </div>

                    <div class="form-group">
                        <label for="signupPassword">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>
                            Password
                        </label>
                        <div class="password-wrapper">
                            <input type="password" id="signupPassword" placeholder="Create a strong password" required>
                            <button type="button" class="toggle-password" onclick="togglePassword('signupPassword')">
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="password-strength" id="passwordStrength"></div>
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>
                            Confirm Password
                        </label>
                        <input type="password" id="confirmPassword" placeholder="Re-enter your password" required>
                    </div>

                    <div class="form-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="agreeTerms" required>
                            <span>I agree to the <a href="#" onclick="openTermsModal(); return false;">Terms &amp; Conditions</a></span>
                        </label>
                    </div>

                    <button type="submit" class="btn-submit">
                        <span>Create Account</span>
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </button>
                </form>

                <!-- Google OAuth -->
                <div class="social-divider">
                    <span>or sign up with</span>
                </div>
                <button type="button" onclick="loginWithGoogle()" class="social-btn google" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-size:15px;font-weight:500;cursor:pointer;transition:all .2s;">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </button>
            </div>

            <!-- Footer -->
            <div class="login-footer">
                <p>© 2026 CodeCollab. Built for collaborative learning.</p>
            </div>
        </div>
    </div>

    <!-- Notification Toast -->
    <div class="toast" id="toast">
        <span id="toastMessage"></span>
    </div>

    <!-- Forgot Password Modal -->
    <div id="forgotPasswordModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:1000;display:none;align-items:center;justify-content:center;">
        <div style="background:#1e1e2e;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:36px;width:100%;max-width:420px;margin:20px;">
            <h2 style="color:#fff;margin:0 0 8px;font-size:20px;">Reset Password</h2>
            <p style="color:#888;margin:0 0 24px;font-size:14px;">Enter your email and we'll send a reset link.</p>
            <input type="email" id="forgotEmail" placeholder="your.email@example.com"
                style="width:100%;padding:12px 16px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-size:15px;box-sizing:border-box;margin-bottom:16px;outline:none;">
            <div style="display:flex;gap:10px;">
                <button onclick="handleForgotPassword()" style="flex:1;padding:12px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;">Send Reset Link</button>
                <button onclick="closeForgotPassword()" style="padding:12px 18px;background:rgba(255,255,255,0.08);color:#ccc;border:none;border-radius:10px;font-size:15px;cursor:pointer;">Cancel</button>
            </div>
        </div>
    </div>

    <!-- Terms & Conditions Modal -->
    <div id="termsModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:1000;align-items:center;justify-content:center;">
        <div style="background:#1e1e2e;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:36px;width:100%;max-width:520px;margin:20px;max-height:80vh;display:flex;flex-direction:column;">
            <h2 style="color:#fff;margin:0 0 16px;font-size:20px;">Terms &amp; Conditions</h2>
            <div style="overflow-y:auto;flex:1;color:#ccc;font-size:14px;line-height:1.7;padding-right:8px;">
                <p><strong style="color:#fff;">1. Acceptance</strong><br>By creating an account on CodeCollab, you agree to these Terms. If you do not agree, please do not use the platform.</p>
                <p><strong style="color:#fff;">2. Account Responsibility</strong><br>You are responsible for keeping your login credentials secure. You must not share your account or use another person's account without permission.</p>
                <p><strong style="color:#fff;">3. Acceptable Use</strong><br>You agree not to upload or share code, content, or snippets that are harmful, illegal, harassing, or violate the rights of others. CodeCollab reserves the right to remove any content that violates this policy.</p>
                <p><strong style="color:#fff;">4. Intellectual Property</strong><br>Code snippets you save remain yours. By publishing a snippet to the Explore feed, you grant other users the right to view and learn from your code.</p>
                <p><strong style="color:#fff;">5. Privacy</strong><br>We store only the information necessary to provide the service (name, email, saved snippets). We do not sell your data to third parties.</p>
                <p><strong style="color:#fff;">6. Termination</strong><br>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
                <p><strong style="color:#fff;">7. Changes</strong><br>These Terms may be updated from time to time. Continued use of CodeCollab after changes constitutes acceptance of the new Terms.</p>
                <p style="color:#888;">Last updated: March 2026</p>
            </div>
            <div style="margin-top:20px;display:flex;gap:10px;">
                <button onclick="acceptTerms()" style="flex:1;padding:12px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;">I Agree</button>
                <button onclick="closeTermsModal()" style="padding:12px 18px;background:rgba(255,255,255,0.08);color:#ccc;border:none;border-radius:10px;font-size:15px;cursor:pointer;">Close</button>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
    <script src="{{ asset('js/theme.js') }}"></script>
    <script src="{{ asset('js/login.js') }}"></script>
    <script>
        // Supabase Auth - Google OAuth
        const _supabase = supabase.createClient(
            'https://yoyeehdtwtekjxsfyjwo.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlveWVlaGR0d3Rla2p4c2Z5andvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjQwNjMsImV4cCI6MjA4ODU0MDA2M30.usPg6c-TvmK8FDHTHPygWZ1y2CG_rex2GFJfmdgKtGs'
        );

        async function loginWithGoogle() {
            const { error } = await _supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: window.location.origin + '/' }
            });
            if (error) showToast('Google login failed: ' + error.message, 'error');
        }

        // Handle OAuth redirect callback — only on fresh OAuth return, not on every page load
        const _isOAuthCallback = window.location.hash.includes('access_token') ||
                                  window.location.search.includes('code=');

        if (_isOAuthCallback) {
            _supabase.auth.onAuthStateChange(async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    const u = session.user;
                    try {
                        const res = await fetch('/api/auth/supabase', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                            },
                            body: JSON.stringify({
                                email:     u.email,
                                name:      u.user_metadata?.full_name || u.email,
                                google_id: u.user_metadata?.provider_id || u.id,
                                avatar:    u.user_metadata?.avatar_url || null,
                            })
                        });
                        const data = await res.json();
                        if (res.ok) {
                            localStorage.setItem('codeCollabUser', JSON.stringify(data.user));
                            showToast('Google login successful! Redirecting...', 'success');
                            setTimeout(() => window.location.href = '/home', 1200);
                        }
                    } catch (e) {
                        showToast('Login sync failed. Please try again.', 'error');
                    }
                }
            });
        }
    </script>
</body>
</html>
