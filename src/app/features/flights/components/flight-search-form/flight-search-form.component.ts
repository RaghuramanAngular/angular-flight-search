import { Component, EventEmitter, inject, Output  } from '@angular/core';
import {  AbstractControl,  FormBuilder,  ReactiveFormsModule,  ValidationErrors,  Validators} from '@angular/forms';
import { FlightSearch } from '../../../../core/models/flight-search';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-flight-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './flight-search-form.component.html',
  styleUrl: './flight-search-form.component.scss'
})
export class FlightSearchFormComponent {
  private readonly fb = inject(FormBuilder);
  @Output()
readonly search = new EventEmitter<FlightSearch>();

  constructor() {}

  searchForm = this.fb.nonNullable.group(
    {
      from: ['', Validators.required],
      to: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      passengers: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(9)
        ]
      ]
    },
    {
      validators: [
        this.differentAirportValidator,
        this.returnDateValidator
      ]
    }
  );

  onSubmit(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.search.emit(this.searchForm.getRawValue());
  }

  private differentAirportValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const from = control.get('from')?.value;
    const to = control.get('to')?.value;

    if (from && to && from === to) {
      return { sameAirport: true };
    }

    return null;
  }

  private returnDateValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const departureDate = control.get('departureDate')?.value;
    const returnDate = control.get('returnDate')?.value;

    if (
      departureDate &&
      returnDate &&
      new Date(returnDate) < new Date(departureDate)
    ) {
      return { invalidReturnDate: true };
    }

    return null;
  }
}
