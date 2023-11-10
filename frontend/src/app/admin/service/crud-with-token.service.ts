import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class CrudWithTokenService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  get(api: string) {
    return this.http
      .get(`${this.apiUrl}/${api}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(catchError(this.handleError));
  }
  post(api: string, data: any) {
    return this.http.post(`${this.apiUrl}/${api}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
  put(api: string, data: any) {
    return this.http.put(`${this.apiUrl}/${api}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
  delete(api: string) {
    return this.http.delete(`${this.apiUrl}/${api}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // redirect to 404
      return throwError(() => {
        return {
          status: error.status,
          message: error.error.message,
        };
      });
    } else if (error.status === 403) {
      return throwError(() => {
        return {
          status: error.status,
          message: error.error.message,
        };
      });
    } else if (error.status === 401)
    {
      return throwError(() => {
        return {
          status: error.status,
          message: error.error.message,
        };
      });
    } else {
      // Backend error
      console.error(`Mã lỗi ${error.status}, ` + `message: ${error.message}`);
    }
    return throwError(() => new Error('Đã xảy ra lỗi, vui lòng thử lại sau'));
  }
}
