"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import Avatar from "../../Shared/Avatar";
import { FormContext } from "../../FormContext";
import ButtonSecondary from "../../Shared/ButtonSecondary";
import { toast } from "react-toastify";

const CommentListing = ({ className = "", accommodationData, id,hasListingTitle }) => {
  const [comments, setComments] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(5); // Start with 5 reviews
  const [loading, setLoading] = useState(true);
  const {updatehostcommentleght,
    updatehostoverallRating,
    hostoverallRating,
    hostcommentleght
} = useContext(FormContext); 
  const [error, setError] = useState(null);
  let averageRating ;



  const handleUpdateUser = async () => {
   
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hosts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        overallrating :averageRating
        }),
      });
      // toast.success("su")
  
    } catch (error) {
      console.error(error);
     
      
    }
  };
  useEffect(() => {
    if (!accommodationData || accommodationData.length === 0) {
      setLoading(false);
      return; 
    }

    const fetchAllComments = async () => {
      try {
        let allComments = [];
        let totalRating = 0;

        // Fetch reviews for each accommodation
        for (const acc of accommodationData) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${acc._id}`);
          if (!response.ok) {
            console.error(`Failed to fetch comments for accommodation ID: ${acc._id}`);
            continue; // Skip this accommodation if there's an error
          }
          const data = await response.json();
          const fetchedComments = data.data || [];

          // Accumulate comments and ratings
          allComments = [...allComments, ...fetchedComments];
          totalRating += fetchedComments.reduce((sum, comment) => sum + (comment.overallRating || 0), 0);
        }

        // Update context values
        const commentCount = allComments.length;
        updatehostcommentleght(commentCount);
         averageRating = commentCount > 0 ? (totalRating / commentCount).toFixed(2) : 0;
        updatehostoverallRating(averageRating);

        setComments(allComments);
        setTimeout(() => {
          handleUpdateUser(); // Reload the page after a delay for user feedback
        }, 1500);
        
      } catch (err) {
        setError(err.message || "An error occurred while fetching comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllComments();
  }, [accommodationData]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Formats to dd/mm/yyyy
  };

  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + 5); // Increment visible reviews by 5
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error loading comments: {error}</p>;
  }

  return (
    <div className={`nc-CommentListing ${className}`} data-nc-id="CommentListing">
      {comments.length > 0 ? (
        <>
          {comments.slice(0, visibleReviews).map((comment, index) => (
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
          ))}

          {visibleReviews < comments.length && (
            <div className="pt-8">
              
              <ButtonSecondary onClick={handleShowMore}>View more 5 reviews</ButtonSecondary>
            </div>
          )}
        </>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentListing;
