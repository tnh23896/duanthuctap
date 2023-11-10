<?php

namespace App\Http\Controllers;

use App\Models\banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return banner::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'link' => 'required',
        ], [
            'image.required' => 'Ảnh không được để trống',
            'link.required' => 'Link không được để trống',
            'image.image' => 'Ảnh không đúng định dạng',
            'image.mimes' => 'Ảnh không đúng định dạng',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $file = $request->file('image');

        //get path

        $filename = time() . '_' . $file->getClientOriginalName();

        $file->storeAs('uploads', $filename, 'public');

        $form = banner::create([
            'image' => $filename,
            'link' => $request->link
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
            'link' => 'required',
        ], [
            'image.image' => 'Ảnh không đúng định dạng',
            'image.mimes' => 'Ảnh không đúng định dạng',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $file = $request->file('image');
        $banner = banner::find($id);
        if ($file) {
            Storage::disk('public')->delete($banner->image);
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('uploads', $filename, 'public');
            Storage::delete("public/uploads/" . $banner->image);
            $form = $banner->update([
                'image' => $filename,
                'link' => $request->link
            ]);
        } else {
            $form = $banner->update([
                'image' => $banner->image,
                'link' => $request->link
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
        $banner = banner::find($id);
        $banner->delete();
        return [
            'message' => 'Xóa thành công',
        ];
    }
}
