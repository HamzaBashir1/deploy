import React from 'react';

const PriceForm = ({ priceData }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg">
        
        {/* Apartment Details */}
        <div className="mb-6">
          <div className='py-4 pl-1 bg-gray-100 '>
            <label className="block p-2 text-sm font-bold text-gray-700">
              <span className="mr-2">1/3</span> {priceData.accommodationId.name}
            </label>
          </div>
          <div className='flex justify-between mb-4 ml-2 mt-11'>
          <p className="text-gray-600 ">Accommodation ({priceData.numberOfPersons || 2} adults  )</p>
          <p className="text-lg font-bold text-right text-gray-700">€{priceData.totalPrice || 450}</p>
          </div>
          </div>
          <hr className='w-full h-0 bg-slate-500'/>

        {/* Price Breakdown */}
        <div className="mt-5 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-2">
            <label className="col-span-2 text-gray-700">Total price</label>
            <div className="flex items-center">
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue={priceData.totalPrice || 450}
              />
              <span className="ml-2">€</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-2 text-gray-700">Final cleaning</label>
            <div className="flex items-center">
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue={priceData.cleaningFee || 10}
              />
              <span className="ml-2">€</span>
            </div>
          </div>
        </div>

        {/* Surcharges Section */}
        <div className="mb-6">
          <div className='py-4 pl-1 bg-gray-100 '>
            <label className="block p-2 mb-2 text-sm font-bold text-gray-700">
              <span className="mr-2">2/3</span> 
              Additional payments
            </label>
          </div>
          <button className="flex items-center font-semibold text-green-900">
            <span className="mr-2 text-xl">+</span> Add a surcharge
          </button>
        </div>

        {/* Resulting Price Section */}
        <div className="mb-6">
          <div className='py-4 pl-1 bg-gray-100'>
            <label className="block p-2 mb-2 text-sm font-bold text-gray-700">
              <span className="mr-2">3/3</span> 
              Resulting price
            </label>
          </div>
          <div className="flex justify-end p-2 rounded-md">
            <p className="text-lg font-bold text-gray-700">€{priceData.totalPrice || 460}</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button className="px-10 py-2 font-semibold text-white transition-colors bg-green-900 rounded-full hover:bg-green-900">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceForm;
