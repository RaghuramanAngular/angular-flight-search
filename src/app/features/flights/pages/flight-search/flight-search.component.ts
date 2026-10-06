import { Component, inject } from '@angular/core';
import { finalize } from 'rxjs';

import { Flight } from '../../../../core/models/flight';
import { FlightSearch } from '../../../../core/models/flight-search';
import { FlightService } from '../../../../core/services/flight.service';
import { FlightSearchFormComponent } from '../../components/flight-search-form/flight-search-form.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FlightSearchFormComponent, DatePipe],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {

  private readonly flightService = inject(FlightService);

  flights: Flight[] = [];
  loading = false;
  errorMessage = '';
  hasSearched = false;

  onSearch(criteria: FlightSearch): void {
    this.loading = true;
    this.errorMessage = '';
    this.hasSearched = true;
    this.flights = [];

    this.flightService
      .getFlights()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (flights) => {
          this.flights = flights.filter(
            flight =>
              flight.fromCode === criteria.from &&
              flight.toCode === criteria.to
          );
        },
        error: () => {
          this.errorMessage =
            'Unable to load flights. Please try again.';
        }
      });
  }
}