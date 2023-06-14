export type NavigationStackParamList = {
  Map: undefined;
  HomePage: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: { userid: "string" } | undefined;
};

export type UserContextTypes = {
  user?: any;
  setUser?: any;
};
