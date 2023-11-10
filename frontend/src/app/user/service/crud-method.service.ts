import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable()
export class CrudMethodService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  get(api: string) {
    return this.http
      .get(`${this.apiUrl}/${api}`)
      .pipe(catchError(this.handleError));
  }
  post(api: string, data: any) {
    return this.http.post(`${this.apiUrl}/${api}`, data);
  }
  put(api: string, data: any) {
    return this.http.put(`${this.apiUrl}/${api}`, data);
  }
  delete(api: string) {
    return this.http.delete(`${this.apiUrl}/${api}`);
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
    } else {
      // Backend error
      console.error(`Mã lỗi ${error.status}, ` + `message: ${error.message}`);
    }
    return throwError(() => new Error('Đã xảy ra lỗi, vui lòng thử lại sau'));
  }
}
