<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'title', 'author_id', 'genre_id', 'category_id', 'promotion_id', 'image', 'description', 'price', 'quantity'
    ];
    
public function category() {
    return $this->belongsTo(Category::class);
  }
  
  public function genre() {
    return $this->belongsTo(Genre::class);  
  }
  public function author() {
    return $this->belongsTo(Author::class);
  }
  public function promotion() {
    return $this->belongsTo(Promotion::class);
  }
  public function ratings() {
    return $this->hasMany(Rating::class);
  }
  public function invoices() {
    return $this->belongsToMany(Invoice::class,'invoice_detail');
  }
}
