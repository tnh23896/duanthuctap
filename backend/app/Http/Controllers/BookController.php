<?php

namespace App\Http\Controllers;

use App\Models\author;
use App\Models\Book;
use App\Models\category;
use App\Models\genre;
use App\Models\promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            'books' => Book::with(['category', 'genre', 'author', 'promotion'])->get(),
            'categories' => category::all(),
            'genres' => genre::all(),
            'authors' => author::all(),
            'promotions' => promotion::all(),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)

    {
        $validate = Validator::make($request->all(), [
            'title' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'author_id' => 'required',
            'genre_id' => 'required',
            'category_id' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
        ], [
            'image.required' => 'Vui lòng chọn ảnh',
            'image.image' => 'Vui lòng chọn ảnh',
            'author_id.required' => 'Vui lòng chọn tác giả',
            'genre_id.required' => 'Vui lòng chọn thể loại',
            'category_id.required' => 'Vui lòng chọn danh mục',
            'description.required' => 'Vui lòng nhập mô tả',
            'price.required' => 'Vui lòng nhập giá',
            'quantity.required' => 'Vui lòng nhập số lượng',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $file = $request->file('image');

        //get path

        $filename = time() . '_' . $file->getClientOriginalName();

        $file->storeAs('uploads', $filename, 'public');

        $form = Book::create([
            'title' => $request->title,
            'image' => $filename,
            'author_id' => $request->author_id,
            'promotion_id' => $request->promotion_id ?? null,
            'genre_id' => $request->genre_id,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity

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
            'title' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'author_id' => 'required',
            'genre_id' => 'required',
            'category_id' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
        ], [
            'image.required' => 'Vui lòng chọn ảnh',
            'image.image' => 'Vui lòng chọn ảnh',
            'author_id.required' => 'Vui lòng chọn tác giả',
            'genre_id.required' => 'Vui lòng chọn thể loại',
            'category_id.required' => 'Vui lòng chọn danh mục',
            'description.required' => 'Vui lòng nhập mô tả',
            'price.required' => 'Vui lòng nhập giá',
            'quantity.required' => 'Vui lòng nhập số lượng',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }
        $file = $request->file('image');
        $book = Book::find($id);
        if ($file) {
            Storage::disk('public')->delete($book->image);
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('uploads', $filename, 'public');
            Storage::delete("public/uploads/" . $book->image);
            $form = $book->update([
                'image' => $filename,
                'title' => $request->title,
                'author_id' => $request->author_id,
                'promotion_id' => $request->promotion_id ?? null,
                'genre_id' => $request->genre_id,
                'category_id' => $request->category_id,
                'description' => $request->description,
                'price' => $request->price,
                'quantity' => $request->quantity
            ]);
        } else {
            $form = $book->update([
                'title' => $request->title,
                'image' => $book->image,
                'promotion_id' => $request->promotion_id ?? null,
                'author_id' => $request->author_id,
                'genre_id' => $request->genre_id,
                'category_id' => $request->category_id,
                'description' => $request->description,
                'price' => $request->price,
                'quantity' => $request->quantity
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
        $book = Book::find($id);
        $book->delete();
        return [
            'message' => 'Xóa thành công',
        ];
    }
}
