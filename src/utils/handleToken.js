export const getToken = () => JSON.parse(localStorage.getItem("access_token"));

export const setToken = (token) =>
  JSON.stringify(localStorage.setItem("access_token", token));
