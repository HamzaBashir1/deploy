import React from 'react'

function ContactSection() {
  return (
    <div>
    <div
    className="relative flex items-center justify-start bg-center h-[500px]"
    style={{ backgroundImage: "url('/bn.jpg')" }}
  >
    {/* Overlay for better text visibility */}
    <div className="absolute inset-0 bg-black opacity-40"></div>

    {/* Content Container */}
    <div className="relative z-10 max-w-md lg:px-8 py-16 mx-8 bg-opacity-0">
      <h2 className="mb-4 text-3xl font-bold text-white">Do you have questions?</h2>
      <p className="mb-8 lg:text-lg text-sm text-white">
        Write to us, we will contact you.
      </p>
      <div className="flex flex-col gap-4">
        {/* Buttons */}
        <button className="px-4 py-2 text-white transition duration-200 bg-[#4FBE9F] rounded hover:bg-green-600">
          Write a message
        </button>
        <button className="px-4 py-2 text-white transition duration-200 bg-slate-500 rounded hover:bg-gray-800">
          Add accommodation and try
        </button>
      </div>
    </div>
  </div>

    </div>
  )
}

export default ContactSection
