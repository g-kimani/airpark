import axios from "axios";
import * as SecureStore from "expo-secure-store";

export async function saveToStore(key, value) {
  console.log(key, value);

  console.log("🚀 ~ file: utils.js:6 ~ saveToStore ~ value:", value);
  await SecureStore.setItemAsync(key, value);
}

const airparkAPI = axios.create({
  baseURL: "https://airpark-api.onrender.com/api",
});

const airparkAUTH = axios.create({
  baseURL: "https://airpark-api.onrender.com",
});

export function loginUser(user) {
  return airparkAUTH.post("/login", user).then((response) => {
    return response.data;
  });
}

export function signUpUser(user) {
  return airparkAUTH.post("/signup", user).then((response) => {
    return response.data;
  });
}

export function getParkings() {
  return airparkAPI.get("/parkings").then((response) => {
    // console.log(response.data);
    const { parkings } = response.data;
    const formatted = parkings.map((parking) => {
      const latitude = parking.location.x;
      const longitude = parking.location.y;
      delete parking.location;
      return { ...parking, latitude, longitude };
    });
    return formatted;
  });
}

export function postParking(parking) {
  parking = { host_id: 3, is_booked: false, ...parking };
  console.log("🚀 ~ file: utils.js:46 ~ postParking ~ parking:", parking);
  return airparkAPI.post("/parkings", parking).then((response) => {
    console.log(response.data);
    return response.data;
  });
}
