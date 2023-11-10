import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudMethodService } from '../../service/crud-method.service';
import { environment } from 'src/environments/environment.development';
import { CartService } from '../../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  book: any;
  imgUrl: any = '';
  quantity = 1;
  similarBooks: any = [];
  error: any;
  constructor(
    private route: ActivatedRoute,
    private crud: CrudMethodService,
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      this.crud.get(`user/books/${id}`).subscribe({
        next: (data: any) => {
          console.log(data.book.id);
          this.book = data.book;
          this.similarBooks = data.similarBooks;
          this.imgUrl = environment.urlImage;
        },
        error: (err) => {
          this.error = err.message;
        },
      });
    });
  }
  decrease() {
    this.quantity--;
  }
  increase() {
    this.quantity++;
  }
  goToDetail(product: any) {
    this.router.navigate(['/product', product.id]);
  }
  addToCart() {
    if (this.book?.quantity >= this.quantity) {
      this.toastr.success('Đã thêm sản phẩm vào giỏ hàng');
      this.cartService.addToCart(this.book, this.quantity);
    } else {
      this.toastr.error('Số lượng sản phẩm không đủ');
    }
  }
}
