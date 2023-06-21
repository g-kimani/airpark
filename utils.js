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

export function getParkings(location) {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = location;
  const ne_lat = latitude + latitudeDelta / 2;
  const ne_lng = longitude + longitudeDelta / 2;

  const sw_lat = latitude - latitudeDelta / 2;
  const sw_lng = longitude - longitudeDelta / 2;

  const query = `ne_lat=${ne_lat}&ne_lng=${ne_lng}&sw_lat=${sw_lat}&sw_lng=${sw_lng}`;
  return airparkAPI.get(`/parkings?${query}`).then((response) => {
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

  return SecureStore.getItemAsync("auth-token")
    .then((token) => {
      return airparkAPI.post("/parkings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then((response) => {
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

export function getParkingsForUser() {
  return SecureStore.getItemAsync("user_id").then((user_id) => {
    return airparkAPI.get(`/parkings?host_id=${user_id}`).then((response) => {
      let { parkings } = response.data;
      const formatted = parkings.map((parking) => {
        const latitude = parking.location.x;
        const longitude = parking.location.y;
        delete parking.location;
        return { ...parking, latitude, longitude };
      });
      return formatted;
    });
  });
}

export function getParkingBookings(parking_id) {
  return SecureStore.getItemAsync("auth-token")
    .then((token) => {
      return airparkAPI.get(`/parkings/${parking_id}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then((response) => {
      return response.data;
    });
}

export function updateBookingStatus(booking_id, status) {
  return SecureStore.getItemAsync("auth-token")
    .then((token) => {
      return airparkAPI.patch(
        `/bookings/${booking_id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    })
    .then((response) => {
      return response.data;
    });
}

export function getUserProfile(user) {
  return airparkAUTH
    .get("/profile", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
}
