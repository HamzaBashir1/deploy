import React, { useState } from "react";
import Price from './Price';
import NotesForm from './NotesForm';
import PriceForm from './PriceForm';
import ContactForm from './ContactForm';
import ReservationForm from './ReservationForm';

const TabNavigation = ({ reservationData }) => {  // Accept reservation data as a prop
  const [activeTab, setActiveTab] = useState("Information");

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "Stay":
        return <ReservationForm reservation={reservationData} />;  // Pass reservation data to the ReservationForm component
      case "Prices":
        return <PriceForm priceData={reservationData} />;  // Pass specific data to PriceForm
      case "Notes":
        return <NotesForm notes={reservationData} />;  // Pass notes (message) data to NotesForm
      case "Contact":
        return <ContactForm contactInfo={reservationData } />;  // Pass contact info
      case "Information":
      default:
        return <Price priceDetails={reservationData} />;  // Pass all data to the Price component
    }
  }; 

  return (
    <div className="mt-10 bg-white ">
      {/* Tab Navigation */}
      <div className="flex mb-6 space-x-4">
        {["Information", "Stay", "Prices", "Notes", "Contact"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 rounded-md font-semibold text-sm ${
              activeTab === tab
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Tab Content */}
      <div className="bg-white rounded-md ">
        {renderActiveTabContent()}
      </div>
    </div>
  );
};

export default TabNavigation;
