<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
public function store(Request $request)
{
    $rating = Rating::create($request->all());
    
    $ratings = Rating::with('user', 'book')
                    ->where('book_id', $rating->book_id)
                    ->get();
    
    return response()->json($ratings, 201);
}
}
