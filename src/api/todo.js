export async function putToDoTaskValue(value, inputValue) {
  const response = await fetch(`https://easydev.club/api/v1//todos/${value}`, {
    method: "PUT",
    body: JSON.stringify({ title: inputValue }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function putToDoTaskStatus(value, newStatus) {
  const response = await fetch(`https://easydev.club/api/v1//todos/${value}`, {
    method: "PUT",
    body: JSON.stringify({ isDone: newStatus }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function postToDoTask(value) {
  const response = await fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    body: JSON.stringify({ title: value, isDone: false }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function getToDoList(category) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${category}`,
    { method: "GET" }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function deleteToDoTask(value) {
  const response = await fetch(`https://easydev.club/api/v1//todos/${value}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
