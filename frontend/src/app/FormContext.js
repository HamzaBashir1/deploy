"use client"
// FormContext.js
import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  // State to hold the selected data
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedWeb, setSelectedWeb] = useState('');
  const [note, setNote] = useState('');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [planName, setPlanName] = useState('');
  const [websiteInformation, setWebsiteInformation] = useState('');
  const [noteOnFilling, setNoteOnFilling] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [city, setCity] = useState('');
  const [sortOption, setsortOption] = useState('');
  const [Beds, setBeds] = useState('');
  const [Bathrooms, setBathrooms] = useState('');
  const [amenity ,  setamenity] = useState([]);
  const [booking ,  setbooking] = useState([]);
     
  
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [tin, setTin] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [user, setUser] = useState('');
  const [person, setperson] = useState('');
  const [pricemin , setPricemin] = useState('');
  const [pricemax , setPricemax] = useState('');
  
  const [location, setLocation] = useState('');
  const [drop, setdrop] = useState('');
  // const [user, setUser] = useState('');
  // Function to update selected plan
  const updatepricemin = (value) => setPricemin(value)
  const updatesort =  (value) => setsortOption(value)
  const updatepricemax = (value) => setPricemax(value)
  const updateBeds = (value) => setBeds(value)
  const updateBathrooms = (value) => setBathrooms(value)
  const updateamenity = (value) => setamenity(value)
  const updatebooking = (value) => setbooking(value)
  


  const updateSelectedPlan = (plan) => setSelectedPlan(plan);
  const updateNote = (value) => setNote(value);
  const updateSelectedWeb = (value) => setSelectedWeb(value);
  const updateLocation = (value) => setLocation(value);
const updatedrop = (value) => setdrop(value);
  // Functions to update other state variables
  const updateUser = (value) => setUser(value);
  const updatePhoneNumber = (value) => setPhoneNumber(value);
  const updatePlanName = (value) => setPlanName(value);
  const updateWebsiteInformation = (value) => setWebsiteInformation(value);
  const updateNoteOnFilling = (value) => setNoteOnFilling(value);
  const updateCompanyName = (value) => setCompanyName(value);
  const updateStreetNumber = (value) => setStreetNumber(value);
  const updateCity = (value) => setCity(value);
  const updateZipcode = (value) => setZipcode(value);
  const updateCountry = (value) => setCountry(value);
  const updateIdNumber = (value) => setIdNumber(value);
  const updateTin = (value) => setTin(value);
  const updateVatNumber = (value) => setVatNumber(value);
  const updateperson = (value) => setperson(value);
  // FormData update function
  const updateFormData = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <FormContext.Provider
      value={{
        selectedPlan,
        updateSelectedPlan,
        selectedWeb,
        updatepricemin,
        pricemin,
        updatebooking,
        booking,
        updatepricemax,
        pricemax,
        updatesort,
        updateBeds,
        updateBathrooms,
        updateamenity,
        amenity,
        Beds,
        Bathrooms,
        sortOption,
        updateSelectedWeb,
        note,
        updateNote,
        phoneNumber,
        updatePhoneNumber,
        location,
        updateLocation,
        planName,
        updatePlanName,
        person,
        updateperson,
        user,
        drop,
        updatedrop,

        updateUser,
        websiteInformation,
        updateWebsiteInformation,
        noteOnFilling,
        updateNoteOnFilling,
        companyName,
        updateCompanyName,
        streetNumber,
        updateStreetNumber,
        city,
        updateCity,
        zipcode,
        updateZipcode,
        country,
        updateCountry,
        idNumber,
        updateIdNumber,
        tin,
        updateTin,
        vatNumber,
        updateVatNumber,
        company,
        setCompany,
        formData,
        updateFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};