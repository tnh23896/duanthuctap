import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class CrudMethodService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(api: string) {
    return this.http.get(`${this.apiUrl}/${api}`);
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
}
