import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudWithTokenService } from 'src/app/admin/service/crud-with-token.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
})
export class RatingsComponent implements OnChanges {
  @Input() ratings: any;
  @Input() bookId: any;
  imgUrl = environment.urlImage;
  isAllowRating = 0;
  user: any = '';
  constructor(private crud: CrudWithTokenService,private toast: ToastrService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { bookId } = changes;
    if (bookId.currentValue !== null) {
      this.allowRating(bookId.currentValue);
    }
  }

  renderStars(rating: number) {
    return new Array(rating);
  }

  allowRating(bookId: any) {
    this.crud.get(`user/checkAllowRating/${bookId}`).subscribe({
      next: (data: any) => {
        this.isAllowRating = data.isAllowRating;
        this.crud.get(`user/getCurrentUser`).subscribe({
          next: (res: any) => {
            this.user = res;
          },
        });
      },
    });
  }
  onSubmit(form: NgForm,userId: any,bookId: any) {
    //add userId, bookId to form
    form.form.value.user_id = userId;
    form.form.value.book_id = bookId;

    this.crud.post(`user/rating/store`, form.form.value).subscribe({
      next: (data: any) => {
        this.isAllowRating = 0;
        this.toast.success('Đánh giá thành công');
        this.ratings = data;
      },
    });

  }
  setSelectedStars(rating: number) {
    for (let i = 1; i <= 5; i++) {
      let starLabel: any = document.querySelector(`label[for="star${i}"] i`);
      if (i <= rating) {
        starLabel.style.color = '#3cc86d';
      } else {
        starLabel.style.color = '#ccc';
      }
    }
  }
}
