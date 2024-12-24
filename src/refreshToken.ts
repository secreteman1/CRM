// refreshToken.js
import store from "./store"; // Adjust the import as needed
import { loginSuccess } from "./authAction";

export const refreshAccessToken = async () => {
  const state = store.getState();
  const refreshToken = state.auth.refreshToken;

  const response = await fetch("/api/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const { accessToken } = await response.json();
    store.dispatch(loginSuccess(accessToken, refreshToken));
    localStorage.setItem("accessToken", accessToken);
  } else {
    // Handle token refresh failure (e.g., logout the user)
  }
};
