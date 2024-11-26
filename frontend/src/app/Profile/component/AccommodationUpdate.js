"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import uploadImageToCloudinary from "../../utlis/uploadCloudinary.js";
import { IoCloseCircle } from 'react-icons/io5';
import FormItem from './FormItem.js';
import Label from './Label.js';
import { MapPinIcon } from 'lucide-react';
import ButtonSecondary from '../../Shared/Button/ButtonSecondary.js';
import { HiLocationMarker } from 'react-icons/hi';
import NcInputNumber from '../../Shared/NcInputNumber.js';
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from '../../Shared/DatePickerCustomHeaderTwoMonth.js';
import DatePickerCustomDay from '../../Shared/DatePickerCustomDay.js';
import Select from '../../Shared/Select.js';
import Input from '../../Shared/Input.js';
import Checkbox from '../../Shared/Checkbox.js';
import ButtonPrimary from '../../Shared/Button/ButtonPrimary.js';
import Textarea from '../../Shared/Textarea.js';
import '../../styles/_dates_picker.scss';
import '../../styles/index.scss'
import { FaPlus } from 'react-icons/fa';
import Heading from '../../Shared/Heading.js';
import useFetchData from '../../hooks/useFetchData.js';

const AddAccommodation = ({accommodationId}) => {
  console.log("accommodationId",accommodationId)
  const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${accommodationId}`);
  console.log("data",  accommodationData )
  const [dates, setDates] = useState([]);
  const [propertyType, setPropertyType] = useState(""); 
  const [name, setName] = useState(""); 
  const [roomType, setRoomType] = useState("");
  const [state, setState] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [acreage, setAcreage] = useState("");
  const [description, setDescription] = useState(""); 
  const [person, setPerson] = useState(4);
  const [bedroom, setBedroom] = useState(4);
  const [beds, setBeds] = useState(4);
  const [bathroom, setBathroom] = useState(2);
  const [kitchen, setKitchen] = useState(2);
  const [discount, setDiscount] = useState(""); 
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('Slovakia');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [arrivalFrom, setArrivalFrom] = useState('');
  const [arrivalTo, setArrivalTo] = useState('');
  const [departureFrom, setDepartureFrom] = useState('');
  const [departureTo, setDepartureTo] = useState('');
  const [url , seturl] = useState('');
  const [virtualTourUrl, setVirtualTourUrl] = useState('');
  const [generalAmenities, setGeneralAmenities] = useState([
    'Wifi', 'Internet', 'TV', 'Air conditioning', 'Fan',
    'Private entrance', 'Dryer', 'Heater', 'Washing machine', 'Detergent', 'Clothes dryer',
    'Baby cot', 'Desk', 'Fridge', 'Dryer'
  ]);
  const [otherAmenities, setOtherAmenities] = useState([
    'Wardrobe', 'Cloth hook', 'Extra cushion', 'Gas stove', 'Toilet paper',
    'Free toiletries', 'Makeup table', 'Hot pot', 'Bathroom heaters', 'Kettle', 'Dishwasher',
    'BBQ grill', 'Toaster', 'Towel', 'Dining table'
  ]);
  const [safeAmenities, setSafeAmenities] = useState([
    'Fire siren', 'Fire extinguisher', 'Anti-theft key', 'Safe vault'
  ]);
  const [amenities, setAmenities] = useState("");
  const [pet, setPet] = useState("");
  const [partyOrganizing, setPartyOrganizing] = useState("");
  const [cooking, setCooking] = useState("");
  const [tags, setTags] = useState([
    "No smoking in common areas",
    "Do not wear shoes/shoes in the house",
    "No cooking in the bedroom"
  ]);
  const [newTag, setNewTag] = useState("");
  const [priceMonThus, setPriceMonThus] = useState('');
  const [priceFriSun, setPriceFriSun] = useState('');
  const [nightMin, setNightMin] = useState('');
  const [nightMax, setNightMax] = useState('');

  // Handle adding new tag
  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag]); // Add the new tag to the tags array
      setNewTag(""); // Clear the input field after adding the tag
    }
  };
    

  // Property types list
  const propertyTypes = [
    "Apartment",
    "Flat",
    "Glamping",
    "Cottages",
    "Motels/Hostel",
    "Wooden Houses",
    "Guest Houses",
    "Secluded Accommodation",
    "Hotels",
    "Dormitories",
    "Caves",
    "Campsites",
    "Treehouses",
    "Houseboats",
    "Rooms",
    "Entire Homes",
    "Luxury Accommodation",
  ];

  

  // Function to handle checkbox state change
  const handleCheckboxChange = (checked, label) => {
    if (checked) {
      setGeneralAmenities((prev) => [...prev, label]); // Add to selected amenities
    } else {
      setGeneralAmenities((prev) => prev.filter((item) => item !== label)); // Remove from selected amenities
    }
  };

  // Function to handle checkbox state change
  const handleOtherAmenitCheckboxChange = (checked, label) => {
    if (checked) {
      setOtherAmenities((prev) => [...prev, label]); // Add to selected amenities
    } else {
      setOtherAmenities((prev) => prev.filter((item) => item !== label)); // Remove from selected amenities
    }
  };

  // Function to handle checkbox state change
  const handleSafeAmenitCheckboxChange = (checked, label) => {
    if (checked) {
      setSafeAmenities((prev) => [...prev, label]); // Add to selected amenities
    } else {
      setSafeAmenities((prev) => prev.filter((item) => item !== label)); // Remove from selected amenities
    }
  };


  useEffect(() => {
    if (accommodationData?.propertyType) {
      setPropertyType(accommodationData.propertyType); // Set property type
    }
  
    if (accommodationData?.name) {
      setName(accommodationData.name); // Set accommodation name
    }
  
    if (accommodationData?.virtualTourUrl) {
      setVirtualTourUrl(accommodationData.virtualTourUrl); // Set virtual tour URL
    }
  
    if (accommodationData?.acreage) {
      setAcreage(accommodationData.acreage); // Set acreage
    }
  
    if (accommodationData?.description) {
      setDescription(accommodationData.description); // Set description
    }
  
    if (accommodationData?.priceMonThus) {
      setPriceMonThus(accommodationData.priceMonThus); // Set price (Mon-Thurs)
    }
  
    if (accommodationData?.priceFriSun) {
      setPriceFriSun(accommodationData.priceFriSun); // Set price (Fri-Sun)
    }
  
    if (accommodationData?.rentalform) {
      setRoomType(accommodationData.rentalform); // Set rental form (room type)
    }
  
    if (accommodationData?.bedroom) {
      setBedroom(accommodationData.bedroom); // Set number of bedrooms
    }
  
    if (accommodationData?.bathroom) {
      setBathroom(accommodationData.bathroom); // Set number of bathrooms
    }
  
    if (accommodationData?.beds) {
      setBeds(accommodationData.beds); // Set number of beds
    }
  
    if (accommodationData?.kitchen) {
      setKitchen(accommodationData.kitchen); // Set kitchen amenities
    }
  
    if (accommodationData?.person) {
      setPerson(accommodationData.person); // Set max persons
    }
  
    if (accommodationData?.generalAmenities) {
      setGeneralAmenities(accommodationData.generalAmenities); // Set general amenities
    }
  
    if (accommodationData?.otherAmenities) {
      setOtherAmenities(accommodationData.otherAmenities); // Set other amenities
    }
  
    if (accommodationData?.safeAmenities) {
      setSafeAmenities(accommodationData.safeAmenities); // Set safe amenities
    }
  
    if (accommodationData?.amenities) {
      setAmenities(accommodationData.amenities); // Set additional amenities
    }
  
    if (accommodationData?.pet) {
      setPet(accommodationData.pet); // Set pet policy
    }
  
    if (accommodationData?.partyOrganizing) {
      setPartyOrganizing(accommodationData.partyOrganizing); // Set party organizing policy
    }
  
    if (accommodationData?.cooking) {
      setCooking(accommodationData.cooking); // Set cooking policy
    }
  
    if (accommodationData?.tags) {
      setTags(accommodationData.tags); // Set tags
    }
  
    if (accommodationData?.discount) {
      setDiscount(accommodationData.discount); // Set discount
    }
  
    if (accommodationData?.nightMax) {
      setNightMax(accommodationData.nightMax); // Set max nights
    }
  
    if (accommodationData?.nightMin) {
      setNightMin(accommodationData.nightMin); // Set min nights
    }
  
    if (accommodationData?.excludedDates) {
      setDates(accommodationData.excludedDates); // Set excluded dates
    }
  
    if (accommodationData?.images) {
      setCoverImage(accommodationData.images[0]); // Assuming first image is the cover image
      setRemainingImages(accommodationData.images.slice(1)); // The rest are remaining images
    }
  
  }, [accommodationData]); // Run whenever accommodationData changes
  

  const [coverImage, setCoverImage] = useState(null); // Store cover image URL
  const [coverPreview, setCoverPreview] = useState(null); // Preview URL for cover image
  const [remainingImages, setRemainingImages] = useState([]); // Store URLs for additional images
  const [remainingPreviews, setRemainingPreviews] = useState([]); // Previews for additional images

  // Simulated cloud upload function
  const uploadImageToCloudinary = async (file) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ url: URL.createObjectURL(file) }), 1000)
    );
  };

  const handleCoverImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await uploadImageToCloudinary(file); // Upload cover image
      setCoverImage(data.url);
      setCoverPreview(URL.createObjectURL(file)); // Generate preview
    } catch (error) {
      console.error("Cover image upload failed:", error);
      toast.error("Failed to upload the cover image. Please try again.");
    }
  };

  const handleRemainingImagesChange = async (event) => {
    const files = Array.from(event.target.files); // Convert to array

    let uploadedImages = [...remainingImages];
    let previews = [...remainingPreviews];

    for (const file of files) {
      try {
        const data = await uploadImageToCloudinary(file); // Upload image
        uploadedImages.push(data.url);
        previews.push(URL.createObjectURL(file));
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("One or more images failed to upload. Please try again.");
        return;
      }
    }

    setRemainingImages(uploadedImages);
    setRemainingPreviews(previews);
  };

  // Handle removing cover image
  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };

  // Handle removing an additional image
  const handleRemoveAdditionalImage = (index) => {
    const updatedPreviews = remainingPreviews.filter((_, i) => i !== index);
    const updatedImages = remainingImages.filter((_, i) => i !== index);

    setRemainingPreviews(updatedPreviews);
    setRemainingImages(updatedImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("starting point");

    //Get the user from localStorage
    const userr = localStorage.getItem("user");
    const users = JSON.parse(userr);
    console.log("user", users?._id); // Ensure user is logged in

    // No need to set userId state, use users._id directly
    const userId = users?._id;

    if (!userId) {
      console.error("User ID not found");
      toast.error("User must be logged in.");
      return;
    }
    // seturl(" ");
    setVirtualTourUrl("");

    // if (selectedFiles.length < 5) {
    //   toast.info('Please upload at least 3 images before submitting.');
    //   return;
    // }
    

    const accommodationData = {
      propertyType,
      name,
      userId,
      url,
      virtualTourUrl,
      acreage,
      description,
      priceMonThus,
      priceFriSun,
      rentalform: roomType,
      bedroom,
      bathroom,
      beds,
      kitchen,
      person,
      generalAmenities: generalAmenities,
      otherAmenities: otherAmenities,
      safeAmenities: safeAmenities,
      amenities,
      pet,
      partyOrganizing,
      cooking,
      tags: tags,
      discount,
      nightMax,
      nightMin,
      excludedDates: dates,
      location: {
        address,
        latitude,
        longitude,
      },
      locationDetails: {
        streetAndNumber: street,
        state: state,
        city: city,
        zipCode: zipCode,
        country: country,
        roomNumber: roomNumber,
      },
      images: [coverImage, ...remainingImages]
    };
    console.log("accommodationData",accommodationData)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${accommodationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accommodationData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the response body text
        throw new Error(`Failed to post data: ${errorText}`);
      }

      console.log('Data posted successfully');
      toast.success("Accommodation data store Successfully");
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error("Failed to store accommodation data.");
    }
  };

  // Function to render the radio buttons
  const renderRadio = (name, id, label, value, defaultChecked) => {
    const handleChange = (e) => {
      // Update the corresponding state when a radio button is selected
      if (name === "amenities") {
        setAmenities(e.target.value);
      } else if (name === "pet") {
        setPet(e.target.value);
      } else if (name === "partyOrganizing") {
        setPartyOrganizing(e.target.value);
      } else if (name === "cooking") {
        setCooking(e.target.value);
      }
    };

    return (
      <div className="flex items-center">
        <input
          type="radio"
          id={id + name}
          name={name}
          value={value} // Value is passed to identify the selection
          defaultChecked={defaultChecked}
          onChange={handleChange} // Update the state on selection
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
        />
        <label
          htmlFor={id + name}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  const renderNoInclude = (tag) => {
    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
          {tag}
        </span>
        <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"></i>
      </div>
    );
  };

  return (
    <div className='' >

      <div className='flex flex-row gap-4 nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6 pt-20'>
        <div className='flex items-center justify-center'>
          <h1 className='font-bold text-4xl'>
            Accommodation 
          </h1>
        </div>
        <div>
              <ButtonPrimary className="flex-shrink-0 bg-[#357965]">
                <FaPlus />
                <span className="ml-3">Add New</span>
              </ButtonPrimary>
        </div>
      </div>

    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6 pt-8'>
        <div className="listingSection__wrap space-y-11">
          <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className=" space-y-8">
            {/* ITEM */}
            <FormItem
              label="Choose a property type"
              desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
            >
              <Select 
                value={propertyType || accommodationData.propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              label="Place name"
              desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
            >
              <Input 
                value={name || accommodationData.name}
                onChange={(e) => setName(e.target.value)} 
                placeholder="Places name" 
              />
            </FormItem>
            <FormItem
              label="Rental form"
              desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
            >
              <Select
                value={roomType || accommodationData.roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="Entire place">Entire place</option>
                <option value="Private room">Private room</option>
                <option value="Share room">Share room</option>
              </Select>
            </FormItem>
          </div>
        </div>
      </div>
    </>

    {/* Form 2 */}
    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6'>
        <div className="listingSection__wrap space-y-11">
          <h2 className="text-2xl font-semibold">Your place location</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-8">
            <ButtonSecondary>
              <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              <span className="ml-3">Use current location</span>
            </ButtonSecondary>
            {/* ITEM */}
            <FormItem label="Country/Region">
              <Select 
                  value={country || accommodationData.country}
                  onChange={(e) => setCountry(e.target.value)}
              >
                <option value="Slovakia">Slovakia</option>
              </Select>
            </FormItem>
            <FormItem label="Street">
              <Input 
              value={street || accommodationData.street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="..." />
            </FormItem>
            <FormItem label="Room number (optional)">
              <Input 
                value={roomNumber || accommodationData.roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </FormItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
              <FormItem label="City">
                <Input 
                  value={city || accommodationData.city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormItem>
              <FormItem label="State">
                <Input 
                  value={state || accommodationData.state}
                  onChange={(e) => setState(e.target.value)}
                />
              </FormItem>
              <FormItem label="Postal code">
                <Input 
                  value={zipCode || accommodationData.zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </FormItem>
            </div>
            <div>
              <Label>Detailed address</Label>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                1110 Pennsylvania Avenue NW, Washington, DC 20230
              </span>
              <div className="mt-4">
                <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                  <div className="rounded-xl overflow-hidden">
                    {/* <GoogleMap
                    
                      bootstrapURLKeys={{
                        key: "AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY",
                      }}
                      yesIWantToUseGoogleMapApiInternals
                      defaultZoom={15}
                      defaultCenter={{
                        lat: 55.9607277,
                        lng: 36.2172614,
                      }}
                    >
                      <HiLocationMarker lat={55.9607277} lng={36.2172614} />
                    
                    </GoogleMap> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6'>
        <div className="listingSection__wrap space-y-11">
          <h2 className="text-2xl font-semibold">Size of your location</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-8">
            {/* ITEM */}
            <FormItem label="Acreage (m2)">
              <Select
                value={acreage || accommodationData.acreage} 
                onChange={(e) => setAcreage(e.target.value)}
              >
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
              </Select>
            </FormItem>
            <NcInputNumber
              label="Guests"
              defaultValue={4}
              value={person || accommodationData.person}
              onChange={(value) => setPerson(value)}
            />

            <NcInputNumber
              label="Bedroom"
              defaultValue={4}
              value={bedroom || accommodationData.bedroom}
              onChange={(value) => setBedroom(value)} // Corrected to receive the value directly
            />

            <NcInputNumber
              label="Beds"
              defaultValue={4}
              value={beds || accommodationData.beds}
              onChange={(value) => setBeds(value)} // Corrected to receive the value directly
            />

            <NcInputNumber
              label="Bathroom"
              defaultValue={2}
              value={bathroom || accommodationData.bathroom}
              onChange={(value) => setBathroom(value)} // Corrected to receive the value directly
            />

            <NcInputNumber
              label="Kitchen"
              defaultValue={2}
              value={kitchen || accommodationData.kitchen}
              onChange={(value) => setKitchen(value)} // Corrected to receive the value directly
            />

          </div>
        </div>
      </div>
    </>


    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6'>
        <div className="listingSection__wrap space-y-11">
            <div>
              <h2 className="text-2xl font-semibold">Amenities </h2>
              <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                Many customers have searched for accommodation based on amenities
                criteria
              </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            {/* FORM */}
            <div className="space-y-8">
              {/* ITEM */}
              <div>
                <label className="text-lg font-semibold" htmlFor="">
                  General amenities
                </label>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <Checkbox label="Wifi" name="Wifi" defaultChecked={generalAmenities.includes("Wifi")} onChange={(checked) => handleCheckboxChange(checked, "Wifi")} />
                  <Checkbox label="Internet" name="Internet" defaultChecked={generalAmenities.includes("Internet")} onChange={(checked) => handleCheckboxChange(checked, "Internet")} />
                  <Checkbox label="TV" name="TV" defaultChecked={generalAmenities.includes("TV")} onChange={(checked) => handleCheckboxChange(checked, "TV")} />
                  <Checkbox label="Air conditioning" name="Air conditioning" defaultChecked={generalAmenities.includes("Air conditioning")} onChange={(checked) => handleCheckboxChange(checked, "Air conditioning")} />
                  <Checkbox label="Fan" name="Fan" defaultChecked={generalAmenities.includes("Fan")} onChange={(checked) => handleCheckboxChange(checked, "Fan")} />
                  <Checkbox label="Private entrance" name="Private entrance" defaultChecked={generalAmenities.includes("Private entrance")} onChange={(checked) => handleCheckboxChange(checked, "Private entrance")} />
                  <Checkbox label="Dryer" name="Dryer" defaultChecked={generalAmenities.includes("Dryer")} onChange={(checked) => handleCheckboxChange(checked, "Dryer")} />
                  <Checkbox label="Heater" name="Heater" defaultChecked={generalAmenities.includes("Heater")} onChange={(checked) => handleCheckboxChange(checked, "Heater")} />
                  <Checkbox label="Washing machine" name="Washing machine" defaultChecked={generalAmenities.includes("Washing machine")} onChange={(checked) => handleCheckboxChange(checked, "Washing machine")} />
                  <Checkbox label="Detergent" name="Detergent" defaultChecked={generalAmenities.includes("Detergent")} onChange={(checked) => handleCheckboxChange(checked, "Detergent")} />
                  <Checkbox label="Clothes dryer" name="Clothes dryer" defaultChecked={generalAmenities.includes("Clothes dryer")} onChange={(checked) => handleCheckboxChange(checked, "Clothes dryer")} />
                  <Checkbox label="Baby cot" name="Baby cot" defaultChecked={generalAmenities.includes("Baby cot")} onChange={(checked) => handleCheckboxChange(checked, "Baby cot")} />
                  <Checkbox label="Desk" name="Desk" defaultChecked={generalAmenities.includes("Desk")} onChange={(checked) => handleCheckboxChange(checked, "Desk")} />
                  <Checkbox label="Fridge" name="Fridge" defaultChecked={generalAmenities.includes("Fridge")} onChange={(checked) => handleCheckboxChange(checked, "Fridge")} />
                </div>
              </div>

              {/* ITEM */}
              <div>
                <label className="text-lg font-semibold" htmlFor="">
                  Other amenities
                </label>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <Checkbox label="Wardrobe" name="Wardrobe" defaultChecked={otherAmenities.includes("Wardrobe")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Wardrobe")}/>
                  <Checkbox label="Cloth hook" name="Cloth hook" defaultChecked={otherAmenities.includes("Cloth hook")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Cloth hook")} />
                  <Checkbox label="Extra cushion" name="Extra cushion" defaultChecked={otherAmenities.includes("Extra cushion")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Extra cushion")}/>
                  <Checkbox label="Gas stove" name="Gas stove" defaultChecked={otherAmenities.includes("Gas stove")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Gas stove")}/>
                  <Checkbox label="Toilet paper" name="Toilet paper" defaultChecked={otherAmenities.includes("Toilet paper")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Toilet paper")}/>
                  <Checkbox label="Free toiletries" name="Free toiletries" defaultChecked={otherAmenities.includes("Free toiletries")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Free toiletries")} />
                  <Checkbox label="Makeup table" name="Makeup table" defaultChecked={otherAmenities.includes("Makeup table")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Makeup table")}/>
                  <Checkbox label="Hot pot" name="Hot pot" defaultChecked={otherAmenities.includes("Hot pot")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Hot pot")}/>
                  <Checkbox label="Bathroom heaters" name="Bathroom heaters" defaultChecked={otherAmenities.includes("Bathroom heaters")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Bathroom heaters")}/>
                  <Checkbox label="Kettle" name="Kettle" defaultChecked={otherAmenities.includes("Kettle")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Kettle")}/>
                  <Checkbox label="Dishwasher" name="Dishwasher" defaultChecked={otherAmenities.includes("Dishwasher")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Dishwasher")}/>
                  <Checkbox label="BBQ grill" name="BBQ grill" defaultChecked={otherAmenities.includes("BBQ grill")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "BBQ grill")}/>
                  <Checkbox label="Toaster" name="Toaster" defaultChecked={otherAmenities.includes("Toaster")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Toaster")}/>
                  <Checkbox label="Towel" name="Towel" defaultChecked={otherAmenities.includes("Towel")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Towel")}/>
                  <Checkbox label="Dining table" name="Dining table" defaultChecked={otherAmenities.includes("Dining table")} onChange={(checked) => handleOtherAmenitCheckboxChange(checked, "Dining table")}/>
                </div>
              </div>

              {/* ITEM */}
              <div>
                <label className="text-lg font-semibold" htmlFor="">
                  Safe amenities
                </label>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <Checkbox label="Fire siren" name="Fire siren" defaultChecked={safeAmenities.includes("Fire siren")} onChange={(checked) => handleSafeAmenitCheckboxChange(checked, "Fire siren")} />
                  <Checkbox label="Fire extinguisher" name="Fire extinguisher" defaultChecked={safeAmenities.includes("Fire extinguisher")} onChange={(checked) => handleSafeAmenitCheckboxChange(checked, "Fire extinguisher")} />
                  <Checkbox label="Anti-theft key" name="Anti-theft key" defaultChecked={safeAmenities.includes("Anti-theft key")} onChange={(checked) => handleSafeAmenitCheckboxChange(checked, "Anti-theft key")}/>
                  <Checkbox label="Safe vault" name="Safe vault" defaultChecked={safeAmenities.includes("Safe vault")} onChange={(checked) => handleSafeAmenitCheckboxChange(checked, "Safe vault")}/>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
    
    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6'>
        <div className="listingSection__wrap space-y-11">
          <div>
            <h2 className="text-2xl font-semibold">
              Set house rules for your guests{" "}
            </h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Guests must agree to your house rules before they book.
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-8">
            {/* ITEM */}
            <div>
              <label className="text-lg font-semibold" htmlFor="">
                General amenities
              </label>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {renderRadio("amenities", "Smoking", "Do not allow", "Do not allow", amenities === "Do not allow")}
                {renderRadio("amenities", "Smoking", "Allow", "Allow", amenities === "Allow")}
                {renderRadio("amenities", "Smoking", "Charge", "Charge", amenities === "Charge")}
              </div>
            </div>

            {/* ITEM */}
            <div>
              <label className="text-lg font-semibold" htmlFor="">
                Pet
              </label>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {renderRadio("pet", "Pet", "Do not allow", "Do not allow", pet === "Do not allow")}
                {renderRadio("pet", "Pet", "Allow", "Allow", pet === "Allow")}
                {renderRadio("pet", "Pet", "Charge", "Charge", pet === "Charge")}
              </div>
            </div>

            {/* ITEM */}
            <div>
              <label className="text-lg font-semibold" htmlFor="">
                Party organizing
              </label>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {renderRadio("partyOrganizing", "PartyOrganizing", "Do not allow", "Do not allow", partyOrganizing === "Do not allow")}
                {renderRadio("partyOrganizing", "PartyOrganizing", "Allow", "Allow", partyOrganizing === "Allow")}
                {renderRadio("partyOrganizing", "PartyOrganizing", "Charge", "Charge", partyOrganizing === "Charge")}
              </div>
            </div>

            {/* ITEM */}
            <div>
              <label className="text-lg font-semibold" htmlFor="">
                Cooking
              </label>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {renderRadio("cooking", "Cooking", "Do not allow", "Do not allow", cooking === "Do not allow")}
                {renderRadio("cooking", "Cooking", "Allow", "Allow", cooking === "Allow")}
                {renderRadio("cooking", "Cooking", "Charge", "Charge", cooking === "Charge")}
              </div>
            </div>

            {/* ----------- */}
            <div className=" w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <span className="block text-lg font-semibold">Additional rules</span>
            {/* Render existing tags */}
            <div className="flow-root">
              <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
                {tags.map((tag, index) => renderNoInclude(tag))}
              </div>
            </div>

            {/* Input to add a new tag */}
            <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
              <Input
                className="!h-full"
                placeholder="No smoking..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)} // Update the newTag state as user types
              />
              <ButtonPrimary className="flex-shrink-0 bg-green-900" onClick={handleAddTag}>
                <FaPlus />
                <span className="ml-3">Add tag</span>
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </>

    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6'>
        <div className="listingSection__wrap space-y-11">
          <div>
            <h2 className="text-2xl font-semibold">
              Your place description for client
            </h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Mention the best features of your accommodation, any special amenities
              like fast Wi-Fi or parking, as well as things you like about the
              neighborhood.
            </span>
          </div>

          <Textarea 
            placeholder="..." 
            rows={14} 
            value={description || accommodationData.description}
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
      </div>
    </>

    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6'>
        <div className="listingSection__wrap space-y-11">
          <div>
            <h2 className="text-2xl font-semibold">Pictures of the place</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              A few beautiful photos will help customers have more sympathy for your
              property.
            </span>
          </div>

          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
         <div className="space-y-8">
      {/* Cover Image Section */}
      <div>
        <span className="text-lg font-semibold">Cover Image</span>
        <div className="mt-5 flex flex-wrap">
          {coverPreview ? (
            <div className="relative">
              <img
                src={coverPreview || accommodationData.coverPreview}
                alt="Cover Preview"
                className="w-64 h-40 object-cover rounded"
              />
              <button
                onClick={handleRemoveCoverImage}
                className="absolute top-0 right-0 p-1 text-sm bg-red-500 text-white rounded-full"
              >
                <IoCloseCircle />
              </button>
            </div>
          ) : (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-neutral-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                <label
                  htmlFor="cover-image-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span>Upload Cover Image</span>
                  <input
                    id="cover-image-upload"
                    name="cover-image-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleCoverImageChange}
                    accept=".jpg, .png"
                  />
                </label>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Images Section */}
      <div>
        <span className="text-lg font-semibold">Pictures of the Place</span>
        <div className="mt-5">
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <label
                htmlFor="additional-images-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
              >
                <span>Upload Additional Images</span>
                <input
                  id="additional-images-upload"
                  name="additional-images-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleRemainingImagesChange}
                  accept=".jpg, .png, .gif"
                  multiple
                />
              </label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>

          {/* Display Images Below the Upload Button */}
          {remainingPreviews.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-4">
              {remainingPreviews.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveAdditionalImage(index)}
                    className="absolute top-0 right-0 p-1 text-sm bg-red-500 text-white rounded-full"
                  >
                    <IoCloseCircle />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>

            <FormItem
              label="Virtual Tour link"
            >
              <Input 
                value={virtualTourUrl}
                onChange={(e) => setVirtualTourUrl(e.target.value)} 
                placeholder="" 
              />
            </FormItem>
        </div>
      </div>
    </>

    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6'>
        <div className="listingSection__wrap space-y-11">
          <div>
            <h2 className="text-2xl font-semibold">Price your space</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              {` The host's revenue is directly dependent on the setting of rates and
                regulations on the number of guests, the number of nights, and the
                cancellation policy.`}
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-8">
            {/* ITEM */}
            <FormItem label="Currency">
              <Select>
                <option value="EUR">EUR</option>
              </Select>
            </FormItem>
            <FormItem label="Base price  (Monday -Thuday)">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">€</span>
                </div>
                <Input className="!pl-8 !pr-10" placeholder="0.00" 
                  value={priceMonThus || accommodationData.priceMonThus}
                  onChange={(e) => setPriceMonThus(e.target.value)} 
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">EUR</span>
                </div>
              </div>
            </FormItem>
            {/* ----- */}
            <FormItem label="Base price  (Friday-Sunday)">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">€</span>
                </div>
                <Input className="!pl-8 !pr-10" placeholder="0.00" 
                  value={priceFriSun || accommodationData.priceFriSun}
                  onChange={(e) => setPriceFriSun(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">EUR</span>
                </div>
              </div>
            </FormItem>
            {/* ----- */}
            <FormItem label="Long term price (Monthly discount) ">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
                <Input className="!pl-8 !pr-10" placeholder="0.00" 
                  value={discount || accommodationData. discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">every month</span>
                </div>
              </div>
            </FormItem>
          </div>
        </div>
      </div>
    </>

    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6'>
        <div className="listingSection__wrap space-y-11">
          <div>
            <h2 className="text-2xl font-semibold">How long can guests stay?</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              {` Shorter trips can mean more reservations, but you'll turn over your
              space more often.`}
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-7">
            {/* ITEM */}
            <NcInputNumber 
              label="Nights min" 
              defaultValue={1} 
              value={nightMin || accommodationData.nightMin}
              onChange={(value) => setNightMin(value)}
            />
            <NcInputNumber 
              label="Nights max" 
              defaultValue={5} 
              value={nightMax || accommodationData.nightMax}
              onChange={(value) => setNightMax(value)}
            />
          </div>

          {/*  */}
          <div>
            <h2 className="text-2xl font-semibold">Set your availability</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Editing your calendar is easy—just select a date to block or unblock
              it. You can always make changes after you publish.
            </span>
          </div>

          <div className="addListingDatePickerExclude">
            <DatePicker
              onChange={(date) => {
                let newDates = [];

                if (!date) {
                  return;
                }

                const newTime = date.getTime();
                if (dates.includes(newTime)) {
                  newDates = dates.filter((item) => item !== newTime);
                } else {
                  newDates = [...dates, newTime];
                }

                setDates(newDates);
              }}
              monthsShown={2}
              showPopperArrow={false}
              excludeDates={dates.filter(Boolean).map((item) => new Date(item))}
              inline
              renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
              renderDayContents={(day, date) => <DatePickerCustomDay dayOfMonth={day} date={date} />}
            />
          </div>
        </div>
      </div>
    </>

    <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto py-3 lg:py-2 border flex items-end'>
      <button onClick={handleSubmit} className='bg-green-700 px-4 py-2 text-white rounded-full'>
        update
      </button>
    </div>

    </div>
  );
};

export default AddAccommodation;
