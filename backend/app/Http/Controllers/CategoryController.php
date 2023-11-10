<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return category::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }
        $file = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('uploads', $filename, 'public');
        $form = category::create([
            
            'image' => $filename,
            'name' => $request->name
        ]);
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
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required',
        ], [
            'image.image' => 'Ảnh không đúng định dạng',
            'image.mimes' => 'Ảnh không đúng định dạng',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }
        
        $file = $request->file('image');
      $category = category::find($id);
      if($file){
        Storage::disk('public')->delete($category->image);
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('uploads', $filename, 'public');
        Storage::delete("public/uploads/" . $category->image);
        $form = $category->update([
            'image' => $filename,
            'name' => $request->name
        ]);
      }else{
        $form = $category->update([
            'image' => $category->image,
            'name' => $request->name
        ]);
      }
        return [
            'data' => $form,
            'message' => 'Cập nhật thành công',
            'status' => 200
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = category::find($id);
        $category->delete();
        return [
            'message' => 'Xóa thành công',
        ];
    }
}
