"use client";
import React from "react";

const ListingsSkeleton = () => {
  return (
    <div className="relative bg-white shadow rounded-lg overflow-hidden animate-pulse">
      <div className="relative w-full h-64 bg-gray-200">
        <div className="absolute top-2 left-2 bg-gray-300 px-2 py-1 rounded-full w-16 h-8"></div>
        <div className="absolute top-2 right-2 bg-gray-300 px-2 py-1 rounded-full w-16 h-8"></div>
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="flex justify-between text-sm">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-8 bg-gray-300 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );
};

export default ListingsSkeleton;
