import axios from "axios";

const instance = axios.create({
  baseURL: "https://easydev.club/api/v1/todos",
});

export async function putToDoTaskValue(value: number, inputValue: string) {
  try {
    const response = await instance.put(`/${value}`, {
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
    const response = await instance.put(`/${value}`, {
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
    const response = await instance.post("", {
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
    const response = await instance.get(``, {
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
    const response = await instance.delete(`/${value}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw "An unknown error occurred";
    }
  }
}
