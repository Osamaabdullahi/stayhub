"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaGoogle, FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { saveToken } from "@/utils/storage";
import { useSession, signIn, signOut } from "next-auth/react";
import { Register } from "@/services/auth";
import { useAuth } from "@/components/AuthProvider";

const SignupPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    setLoading(false);
    e.preventDefault();
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

    if (response.ok) {
      await signOut({ redirect: false });
      saveToken(data);
      setIsAuthenticated(!isAuthenticated);

      setLoading(true);
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
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
              <FaHome className="text-6xl  mb-4" />
              <h1 className="text-3xl font-bold mb-2 ">StayHub</h1>
              <p className="text-lg">Find your perfect stay with us!</p>
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

          {/* Right Half - Signup Form Section  shadow-lg second line near rounded  p-8 down below*/}
          <div className="w-full lg:w-1/2 flex justify-center items-center  ">
            <div className="max-w-md w-full bg-white p-6 rounded-lg  ">
              <h2 className="text-2xl font-bold mb-4 text-center text-red-500">
                <FaHome className="inline-block mr-2 text-2xl " />
                Join StayHub
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Firstname
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={first_name}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    onChange={(e) => setfirst_name(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Lastname
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={last_name}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your last name"
                    onChange={(e) => setlast_name(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-2 bg-red-500"
                >
                  Sign Up
                </button>
                <p className="text-sm text-gray-700">
                  Already have an account?{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Log in here
                  </a>
                </p>
                {/* Google Login Button */}
              </form>
              <button
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none mt-2"
              >
                <FaGoogle className="text-xl mr-2 text-blue-500" />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SignupPage;

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}
