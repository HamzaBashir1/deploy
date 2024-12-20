"use client"
import React, { useState } from "react";
import NcImage from "./NcImage/NcImage";
import Input from "./Input/Input";
import { ArrowRight } from "lucide-react";
import useFetchData from "../hooks/useFetchData";
import { toast } from "react-toastify";
import axios from "axios";

const Subscribe = ({ className = "" }) => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const handleSubscribe = async () => {
      // Regular expression to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (!emailRegex.test(email)) {
        // Display error if email is invalid
        setError('Please enter a valid email address');
        toast.error('Invalid email address'); // Display error toast
        return; // Exit the function if email is invalid
      }
    
      try {
        // Make the POST request using axios
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
          { email }
        );
    
        setMessage(response.data.message); // Set success message
        toast.success("Email subscribed successfully"); // Display success toast
        console.log(response.data.message); // For debugging
        setError(''); // Clear any previous errors
        setEmail(''); // Reset the email input
      } catch (err) {
        // Handle the error response
        const errorMessage = err.response?.data?.error || 'An error occurred';
        setError(errorMessage); // Set error message
        toast.error(errorMessage); // Display error toast
        setMessage(''); // Clear success message
      }
    };
    
  return (
    <div 
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="text-4xl font-semibold">Join our newsletter 🎉</h2>
        <span className="block mt-5 text-neutral-500">
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span>
        <ul className="mt-10 space-y-4">
          <li className="flex items-center space-x-4">
            <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-blue-800 bg-blue-100 hover:bg-blue-800 hover:text-white transition-colors" >01</span>
            <span className="font-medium text-neutral-700">
              Get more discount
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-[#991b1b] bg-[#fee2e2] hover:bg-[#991b1b] hover:text-white transition-colors" >02</span>
            <span className="font-medium text-neutral-700">
              Get premium magazines
            </span>
          </li>
        </ul>
        <form className="relative max-w-sm mt-10">
          <Input
            aria-required="true"
            placeholder="Enter your email"
            type="email"
            rounded="rounded-full"
            value={email} // Connect the value to the email state
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
            type="button"
            className="absolute transform top-1/2 -translate-y-1/2 right-[5px] ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-[#238869] hover:bg-[#115742] text-neutral-50 w-9 h-9"
          >
            <ArrowRight/>
          </button>
        </form>
      </div>
      <div className="flex-grow">
        <NcImage src="/SVG-subcribe2.png" />
      </div>
    </div>
  );
};

export default Subscribe;
