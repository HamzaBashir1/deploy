import React from "react";
import Link from "next/link";
import Avatar from "../../Shared/Avatar";
import { format } from 'date-fns';

const PostCardMeta = ({
  className = "leading-none",
  meta,
  hiddenAvatar = false,
  size = "normal",
}) => {
    console.log("meta", meta);
    
  const { date, author, createdAt } = meta;

  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy');

  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-sm" : "text-base"
      } ${className}`}
      data-nc-id="PostCardMeta"
    >
      {author.href ? (
        <Link
          href={author.href}
          className="flex-shrink-0 relative flex items-center space-x-2"
        >
          {!hiddenAvatar && (
            <Avatar
              radius="rounded-full"
              sizeClass={size === "normal" ? "h-7 w-7 text-sm" : "h-10 w-10 text-xl"}
              imgUrl={author.avatar}
              userName={author}
            />
          )}
          <span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
            {author}
          </span>
        </Link>
      ) : (
        <div className="flex-shrink-0 relative flex items-center space-x-2">
          {!hiddenAvatar && (
            <Avatar
              radius="rounded-full"
              sizeClass={size === "normal" ? "h-7 w-7 text-sm" : "h-10 w-10 text-xl"}
              imgUrl={author.avatar}
              userName={author}
            />
          )}
          <span className="block text-neutral-6000 dark:text-neutral-300 font-medium">
            {author}
          </span>
        </div>
      )}
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
          {formattedDate}
        </span>
      </>
    </div>
  );
};

export default PostCardMeta;
