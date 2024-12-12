export async function putToDoTaskValue(value: number, inputValue: string) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1//todos/${value}`,
      {
        method: "PUT",
        body: JSON.stringify({ title: inputValue }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}

export async function putToDoTaskStatus(value: number, newStatus: boolean) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1//todos/${value}`,
      {
        method: "PUT",
        body: JSON.stringify({ isDone: newStatus }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}

export async function postToDoTask(value: string) {
  try {
    const response = await fetch("https://easydev.club/api/v1/todos", {
      method: "POST",
      body: JSON.stringify({ title: value, isDone: false }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}

export async function getToDoList(category: string) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${category}`,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}

export async function deleteToDoTask(value: number) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1//todos/${value}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
}
