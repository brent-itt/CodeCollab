<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class EmailVerificationController extends Controller
{
    /**
     * Show the email verification notice page.
     */
    public function notice(Request $request)
    {
        $userId = session('user_id');

        if ($userId) {
            $user = User::find($userId);
            if ($user && $user->hasVerifiedEmail()) {
                return redirect('/home');
            }
        }

        return view('auth.verify-email');
    }

    /**
     * Handle the verification link that was emailed to the user.
     */
    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        // Validate the signed URL
        if (! $request->hasValidSignature()) {
            abort(403, 'Invalid or expired verification link.');
        }

        // Validate the hash matches the user's email
        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            abort(403, 'Invalid verification link.');
        }

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        // Log the user in via session
        session(['user_id' => $user->id]);

        return redirect('/home')->with('verified', true);
    }

    /**
     * Resend the email verification notification.
     */
    public function resend(Request $request)
    {
        $userId = session('user_id');

        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::find($userId);

        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email is already verified.']);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification email has been resent. Please check your inbox.']);
    }
}
