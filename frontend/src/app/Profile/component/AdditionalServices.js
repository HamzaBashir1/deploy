import React, { useContext } from 'react';
import { BiPlus } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { AuthContext } from "../../context/AuthContext";
import { BsPersonCircle } from 'react-icons/bs';

const AdditionalServices = () => {

  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div>
      <div className="min-h-screen ">
       {/* Header */}
       <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
       <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
         {/* Left Section: Title and Status */}
         <div className="flex flex-col">
           <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Subcription</h1>
           <p className="text-[#292A34B2] text-sm md:text-xs font-medium">object 1 </p>
         </div>

         {/* Center Section: Add Accommodation Button */}
        <div
         className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center"
         onClick={toggleMenu}
       >
         <CiSearch className="text-xl text-gray-500" />
         <button className="flex items-center px-4 py-2 space-x-2 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
           <BiPlus className="text-lg" />
           <span>Add Accommodation</span>
         </button>
         <div className="flex items-center gap-2">
           {user?.photo ? (
             <img 
               src={user?.photo} 
               alt="User Profile" 
               className="object-cover w-8 h-8 rounded-full"
             />
           ) : (
             <BsPersonCircle className="text-[#292A34] text-xl" />
           )}
           <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
         </div>
       </div>

     </div>

     </div>

       {/* Tabs */}
       <div className="flex mt-4 space-x-4">
         <button className="px-4 py-2 text-white bg-black rounded-lg focus:outline-none">
           Subscription
         </button>
         <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none">
           Additional services
         </button>
       </div>

       {/* Subscription Card */}
       <div className="flex items-center justify-between p-6 mt-6 bg-white rounded-lg shadow">
         {/* Image */}
         <div className="flex items-center space-x-4">
           <img
             className="object-cover w-20 h-20 rounded-md"
             src="https://via.placeholder.com/150"
             alt="Accommodation"
           />
           {/* Details */}
           <div>
             <h2 className="text-lg font-semibold text-gray-800">Apartment Košice</h2>
             <p className="text-sm text-gray-600">Apartment, Košice, Slovakia</p>
            
             <h2 className="mt-3 text-lg font-semibold text-gray-800">Special price anf discount</h2>
             <p className="text-sm text-gray-600">Apartment, Košice, Slovakia</p>
             <h2 className="mt-3 text-lg font-semibold text-gray-800">discount limit</h2>
             <p className="text-sm text-gray-500">
               There are <span className="font-semibold text-black">349 days</span> left until the end of the subscription
             </p>
           </div>
          
         </div>

         {/* Button */}
         <div>
           <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none">
             Oder services
           </button>
         </div>
       </div>
     </div>
    </div>
  )
}

export default AdditionalServices
