"use client";
import useFetchData from "../../hooks/useFetchData";
import React, { useState } from "react"; 

const ContactForm = ({ contactInfo }) => {
  const [billingData, setBillingData] = useState(false); // For showing popup
  const [showPopup, setShowPopup] = useState(false); // Popup state for billing
  const [isEnabled, setIsEnabled] = useState(false);
console.log("contact",contactInfo)
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  const { data: userData, loading, error } = useFetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/hosts/${contactInfo.accommodationProvider}`
  );

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
      const userId = contactInfo.accommodationProvider; // User ID from props 
      console.log(userId);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hosts/${userId}`, {
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
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Failed to update user information!");
    }
  };

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
    <div className="max-w-4xl mx-auto">
      {/* Contact Details Section */}
      <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md ">
        <div className="text-sm font-medium text-gray-500">1/2</div>
        <div className="text-lg font-semibold text-gray-700">Contact details</div>
      </div>
      <div className="p-6 bg-white rounded-md ">
        <form className="space-y-4">
          {/* Name Field */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between ">
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={contactInfo.name || ""}
              readOnly
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:w-2/3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Last Name Field */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={contactInfo.surname || ""}
              readOnly
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:w-2/3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder={contactInfo.email || ""}
              readOnly
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:w-2/3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Telephone Field */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Telephone <span className="text-red-500">*</span>
            </label>
            <div className="flex w-2/3">
              <select 
              defaultValue={contactInfo.countryCode || "+421"}
              className="block w-20 p-2 bg-white border border-gray-300 shadow-sm rounded-l-md focus:ring-blue-500 focus:border-blue-500">
                <option value="+421">+421</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                readOnly
                placeholder={contactInfo.phone || ""}
                className="flex-1 p-2 border border-gray-300 shadow-sm rounded-r-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Billing Section */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-600">2/2</span>
          <span className="font-semibold text-gray-800">Billing information</span>
        </div>
        <button
          onClick={toggleSwitch}
          className={`w-10 h-6 flex items-center rounded-full p-1 ${
            isEnabled ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
              isEnabled ? "translate-x-4" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>
      {isEnabled && (
        <div className="p-6 bg-white rounded-md">
          <form className="space-y-4">
            {[
              { label: "Street Number", name: "streetNumber" },
              { label: "City", name: "city" },
              { label: "Zipcode", name: "zipcode" },
              { label: "Country", name: "country" },
              { label: "ID Number", name: "idNumber" },
              { label: "TIN", name: "tin" },
              { label: "VAT Number", name: "vatNumber" },
              { label: "Company Name", name: "companyName" },
              { label: "Phone Number", name: "phoneNumber" },
            ].map((field) => (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between" key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.label}
                  onChange={handleInputChange}
                  value={formData[field.name] || userData?.[field.name] || ""}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:w-2/3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </form>
          
      <div className="bottom-0 w-full bg-white shadow-md left-14">
      <div className="flex items-center justify-center py-4">
        <button
          onClick={handleSubmits}
          className="px-6 py-3 font-semibold text-white bg-green-700 rounded-lg shadow-md hover:bg-green-900 focus:outline-none"
        >
          Save
        </button>
      </div>
    </div>
        </div>
      )}
      
    
    </div>
    </>
  );
};

export default ContactForm;
