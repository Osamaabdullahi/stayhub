const ListingCard = ({ image, location, title, date, price, rating }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{location}</h3>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-lg font-semibold mt-auto">{price}</p>
        <div className="flex items-center">
          <span className="text-yellow-500">{rating}</span>
          <span className="text-gray-600 ml-2">☆</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
