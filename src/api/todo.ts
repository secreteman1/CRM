export async function putToDoTaskValue(value: number, inputValue: string) {
  const response = await fetch(`https://easydev.club/api/v1//todos/${value}`, {
    method: "PUT",
    body: JSON.stringify({ title: inputValue }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function putToDoTaskStatus(value: number, newStatus: boolean) {
  const response = await fetch(`https://easydev.club/api/v1//todos/${value}`, {
    method: "PUT",
    body: JSON.stringify({ isDone: newStatus }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function postToDoTask(value: string) {
  const response = await fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    body: JSON.stringify({ title: value, isDone: false }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function getToDoList(category: string) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${category}`,
    { method: "GET" }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function deleteToDoTask(value: number) {
  const response = await fetch(`https://easydev.club/api/v1//todos/${value}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
