"use client"
import React, { useState } from 'react';
import Navbar from '../login/component/Navbar';
import Footer from '../components/Footer/Footer';
import { PuffLoader } from 'react-spinners';
import Image from 'next/image';
import { Base_URL } from '../config';
import { toast } from 'react-toastify';

const Page = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Password reset function
    const sendResetLink = async (e) => {
        e.preventDefault(); // Prevent form reload
        setLoading(true); // Set loading to true

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/password-reset-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Use email input instead of token
            });

            // Check if the response is OK
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const data = await response.json();
            setMessage(data.message);
            setEmail(''); // Clear email input after success
            toast.success("Please check your email and reset the password");

        } catch (error) {
            setMessage(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <Navbar />
            <div className="px-5 md:px-10 lg:px-20 xl:px-32 md:my-44">
                <div className="flex flex-col items-center">
                    <div className="mb-5">
                        <Image
                            src="/P.png"
                            width={48}
                            height={48}
                            alt="Password Reset Icon"
                            className="border bg-gradient-to-t from-white to-[#D0D5DD] rounded-lg"
                        />
                    </div>
                    <h1 className="font-semibold text-[#101828] text-2xl md:text-3xl text-center pb-3">
                        Reset the Password of Account
                    </h1>
                    <p className="text-[#475467] text-sm md:text-base font-normal text-center mb-8">
                        Please enter your email to receive the reset link.
                    </p>
                    <form className="space-y-4 md:space-y-6 w-full max-w-md" onSubmit={sendResetLink}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email" 
                                className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#4FBE9F] text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                            disabled={loading}
                        >
                            {loading ? <PuffLoader size={25} color="#fff" /> : "Send Reset Link"}
                        </button>
                        {message && <p className="text-center text-[#4FBE9F]">{message}</p>}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
