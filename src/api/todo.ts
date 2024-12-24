import axios from "axios";
import store from "../store.ts";
const instance = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

type UserRegistration = {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
};

type UserLogin = {
  login: string;
  password: string;
};

export async function putToDoTaskValue(value: number, inputValue: string) {
  try {
    const response = await instance.put(`/todos/${value}`, {
      title: inputValue,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw "An unknown error occurred";
    }
  }
}

export async function putToDoTaskStatus(value: number, newStatus: boolean) {
  try {
    const response = await instance.put(`/todos/${value}`, {
      isDone: newStatus,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw "An unknown error occurred";
    }
  }
}

export async function postToDoTask(value: string) {
  try {
    const response = await instance.post("/todos", {
      title: value,
      isDone: false,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw "An unknown error occurred";
    }
  }
}

export async function getToDoList(category: string) {
  try {
    const response = await instance.get(`/todos`, {
      params: { filter: category },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw "An unknown error occurred";
    }
  }
}

export async function deleteToDoTask(value: number) {
  try {
    const response = await instance.delete(`/todos/${value}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw "An unknown error occurred";
    }
  }
}

export async function postRegisterProfile(value: UserRegistration) {
  try {
    const response = await instance.post("/auth/signup", {
      login: value.login,
      username: value.username,
      password: value.password,
      email: value.email,
      phoneNumber: value.phoneNumber,
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

export async function postLoginProfile(value: UserLogin) {
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

export async function getUserProfile() {
  const state = store.getState();
  const accessToken = state.auth.accessToken;

  try {
    const response = await instance.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
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
