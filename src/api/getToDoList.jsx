export default async function getToDoList(category) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${category}`,
    { method: "GET" }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
