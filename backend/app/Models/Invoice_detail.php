<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice_detail extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_id', 'book_id', 'book_name', 'book_image','quantity',    'discount', 'price'
    ];
    protected $table = 'invoice_detail';
    public function book() {
        return $this->belongsTo(Book::class);
    }
}
