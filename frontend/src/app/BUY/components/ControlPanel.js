import React from 'react'

function ControlPanel() {
  return (
    <div>
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16 bg-gradient-to-tr from-[#FFFFFF] to-[#7C7E8E]">
    {/* Title Section */}
    <div className="mb-12 text-center">
      <h2 className="mb-4 text-4xl font-bold text-white">Control panel</h2>
      <p className="max-w-2xl mx-auto text-lg text-white">
        In the control panel you will find all important information regarding your offers. There is also 
        an overview of reservations, an occupancy calendar, ratings from your customers and detailed statistics. 
        All information in one place will be available anytime and from anywhere.
      </p>
    </div>

    {/* Image Section */}
    <div className="relative max-w-4xl mx-auto">
      <img 
        src="/Property 1=Apple MacBook Air 13_ Gold 1.png" 
        alt="Control panel"
        className="object-contain w-full h-auto "
      />
    </div>
  </div>
    </div>
  )
}

export default ControlPanel
