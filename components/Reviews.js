import React from "react";
import { FaStar } from "react-icons/fa";
import Footer from "./Footer";

const Reviews = () => {
  const reviewsData = [
    {
      id: 1,
      name: "John Doe",
      avatar:
        "https://i.pinimg.com/474x/26/b1/ec/26b1ec666b633fa6e54b2279b5c09e01.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 5,
      date: "2023-06-28",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar:
        "https://i.pinimg.com/474x/26/b1/ec/26b1ec666b633fa6e54b2279b5c09e01.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 4,
      date: "2023-06-29",
    },
    {
      id: 3,
      name: "Emily Johnson",
      avatar:
        "https://i.pinimg.com/474x/26/b1/ec/26b1ec666b633fa6e54b2279b5c09e01.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 3,
      date: "2023-06-30",
    },
    {
      id: 4,
      name: "Michael Brown",
      avatar:
        "https://i.pinimg.com/474x/26/b1/ec/26b1ec666b633fa6e54b2279b5c09e01.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 5,
      date: "2023-07-01",
    },
    {
      id: 5,
      name: "Sarah Davis",
      avatar:
        "https://i.pinimg.com/474x/26/b1/ec/26b1ec666b633fa6e54b2279b5c09e01.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 3,
      date: "2023-07-02",
    },
    {
      id: 6,
      name: "David Wilson",
      avatar:
        "https://i.pinimg.com/474x/26/b1/ec/26b1ec666b633fa6e54b2279b5c09e01.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 4,
      date: "2023-07-03",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">User Reviews</h2>
      <div className="space-y-6">
        {reviewsData.map((review) => (
          <div
            key={review.id}
            className="flex items-start bg-white p-6 border border-gray-200 rounded-lg"
          >
            <div className="flex-shrink-0 mr-6">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900 mr-2">
                  {review.name}
                </h3>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              <div className="flex items-center mb-4">
                {Array(review.rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
              </div>
              <p className="text-gray-700">{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
