import Image from "next/image";

const Host = () => {
  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/3 flex flex-col items-center text-center md:text-left md:items-start">
          <Image
            src="/images/cottage.jpg"
            alt="Host"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold mt-4">Lina</h2>
          <p className="text-gray-500">Superhost</p>
          <div className="mt-4">
            <p className="text-xl font-semibold">85</p>
            <p className="text-gray-500">Reviews</p>
          </div>
          <div className="mt-2">
            <p className="text-xl font-semibold">4.84</p>
            <p className="text-gray-500">Rating</p>
          </div>
          <div className="mt-2">
            <p className="text-xl font-semibold">7</p>
            <p className="text-gray-500">Years hosting</p>
          </div>
        </div>
        <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
          <h3 className="text-xl font-bold">Lina is a Superhost</h3>
          <p className="text-gray-700 mt-2">
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.
          </p>
          <h4 className="text-lg font-bold mt-6">Co-hosts</h4>
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold">
              E
            </div>
            <p className="ml-2 text-gray-700">Esbie</p>
          </div>
          <h4 className="text-lg font-bold mt-6">Host details</h4>
          <p className="text-gray-700 mt-2">Response rate: 90%</p>
          <p className="text-gray-700">Responds within an hour</p>
          <button className="mt-6 px-4 py-2 bg-black text-white rounded-md">
            Message Host
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-6 text-gray-700">
        <p className="mt-4">
          <strong>Speaks:</strong> English and German
        </p>
        <p className="mt-2">
          <strong>Lives in:</strong> Cape Town, South Africa
        </p>
        <button className="text-blue-600 mt-2">Show more</button>
      </div>
    </div>
  );
};

export default Host;
