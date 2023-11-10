import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-average',
  templateUrl: './star-average.component.html',
  styleUrls: ['./star-average.component.css'],
})
export class StarAverageComponent {
  @Input() book: any;
  calculateAverage(): number {
    if (!this.book || !this.book.ratings || this.book.ratings.length === 0) {
      return 0; // Tránh chia cho 0 hoặc dữ liệu không tồn tại
    }

    const sum = this.book.ratings.reduce(
      (total: any, review: any) => total + review.rating,
      0,
    );
    return Math.floor(sum / this.book.ratings.length);
  }
}
