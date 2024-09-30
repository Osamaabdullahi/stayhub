"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MenuIcon,
  XIcon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { useAuth } from "./AuthProvider";
import { getAccessToken } from "@/utils/storage";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Token, setToken] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const { isAuthenticated, handleLogout } = useAuth();

  useEffect(() => {
    if (getAccessToken()) {
      setToken(jwtDecode(getAccessToken()));
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setHasNewNotifications(false);
  };

  const handleSighout = async () => {
    await signOut({ redirect: false });
    handleLogout();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-red-600">StayHub</h1>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Stays
                </Link>
                <Link
                  href="/listing"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Experiences
                </Link>
                <Link
                  href="/listyourhome"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  List your home
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <>
                  <div className="ml-3 relative" ref={notificationRef}>
                    <button
                      onClick={toggleNotification}
                      className="p-1 rounded-full text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" />
                      {hasNewNotifications && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                      )}
                    </button>
                    {isNotificationOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                        <div className="px-4 py-2 text-sm text-gray-700">
                          You have no new notifications.
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ml-3 relative" ref={dropdownRef}>
                    <div>
                      <button
                        onClick={toggleDropdown}
                        className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        id="user-menu"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src="https://i.pinimg.com/474x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg"
                          alt="User avatar"
                          width={32}
                          height={32}
                        />
                        <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                    {isDropdownOpen && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <Link
                          href={`/account/profile/${Token.user_id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Your Profile
                        </Link>
                        <a
                          href="/account/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Settings
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => handleSighout()}
                        >
                          Sign out
                        </a>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/auth/sighup">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out">
                      Sign up
                    </button>
                  </Link>
                  <Link href="/auth/login">
                    <button className="text-red-600 px-4 py-2 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out">
                      Log in
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Stays
          </Link>
          <Link
            href="/experiences"
            className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Experiences
          </Link>
          <Link
            href="/host"
            className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            List your home
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Image
                  className="h-10 w-10 rounded-full"
                  src="https://i.pinimg.com/474x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg"
                  alt="User avatar"
                  width={40}
                  height={40}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-gray-800">
                  Tom Cook
                </div>
                <div className="text-sm font-medium leading-none text-gray-500">
                  tom@example.com
                </div>
              </div>
              <button
                onClick={toggleNotification}
                className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
                {hasNewNotifications && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                )}
              </button>
            </div>
          ) : (
            <div className="px-5 space-y-2">
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Sign up
              </button>
              <button className="w-full text-red-600 px-4 py-2 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Log in
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
