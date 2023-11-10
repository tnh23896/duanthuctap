<?php

namespace App\Http\Controllers;

use App\Models\invoice;
use App\Models\Invoice_detail;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return invoice::all();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $invoice = invoice::find($id);
        $invoice_detail =   Invoice_detail::where('invoice_id', $id)->get();
        return ['invoice' => $invoice, 'invoice_detail' => $invoice_detail];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $invoice = invoice::with('books')->find($id);
        $invoice_detail =   Invoice_detail::with('book')->where('invoice_id', $id)->get();
        if($request->has('status')) {
            if($request->status == 3) {
                foreach($invoice_detail as $item) {
                    $item->book->quantity -= $item->quantity;
                    $item->book->save();
                }
            }
}
        
        $invoice->update($request->all());
        return [
            'data' => $invoice,
            'message' => 'Sửa thành công',
        ];
    }

  
    
}
