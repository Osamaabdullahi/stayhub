"use client";
import React, { useState, useEffect } from "react";
import RoomDetail from "@/components/RoomDetail";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingsSkeleton from "@/components/skeletons/ListingsSkeleton";
import Listings from "@/components/Listing";

function Page({ params }) {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(false);
    let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/listings/`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setData(data);
      setLoading(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <RoomDetail params={params} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-6 py-6">
        {!Loading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
              return <ListingsSkeleton key={index} />;
            })}
          </>
        ) : (
          <>
            {Data.map((item, index) => (
              <Listings
                key={index}
                id={item.id}
                title={item.title}
                price_per_night={item.price_per_night}
                owner={`${item.owner.first_name} ${item.owner.last_name}`}
                mainImage_url={item.mainImage_url}
                country={item.country}
              />
            ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Page;
