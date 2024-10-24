// pages/verify-email/[token].js
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { Base_URL } from '../../config'; // Adjust the path based on your project structure

const Page = () => {
  const { token } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      router.push('/login'); // Redirect to login page after successful verification
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-2xl font-bold">Verifying your email...</h1>
      </div>
    </div>
  );
};

export default Page;
