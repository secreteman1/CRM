export const loginSuccess = (accessToken: string, refreshToken: string) => ({
  type: "LOGIN_SUCCESS",
  payload: { accessToken, refreshToken },
});

export const logout = () => ({ type: "LOGOUT" });
