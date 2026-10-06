import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { Flight } from '../../../../core/models/flight';
import { FlightService } from '../../../../core/services/flight.service';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.scss'
})
export class FlightDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly flightService = inject(FlightService);

  flight: Flight | undefined;

  loading = true;
  errorMessage = '';

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      this.loading = false;
      this.errorMessage = 'Invalid flight ID.';
      return;
    }

    this.flightService
      .getFlightById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (flight) => {

          if (!flight) {
            this.errorMessage =
              'Flight not found.';
            return;
          }

          this.flight = flight;
        },

        error: () => {
          this.errorMessage =
            'Unable to load flight details.';
        }
      });
  }
}