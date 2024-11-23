import React from 'react';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loader/Loading';
import useFetchData from '../../hooks/useFetchData';
import { Base_URL } from '../../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Correct import
import 'swiper/swiper-bundle.css'; // Import Swiper styles

const ArticleCard = ({ article }) => {
  const { _id, image, categories, title } = article;

  return (
    <div className="cursor-pointer overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={image || '/default-image.png'}
        alt={title || 'Article Image'}
        className="object-cover w-full h-40"
      />
      <div className="pt-4">
        <h3 className="text-sm text-red-500 font-medium">{categories}</h3>
        <h2 className="text-lg font-semibold mt-1">{title}</h2>
      </div>
    </div>
  );
};

const ArticleList = () => {
  const { data: articles, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);

  return (
    <div className='container pt-5'>
      <h1 className='font-bold text-2xl my-3'>More articles</h1>

      {loading && <Loading />}
      {error && <Error />}

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        pagination={{ clickable: true }}
      >
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <SwiperSlide key={article._id} style={{ width: '0px' }}> {/* Set a fixed width */}
              <ArticleCard article={article} />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-gray-500">No articles available</p>
        )}
      </Swiper>
    </div>
  );
};

export default ArticleList;
