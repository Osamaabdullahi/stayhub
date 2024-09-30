"use client";
import { useState, useEffect } from "react";
import Categories from "@/components/CategorySection";
import Listings from "@/components/Listing";
import SearchBar from "@/components/SearchBar";
import ListingsSkeleton from "@/components/skeletons/ListingsSkeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [genre, setgenre] = useState("");
  const [Loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [Data, setData] = useState([]);

  const getData = async () => {
    setLoading(false);
    let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/listings/`;

    if (genre !== "") {
      url += `?category=${genre}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setData(data);
      setLoading(true);
    }
  };

  useEffect(() => {
    getData();

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [genre]);

  return (
    <div>
      <Navbar />
      <main className="">
        <SearchBar />
        <div
          className={`sticky top-[4em] z-10 bg-white  transition-all duration-300 ${
            isSticky ? "" : ""
          }`}
          style={{ marginTop: isSticky ? "1.5rem" : 0 }}
        >
          <Categories genre={genre} setgenre={setgenre} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-6">
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
      </main>
      <Footer />
    </div>
  );
}
