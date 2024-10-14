"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useSwipeable } from "react-swipeable";

const Photo = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false); // Track whether the virtual tour is displayed
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024); // Detect initial screen size

  const images = data?.images || [];
  const virtualTourUrl = "https://kuula.co/share/collection/7ZPkW?logo=1&info=1&fs=1&vr=0&thumbs=1&inst=0"; // URL for the virtual tour

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const thumbnailContainerRef = useRef(null); // Reference for the thumbnail container

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length + 1)); // Include virtual tour in the count
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (images.length + 1)) % (images.length + 1)); // Include virtual tour in the count
  };

  const toggleVirtualTour = () => {
    setShowVirtualTour((prev) => !prev);
  };
  const scrollThumbnails = (direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 150 * direction; // Adjust this value as needed
      thumbnailContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };


  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true, // Optional: Enable swiping with a mouse
  });
 // Handle screen size changes
 useEffect(() => {
  const handleResize = () => {
    const newIsDesktop = window.innerWidth >= 1024;
    if (newIsDesktop && !isDesktop) {
      // If switching to desktop, reset to the first image
      setCurrentIndex(0);
    }
    setIsDesktop(newIsDesktop);
  };

  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, [isDesktop]);

  return (
    <div className="lg:p-4 md:p-8">
      {images.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Responsive Image Carousel */}
          <div className={`relative flex flex-col md:flex-row md:gap-4 w-full`}>
            {/* Main Image */}
            <div className={`relative w-full md:w-3/5 h-[400px] md:h-[420px] mb-4 md:mb-0`}>
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
            <div className=" lg:block md:w-[40%] gap-4 grid grid-cols-1">
              {images
                .slice(1, 3) // Displaying the next two images as thumbnails
                .map((image, index) => (
                  <div key={index} className="h-[205px] mb-3">
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
          <div className=" md:block relative w-full mt-4 md:mt-0 md:w-2/5">
          {showVirtualTour ? (
              <iframe
                src={virtualTourUrl}
                title="Virtual Tour"
                className="w-full h-[400px] md:h-[420px] rounded-lg"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="relative w-full h-[400px] md:h-[420px] rounded-lg overflow-hidden cursor-pointer flex items-center justify-center" onClick={toggleVirtualTour}>
                <img
                  src="/virtual.png"
                  alt="Demo"
                  className="w-full h-full "
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div
            {...swipeHandlers}
            className="relative w-full max-w-5xl max-h-full p-8 overflow-auto bg-white rounded-lg"
          >
            <button
              onClick={closeModal}
              className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
            >
              <IoIosCloseCircleOutline size={33} />
            </button>

            {/* Main image with navigation buttons */}
            <div className="flex items-center justify-center mb-4">
            <button
                   onClick={handlePrev}
               className={`absolute left-2 text-white bg-black p-2 rounded-full ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
               }`}
               disabled={currentIndex === 0} // Disable when on the first image
>
  <MdArrowBackIos size={33} />
</button>

              <img
                src={images[currentIndex]} // Displaying the current image in modal
                alt={`Gallery Image`}
                className="w-full h-auto max-h-[600px] rounded-lg object-cover"
              />

              <button
                onClick={handleNext}
                className={`absolute right-2 text-white bg-black p-2 rounded-full ${
                 currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
               disabled={currentIndex === images.length - 1} // Disable when on the last image
                   >
                <MdArrowForwardIos size={33} /> 
                </button>
            </div>

            {/* Horizontal scrollable thumbnail bar with left/right buttons */}
            <div className="relative">
            {/* Left scroll button */}
            {currentIndex > 0 && (
              <button
                onClick={() => scrollThumbnails(-1)}
                className="absolute left-0 p-2 text-white transform -translate-y-1/2 bg-black rounded-full top-1/2"
              >
                <MdArrowBackIos size={20} />
              </button>
            )}

            <div
              ref={thumbnailContainerRef} // Reference the container
              className="flex px-10 space-x-4 overflow-x-auto scrollbar-hide"
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  loading="lazy" // Lazy loading for better performance
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-24 w-36 object-cover rounded-lg cursor-pointer ${
                    index === currentIndex ? "border-4 border-blue-500" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)} // Set clicked image as the current image
                />
              ))}
            </div>

            {/* Right scroll button */}
            {currentIndex < images.length - 1 && (
              <button
                onClick={() => scrollThumbnails(1)}
                className="absolute right-0 p-2 text-white transform -translate-y-1/2 bg-black rounded-full top-1/2"
              >
                <MdArrowForwardIos size={20} />
              </button>
            )}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
