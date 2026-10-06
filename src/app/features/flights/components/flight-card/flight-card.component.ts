import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Flight } from '../../../../core/models/flight';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {

  @Input({ required: true })
  flight!: Flight;
}