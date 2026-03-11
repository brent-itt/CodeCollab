<?php

namespace App\Http\Controllers;

use App\Mail\VerifyEmailMail;
use App\Mail\WelcomeMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'email_verification_code' => $code,
            'email_verification_expires_at' => now()->addMinutes(15),
        ]);

        try {
            Mail::to($user->email)->send(new VerifyEmailMail($user));
        } catch (\Exception $e) {
            // Don't fail registration if email fails
        }

        return response()->json([
            'message' => 'Enter the 6-digit code sent to your email.',
            'pending' => true,
            'user_id' => $user->id,
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Block login if email is not verified (Google users are always verified)
        if (!$user->email_verified_at && !$user->google_id) {
            // Resend a fresh code if the existing one is expired or missing
            $needsNewCode = !$user->email_verification_expires_at ||
                            now()->isAfter($user->email_verification_expires_at);
            if ($needsNewCode) {
                $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
                $user->email_verification_code = $code;
                $user->email_verification_expires_at = now()->addMinutes(15);
                $user->save();
                try {
                    Mail::to($user->email)->send(new VerifyEmailMail($user));
                } catch (\Exception $e) {}
            }

            return response()->json([
                'message'    => 'Please verify your email before logging in.',
                'unverified' => true,
                'user_id'    => $user->id,
            ], 403);
        }

        session(['user_id' => $user->id]);

        return response()->json([
            'user' => $user,
            'message' => 'Login successful'
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $request->session()->flush();
        
        return response()->json(['message' => 'Logged out successfully']);
    }

    /**
     * Get current authenticated user
     */
    public function user(Request $request)
    {
        $userId = session('user_id');
        
        if (!$userId) {
            return response()->json(['user' => null]);
        }

        $user = User::find($userId);
        
        return response()->json(['user' => $user]);
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request)
    {
        $userId = session('user_id');
        
        if (!$userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::find($userId);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'current_password' => 'required_with:password',
            'password' => 'sometimes|string|min:8|confirmed',
        ]);

        // If password is being changed, verify current password
        if (isset($validated['password'])) {
            if (!isset($validated['current_password']) || !Hash::check($validated['current_password'], $user->password)) {
                return response()->json([
                    'message' => 'Current password is incorrect',
                    'errors' => ['current_password' => ['Current password is incorrect']]
                ], 422);
            }
            $user->password = Hash::make($validated['password']);
        }

        // Update name and email if provided
        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }
        
        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }

        $user->save();

        return response()->json([
            'user' => $user,
            'message' => 'Profile updated successfully'
        ]);
    }

    /**
     * Sync Supabase Google OAuth user with local database
     */
    public function supabaseCallback(Request $request)
    {
        $validated = $request->validate([
            'email'     => 'required|email',
            'name'      => 'required|string|max:255',
            'google_id' => 'nullable|string',
            'avatar'    => 'nullable|string',
        ]);

        $user = User::where('google_id', $validated['google_id'])
            ->orWhere('email', $validated['email'])
            ->first();

        if ($user) {
            $user->update([
                'google_id' => $validated['google_id'] ?? $user->google_id,
                'avatar'    => $validated['avatar'] ?? $user->avatar,
            ]);
        } else {
            $user = User::create([
                'name'      => $validated['name'],
                'email'     => $validated['email'],
                'google_id' => $validated['google_id'],
                'avatar'    => $validated['avatar'],
                'password'  => null,
            ]);

            // Send welcome email for new Google users
            try {
                Mail::to($user->email)->send(new WelcomeMail($user->name));
            } catch (\Exception $e) {
                // Don't fail login if email fails
            }
        }

        session(['user_id' => $user->id]);

        return response()->json([
            'user'    => $user,
            'message' => 'Google login successful',
        ]);
    }

    /**
     * Verify email via signed link
     */
    public function verifyEmail(Request $request, $id, $hash)
    {
        if (!$request->hasValidSignature()) {
            return redirect('/?verified=invalid');
        }

        $user = User::find($id);

        if (!$user || sha1($user->email) !== $hash) {
            return redirect('/?verified=invalid');
        }

        if (!$user->email_verified_at) {
            $user->email_verified_at = now();
            $user->save();

            // Send welcome email now that user is verified
            try {
                Mail::to($user->email)->send(new WelcomeMail($user->name));
            } catch (\Exception $e) {}
        }

        session(['user_id' => $user->id]);

        return redirect('/home?verified=1');
    }

    /**
     * Verify email using 6-digit OTP code
     */
    public function verifyCode(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'code'    => 'required|string|size:6',
        ]);

        $user = User::find($validated['user_id']);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        if ($user->email_verified_at) {
            session(['user_id' => $user->id]);
            return response()->json(['user' => $user, 'message' => 'Email already verified.', 'already_verified' => true]);
        }

        if (!$user->email_verification_code || $user->email_verification_code !== $validated['code']) {
            return response()->json(['message' => 'Invalid verification code. Please check your email.'], 422);
        }

        if (!$user->email_verification_expires_at || now()->isAfter($user->email_verification_expires_at)) {
            return response()->json(['message' => 'Code has expired. Please request a new one.', 'expired' => true], 422);
        }

        $user->email_verified_at = now();
        $user->email_verification_code = null;
        $user->email_verification_expires_at = null;
        $user->save();

        session(['user_id' => $user->id]);

        try {
            Mail::to($user->email)->send(new WelcomeMail($user->name));
        } catch (\Exception $e) {}

        return response()->json(['user' => $user, 'message' => 'Email verified! Welcome to CodeCollab.']);
    }

    /**
     * Resend verification OTP code
     */
    public function resendVerification(Request $request)
    {
        $request->validate(['user_id' => 'required|integer']);

        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        if ($user->email_verified_at) {
            return response()->json(['message' => 'Email is already verified.'], 400);
        }

        // Rate limit: only allow resend if existing code is older than 1 minute
        if ($user->email_verification_expires_at &&
            now()->isBefore($user->email_verification_expires_at->subMinutes(14))) {
            return response()->json(['message' => 'Please wait a moment before requesting a new code.'], 429);
        }

        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $user->email_verification_code = $code;
        $user->email_verification_expires_at = now()->addMinutes(15);
        $user->save();

        try {
            Mail::to($user->email)->send(new VerifyEmailMail($user));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to send email. Try again later.'], 500);
        }

        return response()->json(['message' => 'A new code has been sent to your email.']);
    }

    /**
     * Send password reset link
     */
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Password reset link sent to your email.']);
        }

        return response()->json(['message' => 'No account found with that email address.'], 404);
    }

    /**
     * Reset password using token
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token'                 => 'required',
            'email'                 => 'required|email',
            'password'              => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill(['password' => Hash::make($password)])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password reset successfully.']);
        }

        return response()->json(['message' => 'Invalid or expired reset link.'], 400);
    }
}
