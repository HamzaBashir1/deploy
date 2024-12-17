import Link from "next/link";
import React from "react";
import PostCardMeta from "./PostCardMeta";
import NcImage from "../../Shared/NcImage/NcImage";
import PostTypeFeaturedIcon from "./PostTypeFeaturedIcon";

const Card13 = ({ className = "", post }) => {
    console.log("Card13", post);
  const { title, href, content, featuredImage, date, postType } = post;

  return (
    <div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
      <div className="flex flex-col h-full py-2">
        <h2 className="nc-card-title block font-semibold text-base">
          {/* <Link href={href} className="line-clamp-2" title={title}> */}
            {title}
          {/* </Link> */}
        </h2>
        <span className="hidden sm:block my-3 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2">{content}</span>
        </span>
        <span className="mt-4 block sm:hidden text-sm text-neutral-500">
          {date}
        </span>
        <div className="mt-auto hidden sm:block">
          <PostCardMeta meta={{ ...post }} />
        </div>
      </div>

      {/* <Link
        href={href}
        className="block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5"
      > */}
        <NcImage
          containerClassName="absolute inset-0"
          className="object-cover w-full h-full rounded-xl sm:rounded-3xl"
          src={featuredImage}
          alt={title}
        />
        <PostTypeFeaturedIcon
          className="absolute bottom-2 left-2"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
      {/* </Link> */}
    </div>
  );
};

export default Card13;
