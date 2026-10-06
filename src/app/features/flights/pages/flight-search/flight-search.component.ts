import { Component, inject } from '@angular/core';
import {  BehaviorSubject,  combineLatest,  finalize,  map} from 'rxjs';
import { Flight } from '../../../../core/models/flight';
import { FlightFilter } from '../../../../core/models/flight-filter';
import { FlightSearch } from '../../../../core/models/flight-search';
import { FlightService } from '../../../../core/services/flight.service';

import { FlightCardComponent } from '../../components/flight-card/flight-card.component';
import { FlightFiltersComponent } from '../../components/flight-filters/flight-filters.component';
import { FlightSearchFormComponent } from '../../components/flight-search-form/flight-search-form.component';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    FlightSearchFormComponent,
    FlightFiltersComponent,
    FlightCardComponent,
    AsyncPipe
  ],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {

  private readonly flightService = inject(FlightService);

  private readonly flightsSubject =
    new BehaviorSubject<Flight[]>([]);

  private readonly filtersSubject =
    new BehaviorSubject<FlightFilter>({
      airline: 'ALL',
      stops: 'ALL',
      maxPrice: 20000
    });

  readonly filteredFlights$ = combineLatest([
    this.flightsSubject,
    this.filtersSubject
  ]).pipe(
    map(([flights, filters]) =>
      this.applyFilters(flights, filters)
    )
  );

  loading = false;
  errorMessage = '';
  hasSearched = false;

  onSearch(criteria: FlightSearch): void {

    this.loading = true;
    this.errorMessage = '';
    this.hasSearched = true;

    this.flightsSubject.next([]);

    this.flightService
      .getFlights()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (flights) => {

          const matchingFlights =
            flights.filter(
              flight =>
                flight.fromCode === criteria.from &&
                flight.toCode === criteria.to
            );

          this.flightsSubject.next(
            matchingFlights
          );
        },

        error: () => {
          this.errorMessage =
            'Unable to load flights. Please try again.';

          this.flightsSubject.next([]);
        }
      });
  }

  onFiltersChanged(filters: FlightFilter): void {
    this.filtersSubject.next(filters);
  }

  private applyFilters(
    flights: Flight[],
    filters: FlightFilter
  ): Flight[] {

    return flights.filter(flight => {

      const matchesAirline =
        filters.airline === 'ALL' ||
        flight.airline === filters.airline;

      const matchesStops =
        filters.stops === 'ALL' ||
        flight.stops === Number(filters.stops);

      const matchesPrice =
        flight.price <= filters.maxPrice;

      return (
        matchesAirline &&
        matchesStops &&
        matchesPrice
      );
    });
  }
}