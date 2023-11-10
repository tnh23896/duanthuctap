import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudWithTokenService } from '../../service/crud-with-token.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  authors: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private crud: CrudWithTokenService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getAuthors();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAuthors() {
    this.crud
      .get('authors')
      .pipe(
        catchError((error) => {
          this.handleErrors(error);
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return [];
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((data: any) => {
        this.authors = data;
        this.spinner.hide();
      });
  }

  onDelete(id: string) {
    this.spinner.show();
    this.crud
      .delete(`authors/${id}`)
      .pipe(
        catchError((error) => {
          this.handleErrors(error);
          return [];
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((data: any) => {
        this.toastr.success(data.message);
        this.getAuthors();
      });
  }

  private handleErrors(error: any) {
    // Handle errors here, e.g., push to an errors array or show a global error message.
    console.error('Error:', error);
    this.spinner.hide();
  }
}
