import React from 'react';
import useFetchData from '@/app/hooks/useFetchData';
import { Base_URL } from '@/app/config';
import Loading from '@/app/components/Loader/Loading';
import Error from '@/app/components/Error/Error';
import { useRouter } from 'next/navigation';
import section from '../../../../public/section.png';
import Image from 'next/image';

const ArticleCard = ({ article }) => {
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/Blog-Detail/${id}`);
  };

  console.log(article._id);
  return (
    <div

      onClick={() => handleCardClick(article._id)}
      className="cursor-pointer"
    >
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

const Articles = () => {
  const { data: articles, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);

  return (
    <div className="pt-16 mx-4 lg:mx-20">
      <div className="container p-4 mx-auto">
        {/* Main Layout: Articles + Sidebar */}
        <div className="lg:flex lg:space-x-8">
          {/* Articles Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading && <Loading />}
            {error && <Error />}
            {articles &&
              articles.map((article) => (
                article._id ? (
                  <ArticleCard key={article._id} article={article} />
                ) : null
              ))}

          </div>

          {/* Sidebar: Top Articles */}
          <div className="mt-8 lg:mt-0 relative lg:w-1/2 lg:pl-8">
          <div className="absolute left-5 h-full border-l border-gray-300 hidden lg:block" style={{ top: '0%', bottom: '0%', width: '1px', marginLeft: '-16px', marginRight: '-16px' }}></div>
            <h3 className="mb-4 text-xl font-semibold">Top articles</h3>
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

            <h3 className="mb-4 text-lg lg:text-xl font-semibold mt-10">Tags</h3>
            <div className="mb-8 mt-5">
              <div className="flex flex-wrap gap-4">
                <button className='bg-white border-black px-4 py-2 text-black rounded-lg border text-sm'>
                  Advice and tips
                </button>
                <button className='bg-white border-black px-4 py-2 text-black rounded-lg border text-sm'>
                  Winter season
                </button>
                <button className='bg-white border-black px-4 py-2 text-black rounded-lg border text-sm'>
                  Easter
                </button>
                <button className='bg-white border-black px-4 py-2 text-black rounded-lg border text-sm'>
                  Spring season
                </button>
              </div>
            </div>



            <div className="relative flex flex-col w-full max-w-[1540px] h-auto md:h-[480px] mx-auto bg-[#292A34] rounded-[20px] overflow-hidden">
                {/* Image Section */}
                <div className="relative w-full md:h-full">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292A34] to-transparent z-10" />
                  <Image
                    src={section}
                    alt="Section background"
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content Section */}
                <div className="relative z-20 flex flex-col justify-center md:items-start p-8 text-left space-y-4 ">
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

export default Articles;
