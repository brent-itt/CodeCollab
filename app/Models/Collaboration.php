<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Collaboration extends Model
{
    protected $fillable = [
        'title',
        'description',
        'user_id',
        'status',
        'members',
        'code',
        'language',
    ];

    protected $casts = [
        'members' => 'array',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function snippets(): HasMany
    {
        return $this->hasMany(Snippet::class);
    }
}
