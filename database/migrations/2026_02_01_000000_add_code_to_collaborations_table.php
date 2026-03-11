<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('collaborations', function (Blueprint $table) {
            $table->longText('code')->nullable();
            $table->string('language', 50)->default('javascript');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('collaborations', function (Blueprint $table) {
            $table->dropColumn(['code', 'language']);
        });
    }
};
