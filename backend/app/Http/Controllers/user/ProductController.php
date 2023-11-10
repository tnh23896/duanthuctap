<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\invoice;
use App\Models\rating;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('q')) {
            if (strpos($request->q, '-') !== false) {
                // Nếu có dấu "-", thực hiện tách chuỗi và tìm kiếm theo cột và giá trị
                $parts = explode("-", $request->q);
                $columnName = $parts[0];
                $value = $parts[1];
                $books = Book::with('ratings.user', 'category', 'genre', 'author', 'promotion')
                    ->where($columnName, 'like', '%' . $value . '%')
                    ->get();
            } else {
                $searchTerm = $request->q;
                $books = Book::with('ratings.user', 'category', 'genre', 'author', 'promotion');
                $books->where('title', 'like', '%' . $searchTerm . '%')
                ->orWhereHas('author', function ($query) use ($searchTerm) {
                    $query->where('name', 'like', '%' . $searchTerm . '%');
                })
                ->orWhereHas('genre', function ($query) use ($searchTerm) {
                    $query->where('name', 'like', '%' . $searchTerm . '%');
                })
                ->orWhereHas('category', function ($query) use ($searchTerm) {
                    $query->where('name', 'like', '%' . $searchTerm . '%');
                });
               $books = $books->get();
               return response()->json([
                   'books' => $books,
               ], 200);
            }
            
            return response()->json([
                'books' => $books,
            ], 200);
            
        }
        $books = Book::with('ratings.user', 'category', 'genre', 'author', 'promotion')->get();
        return response()->json([
            'books' => $books,
        ], 200);
    }
  
    public function show($id)
    {
        try {

            $book = Book::with('ratings.user', 'category', 'genre', 'author', 'promotion')->findOrFail($id);
            $similarBooks = Book::with('author', 'promotion')->where('category_id', $book->category_id)->where('id', '!=', $book->id)->get();

            return [
                'book' => $book,
                'similarBooks' => $similarBooks,
            ];
        } catch (Exception $e) {
            // Không tìm thấy ID
            return response()->json([
                'message' => 'Không tìm thấy sách',
            ], 404);
        }
    }
    public function checkAllowRating($bookId)
    {
        $isAllowRating = 0;
        if (auth()->check()) {
            $checkRatingExist = rating::where('user_id', Auth::id())->where('book_id', $bookId)->exists();
            if (!$checkRatingExist) {
                $invoices = Invoice::with('books')->where('user_id', Auth::id())->where('status', 3)->get();

                foreach ($invoices as $invoice) {
                    $isBooked = $invoice->books->contains('id', $bookId);
                    if ($isBooked) {
                        $isAllowRating = 1;
                        break;
                    }
                }
            }
        } else {
            $isAllowRating = 0;
        }
        return [
            'isAllowRating' => $isAllowRating
        ];
    }
   
}
