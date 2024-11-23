"use client";
import React, { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Base_URL } from '../../config';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { useRouter } from 'next/navigation';
import section from '../../../../public/section.jpg';
import Image from 'next/image';

const ArticleCard = ({ article }) => {
  const router = useRouter();
  const handleCardClick = (id) => {
    router.push(`/Blog-Detail/${id}`);
  };

  return (
    <div onClick={() => handleCardClick(article._id)} className="cursor-pointer">
      <img
        src={article.image || '/default-image.png'}
        alt={article.title}
        className="object-cover w-full h-40 rounded-lg"
      />
      <div className="mt-4">
        <h3 className="text-sm text-red-500">{article.categories}</h3>
        <h2 className="text-lg font-semibold">{article.title}</h2>
      </div>
    </div>
  );
};

const SidebarItem = ({ article }) => (
  <li className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md">
    <img src={article.image || '/default-image.png'} alt={article.title} className="object-cover w-20 h-20 rounded-lg" />
    <a href="#" className="text-black">{article.title}</a>
  </li>
);

const Article = ({ searchTerm }) => {
  const { data: articles, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [blogType, setBlogType] = useState('provider'); // You can change this value

  useEffect(() => {
    if (articles) {
      // Extract unique tags from articles
      const uniqueTags = [...new Set(articles.flatMap(article => article.tags || []))];
      setTags(uniqueTags);

      // Filter articles based on search term and blogType
      const filteredBySearchTerm = articles.filter((article) => {
        const title = article.title || '';
        const author = article.author || '';
        const categories = article.categories || '';
        const articleTags = article.tags || [];
        const articleType = article.blogType || '';

        return (
          (title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            categories.toLowerCase().includes(searchTerm.toLowerCase()) ||
            articleTags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
          articleType === blogType
        );
      });

      // Further filter the articles based on selected tags
      const finalFiltered = selectedTags.length > 0
        ? filteredBySearchTerm.filter((article) =>
            selectedTags.every((tag) => article.tags?.includes(tag))
          )
        : filteredBySearchTerm;

      setFilteredArticles(finalFiltered);
    }
  }, [searchTerm, articles, selectedTags, blogType]);

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="pt-16">
      <div className="container p-4 mx-auto max-w-[1320px]">
        <div className="lg:flex lg:space-x-8">
          <div className="lg:w-8/12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))
              ) : (
                <p>No articles found.</p>
              )}
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-300 mx-4"></div>

          <div className="mt-8 lg:mt-0 lg:w-3/12 relative">
            <h3 className="mb-4 text-xl font-semibold">Top articles</h3>
            <ul className="space-y-4">
              {articles?.length > 0 ? (
                articles.map((article, idx) => (
                  <SidebarItem key={idx} article={article} />
                ))
              ) : (
                <li className="text-gray-500">No top articles available</li>
              )}
            </ul>

            <h3 className="mb-4 text-lg lg:text-xl font-semibold mt-10">Tags</h3>
            <div className="mb-8 mt-5">
              <div className="flex flex-wrap gap-4">
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <button
                      key={tag}
                      className={`px-4 py-2 text-sm border rounded-lg ${
                        selectedTags.includes(tag) ? 'bg-gray-300' : 'bg-white border-black text-black'
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </button>
                  ))
                ) : (
                  <p>No tags available</p>
                )}
              </div>
            </div>

            <div className="relative flex flex-col w-full max-w-[1540px] h-auto md:h-[480px] mx-auto bg-[#292A34] rounded-[20px] overflow-hidden">
              <div className="relative w-full md:h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-[#292A34] to-transparent z-10" />
                <Image src={section} alt="Section background" fill className="object-cover w-full h-full" />
              </div>

              <div className="relative z-20 flex flex-col justify-center md:items-start p-8 text-left space-y-4">
                <h1 className="text-white text-[20px] md:text-[28px] leading-[28px] md:leading-[40px] font-semibold">
                  Rent accommodation <br />
                  with Putko and <span className="text-[#4FBE9F]">guests <br /> pay you directly</span>
                </h1>
                <button className="bg-[#4FBE9F] text-white rounded-[6px] py-[10px] md:py-[15.5px] px-[16px] md:px-[25px] w-full md:w-[192px] h-[40px] md:h-[48px] flex items-center justify-center shadow-md hover:bg-[#3fae8b] transition duration-300">
                  <span className="text-[14px] md:text-[17px] font-semibold">More information</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
