import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: { book: any; quantity: number }[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  imgBaseUrl = environment.urlImage;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
  }

  calculateTotalQuantity(): void {
    this.totalQuantity = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) =>
        total +
        (item?.book?.promotion?.discount ?? item?.book?.price) * item?.quantity,
      0,
    );
  }
  caculateTotalPriceOfAnItem(item: any): number {
    return (
      (item?.book?.promotion?.discount ?? item?.book?.price) * item?.quantity
    );
  }

  decrease(book: any, quantity: number) {
    if (1 >= quantity) {
      this.toastr.error('Không thể giảm nữa');
      return;
    }
    quantity--;
    this.cartService.addToCart(book, quantity);
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
  }
  increase(book: any, quantity: number) {
    if (book.quantity <= quantity) {
      this.toastr.error('Số lượng sản phẩm không đủ');
      return;
    }
    quantity++;
    this.cartService.addToCart(book, quantity);
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
  }
  removeFromCart(item: any) {
    this.cartService.removeOneItemCart(item.book);
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
  }
}
