<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to CodeCollab</title>
    <style>
        body { margin: 0; padding: 0; background: #0f0f1a; font-family: 'Segoe UI', Arial, sans-serif; }
        .wrapper { max-width: 560px; margin: 40px auto; background: #1e1e2e; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .header { background: linear-gradient(135deg, #61dafb, #764ba2); padding: 36px 40px; text-align: center; }
        .header h1 { margin: 0; color: #fff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; color: rgba(255,255,255,0.85); font-size: 15px; }
        .body { padding: 36px 40px; }
        .body h2 { color: #fff; font-size: 20px; margin: 0 0 12px; }
        .body p { color: #aaa; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
        .body strong { color: #61dafb; }
        .btn { display: inline-block; margin: 20px 0; padding: 14px 32px; background: linear-gradient(135deg, #61dafb, #764ba2); color: #fff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 15px; }
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
            <h2>Welcome, {{ $name }}! 🎉</h2>
            <p>Your account has been created successfully. You're now part of <strong>CodeCollab</strong> — a platform for collaborative coding and learning.</p>
            <p>You can now:</p>
            <p>
                ✅ Save and share code snippets<br>
                ✅ Collaborate in real-time sessions<br>
                ✅ Use the AI-powered chatbot<br>
                ✅ Run code in our online editor
            </p>
            <a href="{{ config('app.url') }}" class="btn">Go to CodeCollab</a>
            <p style="font-size:13px;color:#666;">If you didn't create this account, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} CodeCollab. Built for collaborative learning.</p>
        </div>
    </div>
</body>
</html>
