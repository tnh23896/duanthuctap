<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index() {
        $revenueForThisWeek = invoice::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->selectRaw("DATE(date) as day, SUM(total) as revenue")
        ->groupBy('day') 
        ->get();
        $countBooks = Book::count();
        $totalSoldProducts = DB::table('invoices')
        ->join('invoice_detail', 'invoices.id', '=', 'invoice_detail.invoice_id')
        ->sum('invoice_detail.quantity');
        $totalDeliveredProducts = invoice::where('status', 3)->count();
        
        return ['revenueForThisWeek' => $revenueForThisWeek, 'countBooks' => $countBooks, 'totalSoldProducts' => $totalSoldProducts, 'totalDeliveredProducts' => $totalDeliveredProducts];
    }
}
