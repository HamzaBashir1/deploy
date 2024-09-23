"use client";
import React, { useContext, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FormContext } from "../../FormContext";
import { toast } from "react-toastify";
// import { console } from "inspector";
// import axios from 'axios';

const LastStep = ({ setTab }) => {
  // const [ planName , setPlanName] = useState('');
  const { selectedPlan ,updateSelectedPlan} = useContext(FormContext); 
  const {
    phoneNumber, updatePhoneNumber,
    user , updateUser,
    companyName, updateCompanyName,
    streetNumber, updateStreetNumber,
    planName,updatePlanName,
    city, updateCity,
    
    zipcode, updateZipcode,
    country, updateCountry,
    idNumber, updateIdNumber,
    tin, updateTin,
    vatNumber, updateVatNumber
    , websiteInformation,updateWebsiteInformation, noteOnFilling, updateNote
  } = useContext(FormContext);
//---------------------



const [errors, setErrors] = useState('');
const [success, setSuccess] = useState('');
// const { user } = useContext(AuthContext); 
const userr = localStorage.getItem("user");
const users = JSON.parse(userr);
console.log(users)
// const userr = localStorage.getItem("user");
const userId = localStorage.getItem("userId");

// Use the ObjectId (e.g., for database queries or API requests)
console.log(userId);
// Access the 'name' property from the user object
const userName = users.name;
updateUser(users._id);
console.log(users._id)
// setPlanName(selectedPlan)
// updateUser(users.name)
//---------------------------
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [billingData, setBillingData] = useState({
    companyName: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    id: "",
    Tin: "",
    Vat: "",
  });
  const [error, setError] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleInputChange = (e) => {
    // setPlanName(selectedPlan)
    const { name, value } = e.target;
    
    // Update context state based on input field name
    switch (name) {
      case "companyName":
        updateCompanyName(value);
        break;
      case "phoneNumber":
        updatePhoneNumber(value);
        break; 
      case "user":
        updateUser(value);
        break;
      case "streetNumber":
        updateStreetNumber(value);
        break;
      case "city":
        updateCity(value);
        break; 
      case "zipcode":
        updateZipcode(value);
        break;
      case "country":
        updateCountry(value);
        break;
      case "idNumber":
        updateIdNumber(value);
        break;
      case "tin":
        updateTin(value);
        break;
      case "vatNumber":
        updateVatNumber(value);
        break;
      default:
        break;
    }

    // setPlanName(selectedPlan);
    // console.log(planName)
  };

  const handleSubmit =  (e) => {
    
    // setPlanName(selectedPlan);
    // console.log(planName)
    e.preventDefault();
    if (companyName && phoneNumber && selectedPlan && streetNumber && city && zipcode && country && idNumber && tin && vatNumber) {
    
      
      
      setError("");
      setShowPopup(false);
    } else {
      setError("Please fill in all required billing data.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowPopup(true); // Opens popup for editing
  };

  const handleFinish = async (e) => {
  //  let phoneNum = 2323232;
  //  let phone = phoneNum;
  
  // setPlanName(selectedPlan);
  console.log(planName)
    const formData = {
      user,
      phoneNumber,
      planName,
      websiteInformation,
      noteOnFilling,
      companyName,
      streetNumber,
      city,
      zipcode,
      country,
      idNumber,
      tin,
      vatNumber,
    };
    console.log("data ",formData)

    if (companyName && phoneNumber && selectedPlan && streetNumber && city && zipcode && country && idNumber && tin && vatNumber) {
     
     
     
     
      setTab(3); // Proceed to the next step
    } else {
      setError("Please fill in all required billing data.");
    }
    try {
      const res = await fetch(`http://localhost:5000/api/hosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
  
      const { message } = await res.json();
  
      if (!res.ok) {
        throw new Error(message);
      }
  
      // setLoading(false);
      alert("Host data added successfully!")
  
      toast.success(message);
      // router.push("/login"); // Using router.push for navigation
    } catch (err) {
      
      alert("Host data not added!")
  
      toast.error(err.message);
      // setLoading(false);
    }
  };
 

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
    <section className="container mx-auto">
      <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
        Billing data
      </h1>
      <p className="mb-4 text-sm sm:text-base">
        Fill in the invoicing data for the company or individual, where the pre-invoice will be sent and, after payment, the invoice for the selected services.
      </p>
      <div>
        <div onClick={togglePopup} className="flex items-center cursor-pointer">
          <button className="p-2 mr-2 text-white bg-red-600 rounded-full">
            <BiPlus size={24} />
          </button>
          <p className="text-sm sm:text-base">Add Billing address</p>
        </div>

        {/* Show the billing data if it's available */}
        {companyName && (
          <div className="p-5 mt-4 border">
            <div className="flex justify-between">
              <div>
                <h1>{companyName}</h1>
                <p>
                  {streetNumber} <br />
                  {city}, {country}
                </p>
              </div>
              <div>
                <p>ID: {idNumber}</p>
                <p>Tax ID: {tin}</p>
                <p>VAT ID: {vatNumber}</p>
              </div>
              <div>
                <button className="text-blue-500 underline" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
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
          €{price}
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

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex items-center justify-start">
        <button
          className="py-2 text-gray-500 px-9 hover:text-gray-700 focus:outline-none"
          onClick={() => setTab(2)}
        >
          Back
        </button>
        <button
          className="py-2 text-white bg-[#4FBE9F] rounded-md shadow px-9 hover:[#4FBE9F] focus:outline-none"
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <h2 className="mb-4 text-xl font-bold">
              {isEditing ? "Edit Billing Address" : "Add Billing Address"}
            </h2>
            <form className="space-y-4 " onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="companyName"
                value={companyName}
                onChange={handleInputChange}
                className="w-full p-2 border-b rounded-none"
                placeholder="Company name (First and last name)"
                required
              />
            </div>
            <div>
              <input
                type="number"
                name="phoneNumber"
                value={phoneNumber}
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
                value={streetNumber}
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
                value={city}
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
                value={zipcode}
                onChange={handleInputChange}
                className="w-full p-2 border-b rounded-none"
                placeholder="Zip code"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="country"
                value={country}
                onChange={handleInputChange}
                className="w-full p-2 border-b rounded-none"
                placeholder="Country"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="idNumber"
                value={idNumber}
                onChange={handleInputChange}
                className="w-full p-2 border-b rounded-none"
                placeholder="ID number"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="tin"
                value={tin}
                onChange={handleInputChange}
                className="w-full p-2 border-b rounded-none"
                placeholder="TIN"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="vatNumber"
                value={vatNumber}
                onChange={handleInputChange}
                className="w-full p-2 border-b rounded-none"
                placeholder="VAT"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="planName"
                value={planName}
                onChange={handleInputChange}
                className="w-full p-2 text-gray-500 bg-gray-100 border-b rounded-none"
                readOnly
                placeholder="plan"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="websiteInformation"
                value={websiteInformation}
                onChange={handleInputChange}
                readOnly
                className="w-full p-2 text-gray-500 bg-gray-100 border-b rounded-none"
                placeholder="webiste_information"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="noteOnFilling"
                value={noteOnFilling}
                onChange={handleInputChange}
                readOnly
                className="w-full p-2 text-gray-500 bg-gray-100 border-b rounded-none"
                placeholder="noteOnFilling"
                required
              />
            </div>
            <div>
            <input
              type="text"
              name="user"
              value={user}
              onChange={handleInputChange}
              
              className="w-full p-2 text-gray-500 bg-gray-100 border-b rounded-none"
              placeholder="username"
              required
            />
          </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end">
              <button type="button" className="px-4 py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300" onClick={togglePopup}>
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 ml-4 text-white bg-[#4FBE9F] rounded-md">
                {isEditing ? "Save Changes" : "Save"}
              </button>
            </div>
          </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default LastStep;
