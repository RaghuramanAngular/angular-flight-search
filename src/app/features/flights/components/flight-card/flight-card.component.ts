import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Flight } from '../../../../core/models/flight';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {

  @Input({ required: true })
  flight!: Flight;
}