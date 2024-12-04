export default async function putToDoTaskStatus(value, newStatus) {
  const response = await fetch(`https://easydev.club/api/v1//todos/${value}`, {
    method: "PUT",
    body: JSON.stringify({ isDone: newStatus }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
