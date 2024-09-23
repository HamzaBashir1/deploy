"use client"
import React from 'react'

function Features() {
  return (
    <div>
    <div className="flex flex-col md:flex-row mt-8 justify-between items-center p-8 bg-white">
    {/* Feature 1 */}
    <div className="flex flex-col items-left text-left ">
      {/* Icon */}
      <div className="mb-4 bg-white p-3  ">
      <img src='/ziadne-provizie.webp.png' className="text-4xl text-gray-700" /> {/* Adjust icon size and color as needed */}
      </div>
      {/* Title */}
      <h3 className="text-xl font-bold mb-2">No commissions</h3>
      {/* Description */}
      <p className="text-gray-600">You do not pay any commission or other fees for bookings.</p>
    </div>
 {/* Feature 2 test */}
 <div className="flex flex-col mt-2 items-left text-left ">
 {/* Icon */}
 <div className="mb-4 bg-white p-3  ">
 <img src='/platby-idu-cez-vas.webp.png' className="text-4xl text-gray-700" /> {/* Adjust icon size and color as needed */}
 </div>
 {/* Title */}
 <h3 className="text-xl font-bold mb-2">Payments go through you</h3>
 {/* Description */}
 <p className="text-gray-600">Guests pay all payments directly to you Guests pay all payments directly to you</p>
</div>
   

    {/* Feature 3 */}
    <div className="flex flex-col  mt-2 items-left text-left  ">
      {/* Icon */}
      <div className="mb-4 bg-white p-3 ">
      <img src='/vase-ceny-a-pravidla.webp.png' className="text-4xl text-gray-700" /> {/* Adjust icon size and color as needed */}
     
      </div>
      {/* Title */}
      <h3 className="text-xl font-bold mb-2">Your prices and rules</h3>
      {/* Description */}
      <p className="text-gray-600">You set them in your account and can change them at any time.</p>
    </div>

    {/* Feature 4 */}
    <div className="flex flex-col  mt-2 items-left text-left  ">
      {/* Icon */}
      <div className="mb-4 bg-white p-3 ">
      <img src='/priamy-kontakt.webp.png' className="text-4xl text-gray-700" /> {/* Adjust icon size and color as needed */}
     
      </div>
      {/* Title */}
      <h3 className="text-xl font-bold mb-2">Direct contact</h3>
      {/* Description */}
      <p className="text-gray-600">Guests pay all payments directly to you Guests pay all payments directly to you.</p>
    </div>

   
  </div>
    </div>
  )
}

export default Features
