<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }
    public function saveUser(Request $request){
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'address' => 'required',
            'phone' => 'required',
        ], [
            'name.required' => 'Vui lòng nhập tên',
            'email.required' => 'Vui lòng nhập email',
            'avatar.image' => 'Vui lòng chọn ảnh đúng định dạng',
            'address.required' => 'Vui lòng nhập địa chỉ',
            'phone.required' => 'Vui lòng nhập số đ było',
            'avatar.max' => 'Vui lòng chọn ảnh nhỏ hơn 2048KB',
            'avatar.mimes' => 'Vui lòng chọn ảnh đúng định dạng',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }
        $file = $request->file('avatar');
        
        $user = User::find(Auth::user()->id);
        if ($file) {
            Storage::disk('public')->delete($user->avatar);
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('uploads', $filename, 'public');
            Storage::delete("public/uploads/" . $user->avatar);
            $user->avatar = $filename;
        }

        // update user
        $user->name = $request->name;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->save();
        return [
            'data' => $user,
            'message' => 'Cập nhật thành công',
        ];
    }
  
}
