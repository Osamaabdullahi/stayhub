"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiBookmark } from "react-icons/fi";

const Listings = ({
  id,
  title,
  price_per_night,
  owner,
  mainImage_url,
  country,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookMark, setIsBookmark] = useState(false);

  return (
    <div className="relative bg-white shadow rounded-lg overflow-hidden">
      <div className="relative w-full h-64">
        {mainImage_url ? (
          <Link href={`/listing/${id}`}>
            <Image
              src={mainImage_url}
              alt={title}
              layout="fill"
              className="object-cover"
            />
          </Link>
        ) : (
          <div>Image not available</div>
        )}
        <button
          onClick={() => setIsBookmark(!isBookMark)}
          className={
            isBookMark
              ? "absolute top-2 left-2 bg-black px-2 py-2 rounded-full"
              : "absolute top-2 left-2 bg-white px-2 py-2 rounded-full"
          }
        >
          <FiBookmark className={isBookMark ? "text-white" : "text-gray-500"} />
        </button>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={
            isFavorite
              ? "absolute top-2 right-2 bg-red-400 px-2 py-2 rounded-full"
              : "absolute top-2 right-2 bg-white px-2 py-2 rounded-full"
          }
        >
          <FiHeart className={isFavorite ? "text-white" : "text-gray-500"} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        <div className="flex justify-between text-sm text-gray-500">
          <p>{owner}</p>
          <p>{country}</p>
        </div>
        <p className="text-lg font-bold mt-2">{price_per_night}</p>
      </div>
    </div>
  );
};

export default Listings;
