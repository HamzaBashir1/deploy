"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { usePDF } from "react-to-pdf";
import { FormContext } from "../../FormContext";
import { AuthContext } from "../../context/AuthContext";

const Invoices = ({Invoices}) => {

// 
console.log("invoice",Invoices)
const { selectedPlan } = useContext(FormContext);
// const { user } = useContext(AuthContext); 
const user = localStorage.getItem("user");
const users = JSON.parse(user);

// Access the 'name' property from the user object
const userName = users.name;
const {
  phoneNumber, updatePhoneNumber,
  planName, updatePlanName,
  websiteInformation, updateWebsiteInformation,
  noteOnFilling, updateNoteOnFilling,
  companyName, updateCompanyName,
  streetNumber, updateStreetNumber,
  city, updateCity,
  zipcode, updateZipcode,
  country, updateCountry,
  idNumber, updateIdNumber,
  tin, updateTin,
  vatNumber, updateVatNumber
} = useContext(FormContext);


let price = '';
  let months = 1;
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');



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

// 
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const options = {
    orientation: "portrait",
    unit: "in",
    format: "A4",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      toPDF();
    }, 1000);

    return () => clearTimeout(timer);
  }, [toPDF]);
  return (
    <div className="max-w-screen-lg p-4 mx-auto sm:p-8">
      {/* Download Button */}
      <button
        onClick={() => toPDF()}
        className="p-2 mb-4 text-white bg-blue-500 rounded sm:mb-8"
      >
        Download PDF
      </button>

      {/* Invoice Content */}
      <div className="p-4 bg-white shadow-md sm:p-8" ref={targetRef}>
        {/* Header */}
        <div className="flex flex-col items-center justify-between sm:flex-row sm:items-start">
          <img src="/putko.png" className="w-24 h-10" alt="Logo" />
          <h1   className="mt-4 text-lg text-center sm:text-2xl sm:mt-0 sm:text-left">
            Faktúra <span className="font-bold">92400217</span>
          </h1>
        </div>
        <hr className="h-1 my-3 bg-black" />

        {/* Supplier and Customer Details */}
        <div className="grid grid-cols-1 gap-4 mb-2 sm:grid-cols-2 sm:gap-8">
          {/* Supplier */}
          <div>
            <h2 className="text-lg font-bold">host</h2>
            <p></p>
            <p>{Invoices.name}</p>
            <p>{Invoices.accommodationId.name}</p>
            <p>ID: {Invoices.idNumber} </p>
            <p>TIN: {Invoices.tin}</p>
            <p>VAT ID: {Invoices.vatNumber}</p>
            <p className="mt-5">
              Registered in the Commercial Register of the City Court Bratislava
              III, vl. no. 160790/B
            </p>
            <hr className="h-1 my-3"></hr>
          </div>

          {/* Customer */}
        
        </div>

        {/* Dates Section */}
        <div className="flex flex-row">
        <div className="flex-1 mb-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Date of Issue:</p>
              <p>{startDate}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Date:</p>
              <p>{startDate}</p>
            </div>
            <div className="flex justify-between">
              <p>Due Date:</p>
              <p>{endDate}</p>
            </div>
          </div>
        </div>
          <div className="flex-1">

          </div>
        </div>

        {/* Invoice Generation Date */}
        <div className="mb-6">
          <p>The invoice was generated on {startDate}</p>
        </div>

        {/* Bank Details */}
      

        {/* Invoice Items */}
      
        {/* Invoice Table */}
        <hr className="h-2 my-3" />
        {Invoices.accommodationId.price}€
        {/* Summary */}
        <hr className="h-1 my-3" />
        <div className="flex flex-row space-y-2">
          
          <div className="flex-1">

          </div>
          <div className="flex-1">
          <hr className="h-2 my-2"/>
          <div className="flex justify-between">
            <h1>Paid</h1>
            <p>{price}€</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;