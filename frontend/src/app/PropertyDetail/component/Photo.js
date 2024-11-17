import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useSwipeable } from "react-swipeable";

const Photo = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("virtualTour"); // Default to virtual tour
  const [isDesktop, setIsDesktop] = useState(true);
  const thumbnailContainerRef = useRef(null);

  const images = data?.images || [];
  const virtualTourUrl = data?.virtualTourUrl || "";

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 150 * direction;
      thumbnailContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
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
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderVirtualTour = () =>
    virtualTourUrl ? (
      <iframe
        src={virtualTourUrl}
        title="Virtual Tour"
        className="w-full h-[420px] lg:h-[600px] rounded-lg"
        allowFullScreen
      />
    ) : (
      <div className="w-full h-[420px] lg:h-[600px] flex items-center justify-center text-gray-500 bg-gray-100 rounded-lg">
        No Virtual Tour Available
      </div>
    );

  const renderPhotoGallery = () => (
    <div className="flex flex-col w-full h-[420px] lg:h-[600px]">
      <div className="relative flex-grow" {...swipeHandlers}>
        <img
          src={images[currentIndex]}
          alt="Property"
          className="w-full h-full rounded-lg object-cover"
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => setActiveView("virtualTour")}
            className="px-4 py-2 bg-white text-black rounded-md border border-black hover:bg-gray-100"
          >
            View 360° Tour
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white text-black rounded-md border border-black hover:bg-gray-100"
          >
            See All Photos
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Main View Controls */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveView("virtualTour")}
          className={`px-4 py-2 rounded-md ${
            activeView === "virtualTour"
              ? "bg-black text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          360° Virtual Tour
        </button>
        <button
          onClick={() => setActiveView("photos")}
          className={`px-4 py-2 rounded-md ${
            activeView === "photos"
              ? "bg-black text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          Photos ({images.length})
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {activeView === "virtualTour"
          ? renderVirtualTour()
          : renderPhotoGallery()}
      </div>

      {/* Thumbnail Preview */}
      <div className="mt-4 relative">
        <div
          ref={thumbnailContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-10 py-2"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => {
                setCurrentIndex(index);
                setActiveView("photos");
              }}
              className={`h-20 w-20 object-cover cursor-pointer rounded-lg border-2 
                ${
                  currentIndex === index && activeView === "photos"
                    ? "border-black"
                    : "border-transparent"
                }
                hover:opacity-80 transition-opacity duration-200`}
            />
          ))}
        </div>
        {images.length > 5 && (
          <>
            <button
              onClick={() => scrollThumbnails(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:bg-gray-800"
            >
              <MdArrowBackIos size={20} />
            </button>
            <button
              onClick={() => scrollThumbnails(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:bg-gray-800"
            >
              <MdArrowForwardIos size={20} />
            </button>
          </>
        )}
      </div>

      {/* Full-screen Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-full max-w-6xl p-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
            >
              <IoIosCloseCircleOutline size={33} />
            </button>

            <div className="relative flex items-center justify-center mb-4">
              <button
                onClick={handlePrev}
                className={`absolute left-2 text-white bg-black bg-opacity-50 p-2 rounded-full 
                  hover:bg-opacity-75 ${
                    currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={currentIndex === 0}
              >
                <MdArrowBackIos size={33} />
              </button>

              <img
                src={images[currentIndex]}
                alt={`Gallery Image`}
                className="max-h-[80vh] w-auto rounded-lg"
              />

              <button
                onClick={handleNext}
                className={`absolute right-2 text-white bg-black bg-opacity-50 p-2 rounded-full 
                  hover:bg-opacity-75 ${
                    currentIndex === images.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                disabled={currentIndex === images.length - 1}
              >
                <MdArrowForwardIos size={33} />
              </button>
            </div>

            <div className="relative mt-4">
              <div className="flex justify-center gap-2 px-10">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-16 w-16 object-cover cursor-pointer rounded-lg border-2 
                      ${
                        currentIndex === index
                          ? "border-white"
                          : "border-transparent"
                      }
                      hover:opacity-80 transition-opacity duration-200`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
