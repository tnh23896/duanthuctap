import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { book: any; quantity: number }[] = [];
  constructor() {
    // Lấy dữ liệu từ localStorage nếu có
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  getCartItems(): { book: any; quantity: number }[] {
    return this.cartItems;
  }

  addToCart(book: any, quantity: number): void {
    const existingItem = this.cartItems.find(
      (item) => item.book.id === book.id,
    );

    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      this.cartItems.push({ book, quantity });
    }

    // Lưu dữ liệu vào localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  removeOneItemCart(book: any): void {
    const index = this.cartItems.findIndex((item) => item.book.id === book.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }
  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }
}
