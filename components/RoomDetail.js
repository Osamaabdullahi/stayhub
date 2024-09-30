"use client";

import Reviews from "@/components/Reviews";
import React, { useState, useEffect } from "react";
import { FaTv, FaBed } from "react-icons/fa";
import { FiHome, FiUser, FiUsers } from "react-icons/fi";
import NotificationComponent from "./Notification";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { getAccessToken, getRefreshToken } from "@/utils/storage";
import { jwtDecode } from "jwt-decode";
import HostProfile from "../components/HostProfile";

const optionsData = [
  { location: "Schwechat", category: "Vacation rentals" },
  { location: "Wien", category: "Vacation rentals" },
  { location: "Vienna", category: "Vacation rentals" },
  { location: "Bratislava", category: "Vacation rentals" },
  { location: "Arb", category: "Vacation rentals" },
  { location: "Brno", category: "Vacation rentals" },
  { location: "Graz", category: "Vacation rentals" },
  { location: "Budapest", category: "Vacation rentals" },
  { location: "Hallstatt", category: "Vacation rentals" },
  { location: "Salzburg", category: "Vacation rentals" },
];

const RoomDetail = ({ params }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  let User;

  if (isAuthenticated) {
    User = jwtDecode(getAccessToken());
  }

  const [RoomData, setRoomData] = useState(null);
  const [Amenities, setAmenities] = useState(null);
  const [Pictures, setPictures] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [HostDetails, SetHostDetails] = useState([]);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [guests, setGuests] = useState(1);

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleShowNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const getData = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/listings/${params.id}/`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setRoomData(data);
    }
  };

  const getAmenities = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/amenities/?listing=${params.id}`
    );
    const data = await response.json();

    if (response.ok) {
      setAmenities(data);
    }
  };

  const getImages = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/listing-images/?listing_id=${params.id}`
    );
    const data = await response.json();

    if (response.ok) {
      setPictures(data);
    }
  };

  const getUserDetails = async (id) => {
    if (RoomData) {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/profile/?user=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        SetHostDetails(data);
      }
    }
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      const days = calculateDays(checkIn, checkOut); // Calculate the number of days
      setNumberOfDays(days); // Update the number of days state
      setTotalPrice(days * RoomData.price_per_night); // Update the total price state
    }
  }, [checkIn, checkOut]);

  const handleBooking = async () => {
    if (isAuthenticated) {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/bookings/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          check_in: checkIn,
          check_out: checkOut,
          guests,
          total_price: totalPrice,
          user: `${User.user_id}`,
          listing: RoomData.id,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        handleShowNotification(
          `you have booked this ${RoomData.title} succesfully for ${numberOfDays} at ${totalPrice} `
        );
        setCheckIn("");
        setCheckIn("");
        setNumberOfDays(0);
        setTotalPrice(0);
        setGuests(0);
      }
    } else {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    getData();
    getAmenities();
    getImages();
    if (RoomData?.owner?.id) {
      getUserDetails(RoomData.owner.id);
    }
  }, [params, RoomData]);

  const handleGuestsChange = (e) => {
    setGuests(parseInt(e.target.value)); // Convert the selected value to a number and update the state
  };

  if (!RoomData || !Amenities || !Pictures) return <div>Loading....</div>;

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 ">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-2">{RoomData.title}</h1>

          <div className="flex space-x-4 text-gray-500 mb-4">
            <span>
              <FiUsers className="inline mr-2" />
              {RoomData.max_guests} guests
            </span>
            <span>
              <FaBed className="inline mr-2" />
              {RoomData.bedrooms} bedrooms
            </span>
            <span>
              <FaBed className="inline mr-2" />
              {RoomData.bedrooms} beds
            </span>
            <span>
              <FiHome className="inline mr-2" />
              {RoomData.bathrooms} baths
            </span>
          </div>
        </div>

        {/* Images Section */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-3 relative">
            <img
              src={RoomData.mainImage_url}
              alt="Room Image 1"
              className="object-cover w-full h-[60vh] rounded-lg"
            />
            <button className="absolute left-4 bottom-4 bg-white border border-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100">
              Show all photos
            </button>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <img
              src={Pictures[0]?.image_url}
              alt="Room Image 2"
              className="object-cover w-full h-[30vh] rounded-lg"
            />
            <img
              src={Pictures[1]?.image_url}
              alt="Room Image 3"
              className="object-cover w-full h-[30vh] rounded-lg"
            />
            <img
              src={Pictures[2]?.image_url}
              alt="Room Image 4"
              className="object-cover w-full h-[30vh] rounded-lg"
            />
            <img
              src={Pictures[3]?.image_url}
              alt="Room Image 5"
              className="object-cover w-full h-[30vh] rounded-lg"
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mt-6">
          <p className="text-2xl font-semibold text-gray-800">
            KSh {RoomData.price_per_night}/night
          </p>
        </section>

        <div className="flex flex-wrap">
          {/* Description and Amenities Section */}
          <div className="w-full lg:w-3/5 pr-8">
            {/* Description Section */}
            <div className="flex flex-wrap mt-6">
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-4">{RoomData.description}</p>
                  <p className="mb-4">
                    The apartment is composed of 1 separate bedroom, a fully
                    equipped kitchen, and 1 bathroom. A flat-screen TV is
                    provided. A bar can be found on-site.
                  </p>
                  <p>
                    Mamba Village Crocodile Farm is 14 km from the apartment,
                    while Nyali Cinemax Movie Theatre is 17 km away. The nearest
                    airport is Vipingo Airport, 20 km from Kehree Homes Studio
                    with One Bed.
                  </p>
                </div>
              </div>
            </div>
            {/* Amenities Section */}
            <section className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Amenities?.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
                  >
                    {/* Static Icon */}

                    <FaTv className="text-3xl text-gray-700" />

                    <span className="mt-2 text-lg text-gray-800 text-center">
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Reservation Section */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-[80px] mt-6 lg:mt-0 h-full">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Reserve This Property
              </h3>
              <p className="text-gray-700 mb-4">
                Choose your dates and number of guests to reserve this property.
              </p>
              <div className="mb-4">
                <label className="block text-gray-700">Check-in:</label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Check-out:</label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Guests:</label>

                <select
                  required
                  id="guests"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={guests} // Set the value to the guests state
                  onChange={handleGuestsChange} // Update the guests state when an option is selected
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>
              <button
                onClick={() => handleBooking()}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <HostProfile
        host={{
          profilePicture:
            "https://i.pinimg.com/474x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg",
          name: RoomData.owner.first_name,
          joinedYear: RoomData.owner.date_joined,
          rating: 5.6,
          reviews: "10",
          responseTime: "10 hours",
          responseRate: "17",
          interaction: HostDetails[0]?.country,
          bio: HostDetails[0]?.bio,
          isSuperhost: HostDetails[0]?.is_superhost,
          id: RoomData.owner.id,
        }}
      />
      <Reviews />
      {/* {explore other options sections} */}
      <section className="py-8 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Explore other options
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {optionsData.map((option, index) => (
            <a
              key={index}
              href="#"
              className="block text-center text-blue-600 hover:text-blue-800 underline"
            >
              <h3 className="text-xl font-semibold mb-1 text-gray-900">
                {option.location}
              </h3>
              <p className="text-gray-700">{option.category}</p>
            </a>
          ))}
        </div>
      </section>

      {showNotification && (
        <NotificationComponent
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default RoomDetail;

const Skeleton = () => {
  <div className="max-w-7xl mx-auto p-4 animate-pulse">
    {/* Title and Description Skeleton */}
    <div className="mb-6">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="flex space-x-4">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>

    {/* Images Section Skeleton */}
    <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
      <div className="lg:col-span-3 bg-gray-300 h-[60vh] rounded-lg"></div>
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-gray-300 h-[30vh] rounded-lg"></div>
        <div className="bg-gray-300 h-[30vh] rounded-lg"></div>
        <div className="bg-gray-300 h-[30vh] rounded-lg"></div>
        <div className="bg-gray-300 h-[30vh] rounded-lg"></div>
      </div>
    </section>

    {/* Pricing Skeleton */}
    <div className="h-6 bg-gray-300 rounded w-1/4 mt-6"></div>

    <div className="flex flex-wrap">
      {/* Description Section Skeleton */}
      <div className="w-full lg:w-3/5 pr-8 mt-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>

      {/* Reservation Section Skeleton */}
      <div className="w-full lg:w-2/5 lg:sticky lg:top-[80px] mt-6 lg:mt-0 h-full">
        <div className="p-6 bg-gray-300 rounded-lg shadow-lg h-[350px]"></div>
      </div>
    </div>
  </div>;
};
