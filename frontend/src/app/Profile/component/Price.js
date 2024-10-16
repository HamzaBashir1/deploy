"use client";
import React, { useRef, useState } from "react";
import { usePDF } from "react-to-pdf";
import Invoices from "./Invoices";
import { Base_URL } from "@/app/config";

const Price = ({ priceDetails }) => {
  const { toPDF, targetRef } = usePDF({ filename: "invoice_template.pdf" });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(`
    Hello ${priceDetails.userId.name},
    \n\nWe are sending you the reservation details:
    \nUsername: ${priceDetails.userId.name}
    \nAccommodation: ${priceDetails.accommodationId.name}
    \nPhone: ${priceDetails.userId.phonenumber}
    \nID: ${priceDetails.userId.idNumber}
    \nTIN: ${priceDetails.userId.tin}
    \nVAT ID: ${priceDetails.userId.vatNumber}
    \nDate: ${new Date(priceDetails.checkInDate).toLocaleDateString()} - ${new Date(priceDetails.checkOutDate).toLocaleDateString()}
    \nNumber of persons: ${priceDetails.numberOfPersons}
    \nDiet: ${priceDetails.diet || "No special requests"}
  `);
  const [email, setEmail] = useState(priceDetails.email);
  const [error, setError] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const handleShowInvoice = () => {
    toPDF();
    setShowInvoice(true);
  };

  const toggleModal = () => setShowModal(!showModal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        setShowModal(false);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send email");
      }
    } catch {
      setError("An error occurred while sending email");
    }
  };

  const handleApproved = () => {
    const message = `Hello ${priceDetails.name},\n\nYour reservation for ${priceDetails.accommodationId.name} has been approved.`;
    updateReservationByName(priceDetails.name, "approved", message);
  };

  const handleCancel = () => {
    const message = `Hello ${priceDetails.name},\n\nYour reservation for ${priceDetails.accommodationId.name} has been cancelled.`;
    updateReservationByName(priceDetails.name, "cancelled", message);
  };

  return (
    <div className="p-4 sm:p-6 max-w-screen-lg mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl font-bold mb-2 sm:mb-0">Reservation Request</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <img
          src={priceDetails.accommodationId.images[0]}
          alt="Apartment"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="font-semibold">{priceDetails.accommodationId.name}</h2>
          <p>Total Price: €{priceDetails.totalPrice}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
        <button className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg">
          Raw
        </button>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg"
          onClick={toggleModal}
        >
          Send to Email
        </button>
        <button className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg">
          Print
        </button>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg"
          onClick={handleShowInvoice}
        >
          Download PDF
        </button>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg"
          onClick={handleApproved}
        >
          Approve
        </button>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>

      {showInvoice && (
        <div ref={targetRef}>
          <Invoices Invoices={priceDetails} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Stay</h3>
          <p>Date: {new Date(priceDetails.checkInDate).toLocaleDateString()} - {new Date(priceDetails.checkOutDate).toLocaleDateString()}</p>
          <p>Guests: {priceDetails.numberOfPersons} adults</p>
          <p>Diet: {priceDetails.diet || "No special requests"}</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Accommodation</h3>
          <p>{priceDetails.accommodationId.locationDetails.name}</p>
          <p>{priceDetails.numberOfPersons} adults</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Customer Contact</h3>
          <p>Name: {priceDetails.name} {priceDetails.surname}</p>
          <p>Email: {priceDetails.email}</p>
          <p>Phone: {priceDetails.phone}</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Prices</h3>
          <p>Accommodation: €{priceDetails.totalPrice - 10}</p>
          <p>Cleaning: €10</p>
          <p className="font-bold">Total: €{priceDetails.totalPrice}</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Send Email</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg"
                required
              />
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg"
                required
              />
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
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg ml-3"
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
