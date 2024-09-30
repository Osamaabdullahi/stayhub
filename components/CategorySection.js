"use client";
import React from "react";

const categories = [
  { name: "Castles" },
  { name: "Tropical" },
  { name: "Lakefront" },
  { name: "Islands" },
  { name: "Beach house" },
  { name: "National parks" },
  { name: "Campers" },
  { name: "Amazing views" },
  { name: "Top cities!" },
  { name: "Beach" },
  { name: "Design" },
  { name: "Historical" },
];

const Categories = ({ genre, setgenre }) => {
  return (
    <div // style={{ marginTop: isSticky ? "1.5rem" : 0 }}
      style={{
        overflowX: "auto", // Enable horizontal scrolling
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none", // For Internet Explorer and Edge
      }}
      className="flex overflow-x-auto space-x-4 py-5 no-scrollbar"
    >
      {categories.map((category) => (
        <button
          key={category.name}
          className={`flex-shrink-0 border rounded-full px-4 py-2 whitespace-nowrap transition-colors ${
            genre === category.name
              ? "bg-blue-500 text-white" // Active genre background and text color
              : "bg-gray-200 text-gray-700" // Inactive genre background and text color
          }`}
          onClick={() => setgenre(category.name)}
        >
          <p>{category.name}</p>
        </button>
      ))}
    </div>
  );
};

export default Categories;
