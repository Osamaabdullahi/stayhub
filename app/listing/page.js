"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { FiStar, FiHeart } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ListingCard = ({ listing }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const randomFloat = Math.random() * (5 - 2) + 2;

  return (
    <div className="relative">
      <Link href={`/listing/${listing.id}`}>
        <img
          src={listing.mainImage_url}
          alt={listing.title}
          className="w-full h-64 object-cover rounded-lg mb-2"
        />
      </Link>
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
      >
        <FiHeart className={isFavorite ? "text-red-500" : "text-gray-500"} />
      </button>
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-lg truncate flex-grow">
          {listing.title}
        </h3>
        <div className="flex items-center ml-2">
          <FiStar className="text-yellow-500 mr-1" />
          <span>{randomFloat.toFixed(1)}</span>
        </div>
      </div>
      <p className="text-gray-500 mb-1">{listing.country}</p>
      <p className="text-gray-500 mb-1">
        • {listing.bedrooms} bed{listing.bedrooms > 1 ? "s" : ""}
      </p>
      {/* <p className="text-gray-500 mb-2">{listing.state}</p> */}
      <p className="font-semibold">
        ${listing.price_per_night}{" "}
        <span className="font-normal text-gray-500">night</span>
      </p>
    </div>
  );
};

const ListingsGrid = () => {
  const guests = useSearchParams().get("guests");
  const location = useSearchParams().get("location");
  const [RoomData, setRoomData] = useState(null);

  const getData = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/listings/`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setRoomData(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!RoomData) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Find your next stay</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {RoomData.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListingsGrid;
