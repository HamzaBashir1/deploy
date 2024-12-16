import Link from "next/link";
import React from "react";
import PostTypeFeaturedIcon from "./PostTypeFeaturedIcon";
import NcImage from "@/app/Shared/NcImage/NcImage";
import PostCardMeta from "./PostCardMeta";
import CategoryBadgeList from "./CategoryBadgeList";

const Card3 = ({ className = "h-full", post }) => {
    console.log("Card3", post);
  const { title, href, featuredImage, desc, categories, postType } = post;

  return (
    <div
      className={`nc-Card3 relative flex flex-col-reverse sm:flex-row sm:items-center rounded-[40px] group ${className}`}
      data-nc-id="Card3"
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-5 mb-4">
          <CategoryBadgeList categories={categories} />
          <div>
            <h2
              className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}
            >
              {/* <Link href={href} className="line-clamp-2" title={title}> */}
                {title}
              {/* </Link> */}
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                {desc}
              </span>
            </div>
          </div>

          <PostCardMeta meta={{ ...post }} />
        </div>
      </div>

      <div
        className={`block flex-shrink-0 sm:w-56 sm:ml-6 rounded-3xl overflow-hidden mb-5 sm:mb-0`}
      >
        {/* <Link
          src={href}
          className={`block w-full h-0 aspect-h-9 sm:aspect-h-16 aspect-w-16 `}
        > */}
          <NcImage
            containerClassName="absolute inset-0"
            src={featuredImage}
            alt={title}
          />
          <span>
            <PostTypeFeaturedIcon
              className="absolute left-2 bottom-2"
              postType={postType}
              wrapSize="w-8 h-8"
              iconSize="w-4 h-4"
            />
          </span>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Card3;
