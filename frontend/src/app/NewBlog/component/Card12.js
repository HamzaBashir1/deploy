import React from "react";
import Link from "next/link";
import NcImage from "../../Shared/NcImage/NcImage";
import PostCardMeta from "./PostCardMeta";
import PostTypeFeaturedIcon from "./PostTypeFeaturedIcon";

const Card12 = ({ className = "h-full", post }) => {
  const { title, _id, image, content, blogType, summary } = post;

  return (
    <div
      className={`nc-Card12 group relative flex flex-col ${className}`}
      data-nc-id="Card12"
    >
      <Link
        href={`/Blog-Detail/${_id}`}
        className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden"
      >
        <NcImage
          containerClassName="absolute inset-0"
          src={image}
          alt={title}
        />
        <span>
          <PostTypeFeaturedIcon
            className="absolute bottom-2 left-2"
            postType={blogType}
            wrapSize="w-8 h-8"
            iconSize="w-4 h-4"
          />
        </span>
      </Link>

      <div className="mt-8 pr-10 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 transition-colors text-lg sm:text-2xl`}
        >
          <Link href={`/Blog-Detail/${_id}`} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <span className="hidden sm:block mt-4 text-neutral-500">
          <span className="line-clamp-2">{summary}</span>
        </span>
        <PostCardMeta className="mt-5" meta={post} />
      </div>
    </div>
  );
};

export default Card12;
