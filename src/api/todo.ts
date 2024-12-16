import axios from "axios";

export async function putToDoTaskValue(value: number, inputValue: string) {
  try {
    const response = await axios.put(
      `https://easydev.club/api/v1//todos/${value}`,
      {
        title: inputValue,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}

export async function putToDoTaskStatus(value: number, newStatus: boolean) {
  try {
    const response = await axios.put(
      `https://easydev.club/api/v1//todos/${value}`,
      { isDone: newStatus }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}

export async function postToDoTask(value: string) {
  try {
    const response = await axios.post("https://easydev.club/api/v1/todos", {
      title: value,
      isDone: false,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}

export async function getToDoList(category: string) {
  try {
    const response = await axios.get(
      `https://easydev.club/api/v1/todos?filter=${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}

export async function deleteToDoTask(value: number) {
  try {
    const response = await axios.delete(
      `https://easydev.club/api/v1//todos/${value}`
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}
