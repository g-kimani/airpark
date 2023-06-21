export interface NavigationStackParamList {
  Map: undefined;
  HomePage: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: { userid: "string" } | undefined;
  ExplorePage: undefined;
}

export type UserContextTypes = {
  user?: any;
  setUser?: any;
};

export type LocationObject = {
  lat?: string;
  long?: string;
};

export type ParkingContextTypes = {
  parkings?: any[];
  setParkings?: any;
};

export type Booking = {
  booking_id: number;
  traveller_id: number;
  parking_id: number;
  status?: string;
  booking_start: string;
  booking_end: string;
  price: number;
};

export type Parking = {
  parking_id: number;
  area: string;
  description: string;
  host_id: number;
  is_booked: boolean;
  latitude: string;
  longitude: string;
  picture: string;
  price: number;
};
