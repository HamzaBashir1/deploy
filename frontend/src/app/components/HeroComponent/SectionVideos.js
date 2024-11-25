"use client"
import React, { useState } from "react";
import Heading from "../../shared/Heading/Heading";
import NcImage from "../../shared/NcImage/NcImage";
import NcPlayIcon from "../../shared/NcPlayIcon/NcPlayIcon";
import NcPlayIcon2 from "../../shared/NcPlayIcon2/NcPlayIcon2";


const VIDEOS_DEMO = [
  {
    id: "Ao7e4iisKMs",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/131423/pexels-photo-131423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "a5V6gdu5ih8",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "MuB7HHeuNbc",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "eEaZvEZye84",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/4983184/pexels-photo-4983184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  
];

const SectionVideos = ({ videos = VIDEOS_DEMO, className = "" }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const renderMainVideo = () => {
    const video = videos[currentVideo];
    return (
      <div
  className="group aspect-w-16 aspect-h-9 h-[400px] sm:h-[400px] lg:h-[800px] bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] will-change-transform"
  title={video.title}
>
  {isPlay ? (
    <iframe
      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
      title={video.title}
      frameBorder="0"
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : (
    <>
      <div
        onClick={() => setIsPlay(true)}
        className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
      >
        <NcPlayIcon />
      </div>
      <NcImage
        containerClassName="absolute inset-0 "
        className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105 nc-will-change-transform"
        src={video.thumbnail}
        title={video.title}
        alt={video.title}
      />
    </>
  )}
</div>

    );
  };

  const renderSubVideo = (video, index) => {
  
    return ( 
      <div
        className="relative overflow-hidden cursor-pointer group aspect-h-16 aspect-w-16 rounded-2xl sm:aspect-h-12 sm:rounded-3xl lg:aspect-h-9 will-change-transform"
        onClick={() => {
          setCurrentVideo(index);
          !isPlay && setIsPlay(true);
        }}
        title={video.title}
        key={index}
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <NcPlayIcon2 />
        </div>
        <NcImage
          containerClassName="absolute inset-0 w-full h-full"
          className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 nc-will-change-transform"
          src={video.thumbnail}
          title={video.title}
          alt={video.title}
        />
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading
        desc="Check out our hottest videos. View more and share more new
          perspectives on just about any topic. Everyone’s welcome."
      >
        🎬 The Videos
      </Heading>
      <div className="relative flex flex-col sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
      <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 bg-opacity-40 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-1/2 dark:bg-neutral-800 dark:bg-opacity-40"></div>
      <div className="relative flex-grow pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
        {renderMainVideo()}
      </div>
      <div className="grid flex-shrink-0 h-[100px] lg:h-[700px] grid-cols-4 gap-2 sm:grid-cols-4 lg:grid-cols-1 sm:gap-6 lg:w-36 xl:w-40">
    {videos.map(renderSubVideo)}
    </div>
    
    </div>
    </div>
  );
};

export default SectionVideos;
