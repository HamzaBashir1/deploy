"use client";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const Photo = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = data?.images || [];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true, // Optional: Enable swiping with a mouse
  });

  return (
    <div className="p-4 md:p-8">
      {images.length > 0 ? (
        <div>
          {/* Responsive Image Carousel */}
          <div className="relative flex flex-col md:flex-row md:gap-4 w-full">
            {/* Main Image */}
            <div className="w-full md:w-2/3 mb-4 md:mb-0">
              <img
                src={images[currentIndex]}
                alt="Property"
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="lg:w-[40%] grid grid-cols-1 gap-4">
              {images
                .filter((_, index) => index !== currentIndex) // Filter out the current image
                .slice(0, 4)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`rounded-md cursor-pointer w-full lg:h-[335px] object-cover ${
                      images.indexOf(image) === currentIndex
                        ? "border-2 border-black opacity-100"
                        : "opacity-60"
                    }`}
                    onClick={() => setCurrentIndex(images.indexOf(image))} // Set index of clicked image
                  />
                ))}
            </div>

            {/* See All Photos Button */}
            <button
              onClick={openModal}
              className="absolute bottom-2 right-2 px-4 py-2 bg-white text-black rounded-md border border-black md:bottom-4 md:right-4"
            >
              See All Photos
            </button>
          </div>

          {/* Modal for showing all photos */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div
                {...swipeHandlers}
                className="relative bg-white p-8 rounded-lg max-w-5xl w-full max-h-full overflow-auto"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>

                <div className="flex items-center justify-center">
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 text-white bg-black p-2 rounded-full"
                  >
                    Prev
                  </button>

                  <img
                    src={images[currentIndex]}
                    alt={`Gallery Image ${currentIndex + 1}`}
                    className="w-full max-h-[600px] rounded-lg object-cover"
                  />

                  <button
                    onClick={handleNext}
                    className="absolute right-2 text-white bg-black p-2 rounded-full"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default Photo;
