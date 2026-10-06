export interface Flight {
  id: number;
  airline: string;
  flightNumber: string;

  from: string;
  fromCode: string;

  to: string;
  toCode: string;

  departureTime: string;
  arrivalTime: string;

  duration: string;
  price: number;
  stops: number;
}