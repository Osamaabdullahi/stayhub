import React from "react";
import Image from "next/image";
import { Star, Award, MessageCircle } from "lucide-react";
import Link from "next/link";

const HostProfile = ({ host }) => {
  const extractDateInfo = (isoDateStr) => {
    const dateObject = new Date(isoDateStr);
    const year = dateObject.getFullYear();
    const formattedDate = dateObject.toISOString().split("T")[0]; // Formats as YYYY-MM-DD

    // Return both the year and formatted date together as a string
    return `${year} - ${formattedDate}`;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="flex items-center md:items-start space-x-6 md:space-x-0 md:flex-col md:space-y-4 mb-6 md:mb-0">
          <div className="relative w-24 h-24 md:w-40 md:h-40 flex-shrink-0 rounded-full overflow-hidden">
            <Link href={`/account/profile/${host.id}`}>
              <Image
                src={host.profilePicture}
                alt={`${host.name}'s profile picture`}
                layout="fill"
                objectFit="cover"
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div className="md:text-center">
            <h2 className="text-2xl font-bold">{host.name}</h2>
            <p className="text-gray-600">
              Joined in {extractDateInfo(host.joinedYear)}
            </p>
          </div>
        </div>

        <div className="flex-grow space-y-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>
              {host.rating} ({host.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-500" />
            <span>{host.isSuperhost ? "Superhost" : "Host"}</span>
          </div>

          <p className="text-gray-700">{host.bio}</p>

          <div className="space-y-2">
            <h3 className="font-semibold">Location</h3>
            <p className="text-gray-700">{host.interaction}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">
              Response rate: {host.responseRate}%
            </h3>
            <p className="text-gray-700">Response time: {host.responseTime}</p>
          </div>

          <button className="flex items-center justify-center bg-slate-800 w-full md:w-auto px-6 py-2 mt-4 bg-airbnb-red text-white rounded-lg hover:bg-red-600 transition duration-300">
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Host
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
