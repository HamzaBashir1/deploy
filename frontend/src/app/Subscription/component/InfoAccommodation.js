import React, { useContext, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FormContext } from '../../FormContext';

const InfoAccommodation = ({ setTab }) => {
  const { selectedPlan } = useContext(FormContext); // Consume context
  const { selectedWeb, updateSelectedweb, note, updateNote,updateNoteOnFilling , updateWebsiteInformation} = useContext(FormContext);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Function to update the selected website value
  const handleSelectedWeb = (web) => {

    updateSelectedweb(web);
    // updateNoteOnFilling(web);
    updateWebsiteInformation(web);
    // updateNote(web) // Update context state
  };
  const handleSelected = (web) => {

    // updateSelectedweb(web);
    updateNoteOnFilling(web);
    // updateWebsiteInformation(web);
    updateNote(web) // Update context state
  };

  // Variables for dynamic values based on the selected plan
  let price = '';
  let months = 0;

  // Set values based on selectedPlan
  if (selectedPlan === 'Professional') {
    price = 179;
    months = 12;
  } else if (selectedPlan === 'Standard') {
    price = 149;
    months = 9;
  } else if (selectedPlan === 'Basic') {
    price = 119;
    months = 6;
  }

  // Automatically calculate the start and end dates based on the selected plan
  useEffect(() => {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setMonth(currentDate.getMonth() + months); // Add months based on the selected plan

    // Format the dates as DD.MM.YYYY
    const formattedStartDate = currentDate.toLocaleDateString('en-GB'); // Format: DD.MM.YYYY
    const formattedEndDate = endDate.toLocaleDateString('en-GB'); // Format: DD.MM.YYYY

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  }, [months]);

  return (
    <section className="py-8 bg-[#eff2f5] md:py-12">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Left Section */}
          <div className="flex-1 mb-8 md:mb-0">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-5xl">
              Information about <br /> accommodation
            </h1>
            <p className="mt-4 mb-10 text-base md:text-lg">
              Enter <span className="font-bold">the name of the accommodation</span> and the link to <span className="font-bold">www. page</span>, we will ask for a link with the URL address of the website where current information about accommodation is available.
            </p>

            <div className="p-4 mb-6 bg-white rounded-lg sm:p-6 md:p-8 lg:p-10">
              <h2 className="text-lg font-bold sm:text-xl md:text-2xl">Basic data</h2>
              <p className="mt-2 text-sm md:text-base">Enter the name of a website if you have one.</p>
              <input
                placeholder="Website with information"
                className="w-full p-2 mt-2 text-sm border-b border-gray-300 md:text-base"
                value={selectedWeb} // Bind input value to context state
                onChange={(e) => handleSelectedWeb(e.target.value)}
              />
            </div>

            <div className="p-4 mb-6 bg-white rounded-lg sm:p-6 md:p-8 lg:p-10">
              <h2 className="text-lg font-bold sm:text-xl md:text-2xl">Note on filling</h2>
              <textarea
                rows={4}
                placeholder="Write here the main benefits and information you would like to highlight..."
                className="w-full p-2 mt-2 text-sm border-b border-gray-300 md:text-base"
                value={note}
                onChange={(e) => handleSelected(e.target.value)}
              />
            </div>

            <div className="p-4 bg-white rounded-lg sm:p-6 md:p-8 lg:p-10">
              <div className="flex items-start mb-4">
                <FaCheck color="green" size="1.5em" />
                <p className="ml-3 text-sm md:text-base">
                  You can fully use the service <span className="font-bold">until {endDate}.</span>
                </p>
              </div>
              <div className="flex items-start mb-4">
                <FaCheck color="green" size="1.5em" />
                <p className="ml-3 text-sm md:text-base">
                  We will notify you by email before the service expires.
                </p>
              </div>
              <div className="flex items-start">
                <FaCheck color="green" size="1.5em" />
                <p className="ml-3 text-sm md:text-base">
                  <span className="font-bold">You can cancel</span> the service at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 max-w-xl">
            <h1 className="mb-4 text-lg font-bold sm:text-xl md:text-2xl">Summarization</h1>
            <hr className="mb-4 h-[2px] bg-gray-400" />
            <div className="flex flex-col mb-4 md:flex-row md:justify-between">
              <div className="flex flex-col">
                <p className="text-sm md:text-base">{selectedPlan}</p>
                <p className="text-sm md:text-base">From {startDate} to {endDate}</p>
              </div>
              <div>
                <h2 className="font-bold">Included in the price</h2>
              </div>
            </div>
            <hr className="mb-4 h-[2px] bg-gray-400" />
            <div className="flex justify-between mb-4">
              <h2 className="text-sm md:text-base">Service "{selectedPlan} {months} months"</h2>
              <p className="text-sm font-bold md:text-base">{price}€</p>
            </div>
            <hr className="mb-4 h-[2px] bg-gray-400" />
            <div className="flex justify-between mb-4">
              <h2 className="text-sm md:text-base">Total without VAT</h2>
              <p className="text-sm font-bold md:text-base">
              {price} 
              </p>
            </div>
            <hr className="h-1 mb-4 bg-gray-300" />
            <div className="flex justify-between mb-10">
              <h2 className="text-xl">Including VAT</h2>
              <p className="text-xl font-bold">{price + 0}€</p>
            </div>

            <p className="text-sm md:text-base">
              The stated amount represents the final price including VAT. After payment, you will receive an invoice by email, which you can also find in your account.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end mx-8 lg:mx-60">
        <button className="py-2 text-gray-500 px-9 hover:text-gray-700 focus:outline-none" onClick={() => setTab(1)}>
          Back
        </button>
        <button className="py-2 text-white bg-[#4FBE9F] rounded-md shadow px-9 hover:[#4FBE9F] focus:outline-none" onClick={() => setTab(3)}>
          Next
        </button>
      </div>
    </section>
  );
};

export default InfoAccommodation;
