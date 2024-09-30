import React from 'react';

const NotesForm = ({notes}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        {/* Customer Note Section */}
        <div className="mb-4 ">
        <div className='h-8 bg-gray-100'>
          <label className="block mb-2 text-sm font-bold text-gray-700 ">
            <span className="mr-2">1/2</span>
            Customer note
            <span className="ml-2 text-gray-400 cursor-pointer" title="Details about the customer note">?</span>
          </label>
          </div>
          <div className="p-2 rounded-md">
            <p className="text-gray-600">{notes.name}</p>
          </div>
        </div>

        {/* Accommodation Provider Note Section */}
        <div className="mb-6">
        <div className='h-8 bg-gray-100'>
          <label className="block mb-2 text-sm font-bold text-gray-700 bg-gray-100 ">
            <span className="mr-2">2/2</span>
            Note of the accommodation provider
            <span className="ml-2 text-gray-400 cursor-pointer" title="Details about the accommodation provider note">?</span>
          </label>
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md h-28 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter provider's note"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button className="px-10 py-2 font-semibold text-white transition-colors bg-pink-500 rounded-full hover:bg-pink-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesForm;
