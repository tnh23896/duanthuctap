<?php

namespace App\Http\Controllers;

use App\Models\promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return promotion::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required', 
            'discount' => 'required', 
            'start_date' => 'required',
            'end_date' => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }
        $form = promotion::create($request->all());

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
            'description' => 'required', 
            'discount' => 'required', 
            'start_date' => 'required',
            'end_date' => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }
        $promotion = promotion::find($id);
        $promotion->update($request->all());
        return [
            'data' => $promotion,
            'message' => 'Sửa thành công',
            'status' => 200
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $promotion = promotion::find($id);
        $promotion->delete();
        return [
            'data' => $promotion,
            'message' => 'Xóa thành công',
            'status' => 200
        ];
    }
}
