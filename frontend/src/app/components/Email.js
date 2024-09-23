"use client";
import React, { useState } from 'react';
import axios from 'axios';  
import { Base_URL } from "../config.js";  
import { toast } from 'react-toastify';

const Email = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    try {
      // Make the POST request using axios
      const response = await axios.post(`${Base_URL}/subscribe`, { email });
      setMessage(response.data.message);  // Set success message
      toast.success("Email subscribed successfully");  // Display success toast
      setError('');  // Clear any previous errors
      setEmail('');  // Reset the email input
    } catch (err) {
      // Handle the error response
      const errorMessage = err.response?.data?.error || 'An error occurred';
      setError(errorMessage);  // Set error message
      toast.error(errorMessage);  // Display error toast
      setMessage('');  // Clear success message
    }
  };

  return (
    <div className="relative w-full h-[400px] md:h-[400px] lg:h-[400px] mb-10">
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Image */}
      <img
        src='/email.png'
        alt='Email Banner'
        className='w-full h-full object-cover object-center'
      />

      {/* Content Positioned at the Center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl sm:text-2xl md:text-3xl lg:text-3xl mb-2 font-bold">
          Action, news, and interesting things to email
        </h1>
        <p className="text-white mb-4 text-lg sm:text-lg md:text-xl lg:text-lg">
          Be the first to know about releases, industry news, and insights.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-md">
          <input 
            placeholder='Enter your email' 
            className='bg-white rounded-lg py-2 px-4 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto'
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Update email state
          />
          <button 
            className='rounded-lg bg-[#4FBE9F] py-2 px-4 text-white w-full sm:w-auto'
            onClick={handleSubscribe}  // Trigger the subscribe function
          >
            Subscribe
          </button>
        </div>
        <p className='text-white text-xs mt-2'>
          We care about your data in our <span className='underline'>privacy policy</span>
        </p>
        {/* Show success or error message */}
        {message && <p className="text-green-500 mt-2">{message}</p>}  {/* Success message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}  {/* Error message */}
      </div>
    </div>
  );
}

export default Email;
