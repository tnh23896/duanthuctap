<?php

namespace App\Http\Controllers;

use App\Models\genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return genre::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }
        $form = genre::create($request->all());

        return [
            'data' => $form,
            'message' => 'Thêm mới thành công',
            'status' => 200
        ];
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
        $validate = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }
        $genre = genre::find($id);
        $genre->update($request->all());
        return [
            'data' => $genre,
            'message' => 'Sửa thành công',
            'status' => 200
        ];   
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $genre = genre::find($id);
        $genre->delete();
        return [
            'data' => $genre,
            'message' => 'Xóa thành công',
            'status' => 200
        ];
    }
}
