export default async function putToDoTaskValue(value, inputValue) {
  const response = await fetch(`https://easydev.club/api/v1//todos/${value}`, {
    method: "PUT",
    body: JSON.stringify({ title: inputValue }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
