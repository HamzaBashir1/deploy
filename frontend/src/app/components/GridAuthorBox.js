"use client";

import React, { useEffect } from "react";
import Heading from "./HowItWork/Heading";
import CardAuthorBox from "./GridAuthorBox/CardAuthorBox";
import useFetchData from "../hooks/useFetchData"; // Ensure the path is correct for your custom hook
import ButtonSecondary from "../Shared/Button/ButtonSecondary";
import ButtonPrimary from "../Shared/Button/ButtonPrimary";
import Loading from "./Loader/Loading";
import Error from "./Error/Error";

const GridAuthorBox = ({
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ",
}) => {
  // Use the custom hook to fetch host data from the API
  const { data, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/hosts`);

  console.log("host data", data); // Log to see the data structure

  // If data is still loading or an error occurred, display a fallback UI
  if (loading) return <Loading />;
  if (error) return <Error />;

  const authors = data || []; // Ensure 'data' is an array

  console.log("Authors in GridAuthorBox:", authors);

  return (
    <div className={`nc-SectionGridAuthorBox relative ${className}`} data-nc-id="SectionGridAuthorBox">
      <Heading desc="Rating based on customer reviews" isCenter>
        Top 10 authors of the month
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
        {authors.map((author, index) => {
          // Log the author data before passing it as a prop
          console.log("Author data being passed:", author);

          return (
            <CardAuthorBox
              index={index < 3 ? index + 1 : undefined} // Ensure index starts from 1
              key={author._id} // Use _id as the key
              author={author} // Passing author data here
            />
          );
        })}
      </div>

      <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
        <ButtonSecondary loading>Show me more </ButtonSecondary>
        <ButtonPrimary className="bg-[#238869] hover:bg-[#14634b] text-neutral-50">Become a host</ButtonPrimary>
      </div>
    </div>
  );
};

export default GridAuthorBox;
