<?php

use App\Http\Controllers\AuthBookController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\user\AuthController;
use App\Http\Controllers\user\HomeController;
use App\Http\Controllers\user\InvoiceController as UserInvoiceController;
use App\Http\Controllers\user\ProductController;
use App\Http\Controllers\user\RatingController as UserRatingController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['auth:api','is_admin']], function () {
    Route::resource('/authors', AuthBookController::class);
    Route::resource('/banners', BannerController::class);
    Route::post('/banners/{id}', [BannerController::class,'update']);
    Route::resource('/books', BookController::class);
    Route::post('/books/{id}', [BookController::class,'update']);
    Route::resource('/categories', CategoryController::class);
    Route::post('/categories/{id}', [CategoryController::class,'update']);
    Route::resource('/genres', GenreController::class);
    Route::post('/genres/{id}', [GenreController::class,'update']);
    Route::resource('/invoices', InvoiceController::class);
    Route::resource('/promotions', PromotionController::class);
    Route::post('/promotions/{id}', [PromotionController::class,'update']);
    Route::resource('/ratings', RatingController::class);
    Route::resource('/users', UserController::class);
    Route::get('dashboard', [DashboardController::class, 'index']);
});
    Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login']);

Route::prefix('/user')->name('user.')->group(function () {
    Route::resource('/home', HomeController::class);
    Route::get('/books/{id}', [ProductController::class, 'show'])->name('books.show');
    Route::get('/books', [ProductController::class, 'index'])->name('books.index');
    Route::get('/search', [ProductController::class, 'search'])->name('books.search');
    Route::group(['middleware' => ['auth:api']], function () {
        Route::get('/checkAllowRating/{bookId}', [ProductController::class, 'checkAllowRating'])->name('checkAllowRating');
        Route::post('/rating/store', [UserRatingController::class, 'store'])->name('rating.store');
        Route::get('/getCurrentUser', [AuthController::class, 'getCurrentUser']);
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('/payment', [UserInvoiceController::class, 'payment'])->name('payment');
        Route::get('/invoices', [UserInvoiceController::class, 'index'])->name('invoices.index');
        Route::get('/invoices/{id}', [UserInvoiceController::class, 'show'])->name('invoices.show');
        Route::post('/saveUser', [UserController::class, 'saveUser'])->name('saveUser');
    });

});
