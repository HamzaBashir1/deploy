"use client"
import React, { useEffect, useState } from "react";
import WidgetTags from "./WidgetTags";
import WidgetCategories from "./WidgetCategories";
import WidgetPosts from "./WidgetPosts";
import Card3 from "./Card3";
import ButtonPrimary from "../../Shared/ButtonPrimary";
import Heading from "../../Shared/Heading";
import Pagination from "../../Shared/Pagination";

const SectionLatestPosts = ({
  posts = [],
  postCardName = "card3",
  className = "",
}) => {

    console.log("Latest Posts", posts);
    
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Extract unique categories from the posts data
    const allCategories = posts.map((post) => post.categories); // assuming categories is a string in each post
    const uniqueCategories = [...new Set(allCategories)]; // get unique categories
    setCategories(uniqueCategories);

    // Extract unique tags from the posts data
    const allTags = posts.flatMap((post) => post.tags || []); // assuming tags is an array of strings in each post
    const uniqueTags = [...new Set(allTags)]; // get unique tags
    setTags(uniqueTags);

    // Log the tags and categories to the console
    console.log("Categories:", uniqueCategories);
    console.log("Tags:", uniqueTags);
  }, [posts]);

  const renderCard = (post) => {
    switch (postCardName) {
      case "card3":
        return <Card3 key={post._id} className="" post={post} />;
      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-14">
          <Heading>Latest Articles 🎈</Heading>
          <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
            {posts.map((post) => renderCard(post))}
          </div>
          <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </div>
        <div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
          <WidgetTags tags={tags} /> 
          <WidgetCategories categories={categories} />
          <WidgetPosts posts={posts}/>
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
