"use client";
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaStar,
  FaMapMarkerAlt,
  FaCalendar,
  FaGlobe,
  FaComments,
} from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const UserProfile = ({ params }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const [User, setUser] = useState(null);
  const [userProfile, setuserProfile] = useState(null);
  const [UserListing, setUserListing] = useState(null);
  const [ListingImages, setListingImages] = useState(null);

  const toggleFollow = () => setIsFollowing(!isFollowing);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleShowNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const getUserProfile = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/accounts/api/users/${params.id}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setUser(data);
    }
  };

  const getUserDetails = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/profile/?user=${params.id}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setuserProfile(data);
    }
  };

  const getListings = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/listings/?owner=${params.id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setUserListing(data);
    }
  };

  const getListingImages = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/listing-images/?owner_id=${params.id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setListingImages(data);
    }
  };

  useEffect(() => {
    getUserProfile();
    getUserDetails();
    getListings();
    getListingImages();
  }, []);

  if (!User || !userProfile) {
    return <p>Loading...</p>;
  }
  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              About {User.first_name}
            </h2>
            <p className="text-gray-600">{userProfile[0].bio}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoItem icon={<FaUser />} text="Superhost since 2019" />
              <InfoItem icon={<FaMapMarkerAlt />} text="5 properties listed" />
              <InfoItem icon={<FaCalendar />} text="Joined in 2018" />
              <InfoItem icon={<FaGlobe />} text="Speaks English, Spanish" />
            </div>
          </div>
        );
      case "listings":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UserListing.map((listing) => (
              <ListingCard
                key={listing.id}
                mainImage_url={listing.mainImage_url}
                title={listing.title}
                id={listing.id}
              />
            ))}
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <ReviewCard key={review} />
            ))}
          </div>
        );
      case "photos":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ListingImages.map((item, index) => (
              <img
                key={index}
                src={item.image_url}
                alt={`Photo ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
            {!showAllPhotos && (
              <button
                onClick={() => setShowAllPhotos(true)}
                className="col-span-full text-blue-600 font-semibold mt-4 hover:underline focus:outline-none"
              >
                Show all photos
              </button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-[95%] mx-auto  mt-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                <img
                  src="https://i.pinimg.com/474x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg"
                  alt="John Doe"
                  className="w-32 h-32 rounded-full border-4 border-white mb-4 sm:mb-0 sm:mr-6"
                />
                <div className="text-center sm:text-left">
                  <h1 className="text-4xl font-bold text-white">
                    {User?.first_name} {User?.last_name}
                  </h1>
                  <p className="text-xl text-white">{userProfile[0].country}</p>
                </div>
              </div>
              <button
                onClick={toggleFollow}
                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  isFollowing
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                }`}
              >
                {/* {isFollowing ? "Following" : "Follow"} */}
                Contact Host
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-lg font-semibold">
                <FaStar className="inline-block text-yellow-400 mr-1" />
                4.9
              </span>
              <span className="text-gray-600">(120 reviews)</span>
            </div>
            <div className="flex space-x-2">
              <span className="text-sm border border-gray-300 rounded-full px-3 py-1">
                Superhost
              </span>
              <span className="text-sm border border-gray-300 rounded-full px-3 py-1">
                Identity Verified
              </span>
            </div>
          </div>

          <div className="flex border-b mb-4 overflow-x-auto">
            {["about", "listings", "reviews", "photos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
              <FaComments className="mr-2" /> Contact Host
            </button>
            <p className="text-sm text-gray-500">
              Usually responds within 1 hour
            </p>
          </div>
        </div>

        {showNotification && (
          <NotificationComponent
            message={notificationMessage}
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    </>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center">
    <span className="text-gray-400 mr-2">{icon}</span>
    <span className="text-gray-700">{text}</span>
  </div>
);

const ListingCard = ({ mainImage_url, title, id }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <Link href={`/listing/${id}`}>
      <img
        src={mainImage_url}
        alt="Listing"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
    </Link>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-600">2 guests · 1 bedroom · 1 bath</p>
    <div className="mt-2 flex items-center">
      <FaStar className="text-yellow-400 mr-1" />
      <span>4.8 (45 reviews)</span>
    </div>
  </div>
);

const ReviewCard = () => (
  <div className="border-b border-gray-200 pb-4">
    <div className="flex items-center mb-2">
      <img
        src="https://i.pinimg.com/474x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg"
        alt="Reviewer"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <h4 className="font-semibold">Sarah Johnson</h4>
        <p className="text-sm text-gray-500">August 2023</p>
      </div>
    </div>
    <p className="text-gray-700">
      John was an excellent host! The apartment was clean, well-located, and
      exactly as described. Communication was smooth, and John provided great
      local tips. Highly recommended!
    </p>
  </div>
);

export default UserProfile;
