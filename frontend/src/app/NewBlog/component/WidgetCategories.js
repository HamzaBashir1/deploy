import React from "react";
import WidgetHeading1 from "./WidgetHeading1";
import CardCategory1 from "./CardCategory1";

const WidgetCategories = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  categories = [],  // Accept categories as a prop
}) => {
    console.log("categories", categories);
  return (
    <div
      className={`nc-WidgetCategories rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetCategories"
    >
      <WidgetHeading1
        title="✨ Trending topics"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {/* {categories.map((category, index) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              key={index}  // Use index as the key for unique categories
              taxonomy={{ name: category }}  // Pass category as an object
              size="normal"
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
