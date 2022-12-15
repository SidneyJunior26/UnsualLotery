import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, empty, map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { FunctionsService } from '../shared/functions.service';

const url = 'http://localhost:56738/users/';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private funcs: FunctionsService) {
    if (localStorage.getItem('currentUser') != null) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser')!.toString())
      );
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  findUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(url + email);
  }

  findUserById(id: string): Observable<User> {
    let headers = this.funcs.getAuthentiaction();

    return this.http.get<User>(url + id, { headers });
  }

  updateUser(user: User, userId: string): Observable<User> {
    let headers = this.funcs.getAuthentiaction();

    var body = { user };

    return this.http.put<User>(url + userId, body.user, {
      headers: headers,
    });
  }

  createUser(user: User): Observable<User> {
    var body = { user };

    return this.http.post<User>(url, body.user);
  }

  verifyUser(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(url + 'token', {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        })
      );
  }

  logOutUser() {
    localStorage.removeItem('currentUser');
  }
}
