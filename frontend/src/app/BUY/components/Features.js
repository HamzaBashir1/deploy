"use client"
import React from 'react'
import { FaHandPaper, FaMoneyBill, FaUserFriends } from 'react-icons/fa'
import { FaMoneyBills } from 'react-icons/fa6'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'

function Features() {
  return (
    <div>
      <div className="flex flex-col md:flex-row mt-8 justify-between items-center p-8 ">
        {/* Feature 1 */}
        <div className="flex flex-col items-left text-left ">
          {/* Icon */}
          <div className="mb-5  p-3  ">
            <FaHandPaper size={50} className="dark:text-white" />
          </div>
          {/* Title */}
          <h3 className="text-xl font-bold mb-2">No commissions</h3>
          {/* Description */}
          <p className="text-gray-600">You do not pay any commission or other fees for bookings.</p>
        </div>
        {/* Feature 2 test */}
        <div className="flex flex-col mt-2 items-left text-left ">
          {/* Icon */}
          <div className="mb-5 p-3  ">
          <FaMoneyBills size={50} className="dark:text-white" />
          
          </div>
          {/* Title */}
          <h3 className="text-xl font-bold mb-2">Payments go through you</h3>
          {/* Description */}
          <p className="text-gray-600">Guests pay all payments directly to you Guests pay all payments directly to you</p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col  mt-2 items-left text-left  ">
          {/* Icon */}
          <div className="mb-4 p-3 ">
            <HiOutlineMenuAlt2 size={50} className="dark:text-white" />
          </div>
          {/* Title */}
          <h3 className="text-xl font-bold mb-2">Your prices and rules</h3>
          {/* Description */}
          <p className="text-gray-600">You set them in your account and can change them at any time.</p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col  mt-2 items-left text-left  ">
          {/* Icon */}
          <div className="mb-4 p-3 ">
          <FaUserFriends size={50} className="dark:text-white" />
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
