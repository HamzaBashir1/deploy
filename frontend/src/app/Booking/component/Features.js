import React from 'react'

function Features() {
  return (
    <div className='px-8 bg-[#292a34] py-20 '>
    <div className="py-12 text-white ">
    <div className="container px-4 mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-left">The benefits you get</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Benefit 1 */}
        <div className="flex flex-col text-left items-left">
        <img src='./d.png' className="w-12 h-12 mb-4 text-green-400"/> 
        <h3 className="mb-2 text-xl font-semibold">The best price</h3>
          <p className="text-gray-300">The prices are determined directly by the accommodation provider and are without increase</p>
        </div>
        
        {/* Benefit 2 */}
        <div className="flex flex-col text-left items-left">
        <img src='./dd.png ' className="w-12 h-12 mb-4 text-green-400"/>  
        <h3 className="mb-2 text-xl font-semibold">No commissions</h3>
          <p className="text-gray-300">You do not pay any commission or other fees for bookings</p>
        </div>

        {/* Benefit 3 */}
        <div className="flex flex-col text-left items-left">
        <img src='./ddd.png' className="w-12 h-12 mb-4 text-green-400"/>
        <h3 className="mb-2 text-xl font-semibold">Simple communication</h3>
          <p className="text-gray-300">You communicate directly with the accommodation provider</p>
        </div>

        {/* Benefit 4 */}
        <div className="flex flex-col text-left items-left">
        <img src='./dddd.png' className="w-12 h-12 mb-4 text-green-400"/>  
        <h3 className="mb-2 text-xl font-semibold">Direct payment</h3>
          <p className="text-gray-300">You pay all payments directly to the accommodation provider</p>
        </div>
      </div>
    </div>
  </div>      
    </div>
  )
}

export default Features
