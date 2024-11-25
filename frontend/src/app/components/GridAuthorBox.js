import React from "react";
import Heading from "./HowItWork/Heading";
import CardAuthorBox from "./GridAuthorBox/CardAuthorBox";
import { DEMO_AUTHORS } from "./data/authors";

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 10);

const GridAuthorBox = ({
  className = "",
  authors = DEMO_DATA,
  boxCard = "box1",
  gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ",
}) => {
  return (
    <div className={`nc-SectionGridAuthorBox relative ${className}`} data-nc-id="SectionGridAuthorBox">
      <Heading desc="Rating based on customer reviews" isCenter>
        Top 10 author of the month
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
      {authors.map((author, index) =>
        boxCard === "box2" ? (
            <CardAuthorBox
            index={index < 3 ? index + 1 : undefined}
            key={author.id}
            author={author}
            />
        ) : null // Optional: You can return a fallback value when the condition is false
        )}

      </div>
      <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
        <button className="ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900  dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-200 px-4 py-3 sm:px-6 text-sm sm:text-base">Show me more</button>
        <button className="ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 bg-white border-neutral-200 dark:bg-neutral-900  dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-200 px-4 py-3 sm:px-6 text-sm sm:text-base">Become a host</button>
      </div>
    </div>
  );
};

export default GridAuthorBox;
