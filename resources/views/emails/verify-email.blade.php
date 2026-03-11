<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code - CodeCollab</title>
    <style>
        body { margin: 0; padding: 0; background: #0f0f1a; font-family: 'Segoe UI', Arial, sans-serif; }
        .wrapper { max-width: 560px; margin: 40px auto; background: #1e1e2e; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .header { background: linear-gradient(135deg, #61dafb, #764ba2); padding: 36px 40px; text-align: center; }
        .header h1 { margin: 0; color: #fff; font-size: 28px; font-weight: 700; }
        .header p { margin: 6px 0 0; color: rgba(255,255,255,0.85); font-size: 15px; }
        .body { padding: 36px 40px; text-align: center; }
        .body h2 { color: #fff; font-size: 20px; margin: 0 0 10px; }
        .body p { color: #aaa; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
        .code-box { background: rgba(97,218,251,0.06); border: 2px dashed rgba(97,218,251,0.45); border-radius: 14px; padding: 28px 20px; margin: 24px 0; }
        .code { font-size: 52px; font-weight: 800; letter-spacing: 14px; color: #61dafb; font-family: 'Courier New', monospace; }
        .expiry-note { color: #888; font-size: 13px; margin-top: 10px; }
        .footer { padding: 20px 40px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; }
        .footer p { color: #555; font-size: 12px; margin: 0; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <h1>CodeCollab</h1>
            <p>Collaborate. Code. Create.</p>
        </div>
        <div class="body">
            <h2>Hey {{ $user->name }}, here's your code!</h2>
            <p>Enter this 6-digit code on the verification page to activate your account.</p>
            <div class="code-box">
                <div class="code">{{ $code }}</div>
                <div class="expiry-note">⏳ Expires in <strong style="color:#fff;">15 minutes</strong></div>
            </div>
            <p style="font-size:13px;color:#666;">If you didn't create a CodeCollab account, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} CodeCollab. Built for collaborative learning.</p>
        </div>
    </div>
</body>
</html>
