import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  errors: any = [];
  ngOnDestroy(): void {}
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  onSubmit(form: NgForm) {
    let formValue = {
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.login(formValue).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.toastr.success('Đăng nhập thành công');
        window.location.href = '/';
      },
      error: (err) => {
        this.errors = err.error;
      },
    });
  }
}
