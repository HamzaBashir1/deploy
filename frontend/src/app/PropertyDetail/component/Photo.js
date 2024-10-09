"use client";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const Photo = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false); // State for virtual tour modal

  const images = data?.images || [];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openTour = () => setIsTourOpen(true); // Open virtual tour modal
  const closeTour = () => setIsTourOpen(false); // Close virtual tour modal

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true, // Optional: Enable swiping with a mouse
  });

  return (
    <div className="lg:p-4 md:p-8">
      {images.length > 0 ? (
        <div>
          {/* Responsive Image Carousel */}
          <div className="relative flex flex-col md:flex-row md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 w-full">
            {/* Main Image */}
            <div className={`w-full ${images.length > 1 ? 'md:w-2/3' : 'w-full'} h-[400px] md:h-[620px] lg:h-[620px] xl:h-[620px] 2xl:h-[620px] mb-4 md:mb-0`}>
              <div {...swipeHandlers} className="h-full">
                <img
                  src={images[currentIndex]}
                  alt="Property"
                  className="w-full h-full lg:rounded-lg object-cover"
                />
              </div>
            </div>

            
            {/* Thumbnails for desktop only */}
            <div className="hidden lg:block lg:w-[40%] gap-4 grid grid-cols-1 ">
              {images
                .filter((_, index) => index !== currentIndex)
                .slice(0, 2)
                .map((image, index) => (
                  <div key={index} className="h-[305px] mb-3"> {/* Add mb-4 to create margin */}
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="rounded-md cursor-pointer w-full h-full object-cover transition-opacity duration-200"
                      onClick={() => setCurrentIndex(images.indexOf(image))}
                    />
                  </div>
                ))}
            </div>



            {/* See All Photos Button - only visible on desktop */}
            <button
              onClick={openModal}
              className="hidden lg:block absolute bottom-2 right-2 px-4 py-2 bg-white text-black rounded-md border border-black md:bottom-4 md:right-4"
            >
              See All Photos
            </button>

            {/* Virtual Tour Button (Visible on all screens) */}
            <button
              onClick={openTour}
              className="absolute bottom-16 right-2 px-4 py-2 bg-white text-black rounded-md border border-black md:bottom-20 md:right-4"
            >
              Virtual Tour
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
                    className="w-full h-auto max-h-[600px] rounded-lg object-cover"
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

          {/* Modal for Virtual Tour */}
          {isTourOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative bg-white p-8 rounded-lg min-w-screen w-full max-h-full overflow-auto">
                <button
                  onClick={closeTour}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>

                {/* Virtual Tour iframe */}
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="xr-spatial-tracking; gyroscope; accelerometer"
                  allowFullScreen
                  scrolling="no"
                  src="https://kuula.co/share/collection/7ZPkW?logo=1&info=1&fs=1&vr=0&thumbs=1&inst=0"
                  title="Virtual Tour"
                  className="w-full h-[640px] rounded-lg"
                  onLoad={() => console.log('Virtual tour loaded')}
                  onError={() => console.error('Error loading virtual tour')}
                ></iframe>

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
