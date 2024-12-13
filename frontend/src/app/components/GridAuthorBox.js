"use client";

import React, { useEffect, useState } from "react";
import Heading from "./HowItWork/Heading";
import CardAuthorBox from "./GridAuthorBox/CardAuthorBox";
import useFetchData from "../hooks/useFetchData"; // Ensure the path is correct for your custom hook
import ButtonSecondary from "../Shared/Button/ButtonSecondary";
import ButtonPrimary from "../Shared/Button/ButtonPrimary";
import Loading from "./Loader/Loading";
import Error from "./Error/Error";
import Link from "next/link";

const GridAuthorBox = ({
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ",
}) => {
  // Use the custom hook to fetch host data from the API
  const { data, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/hosts`);
  const [visibleAuthors, setVisibleAuthors] = useState(10); // Track how many authors are shown

  if (loading) return <Loading />;
  if (error) return <Error />;

  const authors = data || []; // Ensure 'data' is an array

  const handleLoadMore = () => {
    setVisibleAuthors((prev) => prev + 5); // Increment the visible authors by 5
  };

  const isAllAuthorsShown = visibleAuthors >= authors.length; // Check if all authors are displayed

  return (
    <div className={`nc-SectionGridAuthorBox relative ${className}`} data-nc-id="SectionGridAuthorBox">
      <Heading desc="Rating based on customer reviews" isCenter>
        Top 10 authors of the month
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
        {authors.slice(0, visibleAuthors).map((author, index) => (
          <CardAuthorBox
            index={index < 3 ? index + 1 : undefined} // Ensure index starts from 1
            key={author._id} // Use _id as the key
            author={author} // Passing author data here
          />
        ))}
      </div>

      <div className="flex flex-col justify-center mt-16 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-5">
        <ButtonSecondary
          onClick={handleLoadMore}
          disabled={isAllAuthorsShown} // Disable button if all authors are shown
        >
          {isAllAuthorsShown ? "No more authors" : "Show me more"}
        </ButtonSecondary>
        <Link href="/Signup">
          <ButtonPrimary className="bg-[#238869] hover:bg-[#14634b] text-neutral-50" >Become a host</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default GridAuthorBox;
