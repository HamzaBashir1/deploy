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
  const [images , setImage] = useState([]);
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [planName, setPlanName] = useState('');
  const [websiteInformation, setWebsiteInformation] = useState('');
  const [noteOnFilling, setNoteOnFilling] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [city, setCity] = useState('');
  const [sortOption, setsortOption] = useState('');
  const [sort, setsort] = useState('');
  const [Beds, setBeds] = useState('');
  const [Bathrooms, setBathrooms] = useState('');
  const [Bedss, setBedss] = useState('');
  const [Bathroomss, setBathroomss] = useState('');
  const [amenity ,  setamenity] = useState([]);
  const [Equipment ,  setEquipment] = useState([]);
  const [Amenities ,  setAmenities] = useState([]);
  const [Facilities ,  setselectedFacilities] = useState([]);
  const [booking ,  setbooking] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [adults, setAdults] = useState(0);
  const [childrens, setChildren] = useState(0);
  const [Rating, setRating] = useState(0)
  const [overallRating, setoverallRating] = useState(0)
  const [commentleght, setcommentleght] = useState(0)
  

  
  const [infants, setInfants] = useState(0);
  const [travelingWithPet, setTravelingWithPet] = useState([]);
  const [accdata, setAdata] = useState({});
    
  const [selectedpage, setSelectedpage] = useState('');
  
  const [zipcode, setZipcode] = useState('');
  
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [country, setCountry] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [ida, setId] = useState('');
  const [tin, setTin] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [user, setUser] = useState('');
  const [person, setperson] = useState('');
  const [pricemin , setPricemin] = useState('');
  const [pricemax , setPricemax] = useState('');
  const [pricemins , setPricemins] = useState('');
  const [pricemaxs , setPricemaxs] = useState('');
  const [pricenight ,setPricenight] = useState('')
  const [location, setLocation] = useState('');
  const [notification, setNotification] = useState(0);
  const [drop, setdrop] = useState([]);
  const [rentalform, Setrentalform] = useState("")
  // const [user, setUser] = useState('');
  // Function to update selected plan
  const updatepricemin = (value) => setPricemin(value)
  const updatepricemaxs = (value) => setPricemaxs(value)
  const updatepricenight = (value) => setPricenight(value)
  const updaterental = (value) => Setrentalform(value)

  const updateEquipment = (value) => setEquipment(value)
  const updateAmenities = (value) => setAmenities(value)
  const updateFacilities = (value) => setselectedFacilities(value)
  const updatesort =  (value) => setsortOption(value)
  const updatesorting = (value) => setsort(value)
  const updatepricemax = (value) => setPricemax(value)
  const updatepricemins = (value) => setPricemins(value)

  const updateBeds = (value) => setBeds(value)
  const updateBathrooms = (value) => setBathrooms(value)
  const updateBedss = (value) => setBedss(value)
  const updateBathroomss = (value) => setBathroomss(value)

  const updateamenity = (value) => setamenity(value)
  const updatebooking = (value) => setbooking(value)
  const updateSelectedpage = (page) => setSelectedpage(page);
  const updatestartdate = (value) => setStartDate(value)
  const updatendate = (value) => setEndDate(value)
  //
  const updateAdults = (value) => setAdults(value);
  const updateChildren = (value) => setChildren(value);
  const updateInfants = (value) => setInfants(value);
  // const updateBedrooms = (value) => setBedrooms(value);
  // const updateBathrooms = (value) => setBathrooms(value);
  const updateTravelingWithPet = (value) => setTravelingWithPet(value);
  const updateDatas = (value) => setAdata(value);
  // const updatePricemin = (value) => setPricemin(value);
  // const updatePricemax = (value) => setPricemax(value);
//
  const updateSelectedPlan = (plan) => setSelectedPlan(plan);
  const updateNote = (value) => setNote(value);
  const updateimages = (value) => setImage(value);
  const updateSelectedWeb = (value) => setSelectedWeb(value);
  const updateLocation = (value) => setLocation(value);
  const updateNotification = (value) => setNotification(value);
  const updateRating = (value) => setRating(value);
  const updateoverallRating = (value) => setoverallRating(value);
  const updatecommetlenght = (value) => setcommentleght(value);
  
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
  const updateid = (value) => setId(value);
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
        loadingProperties,
        selectedpage,
        updatepricenight,
        pricenight,
        updateNotification,
        notification,
        updateDatas,
        updatecommetlenght,
        updateoverallRating,
        commentleght,
        overallRating,

        accdata,
        updateFacilities,
        Facilities,
        updateAmenities,
        Amenities,

        updateimages,
        updaterental,
        rentalform,
        updateid,
        ida,
        images,
        updateSelectedpage,
         setLoadingProperties,
        updateEquipment,
        Equipment,
        updatesorting,
        sort,
        updatepricemin,
        updatepricemins,
        updatepricemaxs,
        updateBedss,
        updateBathroomss
        ,
        Bedss,
        Bathroomss,
        pricemaxs,
        pricemins,

        pricemin,
        updatebooking,
        booking,
        updatepricemax,
        updatestartdate,
        updatendate ,
        enddate,
        startdate,
        updateTravelingWithPet,
        travelingWithPet,
        updateAdults,
        adults,
        updateChildren,
        childrens,
        updateInfants,
        infants,

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
        updateRating,
        Rating,
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