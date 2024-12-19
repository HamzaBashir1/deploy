import React from "react";
import Tag from "../../Shared/Tag/Tag";
import WidgetHeading1 from "./WidgetHeading1";

const WidgetTags = ({
  className = "bg-neutral-100",
  tags = [], // Make sure tags is passed as a prop
}) => {


    console.log("Widgettags", tags);
  return (
    <div
      className={`nc-WidgetTags rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetTags"
    >
      <WidgetHeading1
        title="🏷 Discover more tags"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-wrap p-4 xl:p-5">
        {tags.map((tag, index) => (
          <Tag className="mr-2 mb-2" key={index} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
