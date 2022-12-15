import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor() {}

  public getAuthentiaction(): HttpHeaders {
    if (localStorage.getItem('currentUser') != null)
      return new HttpHeaders().set(
        'Authorization',
        'bearer ' +
          JSON.parse(localStorage.getItem('currentUser')!.toString()).token
      );
    else return new HttpHeaders();
  }
}
