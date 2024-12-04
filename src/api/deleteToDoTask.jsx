export default async function deleteToDoTask(value) {
  const response = await fetch(`https://easydev.club/api/v1//todos/${value}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
