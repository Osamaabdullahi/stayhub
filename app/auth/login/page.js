"use client";
import React, { useState, useEffect } from "react";
import { FaHome, FaGoogle } from "react-icons/fa";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { saveToken } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { useAuth } from "@/components/AuthProvider";

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = useAuthStore((state) => state.login);

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    setLoading(false);
    e.preventDefault();
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
    const data = await response.json();
    console.log(response);
    console.log(data);
    if (response.ok) {
      saveToken(data);
      setIsAuthenticated(!isAuthenticated);
      setLoading(true);
      await signOut({ redirect: false });
      router.push("/");
    }
  };

  const sendTokenToBackend = async (token) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/accounts/auth/google/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();

      if (response.ok) {
        saveToken(data);
        setIsAuthenticated(!isAuthenticated);

        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (session) {
      const token = session?.idToken;
      if (token) {
        sendTokenToBackend(token);
      }
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      {Loading ? (
        <div className="min-h-screen flex">
          {/* Left Half - Icon Section with Background Image */}
          <div className="hidden lg:flex items-center justify-center w-1/2 bg-gradient-to-b from-gray-900 to-transparent text-white relative">
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-red-600">
              <FaHome className="text-6xl mb-4" />
              <h1 className="text-3xl font-bold mb-2 text-white">StayHub</h1>
              <p className="text-lg text-white">
                Find your perfect stay with us!
                {error}
              </p>
            </div>
            <Image
              src="https://i.pinimg.com/474x/26/b1/ec/26b1ec666b633fa6e54b2279b5c09e01.jpg"
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="absolute inset-0 z-0"
            />
          </div>

          {/* Right Half - Login Form Section shadow-lg" */}
          <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
            <div className="max-w-md w-full bg-white p-6 rounded-lg ">
              <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
                <FaHome className="inline-block mr-2 text-2xl" />
                Login to StayHub
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your password: myapp@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your password: 1234"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="mr-2"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-2 mt-4 bg-red-600"
                >
                  {Loading ? (
                    <>
                      <FaHome className="inline-block mr-2 text-xl" />
                      login
                    </>
                  ) : (
                    <SmallSpinner />
                  )}
                </button>

                <p className="text-sm text-red-600 mt-4">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-500 hover:underline text-blue-500"
                  >
                    Sign up here
                  </a>
                </p>
              </form>
              <button
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none mt-2"
              >
                <FaGoogle className="text-xl mr-2 text-blue-500" />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      ) : (
        <LargeSpinner />
      )}
    </>
  );
};

export default LoginPage;

function LargeSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

function SmallSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-6 h-6 border-2 border-t-2 border-blue-500 rounded-full"
        style={{
          borderTopColor: "transparent", // Hide the border on top to create spinning effect
          animation: "spin 1s linear infinite", // Use inline styles for spinning
        }}
      ></div>
    </div>
  );
}
