import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthBook } from 'src/app/models/auth-book';
import { AuthBookService } from '../../service/auth-book/auth-book.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  errors: any = [];
  constructor(
    private authBookService: AuthBookService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const author: AuthBook = {
        name: form.value.name,
      };

      this.authBookService.addAuthor(author).subscribe({
        next: (data: any) => {
          this.handleSuccess(data.message);
        },
        error: (err) => {
          this.handleError(err.error.errors);
        },
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  private handleSuccess(message: string) {
    this.toastr.success(message);
    this.router.navigate(['/admin/authors']);
  }

  private handleError(errors: any) {
    this.errors.push(errors);
    console.error('Error:', errors);
  }
}
