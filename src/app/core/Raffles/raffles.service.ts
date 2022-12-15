import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Raffle } from '../../shared/models/raffle';

const url = 'http://localhost:56738/raffles/';

@Injectable({
  providedIn: 'root',
})
export class RafflesService {
  constructor(private http: HttpClient) {}

  getRafflesActives(): Observable<Raffle[]> {
    return this.http.get<Raffle[]>(url + 'actives');
  }

  viewRaffle(id: string): Observable<Raffle[]> {
    return this.http.get<Raffle[]>(url + id);
  }
}
