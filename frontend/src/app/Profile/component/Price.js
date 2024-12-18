"use client"
import React, { useRef, useState } from "react";
import { usePDF } from "react-to-pdf";
import Invoices from "./Invoices";
import { CalendarIcon, ChevronDownIcon, DownloadIcon, MailIcon, PrinterIcon } from "lucide-react"
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { Base_URL } from "../../config";
import { TbExclamationMark } from "react-icons/tb"; 
import { FaInfoCircle } from "react-icons/fa";
import { format } from 'date-fns';

const Price = ({ priceDetails }) => {
  console.log("Price Details: ", priceDetails);
  const name = priceDetails.name; 
  const emails = priceDetails.email;
  // const email = priceDetails.email; 
  const startDate = format(new Date(priceDetails.checkInDate), "yyyy-MM-dd");
  const endDate = format(new Date(priceDetails.checkOutDate), "yyyy-MM-dd");

    console.log("start date", startDate);
    console.log("end date", endDate);

  console.log("name", name, "email", emails);
  const { toPDF, targetRef } = usePDF({ filename: "invoice_template.pdf" });

  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    priceDetails.isApproved === "approved" ? "Confirmed" : "Raw"
  );
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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
const [isEditing, setIsEditing] = useState(false);
const [formData, setFormData] = useState({
  checkInDate: priceDetails.checkInDate,
  checkOutDate: priceDetails.checkOutDate,
  numberOfPersons: priceDetails.numberOfPersons,
  diet: priceDetails.diet ,
});

const handleEditClick = () => {
  setIsEditing(true);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSaves = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/reservations/${priceDetails._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Details updated successfully!");
      setIsEditing(false);
    } else {
      throw new Error("Failed to update details");
    }
  } catch (error) {
    console.error("Error updating details:", error);
    alert("An error occurred while updating details. Please try again.");
  }
};

const handleCancels = () => {
  setIsEditing(false);
  setFormData({
    checkInDate: priceDetails.checkInDate,
    checkOutDate: priceDetails.checkOutDate,
    numberOfPersons: priceDetails.numberOfPersons,
    diet: priceDetails.diet || "Without food",
  });
};






//
const handleSave = async () => {
  const userr = localStorage.getItem('user');
  if (userr) {
    const users = JSON.parse(userr);
    const userId = users._id;


    // Convert check-in and check-out dates to 'YYYY-MM-DD' format
    const startDate = format(new Date(priceDetails.checkInDate), "yyyy-MM-dd");
    const endDate = format(new Date(priceDetails.checkOutDate), "yyyy-MM-dd");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${priceDetails.accommodationId._id}/occupancyCalendar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: format(new Date(priceDetails.checkInDate), "yyyy-MM-dd"),
          endDate: format(new Date(priceDetails.checkOutDate), "yyyy-MM-dd"),
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/reservations/${priceDetails._id}`,
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
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:space-x-4">
        {/* Dropdown Button */}
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className={`${
              selectedOption === "Confirmed" ? "bg-green-500" : "bg-red-600"
            } text-white font-medium px-4 py-2 rounded-md focus:outline-none hover:opacity-90`}
          >
            {selectedOption}
          </button>
      
          {/* Dropdown Menu */}
          {isOpen && selectedOption === "Raw" && (
            <div className="absolute mt-2 bg-white border rounded-md shadow-lg w-36">
              <button
                onClick={handleApproved}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Confirmed
              </button>
              <button
                onClick={handleCancel}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Cancelled
              </button>
            </div>
          )}
        </div>
      
        {/* Send to Email Button */}
        <button
          className="px-4 py-2 text-gray-700 transition duration-300 ease-in-out bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
          onClick={toggleModal}
        >
          Send to email
        </button>
      
        {/* Print Button */}
        <button className="px-4 py-2 text-gray-700 transition duration-300 ease-in-out bg-gray-100 rounded-md shadow-sm hover:bg-gray-200">
          Print
        </button>
      
        {/* Download PDF Button */}
        <button
          className="px-4 py-2 text-gray-700 transition duration-300 ease-in-out bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
          onClick={handleShowInvoice}
        >
          Download PDF
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
<div className="p-4 bg-white rounded-lg lg:mr-20">
{/* Header section */}
<div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
  <div className="flex items-center space-x-2">
    <span className="font-semibold text-gray-500">1/6</span>
    <h3 className="text-lg font-semibold">Stay</h3>
  </div>
  <span className="text-blue-500 cursor-pointer" onClick={handleEditClick}>
    Edit
  </span>
</div>

{/* Content section */}
<div className="mt-4 space-y-4">
  {/* Date */}
  <div className="flex items-center justify-between">
    <span className="text-gray-500">Date from — to</span>
    {isEditing ? (
      <div className="flex space-x-2">
        <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleInputChange}
          className="px-2 py-1 border rounded"
        />
        <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleInputChange}
          className="px-2 py-1 border rounded"
        />
      </div>
    ) : (
      <span className="font-semibold">
        {new Date(priceDetails.checkInDate).toLocaleDateString()} —{" "}
        {new Date(priceDetails.checkOutDate).toLocaleDateString()}{" "}
        ({Math.ceil(
          (new Date(priceDetails.checkOutDate) -
            new Date(priceDetails.checkInDate)) /
            (1000 * 60 * 60 * 24)
        )}{" "}
        nights)
      </span>
    )}
  </div>
  <hr className="border-gray-300" />

  {/* Number of persons */}
  <div className="flex items-center justify-between">
    <span className="text-gray-500">Number of persons</span>
    {isEditing ? (
      <input
        type="number"
        name="numberOfPersons"
        value={formData.numberOfPersons}
        onChange={handleInputChange}
        className="px-2 py-1 border rounded"
        min="1"
      />
    ) : (
      <span className="font-semibold">{priceDetails.numberOfPersons} adults</span>
    )}
  </div>
  <hr className="border-gray-300" />

  {/* Diet */}
  <div className="flex items-center justify-between">
    <span className="text-gray-500">Diet</span>
    {isEditing ? (
      <span className="font-semibold">{priceDetails.diet || "Without food"}</span>
    ) : (
      <span className="font-semibold">{priceDetails.diet || "Without food"}</span>
    )}
  </div>
</div>

{/* Action buttons */}
{isEditing && (
  <div className="flex justify-end mt-4 space-x-4">
    <button
      onClick={handleCancels}
      className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
    >
      Cancel
    </button>
    <button
      onClick={handleSaves}
      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Save
    </button>
  </div>
)}
</div>
        {/* Accommodation Section */}
<div className="p-4 bg-white rounded-lg lg:mr-20">
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
          <div className="p-4 mb-4 rounded-lg lg:mr-20">
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
        <div className="p-4 mt-6 bg-white rounded-lg lg:mr-20" >
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-[#357965]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Message</label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-[#357965]"
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
                  className="px-4 py-2 mx-3 text-white bg-[#357965] rounded-lg"
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
