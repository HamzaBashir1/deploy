"use client"
import React, { Fragment, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Tab } from "@headlessui/react";
// import CommentListing from "components/CommentListing/CommentListing";
// import StartRating from "components/StartRating/StartRating";
import Avatar from "../../Shared/Avatar";
import StartRating from "../../Shared/StartRating";
import CommentListing from "../../listing-stay-detail/component/CommentListing";
import ButtonSecondary from "../../Shared/ButtonSecondary";
import useFetchData from "../../hooks/useFetchData";
import StayCard from "../../components/GridFeaturePlaces/StayCard";
import StayCard2 from "@/app/listing-stay-map/component/StayCard2";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer/Footer";

const Page = ({ className = "", params }) => {

  const router = useRouter();
  const id = params?.id;
  console.log("id", id)
  const [categories] = useState(["Stays"]);
  const [hostData, setHostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const formattedDate = hostData?.createdAt
    ? new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(hostData.createdAt))
    : "Unknown";

  console.log("formattedDate", formattedDate);
    
  useEffect(() => {
    // Fetch host data by id
    const fetchHostData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hosts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch host data");
        }
        const data = await response.json();
        setHostData(data);

        // Log the fetched host data
        console.log("Host Data:", data);
      } catch (error) {
        console.error("Error fetching host data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchHostData();
    }
  }, [id]);

  const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${id}`);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4); // Increase visible count by 4
  };

  const photo = hostData?.photo;


  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          id={photo || "null"}
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
        />

        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{hostData?.name ||"Kevin Francis"}</h2>
          <StartRating className="!text-base" />
        </div>

        {/* ---- */}
        <p className="text-neutral-500">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor.
        </p>

        {/* ---- */}
        {/* <SocialsList
          className="!space-x-3"
          itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 text-xl"
        /> */}

        {/* ---- */}
        <div className="border-b border-neutral-200 w-14"></div>

        {/* ---- */}
        <div className="space-y-4">
          {/* <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-neutral-600">
              Ha Noi, Viet Nam
            </span>
          </div> */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
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
            <span className="text-neutral-600">
              Speaking English
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
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
            <span className="text-neutral-600">
              Joined in {formattedDate || "August 2024"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
  
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">{hostData?.name ||"Kevin Francis"} listings</h2>
          <span className="block mt-2 text-neutral-500 ">
            {hostData?.name || "Kevin Francis's"} listings is very rich, 5 star reviews help him to be
            more branded.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 "></div>

        <div>
          <Tab.Group>
            {/* <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List> */}
            <Tab.Panels>
            <Tab.Panel className="">
              {accommodationData.length ? (
                <>
                  <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                    {accommodationData.slice(0, visibleCount).map((stay) => (
                      <StayCard2 key={stay._id} data={stay} />
                    ))}
                  </div>
                  {visibleCount < accommodationData.length && (
                    <div className="flex mt-11 justify-center items-center">
                      <ButtonSecondary onClick={handleShowMore}>Show me more</ButtonSecondary>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center">
                  <p>No accommodations available.</p>
                </div>
              )}
            </Tab.Panel>

            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 ">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <Header />
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-18">{renderSidebar()}</div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
          {renderSection2()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
