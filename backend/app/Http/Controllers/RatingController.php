<?php

namespace App\Http\Controllers;

use App\Models\rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return rating::with('user', 'book')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rating = rating::find($id);
        $rating->delete();
        return [
            'data' => $rating,
            'message' => 'Xóa thành công',
            'status' => 200
        ];
    }
}
