import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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

  getFlightById(id: number): Observable<Flight | undefined> {
    return this.getFlights().pipe(
      map(flights =>
        flights.find(flight => flight.id === id)
      )
    );
  }
}