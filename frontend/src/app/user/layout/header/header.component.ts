import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../../service/auth.service';
import { CrudMethodService } from '../../service/crud-method.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() user: any;
  search: string = '';
  imgBase = environment.urlImage;
  constructor(private authService: AuthService, private crud: CrudMethodService, private router: Router, private toastr: ToastrService ) { }
  logout() {
    this.authService.logout();
    this.toastr.success('Đăng xuất thành công');
    this.user = null;
  }
  searchBook() {
    this.search = this.search.trim();
    this.router.navigate(['/products'], { queryParams: { q: this.search } });
  }
}
