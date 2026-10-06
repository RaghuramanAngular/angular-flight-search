import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight';
@Injectable({
  providedIn: 'root'
})
export class FlightService {
private readonly http = inject(HttpClient);
private readonly apiUrl = 'mockdata/flights.json';

getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }
}
