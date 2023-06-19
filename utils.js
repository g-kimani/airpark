import axios from "axios";
import * as SecureStore from "expo-secure-store";

export async function saveToStore(key, value) {
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
  // //console.log("🚀 ~ file: utils.js:46 ~ postParking ~ parking:", parking);
  const formData = new FormData();
  formData.append("picture", {
    uri: parking.image.uri,
    name: `${Date.now()}-image.png`,
    type: "image/png",
  });
  formData.append("area", parking.area);
  formData.append("longitude", parking.longitude);
  formData.append("latitude", parking.latitude);
  formData.append("description", parking.description);
  formData.append("price", parking.price);
  //console.log("🚀 ~ file: utils.js:54 ~ postParking ~ formData:", formData);

  // parking = { host_id: 3, is_booked: false, ...parking };
  // //console.log("🚀 ~ file: utils.js:46 ~ postParking ~ parking:", parking);
  return SecureStore.getItemAsync("auth-token")
    .then((token) => {
      //console.log("🚀 ~ file: utils.js:60 ~ .then ~ token:", token);
      return airparkAPI.post("/parkings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then((response) => {
      //console.log(response.data);
      return response.data;
    });
}

export function postBooking(booking) {
  return SecureStore.getItemAsync("auth-token")
    .then((token) => {
      return airparkAPI.post("/bookings", booking, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then((response) => {
      return response.data;
    });
}

export function getBookings() {
  return SecureStore.getItemAsync("auth-token")
    .then((token) => {
      return airparkAPI.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then((response) => {
      return response.data;
    });
}
