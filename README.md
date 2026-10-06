# Angular Flight Search Application

A responsive flight search application built using Angular 18 as part of a frontend technical assessment.

The application demonstrates Angular architecture, Reactive Forms, REST API integration, RxJS-based filtering, reusable standalone components, routing, validation, and responsive UI development.

## Features

### Flight Search

Users can search for flights using:

- From
- To
- Departure Date
- Return Date
- Number of Passengers

The search form is implemented using Angular Reactive Forms with validation.

Additional validation includes:

- Required field validation
- Origin and destination cannot be the same
- Return date cannot be earlier than departure date
- Passenger count validation

### Flight Results

Search results display:

- Airline
- Flight Number
- Origin and destination
- Departure time
- Arrival time
- Duration
- Price
- Number of stops

Flight data is retrieved through a dedicated Angular service using `HttpClient`.

### Reactive Flight Filters

Flight results can be filtered by:

- Airline
- Number of stops
- Maximum price

Filtering is implemented using RxJS.

`BehaviorSubject` is used to maintain the latest flight and filter state, while `combineLatest` combines both streams to derive the filtered flight results.

### Flight Details

Users can select **View Details** from a flight result to navigate to:

```text
/flights/:id
```

The flight details page displays additional information about the selected flight.

Angular Router and `ActivatedRoute` are used for route navigation and route parameter handling.

### Responsive Design

The application includes responsive layouts for desktop and smaller screen sizes using SCSS media queries.

## Technologies

- Angular 18
- TypeScript
- RxJS
- Angular Reactive Forms
- Angular Router
- Angular HttpClient
- SCSS
- HTML5
- Git / GitHub

## Architecture

The application follows a feature-based structure with separation between reusable UI components, feature pages, services, and domain models.

```text
src/app/
├── core/
│   ├── models/
│   │   ├── flight.ts
│   │   ├── flight-filter.ts
│   │   └── flight-search.ts
│   │
│   └── services/
│       └── flight.service.ts
│
├── features/
│   └── flights/
│       ├── components/
│       │   ├── flight-search-form/
│       │   ├── flight-filters/
│       │   └── flight-card/
│       │
│       └── pages/
│           ├── flight-search/
│           └── flight-details/
│
├── app.component.*
├── app.config.ts
└── app.routes.ts

public/
└── mock-data/
    └── flights.json
```

## Component Responsibilities

### FlightSearchComponent

Acts as the container for the flight search feature.

Responsibilities include:

- Handling search criteria
- Loading flight data
- Maintaining flight result state
- Combining flight results with filter state
- Handling loading and error states

### FlightSearchFormComponent

Responsible for:

- Search form presentation
- Reactive Forms
- Form validation
- Emitting valid search criteria to the parent component

### FlightFiltersComponent

Responsible for:

- Airline filtering
- Stops filtering
- Maximum price filtering
- Reactive filter form changes

### FlightCardComponent

Reusable presentation component responsible for displaying an individual flight result.

### FlightDetailsComponent

Responsible for displaying information about the selected flight using the flight ID from the route.

## API / Data Source

For this assessment, a local mock JSON API is used:

```text
public/mock-data/flights.json
```

The data is accessed through `FlightService` using Angular `HttpClient`.

```text
GET /mock-data/flights.json
```

A local mock API was selected to keep the assessment self-contained and avoid dependency on third-party API credentials, rate limits, or external service availability.

In a production application, the same service layer could be connected to a backend REST API.

## RxJS Approach

Flight results and filters are maintained as separate reactive streams.

```text
Flight Results ───────┐
                      │
                      ├── combineLatest()
                      │        │
Filter State ─────────┘        │
                               ▼
                              map()
                               │
                               ▼
                       Filtered Flights
```

`BehaviorSubject` provides the latest flight and filter state.

`combineLatest` recalculates the displayed results whenever either the flight results or filters change.

The Angular `AsyncPipe` is used in the template to consume the filtered results observable.

## Routing

The application uses lazy-loaded standalone components.

Main routes:

```text
/flights
/flights/:id
```

`/flights` displays the flight search page.

`/flights/:id` displays details for the selected flight.

## Running the Application

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/RaghuramanAngular/angular-flight-search.git
```

Navigate into the project:

```bash
cd angular-flight-search
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx ng serve
```

Open:

```text
http://localhost:4200
```

## Production Build

Run:

```bash
npx ng build
```

The production build output will be generated in the `dist/` directory.

## Example Search

The mock dataset contains sample flights such as:

```text
Chennai (MAA) → Bengaluru (BLR)
```

This route can be used to quickly test flight search, filtering, and flight details functionality.

## Key Technical Decisions

### Standalone Components

Angular standalone components are used to reduce module boilerplate and follow modern Angular architecture.

### Reactive Forms

Reactive Forms were selected because they provide explicit form state management, validation, and strong integration with RxJS.

### Service Layer

HTTP communication is isolated inside `FlightService` rather than performed directly inside UI components.

This keeps data-access responsibilities separate from presentation logic.

### Reusable Components

Search form, filters, flight cards, and page-level components are separated based on responsibility to improve maintainability and reusability.

### Lazy-Loaded Routes

Feature pages are loaded using `loadComponent`, reducing initial coupling and demonstrating Angular standalone routing.

## Assumptions

- Flight data is provided through a local mock JSON file.
- Search availability is based on the mock dataset.
- The current mock search primarily matches origin and destination.
- Passenger count does not currently modify flight pricing.
- Return-flight availability is not modeled separately in the mock dataset.
- Prices are represented in INR.
- Authentication, booking, payment, and seat selection are outside the scope of this assessment.

## Future Improvements

Given additional development time, the application could be extended with:

- Additional unit test coverage
- More comprehensive loading and error-state UI
- Date-aware flight availability
- Return-flight search
- Dynamic airline filter options from API data
- Search-state persistence using query parameters or a state service
- Sorting by price, duration, or departure time
- Pagination for larger result sets
- Accessibility enhancements
- Further responsive UI polish

## Repository

GitHub:

```text
https://github.com/RaghuramanAngular/angular-flight-search
```