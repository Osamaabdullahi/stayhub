import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaRegCalendar,
  FaUser,
} from "react-icons/fa";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const router = useRouter();

  const handleNavigation = () => {
    router.push(
      `/listing/?location=${location}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleNavigation();
  };

  return (
    <div className="flex items-center justify-center   h-[100px]  bg-white-100">
      <form
        onSubmit={handleSearch}
        className="w-full max-w-4xl bg-white rounded-full shadow-lg p-1 flex flex-col md:flex-row"
      >
        <div className="flex-1 min-w-0 px-4 py-2 md:py-0 md:border-r border-gray-300">
          <label
            htmlFor="location"
            className="block text-xs font-medium text-gray-700"
          >
            Where
          </label>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search destinations"
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0 px-4 py-2 md:py-0 md:border-r border-gray-300">
          <label
            htmlFor="check-in"
            className="block text-xs font-medium text-gray-700"
          >
            Check in
          </label>
          <div className="flex items-center">
            <FaRegCalendar className="text-gray-400 mr-2" />
            <input
              type="date"
              id="check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0 px-4 py-2 md:py-0 md:border-r border-gray-300">
          <label
            htmlFor="check-out"
            className="block text-xs font-medium text-gray-700"
          >
            Check out
          </label>
          <div className="flex items-center">
            <FaRegCalendar className="text-gray-400 mr-2" />
            <input
              type="date"
              id="check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0 px-4 py-2 md:py-0">
          <label
            htmlFor="guests"
            className="block text-xs font-medium text-gray-700"
          >
            Guests
          </label>
          <div className="flex items-center">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Add guests"
              min="1"
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
