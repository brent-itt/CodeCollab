<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use Illuminate\Http\Request;

class CollaborationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = session('user_id', 1);
        $collaborations = Collaboration::where('user_id', $userId)->latest()->get();
        return response()->json($collaborations);
    }

    public function stats()
    {
        $userId = session('user_id', 1);
        $collaborations = Collaboration::where('user_id', $userId)->get();
        return response()->json([
            'total'     => $collaborations->count(),
            'active'    => $collaborations->filter(fn($c) => !$c->status || $c->status === 'active')->count(),
            'completed' => $collaborations->where('status', 'completed')->count(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'members' => 'nullable|array',
            'code' => 'nullable|string',
            'language' => 'nullable|string|max:50',
        ]);

$userId = session('user_id', 1);
        $validated['user_id'] = $userId;
        $validated['status'] = $validated['status'] ?? 'active';

        $collaboration = Collaboration::create($validated);
        
        return response()->json($collaboration, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Collaboration $collaboration)
    {
        $collaboration->load('snippets');
        return response()->json($collaboration);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Collaboration $collaboration)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:active,completed,archived',
            'members' => 'nullable|array',
            'code' => 'nullable|string',
            'language' => 'nullable|string|max:50',
        ]);

        $collaboration->update($validated);
        
        return response()->json($collaboration);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Collaboration $collaboration)
    {
        $collaboration->delete();
        
        return response()->json(['message' => 'Collaboration deleted successfully']);
    }
}
