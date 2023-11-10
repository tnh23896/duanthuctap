<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'phone','email', 'address', 'total', 'status', 'date' , 'user_id'  
    ];
    public function books() {
        return $this->belongsToMany(Book::class,'invoice_detail');
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
    public function details() {
        return $this->hasMany(Invoice_detail::class);
    }
}
