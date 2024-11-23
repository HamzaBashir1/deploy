"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { BiCalendar } from 'react-icons/bi';
import { IoPersonCircleOutline } from 'react-icons/io5';
import useFetchData from '../../hooks/useFetchData'; // Ensure this import matches your project structure
import { Base_URL } from '../../config';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import ArticleList from './ArticleList';

const ArticleLayout = ({ data }) => { 
  const router = useRouter(); 

  // Fallback values
  const title = data?.title || "N/A";
  const author = data?.author || "N/A";
  const date = data?.createdAt 
    ? new Date(data.createdAt).toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      }) 
    : "N/A"; // Format date to "11 April 2024"
  const content = data?.content || "N/A";
  const tags = data?.tags || []; 
  const categories = data?.categories || "N/A";

  // Fetch top articles
  const { data: articles = [], loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);

  return (
    <div className='pt-16 mx-4 sm:mx-8 lg:mx-20'>
      <div className="container p-4 mx-auto max-w-[1320px]">
        {/* Back Navigation */}
        <div className="mb-4">
          <a 
            href="#" 
            className="text-pink-500" 
            onClick={(e) => {
              e.preventDefault(); 
              router.back(); 
            }}
          >
            ❮ Back
          </a>
          <span className="ml-2 text-gray-500">{categories}</span>
        </div>

        {/* Article Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold">
              {title}
            </h1>
            <div className="flex flex-wrap mb-8 mt-5">
              {tags.length > 0 ? tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-black text-sm font-bold me-4 px-4 py-2 rounded-lg">
                  {tag}
                </span>
              )) : (
                <span className="text-gray-500">No tags available</span>
              )}
            </div>
            <div className="mt-2 text-black flex items-center font-light gap-2 my-6 lg:my-10">
              <span className="flex items-center mr-3 font-light gap-2"><BiCalendar /> {date}</span>
              <span className="flex items-center font-light gap-2"><IoPersonCircleOutline /> {author}</span>
            </div>

            <p className="mt-4 text-sm sm:text-base lg:text-lg" dangerouslySetInnerHTML={{ __html: content }}></p>
            <hr className='my-4 bg-gray-600'/>

            <div className="flex flex-wrap mb-8 mt-5">
              {tags.length > 0 ? tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-black text-sm font-bold me-4 px-4 py-2 rounded-lg">
                  {tag}
                </span>
              )) : (
                <span className="text-gray-500">No tags available</span>
              )}
            </div>
            <div className="mt-2 text-black flex items-center font-light gap-2 my-6 lg:my-10">
              <span className="flex items-center mr-3 font-light gap-2"><BiCalendar /> {date}</span>
              <span className="flex items-center font-light gap-2"><IoPersonCircleOutline /> {author}</span>
            </div>
            
            <ArticleList/>
          </div>

          {/* Sidebar: Top Articles */}
          <div className="relative lg:w-1/4 lg:pl-8"> {/* Add padding-left to create space after the vertical line */}
            {/* Vertical line */}
            <div className="absolute left-5 h-full border-l border-gray-300 hidden lg:block" style={{ top: '0%', bottom: '0%', width: '1px', marginLeft: '-16px', marginRight: '-16px' }}></div>

            <div className="pl-4">
              <h3 className="mb-4 text-lg lg:text-xl font-semibold">Tags</h3>
              <div className="flex flex-wrap mb-8 mt-5 gap-4">
                <button className='bg-white px-4 py-2 text-black rounded-lg border'>
                  Advice and tips
                </button>
                <button className='bg-white px-4 py-2 text-black rounded-lg border'>
                  Winter season
                </button>
                <button className='bg-white px-4 py-2 text-black rounded-lg border'>
                  Easter
                </button>
                <button className='bg-white px-4 py-2 text-black rounded-lg border'>
                  Spring season
                </button>
              </div>

              <h3 className="mb-4 text-lg lg:text-xl font-semibold">Top Articles</h3>
              <ul className="space-y-4">
                {loading && <Loading />}
                {error && <Error />}
                {articles.length > 0 ? (
                  articles.map((article, idx) => (
                    <SidebarItem key={idx} article={article} />
                  ))
                ) : (
                  <li className="text-gray-500">No top articles available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ article }) => (
  <li className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md">
    <img
      src={article.image}
      alt={article.title}
      className="object-cover w-20 h-20 rounded-lg"
    />
    <a href="#" className="text-black">
      {article.title}
    </a>
  </li>
);

export default ArticleLayout;
