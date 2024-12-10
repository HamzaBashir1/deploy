"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import Avatar from "../../Shared/Avatar";
import { FormContext } from "../../FormContext";

const CommentListing = ({ className = "", apiUrl, hasListingTitle }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updatecommetlenght, updateoverallRating } = useContext(FormContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${apiUrl}`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        const fetchedComments = data.data || [];

        const commentCount = fetchedComments.length;
        updatecommetlenght(commentCount);

        const totalRating = fetchedComments.reduce((sum, comment) => sum + (comment.overallRating || 0), 0);
        const averageRating = commentCount > 0 ? (totalRating / commentCount).toFixed(2) : 0;
        updateoverallRating(averageRating);

        setComments(fetchedComments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [apiUrl]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Formats to dd/mm/yyyy
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (!apiUrl) {
    return <p>No comments available. Please provide a valid API URL.</p>;
  }

  if (error) {
    return <p>Error loading comments: {error}</p>;
  }

  return (
    <div className={`nc-CommentListing ${className}`} data-nc-id="CommentListing">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="flex mb-6 space-x-4">
            <div className="pt-0.5">
              <Avatar
                sizeClass="h-10 w-10 text-lg"
                radius="rounded-full"
                userName={comment.name || "Anonymous"}
                imgUrl={comment.avatar}
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between space-x-3">
                <div className="flex flex-col">
                  <div className="text-sm font-semibold">
                    <span>{comment.name || "Anonymous"}</span>
                    {hasListingTitle && (
                      <>
                        <span className="font-normal text-neutral-500 dark:text-neutral-400">
                          {` review in `}
                        </span>
                        <a href="/">The Lounge & Bar</a>
                      </>
                    )}
                  </div>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {formatDate(comment.createdAt) || "Unknown Date"}
                  </span>
                </div>
                <div className="flex text-yellow-500">
                  {[...Array(comment.overallRating || 0)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
                {comment.reviewText || "No comment provided"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentListing;
