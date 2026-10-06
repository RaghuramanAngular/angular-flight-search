import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'flights',
    pathMatch: 'full'
  },
  {
    path: 'flights',
    loadComponent: () =>
      import(
        './features/flights/pages/flight-search/flight-search.component'
      ).then(m => m.FlightSearchComponent)
  },
  {
    path: 'flights/:id',
    loadComponent: () =>
      import(
        './features/flights/pages/flight-details/flight-details.component'
      ).then(m => m.FlightDetailsComponent)
  },
  {
    path: '**',
    redirectTo: 'flights'
  }
];