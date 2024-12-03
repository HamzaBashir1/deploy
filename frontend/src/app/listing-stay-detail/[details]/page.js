"use client";

import React, { Fragment, useEffect, useState,useRef, useContext } from "react";

import { MdPhotoLibrary, Md360 } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Zoom } from "swiper/modules";
import { IoClose } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { Dialog, Transition } from "@headlessui/react";
// import { Md360 } from "react-icons/md";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "../component/CommentListing";
import FiveStartIconForRate from "../component/FiveStartIconForRate";
import StartRating from "../component/StartRating";
import { IoImageSharp } from "react-icons/io5";
import Avatar from "../../Shared/Avatar";
import Badge from "../../Shared/Badge";
import ButtonCircle from "../../Shared/ButtonCircle";
import ButtonPrimary from "../../Shared/ButtonPrimary";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import ButtonSecondary from "../../Shared/ButtonSecondary";
// import './styles.css';  // Adjust the path according to your file structure
import '../styless.css'
import ButtonClose from "../../Shared/ButtonClose";
import Input from "../../Shared/Input";
import LikeSaveBtns from "../component/LikeSaveBtns";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Amenities_demos, PHOTOS } from "../constant";
import StayDatesRangeInput from "../StayDatesRangeInput";
import GuestsInput from "../GuestsInput";
import SectionDateRange from "../SectionDateRange";
import { AuthContext } from "../../context/AuthContext";
import { FormContext } from "../../FormContext";


function Page({ params }) {
     // State for modal visibility
  const [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  const [accommodationData, setAccommodationData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState([]);   
  const [isCopied, setIsCopied] = useState(false);
  const [showSharjeelOnly, setShowSharjeelOnly] = useState(false);
  const [id , setid] = useState('');
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const latitude =  accommodationData?.location?.latitude;
  const longitude =  accommodationData?.location?.longitude;
  const [scrolled, setScrolled] = useState(false);
  const [dotCoords, setDotCoords] = useState({ x: 0, y: 0 })
  const [showDot, setShowDot] = useState(false);
  const [total, setTotal] = useState(0);
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);
  const thisPathname = usePathname();
  const router = useRouter();
  

  useEffect(() => {
    const fetchAccommodationData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${params.details}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setAccommodationData(result);
            setid(result._id);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchAccommodationData();
}, [params.details, router]);

const nightMin = accommodationData?.nightMin || 1; // Default to 1 night
const pricePerNight = accommodationData?.priceMonThus || 99; // Single nightly price

const calculateDays = (start, end) => {
  if (!start || !end) return 0;
  const diffTime = new Date(end) - new Date(start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

useEffect(() => {
  const nights = calculateDays(selectedRange?.start, selectedRange?.end) || nightMin;
  const nightTotal = nights * pricePerNight;
  setTotal(nightTotal);
}, [selectedRange, pricePerNight, nightMin]);

// Logging the fetched data for debugging
console.log("Accommodation Data:", accommodationData);

const virtualTourRef = useRef(null);
// const images = data?.images || [];
const virtualTourUrl = accommodationData?.virtualTourUrl || "";
const Images = accommodationData?.images || [];
console.log("image" , Images)
const [showSlideshow, setShowSlideshow] = useState(false);
const [activeIndex, setActiveIndex] = useState(0);
const [isZoomed, setIsZoomed] = useState(false);

const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
const [isFullscreen, setIsFullscreen] = useState(false);
const [view, setView] = useState("360");
const openVirtualTour = () => setIsVirtualTourOpen(true);
const closeVirtualTour = () => setIsVirtualTourOpen(false);

const { user } = useContext(AuthContext);
const { Rating } = useContext(FormContext);
const [review, setReview] = useState({ reviewText: "", overallRating: Rating });
  

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE`);
  };
//


const ViewToggleButton = ({ currentView, viewType, icon: Icon, text }) => (
  <button
    onClick={() => setView(viewType)}
    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-300
      ${
        currentView === viewType
          ? "bg-white text-black shadow-lg"
          : "bg-black/30 text-white hover:bg-black/50"
      }`}
  >
    <Icon size={16} className="flex-shrink-0 sm:hidden" />
    <Icon size={20} className="flex-shrink-0 hidden sm:block" />
    <span className="font-medium whitespace-nowrap">{text}</span>
  </button>
);


  //
  const renderSection1 = () => {
    const name = accommodationData?.name || "Accommodation Name";
    const hostName = accommodationData?.contactDetails?.host || "Unknown Host";

     const propertyType = accommodationData?.propertyType || "null" 
     const city = accommodationData?.locationDetails?.city || "Unknown City";
     const zipCode = accommodationData?.locationDetails?.zipCode || "No Zip Code";
     const country = accommodationData?.locationDetails?.country || "Unknown Country";
     const person = accommodationData?.person || "Unknown ";
     const bed = accommodationData?.beds || 0;
     const bath = accommodationData?.bathroom || 0;
     const bedroom = accommodationData?.bedroom || 0;
     const id =  accommodationData?.userId || ""
     
    //  console.log("id",id._id)
     return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex items-center justify-between">
          <Badge name={propertyType} />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
          {name}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating />
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1"> {city}, {country}</span>
          </span>
        </div>
        {/* 4 */}
        <div className="flex items-center">
          <Avatar hasChecked id={id._id} sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 ">
            Hosted by{" "}
            <span className="font-medium text-neutral-900">
              {hostName}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100" />

        {/* 6 */}
        <div className="flex items-center justify-between space-x-8 text-sm xl:justify-start xl:space-x-12 text-neutral-700 ">
          <div className="flex items-center space-x-3 ">
            <i className="text-2xl las la-user">  </i>
            <span className="">
            { person }{" "}  <span className="hidden ml-1 sm:inline-block">guests</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="text-2xl las la-bed"></i>
            <span className="">
              {bed} <span className="hidden sm:inline-block">beds</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="text-2xl las la-bath"></i>
            <span className="">
            {bath} <span className="hidden sm:inline-block">baths</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="text-2xl las la-door-open"></i>
            <span className="">
              {bedroom} <span className="hidden sm:inline-block">bedrooms</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    
    const description = accommodationData?.description || "Accommodation discription";
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Stay information</h2>
        <div className="border-b w-14 border-neutral-200"></div>
        <div className="text-neutral-600">
          <span>
         {description}
          </span>
          <br />
          <br />
          <span>
            
          </span>
          <br /> <br />
          <span>
            
          </span>
        </div>
      </div>
    );
  };
  const renderSection3 = () => {
    const name = accommodationData?.name || "99";
  
    // Combine all amenities into one array
    const allAmenities = [
      ...accommodationData?.generalAmenities || [],
      ...accommodationData?.otherAmenities || [],
      ...accommodationData?.safeAmenities || [],
      
    ];
  
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenities</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
  
        {/* List of amenities */}
        <div className="grid grid-cols-1 gap-6 text-sm xl:grid-cols-3 text-neutral-700 dark:text-neutral-300">
          {allAmenities.slice(0, 12).map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <i className="text-3xl las la-check-circle"></i> {/* Placeholder icon */}
              <span>{item}</span>
            </div>
          ))}
        </div>
  
        {/* Button to show more amenities */}
        <div className="border-b w-14 border-neutral-200"></div>
        <div>
          <ButtonSecondary onClick={openModalAmenities}>
            View more amenities
          </ButtonSecondary>
        </div>
  
        {/* Simple Modal */}
        {isOpenModalAmenities && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg dark:bg-neutral-900 dark:text-neutral-100">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b">
                <h3 className="text-lg font-medium">Amenities</h3>
                <button
                  onClick={closeModalAmenities}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  &times;
                </button>
              </div>
  
              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[70vh] divide-y divide-neutral-200 dark:divide-neutral-700">
                {allAmenities.map((item, index) => (
                  <div key={index} className="flex items-center py-4 space-x-5">
                    <i className="text-3xl las la-check-circle"></i> {/* Placeholder icon */}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  
 
  const renderMotalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full h-screen max-w-4xl py-8">
                <div className="inline-flex flex-col w-full h-full pb-2 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100">
                  <div className="relative flex-shrink-0 px-6 py-4 text-center border-b border-neutral-200 dark:border-neutral-800">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto divide-y text-neutral-700 dark:text-neutral-300 divide-neutral-200">
                    {Amenities_demos.filter((_, i) => i < 1212).map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                      >
                        <i
                          className={`text-4xl text-neutral-6000 las ${item.icon}`}
                        ></i>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection4 = () => {
    const priceMonThus =  accommodationData?.priceMonThus || "99"
    
    const priceFriSun =  accommodationData?.priceFriSun || "99"
    const discount =  accommodationData?.discount || "99"
    const nightMin =  accommodationData?.nightMin || "99"
    const nightMax = accommodationData?.nightMax || "9"
 

    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Room Rates </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="-mb-4 text-sm sm:text-base text-neutral-6000 dark:text-neutral-300">
            <div className="flex items-center justify-between p-4 space-x-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span>Monday - Thursday</span>
              <span>${priceMonThus}</span>
            </div>
            <div className="flex items-center justify-between p-4 space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>${priceMonThus}</span>
            </div>
            <div className="flex items-center justify-between p-4 space-x-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span>Friday - Sunday</span>
              <span>${priceFriSun}</span>
            </div>
            <div className="flex items-center justify-between p-4 space-x-4 rounded-lg">
              <span>Rent by month</span>
              <span>-{discount} %</span>
            </div>
            <div className="flex items-center justify-between p-4 space-x-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span>Minimum number of nights</span>
              <span>{nightMin} night</span>
            </div>
            <div className="flex items-center justify-between p-4 space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>{nightMax} nights</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    const hostName = accommodationData?.contactDetails?.host || "Unknown Host";
    const id =  accommodationData?.userId || ""
   
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            id={id._id}
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              {hostName}
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating />
              <span className="mx-2">·</span>
              <span> 12 places</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined in March 2016</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="/author">See host profile</ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSection6 = () => { // Get user from context
    const accid = accommodationData?._id || " ";
    const id = accommodationData?.userId || "";
  
  
    const handleInputChange = (event) => { 
      setReview((prev) => ({ ...prev, reviewText: event.target.value }));
    };
  
    const handleRatingChange = (newRating) => {
      setReview((prev) => ({ ...prev, overallRating: newRating }));
    };
  
    const handleSubmit = async () => {
      const reviewData = {
        reviewText: review.reviewText,
        overallRating: Rating,
        name: user.name,
        userReview: user._id,
        accommodation: accid,
        user: id._id,
      };
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${accid}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
          }
        );
  
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message || "Failed to submit the review");
        }
  
        const result = await response.json();
        
        setReview({ reviewText: "", overallRating: 0 });
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    };
  
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
  
        <div className="space-y-5">
          <FiveStartIconForRate
            iconClass="w-6 h-6"
            className="space-x-0.5"
            onChange={handleRatingChange}
          />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
              value={review.reviewText}
              onChange={handleInputChange}
            />
            <ButtonCircle
              className="absolute transform -translate-y-1/2 bg-[#0D9488] right-2 top-1/2"
              size=" w-12 h-12 "
              onClick={handleSubmit}
            >
              <ArrowRightIcon className="w-5 h-5 " />
            </ButtonCircle>
          </div>
        </div>
  
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" apiUrl={accid}/>
         
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };
  

  const renderSection7 = () => {
    const locationDetails =  accommodationData?.locationDetails?.streetAndNumber || ""
   
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {locationDetails}
          </span>
        </div>
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="z-0 aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl">
          <div className="z-0 overflow-hidden rounded-xl">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=${locationDetails}`}
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Refund 50% of the booking value when customers cancel the room
            within 48 hours after successful booking and 14 days before the
            check-in time. <br />
            Then, cancel the room 14 days before the check-in time, get a 50%
            refund of the total amount paid (minus the service fee).
          </span>
        </div>
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Check-in time</h4>
          <div className="max-w-md mt-3 text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
            <div className="flex justify-between p-3 space-x-10 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span>Check-in</span>
              <span>08:00 am - 12:00 am</span>
            </div>
            <div className="flex justify-between p-3 space-x-10">
              <span>Check-out</span>
              <span>02:00 pm - 04:00 pm</span>
            </div>
          </div>
        </div>
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Special Note</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 space-y-2 text-neutral-500 dark:text-neutral-400">
              <li>
                Ban and I will work together to keep the landscape and
                environment green and clean by not littering, not using
                stimulants and respecting people around.
              </li>
              <li>Do not sing karaoke past 11:30</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
   
    

    const handleDateChange = (dates) => {
      const [start, end] = dates;
      setSelectedRange({ start, end });
    };
  
    
  
    const guestData = {
      adults: guestAdultsInputValue,
      children: guestChildrenInputValue,
      infants: guestInfantsInputValue,
    };
  
    const handleReserve = () => {
      if (!selectedRange.start || !selectedRange.end) {
        console.error("Please select valid check-in and check-out dates.");
        return;
      }

      // Calculate nights dynamically using calculateDays
      const nights = calculateDays(selectedRange.start, selectedRange.end);

      try {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            checkInDate: selectedRange.start,
            checkOutDate: selectedRange.end,
            guests: guestData,
            total,
            listingId: accommodationData?._id,
            data: accommodationData,
            nights
          })
        );
        router.push("/Checkout");
      } catch (error) {
        console.error("Reservation failed. Please try again.", error);
      }
    };
  
    return (
      <div className="shadow-xl listingSectionSidebar__wrap">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            ${pricePerNight}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /night
            </span>
          </span>
          <StartRating />
        </div>
  
        {/* FORM */}
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl">
          <StayDatesRangeInput className="flex-1 z-[11]" onDateChange={handleDateChange} />
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <GuestsInput
            className="flex-1"
            guestAdultsInputValue={guestAdultsInputValue}
            guestChildrenInputValue={guestChildrenInputValue}
            guestInfantsInputValue={guestInfantsInputValue}
            handleChangeData={(value, key) => {
              if (key === "guestAdults") setGuestAdultsInputValue(value);
              if (key === "guestChildren") setGuestChildrenInputValue(value);
              if (key === "guestInfants") setGuestInfantsInputValue(value);
            }}
          />
        </form>
  
        {/* SUMMARY */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>${pricePerNight} x {calculateDays(selectedRange?.start, selectedRange?.end)} nights</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
  
        {/* SUBMIT */}
        <ButtonPrimary className="bg-[#357965]" onClick={handleReserve} >Reserve</ButtonPrimary>
      </div>
    );
  };
  
  return (
    <div>
    <div className="nc-ListingStayDetailPage">
    
    {/*  HEADER */}
    <header className="rounded-md sm:rounded-xl">
      <div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
        <div
          className="relative col-span-2 row-span-3 overflow-hidden rounded-md cursor-pointer sm:row-span-2 sm:rounded-xl"
          onClick={handleOpenModalImageGallery}
        >
          <Image
            fill
            className="object-cover rounded-md sm:rounded-xl"
            src={Images[0]}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
          <div className="absolute inset-0 transition-opacity opacity-0 bg-neutral-900 bg-opacity-20 hover:opacity-100"></div>
        </div>
        {Images.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
          <div
            key={index}
            className={`relative rounded-md sm:rounded-xl overflow-hidden ${
              index >= 3 ? "hidden sm:block" : ""
            }`}
          >
            <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
              <Image
                fill
                className="object-cover rounded-md sm:rounded-xl "
                src={item || ""}
                alt=""
                sizes="400px"
              />
            </div>

            {/* OVERLAY */}
            <div
              className="absolute inset-0 transition-opacity opacity-0 cursor-pointer bg-neutral-900 bg-opacity-20 hover:opacity-100"
              onClick={handleOpenModalImageGallery}
            />
          </div>
        ))}

        <button
          className="absolute z-10 hidden px-4 py-2 md:flex md:items-center md:justify-center left-3 bottom-3 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
          onClick={handleOpenModalImageGallery}
        >
          <IoImageSharp  className="w-5 h-5" />
          <span className="ml-2 text-sm font-medium text-neutral-800">
            Show all photos
          </span>
        </button>
        <button
          className="absolute z-10 hidden px-4 py-2 md:flex md:items-center md:justify-center left-48 bottom-3 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
          onClick={openVirtualTour}
        >
          <Md360 className="w-5 h-5" />
          <span className="ml-2 text-sm font-medium text-neutral-800">
          360° Tour
          </span>
        </button>
        
      </div>
    </header>
    {/* Virtual Tour Modal */}
    {isVirtualTourOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-11/12 bg-white rounded-lg shadow-lg sm:w-4/5 lg:w-3/4 xl:w-3/5 h-[85vh]">
          {/* Close Button */}
          <button
            className="absolute flex items-center justify-center w-10 h-10 text-gray-700 bg-gray-200 rounded-full hover:text-black top-2 left-[370px] sm:top-4 sm:right-4"
            onClick={closeVirtualTour}
            title="Close"
          >
            <IoClose size={24} />
          </button>
    
          {/* Virtual Tour Content */}
          <div className="w-full h-full">
            {virtualTourUrl ? (
              <iframe
                src={virtualTourUrl}
                title="360° Virtual Tour"
                className="w-full h-full border-0"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300 bg-gray-800">
                <Md360 size={48} />
                <span className="ml-4">Virtual tour not available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    
    {/* MAIN */}
    <main className="relative z-10 flex flex-col mt-11 lg:flex-row">
      {/* CONTENT */}
      <div className="w-full space-y-8 lg:w-3/5 xl:w-2/3 lg:space-y-10 lg:pr-10">
        {renderSection1()}
        {renderSection2()}
        {renderSection3()}
        {renderSection4()}
        <SectionDateRange data={accommodationData} />
        {renderSection5()}
        {renderSection6()}
        {renderSection7()}
        {renderSection8()}
      </div>

      {/* SIDEBAR */}
      <div className="flex-grow hidden lg:block mt-14 lg:mt-0">
        <div className="sticky top-28">{renderSidebar()}</div>
      </div>
    </main>
  </div>
   
    </div>
  )
}

export default Page
