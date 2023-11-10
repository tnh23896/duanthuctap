import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthService {
  apiUrl = environment.apiUrl;
  private user: any;
  constructor(private http: HttpClient) {}
  login({ email, password }: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  register(formValue: any) {
    return this.http.post(`${this.apiUrl}/register`, formValue);
  }
  logout() {
    localStorage.removeItem('token');
    this.http.get(`${this.apiUrl}/user/logout`);
  }
  getAccessToken() {
    // if (localStorage.getItem('token')) has value, return true, else return false;
    return localStorage.getItem('token');
  }
}
