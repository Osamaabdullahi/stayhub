import {
  FaLandmark,
  FaCastle,
  FaTree,
  FaWater,
  FaStar,
  FaMountain,
  FaCampground,
  FaSwimmingPool,
} from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";

const categories = [
  { name: "Icons", href: "#" },
  { name: "Castles", href: "#" },
  { name: "National Parks", href: "#" },
  { name: "Lakefront", href: "#" },
  { name: "New", href: "#" },
  { name: "Islands", href: "#" },
  { name: "Amazing Views", href: "#" },
  { name: "Campers", href: "#" },
  { name: "Amazing Pools", href: "#" },
];

import React from "react";
import ListingCard from "./ListingCard";

const iconComponents = [
  <FaLandmark size={24} />,
  <FaCastle size={24} />,
  <FaTree size={24} />,
  <FaWater size={24} />,
  <FaStar size={24} />,
  <GiPalmTree size={24} />,
  <FaMountain size={24} />,
  <FaCampground size={24} />,
  <FaSwimmingPool size={24} />,
];

function CategorySection() {
  return (
    <>
      <div className="bg-white shadow-sm fixed top-16 left-0 w-full z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="max-w-4xl overflow-x-auto">
              <div className="flex justify-around space-x-4">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href={category.href}
                    className="flex flex-col items-center space-y-2 text-gray-700 hover:text-blue-500 transition-colors duration-200 flex-shrink-0 p-2"
                  >
                    <GiPalmTree size={24} />
                    <span className="text-sm">{category.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategorySection;
