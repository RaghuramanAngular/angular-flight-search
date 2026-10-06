import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil
} from 'rxjs';

import { FlightFilter } from '../../../../core/models/flight-filter';

@Component({
  selector: 'app-flight-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './flight-filters.component.html',
  styleUrl: './flight-filters.component.scss'
})
export class FlightFiltersComponent implements OnInit, OnDestroy {

  private readonly fb = inject(FormBuilder);

  private readonly destroy$ = new Subject<void>();

  @Output()
  readonly filtersChanged = new EventEmitter<FlightFilter>();

  readonly filterForm = this.fb.nonNullable.group({
    airline: ['ALL'],
    stops: ['ALL'],
    maxPrice: [20000]
  });

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(
          (previous, current) =>
            JSON.stringify(previous) === JSON.stringify(current)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.filtersChanged.emit(
          this.filterForm.getRawValue()
        );
      });
  }

  resetFilters(): void {
    this.filterForm.reset({
      airline: 'ALL',
      stops: 'ALL',
      maxPrice: 20000
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}