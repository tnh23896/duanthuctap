import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  file: any;
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  address: string = '';
  errors: any = [];

  ngOnDestroy(): void {}
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  onSubmit() {
    var form = new FormData();
    if (this.file) {
      form.append('image', this.file, this.file.name);
    }
    form.append('name', this.name);
    form.append('email', this.email);
    form.append('password', this.password);
    form.append('phone', this.phone);
    form.append('address', this.address);

    this.authService.register(form).subscribe({
      next: (res) => {
        this.toastr.success('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errors = err.error;
      },
    });
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
}
