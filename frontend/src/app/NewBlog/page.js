"use client"
import React, { useEffect, useState } from "react";
import BgGlassmorphism from "../components/BgGlassmorphism";
import Subscribe from "../components/Subscribe";
import SectionAds from "./component/SectionAds";
import SectionMagazine5 from "./component/SectionMagazine5";
import SectionLatestPosts from "./component/SectionLatestPosts";
import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error";

const Page = () => {
  
    const [posts, setPosts] = useState([]);  // State to store posts
    const [loading, setLoading] = useState(true);  // State to track loading
    const [error, setError] = useState(null);  // State to track error
  
    // Fetch data from API on component mount
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);
            if (!response.ok) {
            throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPosts(data);  // Set the posts data
            console.log("Fetched posts data:", data);  // Log the posts data to console
        } catch (err) {
            setError(err.message);  // Set the error message
            console.error("Error fetching posts:", err);  // Log error to console
        } finally {
            setLoading(false);  // Set loading to false once fetching is done
        }
        };

        fetchData();
    }, []);
  

  console.log("post data", posts);

  // Return loading and error components
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  // Ensure articles is defined before rendering
  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="nc-BlogPage overflow-hidden relative">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      {/* ======== ALL SECTIONS ======== */}
      <div className="container relative">
        {/* === SECTION 1 === */}
        <div className="pt-12 pb-16 lg:pb-28">
          <SectionMagazine5 posts={posts} />
        </div>

        {/* === SECTION 1 === */}
        <SectionAds />

        {/* === SECTION 8 === */}
        {/* <SectionLatestPosts posts={posts} className="py-16 lg:py-28" /> */}

        {/* === SECTION 1 === */}
        <Subscribe className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default Page;
