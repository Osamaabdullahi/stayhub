import { refreshToken } from "./auth";
import { getAccessToken } from "../utils/storage";

export const fetchWithAuth = async (url, options = {}) => {
  let accessToken = getAccessToken();

  const defaultHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Access token expired, refresh it
    accessToken = await refreshToken();
    if (accessToken) {
      // Retry original request
      response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  }

  return response;
};
