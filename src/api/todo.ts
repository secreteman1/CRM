import axios from "axios";

export const instance = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

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
