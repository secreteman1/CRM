import { instance } from "./todo";
import { UserRegistration } from "./model";
import { UserLogin } from "./model";

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

export async function refreshAccessToken(refreshToken: string | null) {
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
