import React, { useState } from "react";

const ContactForm = ({ contactInfo }) => {
  const [billingData, setBillingData] = useState(false);

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-md">
      {/* Section 1/2: Contact details */}
      <div className="p-4 mb-6 border border-gray-300 rounded-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">1/2 Contact details</h2>
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
                >
                  <option value="+421">+421</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="text"
                  defaultValue={contactInfo.phone || ""}
                  className="block w-2/3 px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              onChange={() => setBillingData(!billingData)}
              className="w-5 h-5 text-indigo-600 form-checkbox"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 font-semibold text-white bg-pink-500 rounded-md shadow-md hover:bg-pink-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
