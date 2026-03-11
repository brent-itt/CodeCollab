<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class RequireVerifiedEmail
{
    /**
     * Handle an incoming request.
     * Redirects to login if not logged in, or to email/verify if email not verified.
     */
    public function handle(Request $request, Closure $next)
    {
        $userId = session('user_id');

        // Not logged in — send to login page
        if (!$userId) {
            return redirect('/');
        }

        $user = User::find($userId);

        // User deleted — clear session
        if (!$user) {
            $request->session()->flush();
            return redirect('/');
        }

        // Logged in but email not verified — send to verification page
        if (!$user->hasVerifiedEmail()) {
            return redirect('/email/verify');
        }

        return $next($request);
    }
}
