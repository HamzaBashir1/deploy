import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Zoom } from "swiper/modules";
import { IoClose } from "react-icons/io5";
import {
  BsZoomIn,
  BsZoomOut,
  BsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs";
import { MdPhotoLibrary, Md360 } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

const Photo = ({ data }) => {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [view, setView] = useState("360");

  const virtualTourRef = useRef(null);
  const images = data?.images || [];
  const virtualTourUrl = data?.virtualTourUrl || "";

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && !isFullscreen) {
        setShowSlideshow(false);
      }
    },
    [isFullscreen]
  );

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await virtualTourRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (showSlideshow) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSlideshow, handleKeyDown]);

  const ViewToggleButton = ({ currentView, viewType, icon: Icon, text }) => (
    <button
      onClick={() => setView(viewType)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300
        ${
          currentView === viewType
            ? "bg-white text-black shadow-lg"
            : "bg-black/30 text-white hover:bg-black/50"
        }`}
    >
      <Icon size={20} className="flex-shrink-0" />
      <span className="text-sm font-medium whitespace-nowrap">{text}</span>
    </button>
  );

  const renderVirtualTour = () => (
    <div className="relative w-full h-[85vh] bg-gray-900 rounded-xl overflow-hidden">
      <div ref={virtualTourRef} className="w-full h-full">
        {virtualTourUrl ? (
          <iframe
            src={virtualTourUrl}
            title="360° Virtual Tour"
            className="w-full h-full border-0"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
            <Md360 size={48} className="text-gray-400 mb-2" />
            <span className="text-gray-300 font-medium">
              Virtual tour not available
            </span>
          </div>
        )}
      </div>

      {/* Top Controls Bar */}
      <div
        className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center 
        bg-gradient-to-b from-black/50 to-transparent"
      >
        {/* View Toggle Buttons */}
        <div className="flex gap-2">
          <ViewToggleButton
            currentView={view}
            viewType="360"
            icon={Md360}
            text="360° Tour"
          />
          <ViewToggleButton
            currentView={view}
            viewType="photos"
            icon={MdPhotoLibrary}
            text={`Photos (${images.length})`}
          />
        </div>

        {/* Fullscreen Button */}
        {virtualTourUrl && (
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2.5 bg-black/30 text-white rounded-full
              hover:bg-black/50 transition-all duration-300"
          >
            {isFullscreen ? (
              <BsFullscreenExit size={20} />
            ) : (
              <BsFullscreen size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );

  const renderPhotoGrid = () => (
    <div className="relative h-[85vh]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            setActiveIndex(0);
            setShowSlideshow(true);
          }}
          className="col-span-2 row-span-2 relative cursor-pointer group rounded-xl overflow-hidden"
        >
          <img
            src={images[0]}
            alt="Main"
            className="w-full h-full object-cover transition-transform duration-500 
              group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 
            transition-opacity duration-300"
          />
        </motion.div>
        {images.slice(1, 5).map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => {
              setActiveIndex(index + 1);
              setShowSlideshow(true);
            }}
            className="relative cursor-pointer group rounded-xl overflow-hidden"
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 
                group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 
              transition-opacity duration-300"
            />
            {index === 3 && images.length > 5 && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/60
                backdrop-blur-sm"
              >
                <span className="text-white text-2xl font-medium">
                  +{images.length - 5}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <div className="flex gap-2">
          <ViewToggleButton
            currentView={view}
            viewType="360"
            icon={Md360}
            text="360° Tour"
          />
          <ViewToggleButton
            currentView={view}
            viewType="photos"
            icon={MdPhotoLibrary}
            text={`Photos (${images.length})`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full">
        <AnimatePresence mode="wait">
          {view === "360" ? (
            <motion.div
              key="360"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderVirtualTour()}
            </motion.div>
          ) : (
            <motion.div
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderPhotoGrid()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slideshow Modal */}
      <AnimatePresence>
        {showSlideshow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black"
          >
            <div className="relative w-full h-screen flex flex-col">
              {/* Header */}
              <div
                className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 
                bg-gradient-to-b from-black/70 to-transparent"
              >
                <span className="text-white/90 text-sm font-medium">
                  {activeIndex + 1} / {images.length}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 text-white/90 hover:text-white rounded-full
                      hover:bg-white/10 transition-all duration-300"
                  >
                    {isZoomed ? (
                      <BsZoomOut size={22} />
                    ) : (
                      <BsZoomIn size={22} />
                    )}
                  </button>
                  <button
                    onClick={() => setShowSlideshow(false)}
                    className="p-2 text-white/90 hover:text-white rounded-full
                      hover:bg-white/10 transition-all duration-300"
                  >
                    <IoClose size={24} />
                  </button>
                </div>
              </div>

              {/* Swiper */}
              <Swiper
                modules={[Navigation, Pagination, Keyboard, Zoom]}
                initialSlide={activeIndex}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  enabled: true,
                  hideOnClick: true,
                }}
                keyboard={{ enabled: true }}
                zoom={{
                  maxRatio: 3,
                  minRatio: 1,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="w-full h-full select-none"
              >
                {images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <div className="swiper-zoom-container">
                      <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="max-h-screen w-auto object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnails */}
              <div
                className="absolute bottom-0 left-0 right-0 z-10 p-4 
                bg-gradient-to-t from-black/70 to-transparent"
              >
                <div className="flex justify-center gap-2 overflow-x-auto scrollbar-hide py-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden
                        ${
                          activeIndex === index
                            ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                            : "opacity-50 hover:opacity-100"
                        }
                        transition-all duration-300`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Photo;
