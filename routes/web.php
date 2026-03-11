<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeExecutionController;
use App\Http\Controllers\ChatbotController;
Route::get('/', [PageController::class, 'login'])->name('login');
Route::get('/home', [PageController::class, 'home'])->name('home');
Route::get('/editor', [PageController::class, 'editor'])->name('editor');
Route::get('/tutorials', [PageController::class, 'tutorials'])->name('tutorials');
Route::get('/chatbot', [PageController::class, 'chatbot'])->name('chatbot');
Route::get('/collaboration', [PageController::class, 'collaboration'])->name('collaboration');
Route::get('/snippets', [PageController::class, 'snippets'])->name('snippets');
Route::get('/completed-projects', [PageController::class, 'completedProjects'])->name('completed-projects');

// Authentication routes
Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);
Route::post('/api/logout', [AuthController::class, 'logout']);
Route::get('/api/user', [AuthController::class, 'user']);
Route::put('/api/user/profile', [AuthController::class, 'updateProfile']);
Route::post('/api/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/api/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/reset-password', [PageController::class, 'resetPassword'])->name('password.reset');

// Supabase Google OAuth sync
Route::post('/api/auth/supabase', [AuthController::class, 'supabaseCallback']);

// Email verification
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('email.verify');
Route::post('/api/email/verify-code', [AuthController::class, 'verifyCode']);
Route::post('/api/email/resend', [AuthController::class, 'resendVerification']);

// API routes for collaborations
Route::get('/api/collaborations/stats', [CollaborationController::class, 'stats']);
Route::prefix('api')->group(function () {
    Route::apiResource('collaborations', CollaborationController::class);
    Route::post('/execute', [CodeExecutionController::class, 'execute']);
    Route::post('/execute-interactive', [CodeExecutionController::class, 'executeInteractive']);
    Route::post('/execute-start', [CodeExecutionController::class, 'startInteractive']);
    Route::post('/execute-input', [CodeExecutionController::class, 'sendInput']);
    Route::post('/chat', [ChatbotController::class, 'chat']);
});
