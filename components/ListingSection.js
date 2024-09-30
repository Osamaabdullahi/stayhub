import ListingCard from "./cards/ListingCard";
import Reviews from "./Reviews";
const listings = [
  {
    image: "/images/cottage.jpg",
    location: "Jinja, Uganda",
    title: "Lake Victoria",
    date: "Jul 1 - 6",
    price: "KSh 19,412 night",
    rating: "4.5",
  },
  {
    image: "/images/cottage.jpg",
    location: "Watamu, Kenya",
    title: "Prawn Lake",
    date: "Aug 24 - 29",
    price: "KSh 23,740 night",
    rating: "4.89",
  },
  {
    image: "/images/cottage.jpg",
    location: "Kisoro, Uganda",
    title: "Lake Mutanda",
    date: "",
    price: "KSh 18,861 night",
    rating: "5.0",
  },
  {
    image: "/images/cottage.jpg",
    location: "Watamu, Kenya",
    title: "Prawn Lake",
    date: "Jul 1 - 6",
    price: "KSh 16,984 night",
    rating: "4.89",
  },
  {
    image: "/images/cottage.jpg",
    location: "Kisoro, Uganda",
    title: "Lake Mutanda",
    date: "",
    price: "KSh 18,861 night",
    rating: "5.0",
  },
  {
    image: "/images/cottage.jpg",
    location: "Watamu, Kenya",
    title: "Prawn Lake",
    date: "Jul 1 - 6",
    price: "KSh 16,984 night",
    rating: "4.89",
  },
];

const ListingSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {listings.map((listing, index) => (
          <ListingCard
            key={index}
            image={listing.image}
            location={listing.location}
            title={listing.title}
            date={listing.date}
            price={listing.price}
            rating={listing.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingSection;
