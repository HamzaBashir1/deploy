"use client"
import React, { useState } from "react";

const ContactForm = ({ contactInfo }) => {
  const [billingData, setBillingData] = useState(false); // For showing popup
  const [showPopup, setShowPopup] = useState(false); // Popup state for billing
  const [formData, setFormData] = useState({
    streetNumber: "",
    city: "",
    zipcode: "",
    country: "",
    idNumber: "",
    tin: "",
    vatNumber: "",
    companyName: "",
    phonenumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmits = async (e) => {
    e.preventDefault();

    try {
      const userId = contactInfo.userId._id; // User ID from props
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user information");
      }

      alert("User information updated successfully!");
      // Optionally close the popup after saving
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Failed to update user information!");
    }
  };

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-md">
      {/* Section 1/2: Contact details */}
      <div className="p-4 mb-6 border border-gray-300 rounded-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">
            1/2 Contact details 
          </h2>
        </div>

        <form>
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue={contactInfo.name || ""}
                className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Surname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue={contactInfo.surname || ""}
                className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                defaultValue={contactInfo.email || ""}
                className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <select
                  defaultValue={contactInfo.countryCode || "+421"}
                  className="block w-1/3 px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  readOnly
                >
                  <option value="+421">+421</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="text"
                  defaultValue={contactInfo.phone || ""}
                  className="block w-2/3 px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  readOnly
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Section 2/2: Billing data */}
      <div className="p-4 border border-gray-300 rounded-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">2/2 Billing data</h2>
          <div className="flex items-center">
            <label className="mr-2 text-gray-700">Billing data</label>
            <input
              type="checkbox"
              checked={billingData}
              onChange={() => {
                setBillingData(!billingData);
                togglePopup(); // Show popup when checkbox is clicked
              }}
              className="w-5 h-5 text-indigo-600 form-checkbox"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-2 font-semibold text-white bg-pink-500 rounded-md shadow-md hover:bg-pink-600"
          onClick={togglePopup}
        >
          Save
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="w-full max-w-md p-6 bg-white rounded-lg"
            style={{ maxHeight: "600px", overflowY: "auto" }}
          >
            <h2 className="mb-4 text-xl font-bold">Add Billing Address</h2>
            <form className="space-y-4" onSubmit={handleSubmits}>
              <div>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName || contactInfo.userId.companyName}
                  onChange={handleInputChange}
                  className="w-full p-2 border-b rounded-none"
                  placeholder="Company name"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber || contactInfo.userId.phonenumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border-b rounded-none"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="streetNumber"
                  value={formData.streetNumber || contactInfo.userId.streetNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border-b rounded-none"
                  placeholder="Street and number"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  value={formData.city || contactInfo.userId.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border-b rounded-none"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="zipcode"
                  value={formData.zipcode || contactInfo.userId.zipcode}
                  onChange={handleInputChange}
                  className="w-full p-2 border-b rounded-none"
                  placeholder="Zipcode"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  value={formData.country || contactInfo.userId.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border-b rounded-none"
                  placeholder="Country"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="tin"
                  value={formData.tin || contactInfo.userId.tin}
                  onChange={handleInputChange}
                  className="w-full p-2 border-b rounded-none"
                  placeholder="TIN"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber || contactInfo.userId.idNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border-b rounded-none"
                  placeholder="ID Number"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="vatNumber"
                  value={formData.vatNumber||contactInfo.userId.vatNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border-b rounded-none"
                  placeholder="VAT Number"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 ml-4 text-white bg-[#4FBE9F] rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
