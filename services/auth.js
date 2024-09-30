"use client";
import {
  saveToken,
  removeToken,
  getRefreshToken,
  getAccessToken,
} from "../utils/storage";
import { signOut } from "next-auth/react";

export const Register = async (first_name, last_name, email, password) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/accounts/api/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, email, password }),
    }
  );
  const data = await response.json();
  console.log(response);
  console.log(data);
  if (response.ok) {
    saveToken(data);
  }
};
// Login function
export const login = async (email, password) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/accounts/api/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  saveToken(data);
};

// Logout function
export const logout = async () => {
  const refreshToken = getRefreshToken();

  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/accounts/api/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  removeToken(); // Remove tokens from localStorage()
  signOut();
  router.push("/account/sighin");
};

// Refresh token function
export const refreshToken = async () => {
  const refresh = getRefreshToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/accounts/api/token/refresh/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${refresh}`,
      },
      body: JSON.stringify({ refresh }),
    }
  );

  if (!response.ok) {
    router.push("/account/sighin");
    return null;
  }

  const data = await response.json();
  saveToken(data); // Update tokens
  return data.access;
};
