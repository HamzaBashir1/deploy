"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { Base_URL } from '../../../config'; // Adjust the path based on your project structure

const Page = () => {
  const { token, role } = useParams();
  const router = useRouter();
  
  // State to hold the verification status
  const [status, setStatus] = useState('Verifying your email...');

  useEffect(() => {
    console.log("Token from URL:", token, role);
    
    // Call verifyEmail only if token exists
    if (token) {
      verifyEmail();

      setTimeout(() => {
        router.push('/login'); // Redirect after 5 seconds
      }, 2000);
    }
  }, [token]); // Only re-run the effect if token changes

  const verifyEmail = async () => {
    setStatus('Verifying your email...'); // Initial status message

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${role}/${token}`);

      // Check if the response is OK before parsing JSON
      if (!res.ok) {
        const errorData = await res.json(); // Parse the error response
        throw new Error(errorData.message || 'Email verification failed'); // Use default message if none is provided
      }

      const data = await res.json(); // Parse the success response
      setStatus(data.message); // Update status with success message
      toast.success(data.message); // Show success message
      
      // Redirect to login page after successful verification
      setTimeout(() => {
        router.push('/login'); // Redirect after 5 seconds
      }, 2000);

    } catch (err) {
      setStatus('Verification failed. Please try again.'); // Update status with error message
      toast.error(err.message || 'An error occurred while verifying your email'); // Show error message
      
      // Redirect to login after 5 seconds in case of error as well
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-2xl font-bold">{status}</h1> {/* Display the current status */}
      </div>
    </div>
  );
};

export default Page;
