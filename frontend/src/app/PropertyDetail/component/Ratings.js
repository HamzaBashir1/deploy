import React, { useState } from 'react';
import { BiStar } from 'react-icons/bi'; // Make sure to import the BiStar icon if not already imported
import { Base_URL } from '../../config';

const Ratings = ({ userId, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState({
    Location: 0,
    Communication: 0,
    Equipment: 0,
    Cleanliness: 0,
    ClientCare: 0,
    WiFi: 0,
    Activities: 0,
    PriceQuality: 0,
  });
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    reviewText: '',
    pluses: '',
    cons: '',
  });
  const [loading, setLoading] = useState(false);

  const handleWriteReviewClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOverallStarClick = (index) => {
    setOverallRating(index + 1);
  };

  const handleCategoryStarClick = (category, index) => {
    setCategoryRatings((prev) => ({ ...prev, [category]: index + 1 }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const accommodationId = data?._id;
  console.log(accommodationId);
  console.log(userId);

  const handleSubmit = async () => {
    setLoading(true);

    if (!accommodationId || !userId) {
      alert("Accommodation and user information is required.");
      setLoading(false);
      return;
    }

    const reviewData = {
      ...formData,
      overallRating,
      categoryRatings,
      accommodationId,
      userId,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${accommodationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Failed to submit the review');
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setShowModal(false); // Close modal after submission
      setFormData({ name: '', surname: '', email: '', reviewText: '', pluses: '', cons: '' }); // Reset form data
      setOverallRating(0); // Reset overall rating
      setCategoryRatings({ Location: 0, Communication: 0, Equipment: 0, Cleanliness: 0, ClientCare: 0, WiFi: 0, Activities: 0, PriceQuality: 0 }); // Reset category ratings
    }
  };

  return (
    <div>
      <div className="p-8 my-10 bg-white rounded-lg shadow-lg lg:mr-[440px] lg:ml-[18px]">
        {/* Title Section */}
        <div className="flex flex-col items-start justify-between mb-6 lg:items-center sm:flex-row">
          <div className="text-left lg:text-left">
            <h2 className="mb-2 text-2xl font-bold">Ratings</h2>
            <p className="text-gray-600">Our goal is to display only relevant reviews from guests</p>
          </div>
          <button 
            className="px-4 py-2 mt-4 font-bold text-gray-700 bg-gray-100 rounded-lg sm:mt-0 hover:bg-gray-200"
            onClick={handleWriteReviewClick}
          >
            Write a review
          </button>
        </div>

        {/* Ratings Overview Section */}
        <div className="flex flex-col items-start justify-between mb-8 lg:items-center sm:flex-row">
          <div className="flex items-center text-center sm:text-left">
            <span className="text-5xl font-bold">5.0</span>
            <div className="ml-3">
              <div className="flex items-center mb-1">
                <span className="text-xl text-red-500">★★★★★</span>
              </div>
              <p className="text-gray-600">4 ratings</p>
            </div>
          </div>
        </div>

        {/* Ratings Details Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2">
          {['Location', 'Communication with accommodation', 'Equipment', 'Cleanliness', 'Client care', 'WiFi', 'Activities in the vicinity', 'Price/quality ratio'].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <p>{item}</p>
                <p>5.0</p>
              </div>
              <div className="bg-gray-200 rounded-full h-2.5">
                <div className="bg-black h-2.5 rounded-full w-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <img 
              src="your-avatar-url.jpg" 
              alt="User avatar" 
              className="w-10 h-10 mr-4 rounded-full"
            />
            <div>
              <p className="font-bold">Luke <span className="text-sm text-gray-500">26 January 2024</span></p>
              <p className="text-red-500">★★★★★</p>
            </div>
          </div>
          <p className="text-gray-700">Everything is great, we will only go here. Thank you</p>
        </div>
      </div>

      {/* Modal for Review */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-semibold">Write a Review</h3>
              <button 
                className="text-gray-500 hover:text-gray-800" 
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            {/* Modal for Review */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-semibold">Write a Review</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-800" 
                      onClick={handleCloseModal}
                    >
                      &times;
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="max-h-[500px] overflow-y-auto">
                    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
                      <h1 className="font-bold text-3xl mb-4">Evaluation</h1>
                      <p className="mb-4">
                        Write a review that reflects your experience and can help future guests make a choice.
                      </p>
                      <hr className="my-4" />

                      {/* User Input Fields */}
                      <input type='text' name="name" value={formData.name} onChange={handleInputChange} placeholder='Name' required className="w-full mb-2 p-2 border rounded" />
                      <input type='text' name="surname" value={formData.surname} onChange={handleInputChange} placeholder='Surname' required className="w-full mb-2 p-2 border rounded" />
                      <input type='email' name="email" value={formData.email} onChange={handleInputChange} placeholder='Email' required className="w-full mb-4 p-2 border rounded" />

                      <hr className="my-4" />
                      <div className='flex items-center mb-4'>
                        <h1 className="mr-4">Overall Rating</h1>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star, index) => (
                            <BiStar
                              key={index}
                              className={`cursor-pointer ${index < overallRating ? 'text-yellow-500' : 'text-gray-400'}`}
                              size={24}
                              onClick={() => handleOverallStarClick(index)}
                              aria-label={`Rate ${index + 1} star`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Text Area */}
                      <label className="block mb-1">Evaluation</label>
                      <textarea name="reviewText" value={formData.reviewText} onChange={handleInputChange} placeholder='Describe your experience' className="w-full mb-4 p-2 border rounded" rows={4} />

                      <label className="block mb-1">Pluses</label>
                      <textarea name="pluses" value={formData.pluses} onChange={handleInputChange} placeholder='What did you like?' className="w-full mb-4 p-2 border rounded" rows={2} />

                      <label className="block mb-1">Cons</label>
                      <textarea name="cons" value={formData.cons} onChange={handleInputChange} placeholder='What could be improved?' className="w-full mb-4 p-2 border rounded" rows={2} />

                      {/* Category Ratings */}
                      <h1 className="mb-4">Rate the categories</h1>
                      {['Location', 'Communication', 'Equipment', 'Cleanliness', 'Client care', 'WiFi', 'Activities', 'Price/Quality'].map((category, index) => (
                        <div key={index} className='flex items-center mb-2'>
                          <span className="mr-4">{category}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star, starIndex) => (
                              <BiStar
                                key={starIndex}
                                className={`cursor-pointer ${starIndex < categoryRatings[category] ? 'text-yellow-500' : 'text-gray-400'}`}
                                size={24}
                                onClick={() => handleCategoryStarClick(category, starIndex)}
                                aria-label={`Rate ${category} ${starIndex + 1} star`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Submit Button */}
                      <button 
                        className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default Ratings;
