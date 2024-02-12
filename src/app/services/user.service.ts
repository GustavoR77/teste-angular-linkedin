import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${environment.apiURL}/users`);
  }
  getUsersByID(id: any): Observable<any> {
    return this.http.get(`${environment.apiURL}/users/` + id);
  }
  postUsers(user: Users) {
    return this.http.post<any>(`${environment.apiURL}/users`, user);
  }
  putUsers(user: Users, id: any) {
    return this.http.put<any>(`${environment.apiURL}/users/` + id, user);
  }
}
