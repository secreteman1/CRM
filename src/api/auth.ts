import axios from "axios";
import { UserRegistration } from "./model";
import { UserLogin } from "./model";

const instance = axios.create({
  baseURL: "https://easydev.club/api/v1/auth",
});

export async function postRegisterProfile(value: UserRegistration) {
  try {
    const response = await instance.post("/signup", value);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function postLoginProfile(value: UserLogin) {
  try {
    const response = await instance.post("/signin", {
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

export async function postRefreshToken(refreshToken: string | null) {
  try {
    const response = await instance.post("/refresh", {
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
