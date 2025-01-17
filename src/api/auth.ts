import { instance } from "./todo";
import { UserRegistration, UserLogin } from "../types/types";

export async function registerProfile(value: UserRegistration) {
  try {
    const response = await instance.post("/auth/signup", value);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function loginProfile(value: UserLogin) {
  try {
    const response = await instance.post("/auth/signin", {
      login: value.login,
      password: value.password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const response = await instance.post("/auth/refresh", {
      refreshToken: refreshToken,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}
