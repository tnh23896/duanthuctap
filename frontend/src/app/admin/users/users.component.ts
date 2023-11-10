import { Component } from '@angular/core';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: Array<any> = [];
  errors = [];
  constructor(
    private crud: CrudWithTokenService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.spinner.show();
    this.crud.get('users').subscribe({
      next: (data: any) => {
        this.users = data;
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        if (err.status === 403) {
          this.spinner.hide();
          this.router.navigate(['/403']);
        }
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
