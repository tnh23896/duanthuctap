<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\invoice;
use App\Models\Invoice_detail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;

class InvoiceController extends Controller
{
    public function payment(Request $request)
    {
        // 'name', 'phone', 'address', 'total', 
        // 'status', 'date' , 'user_id'
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }
        $params = [
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'total' => $request->total,
            'user_id' => $request->user_id,
            'status' => '1',
            'date' => Date::now()
        ];
        $invoice = invoice::create($params);
        foreach ($request->cartItems as $item) {
            // 'invoice_id', 'book_id', 'quantity',    'discount', 'price'
            Invoice_detail::create([
                'invoice_id' => $invoice->id,
                'book_id' => $item['book']['id'],
                'book_name' => $item['book']['title'],
                'book_image' => $item['book']['image'],
                'quantity' => $item['quantity'],
                'discount' => $item['book']['promotion']['discount']??0,
                'price' => $item['book']['price'],
            ]);
        }
        return response()->json($invoice, 200);
        
    }
    public function index() {
        $invoices = invoice::where('user_id', Auth::id())->get();
        return response()->json($invoices, 200);
    }
    public function show(string $id)
    {
        $invoice = invoice::find($id);
        $invoice_detail =   Invoice_detail::where('invoice_id', $id)->get();
        return ['invoice' => $invoice, 'invoice_detail' => $invoice_detail];
    }
}
