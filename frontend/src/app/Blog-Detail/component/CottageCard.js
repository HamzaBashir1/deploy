import React, { useState, useRef, useEffect } from "react";

const listings = [
  {
    id: 1,
    image: "/Container (4).png",
    name: "Cottage VEĎveľŠAKšak",
    discount: "until -20%",
  },
  { id: 2, image: "/Container (4).png", name: "Cottage Katka" },
  { id: 3, image: "/Container (4).png", name: "Chata Lucka" },
  { id: 4, image: "/Container (4).png", name: "Chata Lucka" },
  { id: 5, image: "/Container (4).png", name: "Chata Lucka" },
  { id: 6, image: "/Container (4).png", name: "Chata Lucka" },
  // ... more listings
];

const CottageCard = ({ listing }) => (
  <div className="relative overflow-hidden rounded-lg shadow-md group">
    {listing.discount && (
      <div className="absolute z-10 px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-full top-4 left-4">
        {listing.discount}
      </div>
    )}
    <img
      src={listing.image}
      alt={listing.name}
      className="object-cover w-full h-48 transition duration-300 ease-in-out transform group-hover:scale-110"
    />
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-800">{listing.name}</h3>
      <button className="absolute z-10 transition duration-300 ease-in-out opacity-0 top-2 right-2 group-hover:opacity-100">
        <svg
          className="w-6 h-6 text-gray-600 hover:text-gray-800"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L17.828 12l1.171 1.171a4 4 0 11-5.656 5.656L12 17.828l-1.172 1.172a4 4 0 11-5.656-5.656L3.172 5.172zm0 2.828a2 2 0 012.828 0L10 10.828l1.172-1.171a2 2 0 112.828 2.828L15.828 12l1.171 1.171a2 2 0 11-2.828 2.828L12 14.828l-1.172 1.172a2 2 0 11-2.828-2.828L3.172 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
);

const CottageList = () => {
  const listRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? listings.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= listings.length ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = currentIndex * listRef.current.offsetWidth;
    }
  }, [currentIndex]);

  return (
    <div className="pt-16 mx-4 lg:mr-72">
    <div className="flex justify-start ">
    <div className="relative ">
      <h2 className="mb-4 font-bold text- 2xl">Cottages</h2>
      <div
        ref={listRef}
        className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory"
      >
        {listings.map((listing, index) => (
          <div
            key={listing.id}
            className="flex justify-start h-full mx-4 snap-start shrink-0"
          >
            <CottageCard listing={listing} />
          </div>
        ))}
      </div>
      <div className="absolute left-0 z-10 flex justify-between w-full top-1/2">
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded-l hover:bg-gray-400"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded-r hover:bg-gray-400"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      </div></div>
    </div>
  );
};

export default CottageList;