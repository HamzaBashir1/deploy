import React , { useCallback} from 'react';
import { useState, useEffect } from 'react';
import { GoogleMap,Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { toast } from 'react-toastify';
import uploadImageToCloudinary from "../../utlis/uploadCloudinary.js";
import { IoCloseCircle } from 'react-icons/io5';
import FormItem from './FormItem.js';
import Label from '../../Shared/Label.js';
import { MapPinIcon } from 'lucide-react';
import ButtonSecondary from '../../Shared/Button/ButtonSecondary.js';
import { HiLocationMarker } from 'react-icons/hi';
import NcInputNumber from '../../Shared/NcInputNumber.js';
// import DatePicker from "react-datepicker";
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
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../../components/Loader/Loading.js';
import DatePicker from 'react-datepicker';


const AddAccommodation = ({accommodationId}) => {

  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  
  console.log("accommodationId",accommodationId)
  const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${accommodationId}`);
  console.log("accommodationData",  accommodationData );


  const [excludedDates, setExcludedDates] = useState([]);

  useEffect(() => {
    if (accommodationData) {
      if (accommodationData && accommodationData.propertyType) {
        setPropertyType(accommodationData.propertyType);
      } else {
        setPropertyType("Apartment");
      }
      setName(accommodationData.name || "");
      setRoomType(accommodationData.roomType || "Entire place");
      setState(accommodationData.locationDetails?.state || "");
      setRoomNumber(accommodationData.locationDetails?.roomNumber || "");
      setAcreage(accommodationData.acreage || "100");
      setDescription(accommodationData.description || "");
      setPerson(accommodationData.person || 4);
      setBedroom(accommodationData.bedroom || 4);
      setBeds(accommodationData.beds || 4);
      setBathroom(accommodationData.bathroom || 2);
      setKitchen(accommodationData.kitchen || 2);
      setDiscount(accommodationData.discount || "");
      setStreet(accommodationData.locationDetails?.streetAndNumber || '');
      setCity(accommodationData.locationDetails?.city || '');
      setZipCode(accommodationData.locationDetails?.zipCode || '');
      setCountry(accommodationData.country || 'Slovakia');
      setAddress(accommodationData.address || '');
      setLatitude(accommodationData.latitude || 48.669026);
      setLongitude(accommodationData.longitude || 19.699024);
      setVirtualTourUrl(accommodationData.virtualTourUrl || '');
      setGeneralAmenities(accommodationData.generalAmenities || []);
      setOtherAmenities(accommodationData.otherAmenities || []);
      setSafeAmenities(accommodationData.safeAmenities || []);
      setAmenities(accommodationData.amenties || "");
      setPet(accommodationData.pet || "");
      setPartyOrganizing(accommodationData.partyOrganizing || "");
      setCooking(accommodationData.cooking || "");
      setTags(accommodationData.tags || []);
      setPriceMonThus(accommodationData.priceMonThus || '');
      setPriceFriSun(accommodationData.priceFriSun || '');
      setNightMin(accommodationData.nightMin || 2);
      setNightMax(accommodationData.nightMax || 2);
      if (accommodationData?.images?.length > 0) {
        // Set the first image as cover
        setCoverImage(accommodationData.images[0]);
  
        // Set the rest as remaining images
        setRemainingPreviews(accommodationData.images.slice(1));
      }
      setExcludedDates((accommodationData.excludedDates || []).map(date => new Date(date)));  // Convert strings to Date objects
    }
  }, [accommodationData]);
  
  const [propertyType, setPropertyType] = useState(accommodationData?.propertyType || "Apartment");
  const [name, setName] = useState(accommodationData.name || ""); 
  const [autocomplete, setAutocomplete] = useState(null);
  const [roomType, setRoomType] = useState(accommodationData.roomType || "Entire place");
  const [state, setState] = useState(accommodationData.locationDetails?.state || "");
  const [roomNumber, setRoomNumber] = useState(accommodationData.locationDetails?.roomNumber || "");
  const [acreage, setAcreage] = useState(accommodationData.acreage || "100");
  const [description, setDescription] = useState(accommodationData.description || ""); 
  const [person, setPerson] = useState(accommodationData.person || 4);
  const [bedroom, setBedroom] = useState(accommodationData.bedroom || 4);
  const [beds, setBeds] = useState(accommodationData.beds || 4);
  const [bathroom, setBathroom] = useState(accommodationData.bathroom || 2);
  const [kitchen, setKitchen] = useState(accommodationData.kitchen || 2);
  const [discount, setDiscount] = useState(accommodationData.discount || ""); 
  const [street, setStreet] = useState(accommodationData.locationDetails?.streetAndNumber || '');
  const [city, setCity] = useState(accommodationData.locationDetails?.city || '');
  const [zipCode, setZipCode] = useState(accommodationData.locationDetails?.zipCode || '');
  const [country, setCountry] = useState(accommodationData.country || 'Slovakia');
  const [address, setAddress] = useState(accommodationData.address ||'');
  const [latitude, setLatitude] = useState(accommodationData.longitude || 48.669026);
  const [longitude, setLongitude] = useState(accommodationData.longitude || 19.699024);
  const [cityAutocomplete, setCityAutocomplete] = useState(null);
  const [arrivalFrom, setArrivalFrom] = useState('');
  const [arrivalTo, setArrivalTo] = useState('');
  const [departureFrom, setDepartureFrom] = useState('');
  const [departureTo, setDepartureTo] = useState('');
  const [url , seturl] = useState(accommodationData.url || '');
  const [virtualTourUrl, setVirtualTourUrl] = useState(accommodationData.virtualTourUrl || '');
  const [generalAmenities, setGeneralAmenities] = useState(accommodationData.generalAmenities || []);
  const [otherAmenities, setOtherAmenities] = useState(accommodationData.otherAmenities || [
    'Wardrobe', 'Cloth hook', 'Extra cushion', 'Gas stove', 'Toilet paper',
    'Free toiletries', 'Makeup table', 'Hot pot', 'Bathroom heaters', 'Kettle', 'Dishwasher',
    'BBQ grill', 'Toaster', 'Towel', 'Dining table'
  ]);
  const [safeAmenities, setSafeAmenities] = useState(accommodationData.safeAmenities || [
    'Fire siren', 'Fire extinguisher', 'Anti-theft key', 'Safe vault'
  ]);
  const [amenties, setAmenities] = useState(accommodationData.amenities || "");
  const [pet, setPet] = useState(accommodationData.pet || "");
  const [partyOrganizing, setPartyOrganizing] = useState(accommodationData.partyOrganizing || "");
  const [cooking, setCooking] = useState(accommodationData.cooking || "");
  const [tags, setTags] = useState(accommodationData.tags || [
    "No smoking in common areas",
    "Do not wear shoes/shoes in the house",
    "No cooking in the bedroom"
  ]);
  const [newTag, setNewTag] = useState(accommodationData.newTag || "");
  const [priceMonThus, setPriceMonThus] = useState(accommodationData.priceMonThus || '');
  const [priceFriSun, setPriceFriSun] = useState(accommodationData.priceFriSun || '');
  const [nightMin, setNightMin] = useState(accommodationData.nightMin || 2);
  const [nightMax, setNightMax] = useState(accommodationData.nightMax || 2);
  const [coverImage, setCoverImage] = useState(null); // Store cover image URL
  const [coverPreview, setCoverPreview] = useState(null);  
  const [remainingImages, setRemainingImages] = useState([]); // Store URLs for additional images
  const [remainingPreviews, setRemainingPreviews] = useState([]); // Previews for additional images


  // Handle adding new tag
  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag]); // Add the new tag to the tags array
      setNewTag(""); // Clear the input field after adding the tag
    }
  };

    const handleDateChange = (date) => {
      if (!date) return;
  
      const newTime = date.getTime(); // Get the timestamp of the selected date
      let updatedDates;
  
      // Check if the date is already excluded, then toggle it
      if (excludedDates.some(item => item.getTime() === newTime)) {
        // Remove the date if it's already excluded
        updatedDates = excludedDates.filter(item => item.getTime() !== newTime);
      } else {
        // Add the date if it's not already in the excluded list
        updatedDates = [...excludedDates, new Date(date)];
      }
  
      // Update the state with new excluded dates
      setExcludedDates(updatedDates);
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

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
    "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
    "France", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
    "Malta", "Mauritania", "Mauritius", "Mexico", "Monaco",
    "Mongolia", "Montenegro", "Morocco", "Mozambique",
    "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway",
    "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
    "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan",
    "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
  ];

  // autocomplete
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"], // Include Places library
  });

  const handlePlaceSelect = useCallback(() => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const addressComponents = place.address_components || [];
      const formattedAddress = place.formatted_address || "";

      setStreet(formattedAddress);
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
   // Extract city, state, and postal code
   const city = addressComponents.find((c) => c.types.includes("locality"))?.long_name || "";
   const state = addressComponents.find((c) => c.types.includes("administrative_area_level_1"))?.long_name || "";
  //  const zipCode = addressComponents.find((c) => c.types.includes("postal_code"))?.long_name || "";
   setZipCode(
    addressComponents.find((c) => c.types.includes("postal_code"))?.long_name || "");
    console.log(zipCode)
   setCountry(
    addressComponents.find((c) => c.types.includes("country"))?.long_name || ""
  );
   // Update state variables
   setCity(city);
   setState(state);
  
      // toast.success(`Selected: ${formattedAddress}`);
    } else {
      toast.error("Unable to get address details.");
    }
  }, [autocomplete]);

  const handleAutocompleteLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);
  const handleCitySelect = useCallback(() => {
    const cityPlace = cityAutocomplete.getPlace();
    if (cityPlace.geometry) {
      const cityName = cityPlace.address_components.find((c) => c.types.includes("locality"))?.long_name || "";
      setCity(cityName);
    } else {
      toast.error("Unable to get city details.");
    }
  }, [cityAutocomplete]);
  
  const handleCityAutocompleteLoad = useCallback((autocompleteInstance) => {
    setCityAutocomplete(autocompleteInstance);
  }, []);
  if (!isLoaded || loadError) {
    return <Loading />;
  }

  const handleCountryChange = (e) => {
    setCountry(e.target.value); // Update the selected country
  };

  // Function to handle "Use Current Location"
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);

          // Reverse Geocoding using Google Maps API
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;

            setStreet(data.results[0].formatted_address);
            setCity(
              addressComponents.find((c) => c.types.includes("locality"))?.long_name || ""
            );
            setState(
              addressComponents.find((c) =>
                c.types.includes("administrative_area_level_1")
              )?.long_name || ""
            );
            setZipCode(
              addressComponents.find((c) => c.types.includes("postal_code"))?.long_name || ""
            );
            setCountry(
              addressComponents.find((c) => c.types.includes("country"))?.long_name || ""
            );
          } else {
            toast.error("Unable to retrieve address details.");
          }
        },
        (error) => {
          toast.error("Geolocation error: " + error.message);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Function to fetch address suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setStreet(value);

    // if (value.length > 2) {
    //   const response = await fetch(
    //     `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=`
    //   );
    //   const data = await response.json();

    //   if (data.predictions) {
    //     setSuggestions(data.predictions);
    //   }
    // } else {
    //   setSuggestions([]);
    // }
  };

  // Function to handle suggestion click
  const handleSuggestionClick = async (placeId) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=`
    );
    const data = await response.json();

    if (data.result) {
      const addressComponents = data.result.address_components;

      setStreet(data.result.formatted_address);
      setCity(
        addressComponents.find((c) => c.types.includes("locality"))?.long_name || ""
      );
      setState(
        addressComponents.find((c) =>
          c.types.includes("administrative_area_level_1")
        )?.long_name || ""
      );
      setZipCode(
        addressComponents.find((c) => c.types.includes("postal_code"))?.long_name || ""
      );
      setCountry(
        addressComponents.find((c) => c.types.includes("country"))?.long_name || ""
      );
      setLatitude(data.result.geometry.location.lat);
      setLongitude(data.result.geometry.location.lng);
    }
    setSuggestions([]);
  };

  // Function to handle checkbox state change
  const handleCheckboxChange = (checked, amenity) => {
    setGeneralAmenities((prevAmenities) => {
      if (checked) {
        return [...prevAmenities, amenity]; // Add amenity to the list
      } else {
        return prevAmenities.filter((item) => item !== amenity); // Remove amenity from the list
      }
    });
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

  // Simulated cloud upload function
  const handleCoverImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    try {
      const data = await uploadImageToCloudinary(file); // Upload cover image
      setCoverImage(data.secure_url); // Use Cloudinary secure URL
      setCoverPreview(data.secure_url); // Use secure URL for preview
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
        uploadedImages.push(data.secure_url); // Use Cloudinary secure URL
        previews.push(data.secure_url); // Use secure URL for preview
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
    seturl(" ");
    setVirtualTourUrl("");

    

    if (!name) {
      toast.info("Please fill the 'Name' field.");
      return; // Stop the form submission if 'name' is missing
    }

    if (!propertyType) {
      toast.info("Please select the Property Type");
      return; // Stop the form submission if 'name' is missing
    }

    if (!roomType) {
      toast.info("Please fill the Rental Form");
      return; // Stop the form submission if 'name' is missing
    }

    if (!country) {
      toast.info("Country/Region is required.");
      return;
    }

    if (!street) {
      toast.info("Street is required.");
      return;
    }

    if (!city) {
      toast.info("City is required.");
      return;
    }
    
    if (!zipCode) {
      toast.info("Postal Code is required.");
      return;
    }
  
    if (!acreage) {
      toast.info("Please select the acreage(m2)");
      return;
    }

    if (generalAmenities.length === 0) {
      toast.error("Please select at least one general amenity.");
      return;
    }
    if (otherAmenities.length === 0) {
      toast.error("Please select at least one other amenity.");
      return;
    }
    if (safeAmenities.length === 0) {
      toast.error("Please select at least one safe amenity.");
      return;
    }
  
    if (!description) {
      toast.info("Please fill the 'Description' field.");
      return;
    }
  
    if (!amenties) {
      toast.info("Please fill the 'Amenities' field.");
      return;
    }
  
    if (!pet) {
      toast.info("Please fill the 'Pet' field.");
      return;
    }
  
    if (!partyOrganizing) {
      toast.info("Please fill the 'Party Organizing' field.");
      return;
    }
  
    if (!cooking) {
      toast.info("Please fill the 'Cooking' field.");
      return;
    }

    if (!priceMonThus) {
      toast.info("Please fill the 'Price Mon-Thu' field.");
      return;
    }
  
    if (!priceFriSun) {
      toast.info("Please fill the 'Price Fri-Sun' field.");
      return;
    }
  
    if (!discount) {
      toast.info("Please fill the 'Discount' field.");
      return;
    }

    // Validation for cover image
    if (!coverImage) {
      toast.info("Please upload a cover image.");
      return;
    }

    // Validate that at least 4 additional images are uploaded
    if (remainingImages.length < 4) {
      toast.info("Please upload at least 4 additional images.");
      return;
    }
    

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
      amenties,
      pet,
      partyOrganizing,
      cooking,
      tags: tags,
      discount,
      nightMax,
      nightMin,
      excludedDates: excludedDates,
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
      let response;
      if (accommodationId) {
        // Update existing accommodation
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${accommodationId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(accommodationData),
        });
      } else {
        // Create new accommodation
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(accommodationData),
        });
      }
  
       const responseBody = await response.json(); // Assuming the response is JSON

        if (!response.ok) {
          throw new Error(responseBody.message || 'Failed to post data'); // Dynamic error message
        }

        // Only reset fields if the request was successful
        if (!accommodationId) {
          setName("");
          setVirtualTourUrl("");
          setDescription("");
          setPriceMonThus("");
          setPriceFriSun("");
          setBedroom("");
          setBathroom("");
          setBeds("");
          setKitchen("");
          setPerson("");
          setGeneralAmenities([]);
          setOtherAmenities([]);
          setSafeAmenities([]);
          setAmenities("");
          setPet("");
          setPartyOrganizing("");
          setCooking("");
          setTags([]);
          setDiscount("");
          setNightMax("");
          setNightMin("");
          setExcludedDates([]);
          setAddress("");
          setLatitude("");
          setLongitude("");
          setStreet("");
          setState("");
          setCity("");
          setZipCode("");
          setCountry("");
          setRoomNumber("");
          setCoverImage("");
          setRemainingImages([]);
        }

        console.log('Data posted successfully');
        // Use the dynamic message from backend if it exists
        const successMessage = responseBody.message;
        toast.success(successMessage); // Display dynamic success message
      } catch (error) {
        console.error('Error posting data:', error);
        // If the error object has a message, show that, otherwise fallback to a generic message
        const errorMessage = error.message || 'Failed to store accommodation data.';
        toast.error(errorMessage); // Display dynamic error message
      }
  };

  // Function to render the radio buttons
  const renderRadio = (name, id, label, value, isChecked) => {
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
          checked={isChecked} // Controlled radio state based on `amenities`
          onChange={handleChange} // Update the state on selection
          className="h-6 w-6 border border-neutral-400 rounded bg-white focus:ring-0 focus:outline-none checked:bg-[#357965] checked:border-[#357965] checked:ring-0 bg-transparent appearance-none"
          required
        />
        <label
          htmlFor={id + name}
          className="ml-3 block text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
      </div>
    );
  };
    

  const renderNoInclude = (tag) => {
    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-neutral-600 font-medium">
          {tag}
        </span>
        <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 cursor-pointer"></i>
      </div>
    );
  };

  return (
    <div className='' >

      <div className='flex flex-row gap-4 nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6 pt-20'>
        <div className='flex items-center justify-center'>
          <h1 className='font-bold text-xl md:text-4xl'>
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
          <div className="w-14 border-b border-neutral-200"></div>
          {/* FORM */}
          <div className=" space-y-8">
            {/* ITEM */}
            <FormItem
              label="Choose a property type"
              desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
            >
              <Select 
                value={propertyType}
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
                value={name}
                onChange={(e) => setName(e.target.value)} 
                placeholder="Places name" 
              />
            </FormItem>
            <FormItem
              label="Rental form"
              desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
            >
              <Select
                value={roomType}
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
          <div className="w-14 border-b border-neutral-200"></div>
          {/* FORM */}
          <div className="space-y-8">
            <ButtonSecondary onClick={handleUseCurrentLocation}>
              <MapPinIcon className="w-5 h-5 text-neutral-500" />
              <span className="ml-3">Use current location</span>
            </ButtonSecondary>
            {/* ITEM */}
            <FormItem label="Country/Region">
              <Select
                  value={country}
                  onChange={handleCountryChange}
                  className="relative z-10 w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring focus:ring-green-500"
                  style={{
                    position: 'relative', // Ensure dropdown opens below
                    zIndex: 10,          // Prevent overlap issues
                  }}
              >
                {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              </Select>
            </FormItem>
            <FormItem label="Street">
              <Autocomplete
                onLoad={handleAutocompleteLoad}
                onPlaceChanged={handlePlaceSelect}
              >
                <Input 
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Start typing to search for an address" 
                  required
                />
              </Autocomplete>
            </FormItem>
            <FormItem label="Room number (optional)">
              <Input 
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
            </FormItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
              <FormItem label="City">
                <Autocomplete
                  onLoad={handleCityAutocompleteLoad}
                  onPlaceChanged={handleCitySelect}
                  options={{
                    types: ["(cities)"], // Restrict to city suggestions only
                    // Optional: Restrict to specific country
                  }}
                >
                  <Input 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Autocomplete>
              </FormItem>
              <FormItem label="State">
                <Input 
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </FormItem>
              <FormItem label="Postal code">
                <Input 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </FormItem>
            </div>
            <div>
              <Label>Detailed address</Label>
              <span className="block mt-1 text-sm text-neutral-500">
                {street}
              </span>
              <div className="mt-4">
                <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                  <div className="rounded-xl overflow-hidden">
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: latitude, lng: longitude }} // Dynamically updated
                        zoom={12}
                        options={{
                          styles: [
                            {
                              elementType: "labels",
                              featureType: "poi",
                              stylers: [{ visibility: "off" }],
                            },
                          ],
                          disableDefaultUI: true,
                          zoomControl: true,
                        }}
                      >
                        <Marker position={{ lat: latitude, lng: longitude }} />
                      </GoogleMap>
                      ) : (
                        <Loading />
                      )}
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
          <div className="w-14 border-b border-neutral-200"></div>
          {/* FORM */}
          <div className="space-y-8">
            {/* ITEM */}
            <FormItem label="Acreage (m2)">
              <Select
                value={acreage} 
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
              defaultValue={person}
              value={person}
              onChange={(value) => setPerson(value)}
            />

            <NcInputNumber
              label="Bedroom"
              defaultValue={bedroom}
              value={bedroom}
              onChange={(value) => setBedroom(value)} // Corrected to receive the value directly
            />

            <NcInputNumber
              label="Beds"
              defaultValue={beds}
              value={beds}
              onChange={(value) => setBeds(value)} // Corrected to receive the value directly
            />

            <NcInputNumber
              label="Bathroom"
              defaultValue={bathroom}
              value={bathroom}
              onChange={(value) => setBathroom(value)} // Corrected to receive the value directly
            />

            <NcInputNumber
              label="Kitchen"
              defaultValue={kitchen}
              value={kitchen}
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
              <span className="block mt-2 text-neutral-500">
                Many customers have searched for accommodation based on amenities
                criteria
              </span>
            </div>
            <div className="w-14 border-b border-neutral-200"></div>
            {/* FORM */}
            <div className="space-y-8">
              {/* ITEM */}
              <div>
                <label className="text-lg font-semibold" htmlFor="">
                  General amenities
                </label>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {["Wifi", "Internet", "TV", "Air conditioning", "Fan", "Private entrance", "Dryer", "Heater", "Washing machine", "Detergent", "Clothes dryer", "Baby cot", "Desk", "Fridge"].map((amenity) => (
                    <Checkbox
                      key={amenity}
                      label={amenity}
                      name={amenity}
                      checked={generalAmenities.includes(amenity)}// Controlled checkbox
                      onChange={(checked) => handleCheckboxChange(checked, amenity)}
                    />
                  ))}
                </div>
              </div>

              {/* ITEM */}
              <div>
                <label className="text-lg font-semibold" htmlFor="">
                  Other amenities
                </label>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    'Wardrobe', 'Cloth hook', 'Extra cushion', 'Gas stove', 'Toilet paper',
                    'Free toiletries', 'Makeup table', 'Hot pot', 'Bathroom heaters', 'Kettle', 'Dishwasher',
                    'BBQ grill', 'Toaster', 'Towel', 'Dining table'
                  ].map((amenity) => (
                    <Checkbox
                      key={amenity}
                      label={amenity}
                      name={amenity}
                      checked={otherAmenities.includes(amenity)} // Controlled checkbox state
                      onChange={(checked) => handleOtherAmenitCheckboxChange(checked, amenity)} // Handle checkbox change
                    />
                  ))}
                </div>

              </div>

              {/* ITEM */}
              <div>
                <label className="text-lg font-semibold" htmlFor="">
                  Safe amenities
                </label>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    "Fire siren",
                    "Fire extinguisher",
                    "Anti-theft key",
                    "Safe vault",
                  ].map((amenity) => (
                    <Checkbox
                      key={amenity}
                      label={amenity}
                      name={amenity}
                      checked={safeAmenities.includes(amenity)} // Controlled checkbox state
                      onChange={(checked) => handleSafeAmenitCheckboxChange(checked, amenity)} // Handle checkbox change
                    />
                  ))}
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
            <span className="block mt-2 text-neutral-500">
              Guests must agree to your house rules before they book.
            </span>
          </div>
          <div className="w-full border-b border-neutral-200"></div>
          {/* FORM */}
          <div className="space-y-8">
            {/* ITEM */}
            <div>
              <label className="text-lg font-semibold" htmlFor="">
                General amenities
              </label>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {renderRadio("amenities", "Smoking", "Do not allow", "Do not allow", amenties === "Do not allow")}
                {renderRadio("amenities", "Smoking", "Allow", "Allow", amenties === "Allow")}
                {renderRadio("amenities", "Smoking", "Charge", "Charge", amenties === "Charge")}
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
            <div className=" w-full border-b border-neutral-200"></div>
            <span className="block text-lg font-semibold">Additional rules</span>
            {/* Render existing tags */}
            <div className="flow-root">
              <div className="-my-3 divide-y divide-neutral-100">
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
              <ButtonPrimary className="flex-shrink-0 bg-[#357965]" onClick={handleAddTag}>
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
            <span className="block mt-2 text-neutral-500">
              Mention the best features of your accommodation, any special amenities
              like fast Wi-Fi or parking, as well as things you like about the
              neighborhood.
            </span>
          </div>

          <Textarea 
            placeholder="..." 
            rows={14} 
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            required
          />
        </div>
      </div>
    </>

    <>
      <div className='nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-2 md:pb-6'>
        <div className="listingSection__wrap space-y-11">
          <div>
            <h2 className="text-2xl font-semibold">Pictures/VR of the place</h2>
            <span className="block mt-2 text-neutral-500">
              A few beautiful photos will help customers have more sympathy for your
              property.
            </span>
          </div>

          <div className="w-14 border-b border-neutral-200"></div>
          {/* FORM */}
         <div className="space-y-8">
          {/* Cover Image Section */}
          <div>
            <span className="text-lg font-semibold">Cover Image</span>
            <div className="mt-5 flex justify-center px-6 pt-5 pb-2 border-2 border-neutral-300 border-dashed rounded-md">
              {coverImage ? (
                <div className="relative flex justify-center items-center">
                  <img
                    src={coverImage}
                    alt="Cover Image"
                    className="w-64 h-40 object-cover rounded"
                  />
                  <button
                    onClick={handleRemoveCoverImage}
                    className="absolute top-2 right-2 p-1 text-sm bg-red-500 text-white rounded-full"
                  >
                    <IoCloseCircle />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-48">
                  <svg
                    className="h-12 w-12 text-neutral-400"
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
                    className="relative cursor-pointer mt-2 rounded-md font-medium text-teal-700 hover:text-teal-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
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
                  <p className="mt-1 text-xs text-neutral-500">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Images Section */}
          <div>
            <span className="text-lg font-semibold">Pictures of the Place</span>
            <div className="mt-5">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
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
                    className="relative cursor-pointer rounded-md font-medium text-teal-700 hover:text-teal-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
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
                  <p className="text-xs text-neutral-500 ">
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
            <span className="block mt-2 text-neutral-500 ">
              {` The host's revenue is directly dependent on the setting of rates and
                regulations on the number of guests, the number of nights, and the
                cancellation policy.`}
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200"></div>
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
                  value={priceMonThus}
                  onChange={(e) => setPriceMonThus(e.target.value)} 
                  type="number"
                  required
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
                  value={priceFriSun}
                  onChange={(e) => setPriceFriSun(e.target.value)}
                  type="number"
                  required
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
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  type="number"
                  required
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
            <span className="block mt-2 text-neutral-500">
              {` Shorter trips can mean more reservations, but you'll turn over your
              space more often.`}
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200"></div>
          {/* FORM */}
          <div className="space-y-7">
            {/* ITEM */}
            <NcInputNumber 
              label="Nights min" 
              defaultValue={nightMin} 
              value={nightMin}
              onChange={(value) => setNightMin(value)}
            />
            <NcInputNumber 
              label="Nights max" 
              defaultValue={nightMax} 
              value={nightMax}
              onChange={(value) => setNightMax(value)}
            />
          </div>

          {/*  */}
          <div>
            <h2 className="text-2xl font-semibold">Set your availability</h2>
            <span className="block mt-2 text-neutral-500">
              Editing your calendar is easy—just select a date to block or unblock
              it. You can always make changes after you publish.
            </span>
          </div>

          <div className="addListingDatePickerExclude">
          <DatePicker
            onChange={(date) => handleDateChange(date)} // Handle date change
            monthsShown={2}
            showPopperArrow={false}
            excludeDates={excludedDates} // Disable excluded dates
            inline
            className="rounded-lg shadow-lg p-6 bg-white border-2 border-gray-300"
            calendarClassName="rounded-lg bg-white overflow-hidden border border-gray-200 shadow-md grid grid-cols-2 gap-0"
            renderCustomHeader={(props) => (
              <DatePickerCustomHeaderTwoMonth {...props} />
            )}
            renderDayContents={(day, date) => (
              <DatePickerCustomDay dayOfMonth={day} date={date} />
            )}
          />
          </div>
        </div>
      </div>
    </>

    <div className='nc-PageAddListing1 px-6 max-w-3xl mx-auto py-3 lg:py-2 border flex justify-end'>
      <button onClick={handleSubmit} className='bg-[#357965] px-6 py-2 text-white rounded-full'>
        Submit
      </button>
    </div>

    </div>
  );
};

export default AddAccommodation;
