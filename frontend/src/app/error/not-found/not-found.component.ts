import { Component } from '@angular/core';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  message: string = 'Không tìm thấy trang hoặc sản phẩm yêu cầu';
}
