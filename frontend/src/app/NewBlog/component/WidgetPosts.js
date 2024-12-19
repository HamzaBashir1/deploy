import React from "react";
// import Card3Small from "./Card3Small";
import WidgetHeading1 from "./WidgetHeading1";
import Card3Small from "./Card3Small";

const WidgetPosts = ({
  className = "bg-neutral-100",
  posts = [],
}) => {
    console.log("WidgetPosts", posts);
  return (
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Popular Posts"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200">
        {posts.map((post) => (
          <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200"
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetPosts;
