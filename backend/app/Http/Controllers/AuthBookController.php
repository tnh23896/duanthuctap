<?php

namespace App\Http\Controllers;

use App\Models\author;
use Illuminate\Http\Request;
use App\Http\Requests\AuthBookRequest;
use Illuminate\Support\Facades\Validator;

class AuthBookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return author::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AuthBookRequest $request)
    {
        $form = author::create($request->all());

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
        $author = author::find($id);
        return $author;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AuthBookRequest $request, string $id)
    {
        $author = author::find($id);
        $author->update($request->all());
        return [
            'data' => $author,
            'message' => 'Sửa thành công',
            'status' => 200
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $author = author::find($id);
        $author->delete();
        return [
            'data' => $author,
            'message' => 'Xóa thành công',
            'status' => 200
        ];
    }
}
