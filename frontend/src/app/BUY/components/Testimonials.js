'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Base_URL } from '@/app/config';

const TestimonialCard = ({ image, title, location, description, userName, userPhoto, role }) => (
  <div className="flex-shrink-0 overflow-hidden text-white bg-gray-900 rounded-lg shadow-lg w-80">
    <img src={image} alt={title} className="object-cover w-full h-48 rounded-t-lg" />
    <div className="p-4">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-gray-400">{location}</p>
      <p className="mb-6 text-sm">{description}</p>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full">
          {/* User avatar */}
          <img src={userPhoto || '/default-avatar.png'} alt="User Avatar" className="w-10 h-10 rounded-full" />
        </div>
        <div className="ml-3">
          <p className="font-medium">{userName || 'Anonymous'}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  const fetchAccommodationDetails = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/accommodation/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch accommodation details');
      }
      return await response.json();
    } catch (err) {
      console.error(`Error fetching accommodation ${id}:`, err);
      return null;
    }
  };

  const fetchUserDetails = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      return await response.json();
    } catch (err) {
      console.error(`Error fetching user ${id}:`, err);
      return null;
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${Base_URL}/reviews`);
      const data = await response.json();

      if (response.ok) {
        const reviews = data.data;

        const updatedReviews = await Promise.all(
          reviews.map(async (review) => {
            const accommodation = await fetchAccommodationDetails(review.accommodation);
            const userReview = await fetchUserDetails(review.userReview);
            return { ...review, accommodation, userReview };
          })
        );

        setTestimonials(updatedReviews);
      } else {
        throw new Error(data.message || 'Failed to fetch testimonials');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * currentIndex;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  if (loading) return <p>Loading testimonials...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-6 py-12 bg-gray-900">
      <h2 className="mb-8 text-3xl font-bold text-center text-white">They said about us</h2>
      <div className="relative">
        <button
          onClick={handlePrevious}
          className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 -ml-5 text-white transform -translate-y-1/2 bg-gray-700 rounded-full top-1/2"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-full px-2 snap-center sm:w-auto">
              <TestimonialCard
                image={testimonial.accommodation?.images[0] || '/default-avatar.png'}
                title={testimonial.accommodation?.name || 'Accommodation'}
                location={testimonial.accommodation?.location?.address || 'Unknown'}
                description={testimonial.reviewText}
                userName={testimonial.userReview?.name || 'Anonymous'}
                userPhoto={testimonial.userReview?.photo || '/default-avatar.png'}
                role="Guest"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 -mr-5 text-white transform -translate-y-1/2 bg-gray-700 rounded-full top-1/2"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
