import { instance } from "./todo";
import { getAccessToken } from "./admin";
instance.interceptors.request.use((config) => {
  if (getAccessToken()) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
  }
  return config;
});

export async function getUserProfile() {
  try {
    const response = await instance.get("/user/profile");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}
