import { Injectable } from '@angular/core';
import { AdminModule } from '../../admin.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthBook } from 'src/app/models/auth-book';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable()
export class AuthBookService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAuthors() {
    return this.http.get<AuthBook[]>(`${this.apiUrl}/authors`);
  }
  addAuthor(author: AuthBook) {
    return this.http.post<AuthBook>(`${this.apiUrl}/authors`, author);
  }
}
