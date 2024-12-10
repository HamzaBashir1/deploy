import React from 'react';

import { AiOutlineCheckCircle } from 'react-icons/ai';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';
import Navbar from '../Favorite/component/Navbar';
import Header from '../components/Header';

const ThanksPage = () => {
  
  return (
    <div>
        <Header />
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
                <AiOutlineCheckCircle className="text-green-600 w-20 h-20 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Thank You for Your Reservation!
                </h1>
                <p className="text-gray-600 mb-6">
                Your reservation has been successfully submitted. 
                We appreciate your choice and will be in touch shortly!
                </p>
                <Link href="/">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
                    Back to Home
                </button>
                </Link>
            </div>
        </div>
        <Footer/>
    </div>
  );
};

export default ThanksPage;
