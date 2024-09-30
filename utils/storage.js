// Save tokens to localStorage
export const saveToken = (data) => {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
};

// Get access token from localStorage
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// Get refresh token from localStorage
export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

// Remove tokens from localStorage
export const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
