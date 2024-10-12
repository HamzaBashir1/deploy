"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useSwipeable } from "react-swipeable";

const Photo = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false); // Track whether the virtual tour is displayed

  const images = data?.images || [];
  const virtualTourUrl = "https://kuula.co/share/collection/7ZPkW?logo=1&info=1&fs=1&vr=0&thumbs=1&inst=0"; // URL for the virtual tour

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length + 1)); // Include virtual tour in the count
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (images.length + 1)) % (images.length + 1)); // Include virtual tour in the count
  };

  const toggleVirtualTour = () => {
    setShowVirtualTour((prev) => !prev);
  };

  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true, // Optional: Enable swiping with a mouse
  });

  return (
    <div className="lg:p-4 md:p-8">
      {images.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Responsive Image Carousel */}
          <div className={`relative flex flex-col md:flex-row md:gap-4 w-full`}>
            {/* Main Image */}
            <div className={`relative w-full md:w-3/5 h-[400px] md:h-[620px] mb-4 md:mb-0`}>
              <div {...swipeHandlers} className="h-full">
                {currentIndex < images.length ? (
                  <img
                    src={images[currentIndex]} // Displaying the current image
                    alt="Property"
                    className="w-full h-full lg:rounded-lg object-cover"
                  />
                ) : (
                  <iframe
                    src={virtualTourUrl}
                    title="Virtual Tour"
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>

            {/* Thumbnails for desktop only */}
            <div className="hidden lg:block lg:w-[40%] gap-4 grid grid-cols-1">
              {images
                .slice(1, 3) // Displaying the next two images as thumbnails
                .map((image, index) => (
                  <div key={index} className="h-[305px] mb-3">
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="rounded-md cursor-pointer w-full h-full object-cover transition-opacity duration-200"
                      onClick={() => {} /* Add functionality if you want to handle thumbnail clicks */}
                    />
                  </div>
                ))}

            <button
              onClick={openModal}
              className="absolute bottom-4 right-2 px-4 py-2 bg-white text-black rounded-md border border-black"
            >
              See All Photos
            </button>
            </div>
          </div>
          
          
          
            
          {/* Virtual Tour Section for desktop */}
          <div className="hidden md:block relative w-full mt-4 md:mt-0 md:w-2/5">
          {showVirtualTour ? (
              <iframe
                src={virtualTourUrl}
                title="Virtual Tour"
                className="w-full h-[400px] md:h-[620px] rounded-lg"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src="/virtualtour.jpg" // You can replace this with any demo image
                alt="Demo"
                className="w-full h-[400px] md:h-[620px] rounded-lg object-cover cursor-pointer"
                onClick={toggleVirtualTour} // Toggle virtual tour on click
              />
            )}
            <button
              onClick={toggleVirtualTour}
              className="absolute bottom-4 right-2 px-4 py-2 bg-white text-black rounded-md border border-black"
            >
              {showVirtualTour ? "See Demo Image" : "See Virtual Tour"}
            </button>
          </div>
        </div>
      )}

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
              <IoClose/>
            </button>

            <div className="flex items-center justify-center">
              <button
                onClick={handlePrev}
                className="absolute left-2 text-white bg-black p-2 rounded-full"
              >
                <MdArrowBackIos />
              </button>

              <img
                src={images[currentIndex]} // Displaying the current image in modal
                alt={`Gallery Image`}
                className="w-full h-auto max-h-[600px] rounded-lg object-cover"
              />

              <button
                onClick={handleNext}
                className="absolute right-2 text-white bg-black p-2 rounded-full"
              >
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
