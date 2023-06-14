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
