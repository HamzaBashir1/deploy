"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useSwipeable } from "react-swipeable";

const Photo = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [isVirtualTourModalOpen, setIsVirtualTourModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const images = data?.images || [];
  const virtualTourUrl = data?.virtualTourUrl || "";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openVirtualTourModal = () => setIsVirtualTourModalOpen(true);
  const closeVirtualTourModal = () => setIsVirtualTourModalOpen(false);

  const thumbnailContainerRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleVirtualTour = () => {
    setShowVirtualTour((prev) => !prev);
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 150 * direction;
      thumbnailContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
    trackTouch: true,
  });

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024;
      if (newIsDesktop && !isDesktop) {
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
          <div className={`relative flex flex-col md:flex-row md:gap-4 w-full`}>
            <div className={`relative w-full md:w-3/5 h-[400px] md:h-[420px] mb-4 md:mb-0`}>
              <div {...swipeHandlers} className="h-full">
                {currentIndex < images.length ? (
                  <img
                    src={images[currentIndex]}
                    alt="Property"
                    className="w-full h-full lg:rounded-lg object-cover"
                  />
                ) : (
                  virtualTourUrl ? (
                    <iframe
                      src={virtualTourUrl}
                      title="Virtual Tour"
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white bg-gray-800 rounded-lg">
                      No Virtual Tour Available
                    </div>
                  )
                )}
              </div>
              {!isDesktop && virtualTourUrl && (
                <button
                  onClick={openVirtualTourModal}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-white text-black rounded-md border border-black z-10"
                >
                  See Virtual Tour
                </button>
              )}
            </div>

            <div className="hidden lg:block md:w-[40%] gap-4 grid grid-cols-1">
              {images
                .slice(1, 3)
                .map((image, index) => (
                  <div key={index} className="h-[205px] mb-3">
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="rounded-md cursor-pointer w-full h-full object-cover transition-opacity duration-200"
                      onClick={() => {}}
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

          <div className="hidden md:block relative w-full mt-4 md:mt-0 md:w-2/5">
            {virtualTourUrl ? (
              showVirtualTour ? (
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
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
              )
            ) : (
              <div className="w-full h-[400px] md:h-[420px] flex items-center justify-center text-white bg-gray-800 rounded-lg">
                No Virtual Tour Available
              </div>
            )}
            {virtualTourUrl && (
              <button
                onClick={toggleVirtualTour}
                className="absolute bottom-4 right-2 px-4 py-2 bg-white text-black rounded-md border border-black"
              >
                {showVirtualTour ? "See Demo Image" : "See Virtual Tour"}
              </button>
            )}
          </div>
        </div>
      )}

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

            <div className="flex items-center justify-center mb-4">
              <button
                onClick={handlePrev}
                className={`absolute left-2 text-white bg-black p-2 rounded-full ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentIndex === 0}
              >
                <MdArrowBackIos size={33} />
              </button>

              <img
                src={images[currentIndex]}
                alt={`Gallery Image`}
                className="w-full h-auto max-h-[600px] rounded-lg object-cover"
              />

              <button
                onClick={handleNext}
                className={`absolute right-2 text-white bg-black p-2 rounded-full ${
                  currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentIndex === images.length - 1}
              >
                <MdArrowForwardIos size={33} />
              </button>
            </div>

            <div className="relative">
              {currentIndex > 0 && (
                <button
                  onClick={() => scrollThumbnails(-1)}
                  className="absolute left-0 p-2 text-white transform -translate-y-1/2 bg-black rounded-full top-1/2"
                >
                  <MdArrowBackIos size={20} />
                </button>
              )}

              <div
                ref={thumbnailContainerRef}
                className="flex px-10 space-x-4 overflow-x-auto scrollbar-hide"
              >
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-20 w-20 object-cover cursor-pointer rounded-lg border-2 ${
                      currentIndex === index ? 'border-black' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>

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

      {isVirtualTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-5xl max-h-full p-8 overflow-auto bg-white rounded-lg">
            <button
              onClick={closeVirtualTourModal}
              className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
            >
              <IoClose size={33} />
            </button>

            {virtualTourUrl ? (
              <iframe
                src={virtualTourUrl}
                title="Virtual Tour"
                className="w-full h-[600px] rounded-lg"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-[600px] flex items-center justify-center text-gray-500">
                No Virtual Tour Available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
