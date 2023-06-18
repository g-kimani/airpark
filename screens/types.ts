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
