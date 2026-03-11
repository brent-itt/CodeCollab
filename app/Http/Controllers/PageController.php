<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display the login page.
     */
    public function login()
    {
        return view('login');
    }

    /**
     * Display the homepage.
     */
    public function home()
    {
        return view('homepage');
    }

    /**
     * Display the code editor.
     */
    public function editor()
    {
        return view('editor');
    }

    /**
     * Display the tutorials page.
     */
    public function tutorials()
    {
        return view('tutorials');
    }

    /**
     * Display the chatbot page.
     */
    public function chatbot()
    {
        return view('chatbot');
    }

    /**
     * Display the collaboration page.
     */
    public function collaboration()
    {
        return view('collaboration');
    }

    /**
     * Display the snippets page.
     */
    public function snippets()
    {
        return view('snippets');
    }

    /**
     * Display the completed projects page.
     */
    public function completedProjects()
    {
        return view('completed-projects');
    }

    /**
     * Display the reset password page.
     */
    public function resetPassword()
    {
        return view('reset-password');
    }
}
