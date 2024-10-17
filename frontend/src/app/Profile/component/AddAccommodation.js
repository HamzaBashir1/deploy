import React from 'react';
import { useState } from 'react';
// import uploadImageToCloudinary from "../../utlis/uploadCloudinary.js";
import { Base_URL } from "../../config.js";
import { toast } from 'react-toastify';
import uploadImageToCloudinary from "../../utlis/uploadCloudinary.js";

const AddAccommodation = () => {

  const [propertyType, setPropertyType] = useState(""); 
  const [name, setName] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [price, setPrice] = useState(""); 
  const [bedroomCount , setBedroomCount] = useState("");
  const [bathroomCount , setBathroomCount] = useState("");
  const [person, setPerson] = useState("");
  const [discount, setDiscount] = useState(""); 
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [placesNearby, setPlacesNearby] = useState({
    Restaurant: '',
    Supermarket: '',
    BusStation: '',
    TrainStation: '',
    Airport: '',
    SkiSlope: '',
    AquaPark: '',
    TouristTrail: '',
    CycleRoute: '',
    ATM: '',
    GasStation: '',
    ChargingStation: '',
    CableCar: '',
    SwimmingPool: '',
    WaterArea: '',
    TheSea: '',
    Beach: '',
    Castle: '',
    Zoo: '',
    Museum: '',
    BusinessCenter: ''
  });
  const [arrivalFrom, setArrivalFrom] = useState('');
  const [arrivalTo, setArrivalTo] = useState('');
  const [departureFrom, setDepartureFrom] = useState('');
  const [departureTo, setDepartureTo] = useState('');
  const [host, setHost] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [additionalContactInfo, setAdditionalContactInfo] = useState('');
  const [selectedProcess, setSelectedProcess] = useState('');
  const [selectedWifi, setSelectedWifi] = useState('');
  const [selectedServices, setSelectedServices] = useState({});
  const [selectedChildrenOptions, setSelectedChildrenOptions] = useState({});
  const [selectedDietOptions, setSelectedDietOptions] = useState({});
  const [selectedStayOptions, setSelectedSatyOptions] = useState({});
  const [responseSpeed, setResponseSpeed] = useState('');
  const [pets, setPets] = useState('');
  const [loudMusic, setLoudMusic] = useState('');
  const [smoking, setSmoking] = useState('');
  const [parking, setParking] = useState('');
  const [userId , setuser] = useState('');
  const [url , seturl] = useState('');
  const processes = [
    'Reception',
    'Reception 24/7',
    'Self-Service Accommodation Process',
    'By Agreement with Accommodation Provider'
  ];

  const wifiOptions = [
    'Free of Charge',
    'For a Fee',
    'Not Available',
  ];

  const servicesList = [
    { id: 'Free Wifi', label: 'Free Wifi' },
    { id: 'High speed internet', label: 'High speed internet' },
    { id: 'Barrier-free access', label: 'Barrier-free access' },
    { id: 'Charging station', label: 'Charging station' },
    { id: 'Reception', label: 'Reception' },
    { id: 'Invoicing possible', label: 'Invoicing possible' },
    { id: 'Card payment possible', label: 'Card payment possible' },
    { id: 'Room service', label: 'Room service' },
    { id: 'Air conditioning', label: 'Air conditioning' },
    { id: 'ATM', label: 'ATM' },
    { id: 'Parking', label: 'Parking' },
    { id: 'Kitchen', label: 'Kitchen' },
    { id: 'Exchange office', label: 'Exchange office' },
    { id: 'Restaurant', label: 'Restaurant' },
    { id: 'Bar', label: 'Bar' },
    { id: 'Wellness', label: 'Wellness' },
    { id: 'Swimming pool', label: 'Swimming pool' },
    { id: 'Hairdressing', label: 'Hairdressing' },
    { id: 'Game room', label: 'Game room' },
    { id: 'Fireplace', label: 'Fireplace' },
    { id: 'Grill', label: 'Grill' },
    { id: 'Shelter', label: 'Shelter' },
    { id: 'Terrace', label: 'Terrace' },
    { id: 'Conference Room', label: 'Conference Room' },
    { id: 'Laundry Room', label: 'Laundry Room' },
    { id: 'Cleaning plant', label: 'Cleaning plant' }
  ];
  
  const childrenOptions = [
    { id: 'Children are welcome here', label: 'Children are welcome here' },
    { id: 'Family rooms', label: 'Family rooms' },
    { id: 'Children pool', label: 'Children pool' },
    { id: 'Children Menu', label: 'Children Menu' },
    { id: 'Babysitting', label: 'Babysitting' },
    { id: 'Children corner', label: 'Children corner' },
    { id: 'Children playground', label: 'Children playground' },
    { id: 'Sandbox', label: 'Sandbox' },
    { id: 'Slide', label: 'Slide' },
    { id: 'Children Toys', label: 'Children Toys' }
  ];

  const DietOptions = [
    { id: 'Own catering', label: 'Own catering'},
    { id: 'Breakfast', label: 'Breakfast'},
    { id: 'Half board', label: 'Half board'},
    { id: 'Full board', label: 'Full board'},
    { id: 'All inclusive', label: 'All inclusive'}
  ];

  const StayOptions = [
  { id: 'With children', label: 'With children' },
  { id: 'For Seniors', label: 'For Seniors' },
  { id: 'Romance for two', label: 'Romance for two' },
  { id: 'For the demanding', label: 'For the demanding' },
  { id: 'For groups', label: 'For groups' },
  { id: 'Corporate action', label: 'Corporate action' },
  { id: 'With a pet', label: 'With a pet' },
  { id: 'Without children', label: 'Without children' },
  { id: 'For the undemanding', label: 'For the undemanding' }
  ];

  // Example equipment list (array of objects)
  const equipmentList = [
    { id: 'wifi', label: 'Wi-Fi' },
    { id: 'high-speed', label: 'High-Speed Internet' },
    { id: 'barrier-free', label: 'Barrier-Free' },
    { id: 'charging', label: 'Charging Station' },
  ];

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

  // Handle place change for distance
  const handlePlaceChange = (place, value) => {
    setPlacesNearby((prev) => ({
      ...prev,
      [place]: value
    }));
  };

  // Handle checkbox changes
  const handleServiceCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setSelectedServices((prevState) => ({
      ...prevState,
      [id]: checked
    }));
  };


  const handleChildrenCheckboxChange = (event) => {
    const { id, checked } = event.target;
    
    // Update the selected options state
    setSelectedChildrenOptions((prevState) => ({
      ...prevState,
      [id]: checked
    }));
  };


  const handleDietCheckboxChange = (event) => {
    const { id, checked } = event.target;
    
    // Update the selected options state
    setSelectedDietOptions((prevState) => ({
      ...prevState,
      [id]: checked
    }));
  };

  const handleStayCheckboxChange = (event) => {
    const { id, checked } = event.target;
    
    // Update the selected options state
    setSelectedSatyOptions((prevState) => ({
      ...prevState,
      [id]: checked
    }));
  };

  // Handler for response speed radio button changes
  const handleResponseSpeedChange = (event) => {
    setResponseSpeed(event.target.value);
  };

  // Handler for pets radio button changes
  const handlePetsChange = (event) => {
    setPets(event.target.value);
  };
  
  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };
  // Handler for loud music radio button changes
  const handleLoudMusicChange = (event) => {
    setLoudMusic(event.target.value);
  };

  // Handler for smoking radio button changes
  const handleSmokingChange = (event) => {
    setSmoking(event.target.value);
  };

  // Handler for parking radio button changes
  const handleParkingChange = (event) => {
    setParking(event.target.value);
  };


  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files
  const [previewURLs, setPreviewURLs] = useState([]); // Store preview URLs for each image

  const handleFileInputChange = async (event) => {
    const files = event.target.files; // Get all selected files

    let uploadedImages = [];
    let previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Assuming `uploadImageToCloudinary` is your function to upload a file and get its URL
      const data = await uploadImageToCloudinary(file);

      uploadedImages.push(data.url); // Save the uploaded image URL
      previews.push(URL.createObjectURL(file)); // Create a local preview URL
    }

    // Update state with the uploaded image URLs and preview URLs
    setSelectedFiles(uploadedImages); // Save uploaded URLs
    setPreviewURLs(previews); // Save preview URLs for display
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
    // console.log("user",users._id)
    // setuser(users._id);
    // console.log("userid",userId)
    
    // console.log("starting point2")
    // console.log('Selected propertyType:', propertyType);
    

    const accommodationData = {
      propertyType,
      name,
      userId,
      url,
      description,
      price,
      bedroomCount,
      bathroomCount,
      person,
      discount,
      location: {
        address,
        latitude,
        longitude,
      },
      locationDetails: {
        streetAndNumber: street,
        city: city,
        zipCode: zipCode,
        country: country,
        locationDescription: locationDescription,
        placesNearby: Object.entries(placesNearby).map(([placeType, distance]) => ({
          placeType,
          distance: Number(distance),
        })),
      },
      arrivalAndDeparture: {
        arrivalFrom,
        arrivalTo,
        departureFrom,
        departureTo,
      },
      contactDetails: {
        host,
        phone,
        email,
        website,
        whatsapp,
        additionalContactInfo
      },
      checkinCheckoutProcess : selectedProcess,
      wifi: selectedWifi,
      equipmentAndServices: Object.keys(selectedServices).filter(service => selectedServices[service]),
      children: Object.keys(selectedChildrenOptions).filter(service => selectedChildrenOptions[service]),
      diet: Object.keys(selectedDietOptions).filter((option) => selectedDietOptions[option]),
      typeOfStay:  Object.keys(selectedStayOptions).filter((option) => selectedStayOptions[option]),
      responseSpeed,
      pets,
      loudMusic,
      smoking,
      parking,
      images: selectedFiles
    };
    console.log("accommodationData",accommodationData)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accommodationData),
      });

      if (!response.ok) {
        throw new Error('Failed to post data');
      }

      console.log('Data posted successfully');
      toast.success("Accommodation data store Successfully");
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error("Failed to store accommodation data.");
    }
  };


  return (
    <div className='' >
    <form onSubmit={handleSubmit}>
      {/* Name Section */}

      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Name of the Object</h1>
        <input
          placeholder='Please Enter a Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          required
        />
      </div>

      {/* Description Section */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Object Description</h1>
        <textarea
          rows={4}
          placeholder='Enter a Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          required
        />
      </div>

      {/* Property Type Section */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='mb-4 text-lg font-bold'>Object Type</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {propertyTypes.map((type, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={`property-type-${index}`}
                type='radio'
                value={type} 
                name='property-type'
                checked={propertyType === type}
                onChange={(e) => setPropertyType(e.target.value)}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 '
                required
              />
              <label
                htmlFor={`property-type-${index}`}
                className='ml-2 text-sm font-medium text-gray-900'
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 mb-4 bg-white">
        <h1 className="mb-2 text-lg font-bold">Total Number of Bedroom</h1>
        <div className="relative">
          <input
            type="number"
            value={bedroomCount}
            onChange={(e) => setBedroomCount(e.target.value)}
            className="w-full p-2 pl-3 pr-12 border border-gray-300 rounded-md"
            placeholder="Enter number of bedrooms"
            required
          />
        </div>
      </div>

      <div className="p-5 mb-4 bg-white">
        <h1 className="mb-2 text-lg font-bold">Total Number of Bathroom</h1>
        <div className="relative">
          <input
            type="number"
            value={bathroomCount}
            onChange={(e) => setBathroomCount(e.target.value)}
            className="w-full p-2 pl-3 pr-12 border border-gray-300 rounded-md"
            placeholder="Enter number of bathrooms"
            required
          />
        </div>
      </div>


      <div className="p-5 mb-4 bg-white">
        <h1 className="mb-2 text-lg font-bold">maximum number of Person</h1>
        <div className="relative">
          <input
            type="number"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            className="w-full p-2 pl-3 pr-12 border border-gray-300 rounded-md"
            placeholder="Enter number of bathrooms"
            required
          />
        </div>
      </div>

      {/* Price */}
        <div className="p-5 mb-4 bg-white ">
            <h1 className="mb-2 text-lg font-bold">Price</h1>
            <div className="relative">
                <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 pl-3 pr-12 border border-gray-300 rounded-md"
                placeholder="Enter price"
                required
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                €
                </span>
            </div>
        </div>

        {/* Discount */}
        <div className="p-5 mb-4 bg-white">
            <h1 className="mb-2 text-lg font-bold">Discount</h1>
            <div className="relative">
                <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full p-2 pl-3 pr-12 border border-gray-300 rounded-md"
                placeholder="Enter discount amount"
                required
                />
            </div>
        </div>



      {/* Location Section */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Location</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div>
            <label className='font-medium'>Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Enter Address'
              className='w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='font-medium'>Latitude</label>
            <input
              type='number'
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder='Enter Latitude'
              className='w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='font-medium'>Longitude</label>
            <input
              type='number'
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder='Enter Longitude'
              className='w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              required
            />
          </div>
        </div>
      </div>

      {/* Accommodation Address */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='mb-2 text-lg font-bold'>Accommodation Address:</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div>
            <label className='font-medium'>Street and Number</label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder='Enter Street and Number'
              className='w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='font-medium'>City (Municipality)</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='Enter City'
              className='w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='font-medium'>Zip Code</label>
            <input
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder='Enter Zip Code'
              className='w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='font-medium'>Country</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder='Enter Country'
              className='w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              required
            />
          </div>
        </div>
      </div>

      {/* Location Description */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Location Description</h1>
        <textarea
          rows={4}
          value={locationDescription}
          onChange={(e) => setLocationDescription(e.target.value)}
          placeholder='Describe the location'
          className='w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          required
        />
      </div>

      {/* Places Nearby */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='mb-2 text-lg font-bold'>Places Nearby</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {[
            'Restaurant',
            'Supermarket',
            'BusStation',
            'TrainStation',
            'Airport',
            'SkiSlope',
            'AquaPark',
            'TouristTrail',
            'CycleRoute',
            'ATM',
            'GasStation',
            'ChargingStation',
            'CableCar',
            'SwimmingPool',
            'WaterArea',
            'TheSea',
            'Beach',
            'Castle',
            'Zoo',
            'Museum',
            'BusinessCenter',
          ].map((place, index) => (
            <div key={index} className='flex items-center justify-between'>
              <p>{place.replace(/([A-Z])/g, ' $1').trim()}</p> {/* This will display the place names with spaces */}
              <div className='relative'>
                <input
                  type='number'
                  step='0.1'  // Allows decimal input
                  min='0'
                  value={placesNearby[place] || ''}
                  onChange={(e) => handlePlaceChange(place, parseFloat(e.target.value))}
                  placeholder='0'
                  className='w-24 p-2 pr-8 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
                />
                <span className='absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2'>KM</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Contact Details */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Contact Details</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          
          {/* Host */}
          <div className='flex flex-col'>
            <label htmlFor='host' className='font-medium'>The Host</label>
            <input 
              id='host' 
              placeholder='Enter Host Name' 
              className='p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              value={host}
              onChange={(e) => setHost(e.target.value)}
              required
            />
          </div>
          
          {/* Phone */}
          <div className='flex flex-col'>
            <label htmlFor='phone' className='font-medium'>Phone</label>
            <input 
              id='phone' 
              placeholder='Enter Phone Number' 
              className='p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          {/* Email */}
          <div className='flex flex-col'>
            <label htmlFor='email' className='font-medium'>Email</label>
            <input 
              id='email' 
              placeholder='Enter Email' 
              className='p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Website */}
          <div className='flex flex-col'>
            <label htmlFor='web' className='font-medium'>Website</label>
            <input 
              id='web' 
              placeholder='Enter Website' 
              className='p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          
          {/* WhatsApp */}
          <div className='flex flex-col'>
            <label htmlFor='whatsapp' className='font-medium'>WhatsApp</label>
            <input 
              id='whatsapp' 
              placeholder='Enter WhatsApp Number' 
              className='p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Additional Contact Information */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Additional Contact Information</h1>
        <textarea
          rows={3}
          value={additionalContactInfo}
          onChange={(e) => setAdditionalContactInfo(e.target.value)}
          placeholder='Enter additional details'
          className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          required
        />
      </div>

      {/* Arrival and Departure */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Arrival and Departure</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='flex flex-col'>
            <label htmlFor='arrival-from' className='font-medium'>Arrival From</label>
            <input type='time' id='arrival-from' className='p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500' 
              value={arrivalFrom} // Bind value to state
              onChange={(e) => setArrivalFrom(e.target.value)} // Update state on change
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='arrival-to' className='font-medium'>Arrival To</label>
            <input type='time' id='arrival-to' className='p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500' 
              value={arrivalTo} // Bind value to state
              onChange={(e) => setArrivalTo(e.target.value)}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='departure-from' className='font-medium'>Departure From</label>
            <input type='time' id='departure-from' className='p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500' 
              value={departureFrom} // Bind value to state
              onChange={(e) => setDepartureFrom(e.target.value)}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='departure-to' className='font-medium'>Departure To</label>
            <input type='time' id='departure-to' className='p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500' 
              value={departureTo} // Bind value to state
              onChange={(e) => setDepartureTo(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Check-in/Check-out Process */}
      <div className='p-5 mb-4 bg-white'>
      <h1 className='text-lg font-bold'>Check-in/Check-out Process</h1>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {/* Map through the processes and create radio buttons */}
        {processes.map((process, index) => (
          <div key={index} className='flex items-center'>
            <input
              id={`process-${index}`}
              type='radio'
              name='checkin-process'
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
              value={process}
              checked={selectedProcess === process}
              onChange={(e) => setSelectedProcess(e.target.value)}
            />
            <label
              htmlFor={`process-${index}`}
              className='ml-2 text-sm font-medium text-gray-900'
            >
              {process}
            </label>
          </div>
        ))}
      </div>
    </div>


      {/* Wi-Fi Section */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Wi-Fi</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {/* Step 3: Map through the Wi-Fi options and create radio buttons */}
          {wifiOptions.map((option, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={`wifi-${index}`}
                type='radio'
                name='wifi'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
                value={option} // Radio button value
                checked={selectedWifi === option} // Bind the checked state
                onChange={(e) => setSelectedWifi(e.target.value)} // Update state on change
              />
              <label
                htmlFor={`wifi-${index}`}
                className='ml-2 text-sm font-medium text-gray-900'
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
          
      {/* Equipment and Services */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='mb-4 text-lg font-bold'>Equipment and Services</h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {servicesList.map(({ id, label }) => (
            <div key={id} className='flex items-center space-x-2'>
              <input
                id={id}
                type='checkbox'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                checked={!!selectedServices[id]} // Convert to boolean
                onChange={handleServiceCheckboxChange}
              />
              <label
                htmlFor={id}
                className='text-sm font-medium text-gray-900'
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>




      {/* Children */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Children</h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {childrenOptions.map(({ id, label }, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={id}
                type='checkbox'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                checked={!!selectedChildrenOptions[id]} // Bind checkbox state
                onChange={handleChildrenCheckboxChange} // Update state on change
              />
              <label htmlFor={id} className='ml-2 text-sm font-medium text-gray-900'>
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Diet */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Diet</h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {DietOptions.map(({ id, label }, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={id}
                type='checkbox'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                checked={!!selectedDietOptions[id]} // Bind checkbox state
                onChange={handleDietCheckboxChange} // Update state on change
              />
              <label htmlFor={id} className='ml-2 text-sm font-medium text-gray-900'>
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>


      {/* Type of Stay Section */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Type of Stay</h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {StayOptions.map(({ id, label }, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={id}
                type='checkbox'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                checked={!!selectedStayOptions[id]} // Bind checkbox state
                onChange={handleStayCheckboxChange} // Update state on change
              />
              <label htmlFor={id} className='ml-2 text-sm font-medium text-gray-900'>
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Response speed */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='text-lg font-bold'>Response speed</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {[
            "I don't want state",
            'Within an hour',
            'Within 24 hours',
            'The next day',
            'Within an hour on weekdays',
            'On working days up to 24 hours',
            'We always try to respond as soon as possible'
          ].map((option, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={`response-speed-${index}`}
                type='radio'
                name='response-speed'
                value={option}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
                checked={responseSpeed === option}
                onChange={handleResponseSpeedChange}
              />
              <label
                htmlFor={`response-speed-${index}`}
                className='ml-2 text-sm font-medium text-gray-900'
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Pets Section */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='mb-4 text-lg font-bold'>Pets</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {[
            "They are not allowed",
            'Pets are allowed',
            'Allowed for a fee',
            'By agreement with accommodation provider',
          ].map((option, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={`pets-${index}`}
                type='radio'
                name='pets'
                value={option}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
                checked={pets === option}
                onChange={handlePetsChange}
              />
              <label
                htmlFor={`pets-${index}`}
                className='ml-2 text-sm font-medium text-gray-900'
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Loud Music Section */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='mb-4 text-lg font-bold'>Loud Music</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {[
            "It is not allowed",
            'It is allowed',
          ].map((option, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={`loud-music-${index}`}
                type='radio'
                name='loud-music'
                value={option}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
                checked={loudMusic === option}
                onChange={handleLoudMusicChange}
              />
              <label
                htmlFor={`loud-music-${index}`}
                className='ml-2 text-sm font-medium text-gray-900'
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Smoking Section */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='mb-4 text-lg font-bold'>Smoking</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {[
            "It is not allowed",
            'It is allowed',
          ].map((option, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={`smoking-${index}`}
                type='radio'
                name='smoking'
                value={option}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
                checked={smoking === option}
                onChange={handleSmokingChange}
              />
              <label
                htmlFor={`smoking-${index}`}
                className='ml-2 text-sm font-medium text-gray-900'
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Parking Section */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='mb-4 text-lg font-bold'>Parking</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {[
            "Free of charge",
            'For a fee',
            'We do not provide',
            'Free and for a fee'
          ].map((option, index) => (
            <div key={index} className='flex items-center'>
              <input
                id={`parking-${index}`}
                type='radio'
                name='parking'
                value={option}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
                checked={parking === option}
                onChange={handleParkingChange}
              />
              <label
                htmlFor={`parking-${index}`}
                className='ml-2 text-sm font-medium text-gray-900'
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>


      {/* Upload Image */}
      <div className='p-5 mb-4 bg-white'>
        <h1 className='mb-4 text-lg font-bold'>Upload an Image</h1>
        {/* Implement file upload functionality here */}
        <input
          type="file"
          name="photo"
          id="customFile"
          multiple
          onChange={handleFileInputChange}
          accept=".jpg, .png"
          className='w-full px-3 py-2 border border-gray-300 rounded'
        />
      </div>
      <div className="image-preview">
        {previewURLs.map((url, index) => (
          <img key={index} src={url} alt={`Preview ${index}`} className="w-32 h-32 object-cover" />
        ))}
      </div>

      <div className='flex justify-center p-5 bg-white'>
        <button 
            className='px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
           
            onSubmit={handleSubmit}
        >
            Submit
        </button>
      </div>
      </form>

    </div>
  );
};

export default AddAccommodation;
