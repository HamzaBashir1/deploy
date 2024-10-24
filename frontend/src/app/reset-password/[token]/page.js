"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Use useParams instead of useRouter
import { Base_URL } from '../../config';
import Navbar from '@/app/Favorite/component/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Image from 'next/image';
import { PuffLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Page = () => {
    
    const { token } = useParams(); // Retrieve the token from the URL
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Separate state for confirmation
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // Log the token to the console when the component mounts
    useEffect(() => {
        console.log("Token from URL:", token);
    }, [token]);

    const resetPassword = async (e) => {
        e.preventDefault();

        // Check if the passwords match
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setLoading(true); // Set loading to true when request starts

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            // Check if the response is OK
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const data = await response.json();
            setMessage(data.message);
            setNewPassword(''); // Clear password input after success
            setConfirmPassword(''); // Clear confirmation input after success
            toast.success("Successfully Reset Password");
            // Optionally redirect or navigate
            router.push('/login');
        } catch (error) {
            setMessage(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false); // Reset loading state regardless of the outcome
        }
    };

    return (
        <div>
            <Navbar/>
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
                        Please enter your new password.
                    </p>
                    <form className="space-y-4 md:space-y-6 w-full max-w-md" onSubmit={resetPassword}>
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Enter New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                placeholder="••••••••"
                                className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                placeholder="••••••••"
                                className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        {message && <p className="text-center text-red-500">{message}</p>}
                        <button
                            type="submit"
                            className="w-full bg-[#4FBE9F] text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                        >
                            {loading ? <PuffLoader size={25} color="#fff" /> : "Reset the password"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Page;
