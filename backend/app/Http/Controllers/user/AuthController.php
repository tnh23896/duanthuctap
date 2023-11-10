<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }
        $checkUser = $request->only('email', 'password');
        if (Auth::attempt($checkUser)) {
            /** @var \App\Models\User $user **/
            $user = Auth::user();

            $token = $user->createToken('access')->accessToken;

            return response()->json(['token' => $token], 200);
        }

        return response()->json(['message' => 'Sai email hoặc mật khẩu'], 401);
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'image' => 'required|image',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }
        $file = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('uploads', $filename, 'public');
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'avatar' => $filename
        ]);

        return response()->json(['message' => 'Đăng ký thành công'], 200);
    }
    public function getCurrentUser()
    {
        $user = Auth::user();
        return response()->json($user, 200);
    }
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Đăng xuất thành công'], 200);
    }
}
