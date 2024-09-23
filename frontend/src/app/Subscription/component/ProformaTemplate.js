"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { usePDF } from "react-to-pdf";
import { FormContext } from "../../FormContext";
import { AuthContext } from "../../context/AuthContext";

const ProformaTemplate = ({setTab}) => {

// 

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
          <h1  onClick={() => setTab(3)} className="mt-4 text-lg text-center sm:text-2xl sm:mt-0 sm:text-left">
            Faktúra <span className="font-bold">92400217</span>
          </h1>
        </div>
        <hr className="h-1 my-3 bg-black" />

        {/* Supplier and Customer Details */}
        <div className="grid grid-cols-1 gap-4 mb-2 sm:grid-cols-2 sm:gap-8">
          {/* Supplier */}
          <div>
            <h2 className="text-lg font-bold">Supplier</h2>
            <p>Putko, s. r. o.</p>
            <p>Továrenská 12</p>
            <p>811 09 Bratislava</p>
            <p>ID: 54566959</p>
            <p>TIN: 2121742337</p>
            <p>VAT ID: SK2121742337</p>
            <p className="mt-5">
              Registered in the Commercial Register of the City Court Bratislava
              III, vl. no. 160790/B
            </p>
            <hr className="h-1 my-3"></hr>
          </div>

          {/* Customer */}
          <div>
            <h2 className="text-lg font-bold">Customer</h2>
            <p>{userName}</p>
            <p>{zipcode}</p>
            <p>{city}</p>
            <p>{country}</p>
            <p>ID: {idNumber}</p>
            <p>Tax ID: {tin}</p>
            <p>VAT ID: {vatNumber}</p>
          </div>
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
        <div className="p-4 mb-4 border-4">
          <div className="flex justify-between">
            <div>
              <p>IBAN (TatraBanka)</p>
              <h1 className="font-bold">SK02 1100 0000 0029 4812 9713</h1>
            </div>
            <div>
              <p>Variable symbol</p>
              <h1 className="font-bold">72400242</h1>
            </div>
            <div>
              <p>Amount including VAT</p>
              <h1 className="font-bold text-right">{price + 0}</h1>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="mb-8">
          <p>We invoice you for the presentation on the fiemso website (Apartment Kosice—F1953)</p>
        </div>

        {/* Invoice Table */}
        <hr className="h-2 my-3" />
        <div className="flex justify-between">
          <h1>ITEM NAME AND DESCRIPTION</h1>
          <p className="font-bold">PRICE WITHOUT VAT</p>
        </div>
        <hr className="h-2 my-3" />
        <div className="flex justify-between">
          <h1>Service "Profi {months} month"</h1>
          <p className="font-bold">{price}€</p>
        </div>

        {/* Summary */}
        <hr className="h-1 my-3" />
        <div className="flex flex-row space-y-2">
          
          <div className="flex-1">

          </div>
          <div className="flex-1">
          <div className="flex justify-between">
            <h1>Total without VAT</h1>
            <p>{price}€</p>
          </div>
          <div className="flex justify-between">
            <h1>VAT 20%</h1>
            <p>{price + 20}€</p>
          </div>
          <div className="flex justify-between">
            <h1>Including VAT</h1>
            <p>{price + 0}€</p>
          </div>
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

export default ProformaTemplate;