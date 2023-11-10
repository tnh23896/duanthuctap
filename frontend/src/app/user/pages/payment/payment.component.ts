import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { CrudWithTokenService } from '../../service/crud-with-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  cartItems: { book: any; quantity: number }[] = [];
  imgBaseUrl = environment.urlImage;
  totalPrice: number = 0;
  user: any;
  name = '';
  email = '';
  address = '';
  phone = '';
  userId: any;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private crudWithTokenService: CrudWithTokenService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
    this.getUser();
  }
  getUser() {
    this.crudWithTokenService.get('user/getCurrentUser').subscribe({
      next: (res: any) => {
        this.name = res.name;
        this.email = res.email;
        this.address = res.address;
        this.phone = res.phone;
        this.userId = res.id;
      },
      error: (err) => {
        // redirect to login with toastr error message 
        this.toastr.error('Bạn cần đăng nhập trước khi đặt hàng');
        this.router.navigate(['/login']);
      },
    });
  }
  caculateTotalPriceOfAnItem(item: any): number {
    return (
      (item?.book?.promotion?.discount ?? item?.book?.price) * item?.quantity
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
  onSubmit(): void { 
    const dataInput = {
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
      total: this.totalPrice,
      user_id: this.userId,
      cartItems: this.cartItems,
    };

    this.crudWithTokenService.post('user/payment', dataInput).subscribe({
      next: (res: any) => {
        this.cartService.clearCart();
        this.totalPrice = 0;
        this.toastr.success('Thanh toán thành công');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
