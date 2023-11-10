import { Component, OnInit } from '@angular/core';
import { CrudWithTokenService } from '../../service/crud-with-token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private crudWithTokenService: CrudWithTokenService, private toastr: ToastrService, private router: Router) { }
  imgBaseUrl = environment.urlImage;
  user: any;
  name = '';
  email = '';
  address = '';
  phone = '';
  userId: any;
  file: any;
  errors: any = [];
  imgSrc = '';
  ngOnInit(): void {
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
        this.imgSrc = this.imgBaseUrl + res.avatar
      },
      error: (err) => {
        // redirect to login with toastr error message 
        this.toastr.error('Bạn cần đăng nhập trước');
        this.router.navigate(['/login']);
      },
    });
  }
  
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  onSubmit(): void {
    var form = new FormData();
    if (this.file) {
      form.append('avatar', this.file, this.file.name);
    }
    form.append('name', this.name);
    form.append('email', this.email);
    form.append('address', this.address);
    form.append('phone', this.phone);
    this.crudWithTokenService.post('user/saveUser', form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.getUser();
      },
      error: (err) => (this.errors = err.error),
    });
  }
}
