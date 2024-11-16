"use client"
import React, { useRef, useState } from "react";
import { usePDF } from "react-to-pdf";
import Invoices from "./Invoices";
import { CalendarIcon, ChevronDownIcon, DownloadIcon, MailIcon, PrinterIcon } from "lucide-react"
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { Base_URL } from "@/app/config";
import { TbExclamationMark } from "react-icons/tb";
import { FaInfoCircle } from "react-icons/fa";
const Price = ({ priceDetails }) => {
  console.log("Price Details: ", priceDetails);
  const name = priceDetails.name;
  const emails = priceDetails.email;
  // const email = priceDetails.email; 
  console.log("name", name, "email", emails);
  const { toPDF, targetRef } = usePDF({ filename: "invoice_template.pdf" });

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(
    `Hello  ${priceDetails.name},\n\nwe are sending you the reservation details.
    here is information 
    username: ${priceDetails.name}
    accomodation:${priceDetails.accommodationId.name}
    Phone: ${priceDetails.phonenumber} 
    ID: ${priceDetails.idNumber} 
    TIN: ${priceDetails.tin}
    VAT ID: ${priceDetails.vatNumber}
    ${priceDetails.name},\n\ here the reservation details.
    Date from - to     
        ${new Date(priceDetails.checkInDate).toLocaleDateString()} - ${new Date(priceDetails.checkOutDate).toLocaleDateString()}
    Number of persons ${priceDetails.numberOfPersons} 
    Diet ${priceDetails.diet}  
    `
  );
  const [email, setEmail] = useState(priceDetails.email); // Set email from priceDetails
  const [error, setError] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const handleShowInvoice = () => {
    
    toPDF()  // This will trigger re-render to display the InvoicSe
    setShowInvoice(true);
     // Hide the invoice after 2 seconds
  setTimeout(() => {
    setShowInvoice(false);
  }, 2000);
    
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
 //
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, message }),
    });
    
    if (response.ok) {
      alert("Email sent successfully!");
      setShowModal(false);
    } else {
      const data = await response.json();
      setError(data.error || "Failed to send email");
    }
  } catch (err) {
    setError("An error occurred while sending email");
  }
};


 //
  // Email sending function
  const sendEmail = async (customMessage) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message: customMessage }),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        setShowModal(false);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send email");
      }
    } catch (err) {
      setError("An error occurred while sending email");
    }
  };
//


const handleSave = async () => {
  const userr = localStorage.getItem('user');
  if (userr) {
    const users = JSON.parse(userr);
    const userId = users._id;

    // Helper function to format the date to 'YYYY-MM-DD'
    const formatDate = (date) => {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    };

    // Convert check-in and check-out dates to 'YYYY-MM-DD' format
    const startDate = formatDate(priceDetails.checkInDate);
    const endDate = formatDate(priceDetails.checkOutDate);

    // Create the occupancyCalendarEntry object
    const occupancyCalendarEntry = {
      startDate: startDate, // Use formatted startDate
      endDate: endDate,     // Use formatted endDate
      guestName: priceDetails.name, // Optional guest name
      status: 'book', // Status can be booked, available, or blocked
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${priceDetails.accommodationId._id}/occupancyCalendar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDate, // Directly sending startDate and endDate
          endDate: endDate,
          guestName: priceDetails.name,
          status: 'booked', // Send the calendar entry
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update occupancy calendar: ${errorData.message}`);
      }

      const result = await response.json();
      console.log('Successfully updated:', result);
      alert('Calendar updated successfully!');
    } catch (error) {
      console.error('Error updating accommodation:', error);
      alert('Failed to update accommodation.');
    }
  } else {
    alert('User not found. Please log in.');
  }
};

  // Function to update the reservation by name and send an email
  const updateReservationByName = async (name, status, emailMessage) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/name/${name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isApproved: status, // Pass the status (approved/cancelled)
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }

      const result = await response.json();
      console.log("Updated reservation:", result);
      handleSave(); 
      // Send email after updating the reservation
      sendEmail(emailMessage);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  // When "Approve" is clicked
  const handleApproved = () => {
    const congratsMessage = `Hello ${priceDetails.name},\n\nCongratulations! Your reservation for ${priceDetails.accommodationId.name} has been approved. We look forward to your stay from ${priceDetails.checkInDate} to ${priceDetails.checkOutDate}.\n\nBest regards,\nYour Team`;
    updateReservationByName(name, "approved", congratsMessage);
  };

  // When "Cancel" is clicked
  const handleCancel = () => {
    const sorryMessage = `Hello ${priceDetails.name},\n\nWe regret to inform you that your reservation for ${priceDetails.accommodationId.name} has been cancelled. Please contact us for more details.\n\nBest regards,\nYour Team`;
    updateReservationByName(name, "cancelled", sorryMessage);
  };

  return ( 
    <div className="bg-white">
      <div className="max-w-screen-lg p-6 mx-auto">
        {/* Header 
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Reservation request {priceDetails.name}</h1>
        </div>
*/}
        {/* Apartment Info */}
        <div className="flex items-center mb-11">
          <img
            src={priceDetails.accommodationId.images[0] }
            alt="Apartment"
            className="w-16 h-16 mr-4 rounded-full"
          />
          <div>
            <h2 className="font-semibold">
            {priceDetails.accommodationId.name}
            </h2>
            <p>{priceDetails.totalPrice}</p>
          </div>
        </div>
        <hr className="h-1 my-3"></hr>
        <div className="my-4"><p className="text-[14px] font-bold">Reservation request status</p></div>
        {/* Reservation Controls */}
<div className="flex mb-6 space-x-4">

<button 
  className="px-4 py-2 text-gray-700 transition duration-300 ease-in-out bg-gray-100 rounded-md shadow-sm hover:bg-gray-200" 
  onClick={toggleModal}
>
  Send to email
</button>
<button className="px-4 py-2 text-gray-700 transition duration-300 ease-in-out bg-gray-100 rounded-md shadow-sm hover:bg-gray-200">
  Print
</button>
<button 
  className="px-4 py-2 text-gray-700 transition duration-300 ease-in-out bg-gray-100 rounded-md shadow-sm hover:bg-gray-200" 
  onClick={handleShowInvoice}
>
  Download PDF
</button>
<button 
  className="flex items-center gap-2 px-6 py-2 text-white transition duration-300 ease-in-out bg-green-500 rounded-md shadow-sm hover:bg-green-600" 
  onClick={handleApproved}
>
  Approve
</button>
<button 
  className="flex items-center gap-2 px-6 py-2 text-white transition duration-300 ease-in-out bg-red-500 rounded-md shadow-sm hover:bg-red-600" 
  onClick={handleCancel}
>
  Cancel
</button>
</div>
<div className="flex items-center p-4 space-x-2 text-black rounded-md">
<div className="">
<FaInfoCircle />
</div>
<p className="text-[12px]">
  By changing the status to <strong>Approved</strong> or <strong>Canceled</strong>, the occupancy automatically changes and can be updated in the occupancy calendar. You can edit the request as needed and send it to the customer by email.
</p>
</div>
 {/* Hidden Invoice Content to be used for PDF generation */}
   {showInvoice && (
 <div ref={targetRef}>
 
 <Invoices Invoices={priceDetails }/>
</div>)}
        {/* Information Sections */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          {/* Stay Section */}
{/* Stay Section */}
<div className="p-4 mr-20 bg-white rounded-lg">
  {/* Header section */}
  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
    <div className="flex items-center space-x-2">
      <span className="font-semibold text-gray-500">1/6</span>
      <h3 className="text-lg font-semibold">Stay</h3>
    </div>
    <span className="text-blue-500 cursor-pointer">Edit</span>
  </div>

  {/* Content section */}
  <div className="mt-4 space-y-4">
    {/* Date */}
    <div className="flex items-center justify-between">
      <span className="text-gray-500">Date from — to</span>
      <span className="font-semibold">
        {new Date(priceDetails.checkInDate).toLocaleDateString()} — {new Date(priceDetails.checkOutDate).toLocaleDateString()} 
        ({Math.ceil((new Date(priceDetails.checkOutDate) - new Date(priceDetails.checkInDate)) / (1000 * 60 * 60 * 24))} nights)
      </span>
    </div>
    <hr className="border-gray-300" />

    {/* Number of persons */}
    <div className="flex items-center justify-between">
      <span className="text-gray-500">Number of persons</span>
      <span className="font-semibold">{priceDetails.numberOfPersons} adults</span>
    </div>
    <hr className="border-gray-300" />

    {/* Diet */}
    <div className="flex items-center justify-between">
      <span className="text-gray-500">Diet</span>
      <span className="font-semibold">{priceDetails.diet || "Without food"}</span>
    </div>
  </div>
</div>

        {/* Accommodation Section */}
<div className="p-4 mr-20 bg-white rounded-lg">
{/* Header section */}
<div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
  <div className="flex items-center space-x-2">
    <span className="font-semibold text-gray-500">2/6</span>
    <h3 className="text-lg font-semibold">Accommodation</h3>
  </div>
  
</div>

{/* Content section */}
<div className="flex items-center justify-between mt-4">
  {/* Accommodation name */}
  <div className="font-medium text-gray-700">{priceDetails.accommodationId.name}</div>
  
  {/* Location and number of adults */}
  <div className="text-right">
    <p className="text-gray-500">{priceDetails.accommodationId.locationDetails.name}</p>
    <p className="font-semibold">{priceDetails.numberOfPersons} adults</p>
  </div>
</div>
</div>


          {/* Customer Contact Section */}
          <div className="p-4 mb-4 mr-20 rounded-lg">
          {/* Header with title and Edit link */}
          <div className="flex items-center justify-between py-4 pl-1 mb-4 bg-gray-100">
            <h3 className="text-sm font-semibold text-gray-500">3/6 Customer Contact</h3>
            
          </div>
    
          {/* Contact Information */}
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-700" />
              <div>
                <p className="font-semibold text-gray-800">{priceDetails.name} {priceDetails.surname}</p>
              </div>
            </div>
    
            {/* Email */}
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-700" />
              <a href={`mailto:${priceDetails.email}`} className="text-sm text-blue-500 hover:underline">
                {priceDetails.email}
              </a>
            </div>
    
            {/* Phone */}
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-700" />
              <a href={`tel:${priceDetails.phone}`} className="text-sm text-blue-500 hover:underline">
                {priceDetails.phone}
              </a>
            </div>
          </div>
        </div>
    
        </div>

        {/* Price Section */}
        <div className="p-4 mt-6 mr-20 bg-white rounded-lg" >
      {/* Header with section title and Edit link */}
      <div className="flex items-center justify-between py-4 pl-1 mb-4 bg-gray-100 border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500">6/6 Prices</h3>
        
      </div>

      {/* Price Items */}
      <div className="space-y-4">
        {/* Accommodation */}
        <div className="flex items-center justify-between text-gray-800">
          <span>Accommodation</span>
          <span>€{priceDetails.totalPrice - 10}</span>
        </div>

        {/* Final Cleaning */}
        <div className="flex items-center justify-between pt-2 text-gray-800 border-t border-gray-200">
          <span>Final cleaning 1x</span>
          <span>€10</span>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between pt-2 font-bold text-gray-900 border-t border-gray-200">
          <span>Total price</span>
          <span>€{priceDetails.totalPrice}</span>
        </div>
      </div>
    </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Send reservation to email</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Message</label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
                  required
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 mx-3 text-white bg-pink-500 rounded-lg"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Price;
