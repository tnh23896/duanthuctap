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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('author_id');
            $table->unsignedBigInteger('genre_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('promotion_id')->nullable();
            $table->text('image');
            $table->text('description');
            $table->integer('price');
            $table->integer('quantity');
            $table->integer('featured')->default(0);
            $table->softDeletes();
            // foeign key
            $table->foreign('author_id')->references('id')->on('authors');
            $table->foreign('genre_id')->references('id')->on('genres');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('promotion_id')->references('id')->on('promotions');
                
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
