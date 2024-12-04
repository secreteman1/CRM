export default async function postToDoTask(value) {
  const response = await fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    body: JSON.stringify({ title: value, isDone: false }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
