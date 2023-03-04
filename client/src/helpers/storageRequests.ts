const AUTH_KEY = "BRHUB_AUTH";

const getAuth = () => {
  if (!localStorage) return null;
  const authToken = localStorage.getItem(AUTH_KEY);
  return authToken;
};

const setAuth = (token: string) => {
  if (!localStorage) return null;
  if (token) localStorage.setItem(AUTH_KEY, token);
};

const removeAuth = () => {
  if (!localStorage) return null;
  localStorage.removeItem(AUTH_KEY);
};

export const storageRequest = {
  getAuth,
  setAuth,
  removeAuth,
};
