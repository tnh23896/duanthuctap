<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\category;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $booksSale = Book::with('ratings')->join('promotions', 'promotions.id', '=', 'books.promotion_id')->where('promotions.end_date', '>', now())->where('books.quantity', '>', 0)->take(15)->select('books.*', 'promotions.discount')->get();
        $categories = category::all();
        $booksFeatured = Book::with('ratings')->where('featured', 1)->where('quantity', '>', 0)->orderBy('created_at', 'desc')->take(10)->get();
        $booksNew = Book::with('ratings')->where('quantity', '>', 0)->orderBy('created_at', 'desc')->take(20)->get();
        return [
            'booksSale' => $booksSale,
            'categories' => $categories,
            'booksFeatured' => $booksFeatured,
            'booksNew' => $booksNew
        ];
    }
}
