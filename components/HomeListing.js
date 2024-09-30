"use client";

import React, { useState } from "react";
import { FiHome, FiUsers, FiDollarSign, FiMapPin } from "react-icons/fi";
import { FaBed, FaHome } from "react-icons/fa";
import NotificationComponent from "./Notification";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const categories = [
  "Beach house",
  "Castles",
  "Amazing views",
  "Amazing pools",
  "Tropical",
  "National parks",
  "Lakefront",
  "Campers",
  "Islands",
  "top cities!",
  "Beach",
  "Design",
  "historical ",
];

function HomeListing() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  let User;

  if (isAuthenticated) {
    User = jwtDecode(getAccessToken());
  }

  const handleShowNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const [listing, setListing] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    price: "",
    maxGuests: "1",
    bedrooms: "1",
    bathrooms: "1",
    isAvailable: true,
    category: "",
    mainImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setListing((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      uploadListing();
    } else {
      router.push("/auth/login");
    }
  };

  const uploadListing = async () => {
    const formData = new FormData();
    formData.append("title", listing.title);
    formData.append("description", listing.description);
    formData.append("address", listing.address);
    formData.append("city", listing.city);
    formData.append("state", listing.state);
    formData.append("country", listing.country);
    formData.append("price_per_night", listing.price);
    formData.append("max_guests", listing.maxGuests);
    formData.append("bedrooms", listing.bedrooms);
    formData.append("bathrooms", listing.bathrooms);
    formData.append("is_available", listing.isAvailable);
    formData.append("category", listing.category);
    formData.append("owner", jwtDecode(getAccessToken()).user_id);

    if (listing.mainImage) {
      formData.append("image", listing.mainImage);
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/addlisting/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
        body: formData,
      });

      const data = await response.json();
      console.log(response);
      console.log(data);

      if (response.ok) {
        handleShowNotification("Listing successfully created!");
      } else {
        handleShowNotification(`Failed to create listing: ${data.detail}`);
      }
    } catch (error) {
      console.error("Error uploading listing:", error);
      handleShowNotification("Error uploading listing");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">List Your Home</h1>

        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Form */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  name="title"
                  value={listing.title}
                  onChange={handleInputChange}
                  placeholder="Cozy Apartment in Downtown"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  value={listing.description}
                  onChange={handleInputChange}
                  placeholder="Describe your place"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  name="address"
                  value={listing.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                />
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    name="city"
                    value={listing.city}
                    onChange={handleInputChange}
                    placeholder="City"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    type="text"
                    name="state"
                    value={listing.state}
                    onChange={handleInputChange}
                    placeholder="State"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="country"
                    type="text"
                    name="country"
                    value={listing.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price per Night
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    name="price"
                    value={listing.price}
                    onChange={handleInputChange}
                    placeholder="$"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="maxGuests"
                  >
                    Max Guests
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="maxGuests"
                    type="number"
                    name="maxGuests"
                    value={listing.maxGuests}
                    onChange={handleInputChange}
                    placeholder="4"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="bedrooms"
                  >
                    Bedrooms
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bedrooms"
                    type="number"
                    name="bedrooms"
                    value={listing.bedrooms}
                    onChange={handleInputChange}
                    placeholder="2"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="bathrooms"
                  >
                    Bathrooms
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bathrooms"
                    type="number"
                    name="bathrooms"
                    value={listing.bathrooms}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="category"
                  name="category"
                  value={listing.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mainImage"
                >
                  Main Image
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="mainImage"
                  type="file"
                  name="mainImage"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={listing.isAvailable}
                    onChange={handleInputChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Available for booking</span>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  List Property
                </button>
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className="w-full md:w-1/2 px-3">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-4">Listing Preview</h2>
              {listing.mainImage && (
                <img
                  src={URL.createObjectURL(listing.mainImage)}
                  alt="Property"
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h3
                className="text-xl font-semibold mb-2 truncate"
                title={listing.title}
              >
                {listing.title || "Your Property Title"}
              </h3>
              <p
                className="text-gray-600 mb-4 overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {listing.description ||
                  "Property description will appear here."}
              </p>
              <div className="flex items-center mb-2">
                <FiMapPin className="mr-2 flex-shrink-0" />
                <span className="truncate">
                  {`${listing.city}${
                    listing.state ? `, ${listing.state}` : ""
                  }, ${listing.country}`}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <FaHome className="mr-2 flex-shrink-0" />
                <span className="truncate">
                  {listing.category || "Category"}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <FiUsers className="mr-2 flex-shrink-0" />
                <span>{listing.maxGuests || "0"} guests</span>
              </div>
              <div className="flex items-center mb-2">
                <FaBed className="mr-2 flex-shrink-0" />
                <span>
                  {listing.bedrooms || "0"} bedrooms •{" "}
                  {listing.bathrooms || "0"} bathrooms
                </span>
              </div>
              <div className="flex items-center mb-4">
                <FiDollarSign className="mr-2 flex-shrink-0" />
                <span className="text-lg font-semibold">
                  {listing.price || "0"} per night
                </span>
              </div>
              <p
                className={`text-sm ${
                  listing.isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {listing.isAvailable
                  ? "Available for booking"
                  : "Not available for booking"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {showNotification && (
        <NotificationComponent
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
}

export default HomeListing;
