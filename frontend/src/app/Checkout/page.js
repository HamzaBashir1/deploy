"use client";

import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useContext } from "react";
import Input from "../Shared/Input";
import Textarea from "../Shared/Textarea";
import { useRouter } from 'next/navigation';
import ButtonPrimary from "../Shared/ButtonPrimary";
import StartRating from "../listing-stay-detail/component/StartRating";
import NcModal from "../Shared/NcModal/NcModal";
import ModalSelectDate from "./component/ModalSelectionDate";
import converSelectedDateToString from "../utlis/utils/converSelectedDateToString";
import Image from "next/image";
import Label from "../Shared/Label";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header"
import Footer from "../components/Footer/Footer";
import FooterNav from "../Shared/FooterNav";
import HeroSearchForm2Mobile from "../components/HeroSearchForm2Mobile";
import ModalSelectGuests from "./component/ModalSelectGuests";

const Page = ({ className = "" }) => {
  const router = useRouter();
    const user = useContext(AuthContext);
    console.log("userId",user);
    const [userData, setUserData] = useState(null); // Define userData state
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });

  const [reservation, setReservation] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfPersons: 1,
    totalPrice: 0,
    name: "", 
    email: "",
    phone: "",
    message: "",
    accommodationProvider: "",
    accommodationId: "",
    // userId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value, // Dynamically update state based on input name
    }));
  };

  // Fetching the user data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      setUserData(data);
      setStartDate(new Date(data.checkInDate));
      setEndDate(new Date(data.checkOutDate));
      setGuests({
        guestAdults: data.guests?.adults || 0,
        guestChildren: data.guests?.children || 0,
        guestInfants: data.guests?.infants || 0,
      });
    }
  }, []);
console.log("userdata",userData)

const hostId = userData?.data?.userId;
const hostName = hostId?.name;
const hostEmail = hostId?.email;
const propertyName = userData?.data?.name;
console.log("host Email", hostEmail);
console.log("host Name", hostName);

  // Update reservation state when userData is availabconle
  useEffect(() => {
    if (userData) {
      setReservation((prev) => ({
        ...prev,
        checkInDate: userData.checkInDate || "",
        checkOutDate: userData.checkOutDate || "",
        numberOfPersons:
          (userData.guests?.adults || 0) +
          (userData.guests?.children || 0) +
          (userData.guests?.infants || 0),
        totalPrice: userData.total || 0,
        accommodationProvider: userData.data.userId._id || "user",
        accommodationId: userData.listingId || "",
      }));
    }
  }, [userData]);

  // const hostid = userData.data.userId
  // console.log("host email", hostid);
  // Log updated state after it changes
  useEffect(() => {
    console.log("Updated Reservation state:", reservation);
  }, [reservation]);

  
  // Log the state when it is initialized or updated
  useEffect(() => {
    console.log("Reservation state:", reservation);
  }, [reservation]);

const send_email = async () => {

  const checkInDateFormatted = new Date(userData.checkInDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const checkOutDateFormatted = new Date(userData.checkOutDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Image URL and Google Maps link
  const propertyImage = userData.data.images[0];
  const location = userData.data.location;
  const latitude = location.latitude;
  const longitude = location.longitude;
  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

  const congrats_message = `
  <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f7f7f7; color: #333;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">

      <!-- Content Section -->
      <div style="padding: 24px; background-color: #fff;">

        <!-- Personal Greeting -->
        <p style="font-size: 18px; color: #333; margin: 0;">Hi ${reservation.name || 'Guest'},</p>
        <p style="font-size: 16px; color: #555; margin-top: 8px;">We’re excited to confirm your stay! Here are the details of your booking:</p>

        <!-- Accommodation Image -->
        <div style="text-align: center; margin: 24px 0;">
          <img src="${userData?.data?.images[0] || ''}" alt="Accommodation Image" style="width: 100%; max-width: 550px; border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
        </div>

        <!-- Contact Information -->
        <div style="margin-bottom: 24px; padding: 16px 0; border-top: 1px solid #f0f0f0;">
          <h2 style="font-size: 18px; color: #333; margin-bottom: 12px; font-weight: 600;">Contact Information</h2>
          <p style="margin: 10px 0; font-size: 16px; color: #555;"><strong>Name:</strong> ${reservation.name || 'N/A'}</p>
          <p style="margin: 10px 0; font-size: 16px; color: #555;"><strong>Email:</strong> ${reservation.email || 'N/A'}</p>
          <p style="margin: 10px 0; font-size: 16px; color: #555;"><strong>Phone:</strong> ${reservation.phone || 'N/A'}</p>
        </div>

        <!-- Host Information -->
        <div style="margin-bottom: 24px; padding: 16px 0; border-top: 1px solid #f0f0f0;">
          <h2 style="font-size: 18px; color: #333; margin-bottom: 12px; font-weight: 600;">Host Details</h2>
          <p style="margin: 10px 0; font-size: 16px; color: #555;"><strong>Name:</strong> ${hostName || 'N/A'}</p>
          <p style="margin: 10px 0; font-size: 16px; color: #555;"><strong>Email:</strong> ${hostEmail || 'N/A'}</p>
        </div>

        <!-- Stay Details & Google Maps Link -->
         <div style="margin-bottom: 24px; padding: 16px 0; border-top: 1px solid #f0f0f0;">
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Stay Details:</strong><br />
              📅 Check-in: ${checkInDateFormatted || 'N/A'}<br />
              📅 Check-out: ${checkOutDateFormatted || 'N/A'}<br />
              🛏 Number of Guests: ${userData?.guests?.adults || 0} Adults, ${userData?.guests?.children || 0} Children, ${userData?.guests?.infants || 0} Infants<br />
              🏠 <strong>Total Nights:</strong> ${userData?.nights || 'N/A'}<br />
              🛏 <strong>Beds:</strong> ${userData?.data?.beds || '0'}<br />
              🛏 <strong>Bedrooms:</strong> ${userData?.data?.bedroom || '0'}<br />
              🚿 <strong>Bathrooms:</strong> ${userData?.data?.bathroom || '0'}<br />
              🏡 <strong>Property Type:</strong> ${userData?.data?.propertyType || 'N/A'}<br />
              📝 <strong>Rental Form:</strong> ${userData?.data?.rentalform || 'N/A'}
            </p>
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Property Location:</strong><br />
              <a href="${googleMapsLink || '#'}" style="color: #FF5A5F; text-decoration: none; font-weight: 600;">📍 View Location on Map</a>
            </p>
          </div>

        <p style="font-size: 16px;">If you have any questions or special requests, feel free to reach out. We're here to make your stay memorable.</p>

        <p style="margin-top: 30px; font-size: 16px;">
          Best regards,<br />
          <strong>The Putko Support Team</strong>
        </p>
      </div>
    </div>
  </body>
  `;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: reservation.email, // Ensure the correct email is passed
        message: congrats_message,
        contentType: 'text/html', // Include the custom message
      }),
    });

    if (response.ok) {
      // alert("Email sent successfully!");
      toast.success("Email sent successfully!");
    } else {
      const data = await response.json();
      toast.error(data.error || "Failed to send email");
      // setError(data.error || "Failed to send email");
    }
  } catch (err) {
    // setError("An error occurred while sending the email.");
    toast.error("An error occurred while sending the email.");
  }
  };


  const send_email_host = async () => {
    
  const checkInDateFormatted = new Date(userData.checkInDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const checkOutDateFormatted = new Date(userData.checkOutDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Image URL and Google Maps link
  const propertyImage = userData.data.images[0];
  const location = userData.data.location;
  const latitude = location.latitude;
  const longitude = location.longitude;
  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const congrats_message = `
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f7f7f7; color: #333;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
    
    <!-- Content Section -->
    <div style="padding: 24px; background-color: #fff;">
      
      <!-- Personal Greeting -->
      <p style="font-size: 18px; color: #333; margin: 0;">Dear ${userData?.data?.userId?.name},</p>
      <p style="font-size: 16px; color: #555; margin-top: 8px;">You have received a new booking request for your property: <strong>${propertyName || "Your Property"}</strong>.</p>
      <p style="font-size: 16px; color: #555;">Please confirm the booking at your earliest convenience. You can review and accept the request by clicking the link below:</p>

      <!-- Action Button -->
      <div style="text-align: center; margin: 20px auto; padding: 0 16px;">
        <a href="https://www.putkoapp.online/Profile" 
          style="background-color: #357965; color: #fff; padding: 16px 24px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 8px; display: inline-block; width: calc(100% - 32px); height: 48px; line-height: 48px; text-align: center;">
          Accept/Cancel the Booking Request
        </a>
      </div>

      <!-- Accommodation Image -->
      <div style="text-align: center; margin: 24px 0;">
        <img src="${userData?.data?.images[0] || ''}" alt="Accommodation Image" style="width: 100%; max-width: 550px; border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
      </div>


      <!-- Contact Information -->
      <div style="margin-bottom: 24px; padding: 16px 0; border-top: 1px solid #f0f0f0;">
        <h2 style="font-size: 18px; color: #333; margin-bottom: 12px; font-weight: 600;">Guest Information</h2>
        <p style="margin: 10px 0; font-size: 16px; color: #555;"><strong>Name:</strong> ${reservation.name || 'N/A'}</p>
        <p style="margin: 10px 0; font-size: 16px; color: #555;"><strong>Email:</strong> ${reservation.email || 'N/A'}</p>
        <p style="margin: 10px 0; font-size: 16px; color: #555;"><strong>Phone:</strong> ${reservation.phone || 'N/A'}</p>
      </div>

      <!-- Stay Details & Google Maps Link -->
      <div style="margin-bottom: 24px; padding: 16px 0; border-top: 1px solid #f0f0f0;">
        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Stay Details:</strong><br />
          📅 Check-in: ${checkInDateFormatted || 'N/A'}<br />
          📅 Check-out: ${checkOutDateFormatted || 'N/A'}<br />
          🛏 Number of Guests: ${userData?.guests?.adults || 0} Adults, ${userData?.guests?.children || 0} Children, ${userData?.guests?.infants || 0} Infants<br />
          🏠 <strong>Total Nights:</strong> ${userData?.nights || 'N/A'}<br />
          🛏 <strong>Beds:</strong> ${userData?.data?.beds || '0'}<br />
          🛏 <strong>Bedrooms:</strong> ${userData?.data?.bedroom || '0'}<br />
          🚿 <strong>Bathrooms:</strong> ${userData?.data?.bathroom || '0'}<br />
          🏡 <strong>Property Type:</strong> ${userData?.data?.propertyType || 'N/A'}<br />
          📝 <strong>Rental Form:</strong> ${userData?.data?.rentalform || 'N/A'}
        </p>
        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Property Location:</strong><br />
          <a href="${googleMapsLink || '#'}" style="color: #FF5A5F; text-decoration: none; font-weight: 600;">📍 View Location on Map</a>
        </p>
      </div>

      <p style="font-size: 16px;">If you have any questions or require further assistance, feel free to reach out to us.</p>

      <div style="margin-top: 30px; font-size: 16px;">
        Best regards,<br />
        <strong>The Putko Support Team</strong><br />
        <p style="text-align: left; margin: 5px 0;"><strong>info@putkoapp.online</strong></p>
      </div>
    </div>
  </div>
</body>

  `;
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:userData.data.userId.email , // Ensure the correct email is passed
          message: congrats_message,
          contentType: 'text/html', // Include the custom message
        }),
      });
  
      if (response.ok) {
        // alert("Email sent successfully!");
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to send email");
        // setError(data.error || "Failed to send email");
      }
    } catch (err) {
      // setError("An error occurred while sending the email.");
      toast.error("An error occurred while sending the email.");
    }
    };
  
  const handle_submit = async () => {
    console.log("Submitting reservation:", reservation);
  
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(reservation.email)) {
      toast.error("Please enter a valid email address.");
      return false; // Indicate failure
    }

    // Validate all required fields
    if (!reservation.name || !reservation.phone ) {
      toast.error("Please fill in all required fields.");
      return false; // Return false if any required fields are missing
    }

  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });
  
      if (response.ok) {
        toast.success("Reservation sent successfully!");
        send_email(); // Send the email after the reservation is saved
        send_email_host();
  
        // Reset form after successful reservation
        setReservation({
          checkInDate: userData.checkInDate || "",
          checkOutDate: userData.checkOutDate || "",
          numberOfPersons: userData.guests || 1,
          totalPrice: total || 0,
          name: "",
          email: "",
          phone: "",
          message: "",
          accommodationProvider: userData.data.userId._id|| "user",
          accommodationId: userData.listingId || "",
          // userId: userId || ""
        });
    
        return true; // Indicate success
      } else {
        toast.error("Failed to send reservation.");
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast.error("There was an error sending your reservation. Please try again later.");
      return false; // Indicate failure
    }
  };
  

  const handleButtonClick = async () => {
    // First, check if the email is valid
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(reservation.email)) {
      toast.error("Please enter a valid email address.");
      return; // Stop further execution if email is invalid
    }

    // Ensure all required fields are filled
    if (!reservation.name || !reservation.phone ) {
      toast.error("Please fill in all required fields.");
      return; // Stop further execution if any required field is missing
    }

    // Call handle_submit and proceed if successful
    const submitResult = await handle_submit();
    if (!submitResult) {
      console.error("handle_submit failed");
      return; // Stop further execution if submission fails
    }

    // If all validations and submission are successful, navigate to the next page
    router.push("/PayPage");
  };

    const image = userData?.data?.images[0];
    const propertyType = userData?.data?.propertyType;
    const city = userData?.data?.locationDetails?.city;
    const country = userData?.data?.locationDetails?.country;
    const rentalform = userData?.data?.rentalform;
    const beds = userData?.data?.beds;
    const bathroom = userData?.data?.bathroom;
    const priceMonThus = userData?.data?.priceMonThus;
    const total = userData?.total;
    // const propertyname = userData?.name;

    console.log("propertyname", propertyName);
  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                alt="Room Image"
                fill
                sizes="200px"
                src={image}
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 line-clamp-1">
                {propertyType} {rentalform} in {city}, {country}
              </span>
              <span className="text-base font-medium mt-1 block">
                {propertyName}
              </span>
            </div>
            <span className="block text-sm text-neutral-500">
                {beds} beds · {bathroom} baths
            </span>
            <div className="w-10 border-b border-neutral-200 "></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-600">
            <span>€{priceMonThus} x {userData?.nights} days</span>
            <span>€{total}</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Service charge</span>
            <span>€0</span>
          </div>
          <div className="border-b border-neutral-200"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>€{total}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your trip</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            />
          </div>
          <div className="mt-6 border border-neutral-200 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 overflow-hidden z-10">
            <ModalSelectDate
               renderChildren={({ openModal }) => ( 
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {converSelectedDateToString([startDate, endDate])}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-600" />
                </button>
               )} 
             /> 
            <ModalSelectGuests
              renderChildren={({ openModal }) => (
              <button
                type="button"
                onClick={openModal}
                className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-400">Guests</span>
                  <span className="mt-1.5 text-lg font-semibold">
                    <span className="line-clamp-1">
                      {`${
                        (guests.guestAdults || 0) + (guests.guestChildren || 0)
                      } Guests, ${guests.guestInfants || 0} Infants`}
                    </span>
                  </span>
                </div>
                <PencilSquareIcon className="w-6 h-6 text-neutral-600" />
              </button>
            )}
            />
          </div>
        </div>
        <div>
          <div className="w-14 border-b border-neutral-200-700 my-5"></div>
          <div className="mt-6">
            <Tab.Group>
              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label required>Name</Label>
                    <Input 
                      name="name"
                     value={reservation.name}
                     onChange={handleInputChange}
                     placeholder="Enter your name" 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label required>Email</Label>
                    <Input 
                    name="email"
                      value={reservation.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex space-x-5">
                    <div className="flex-1 space-y-1">
                      <Label required>Phone Number</Label>
                      <Input  
                      name="phone"
                        value={reservation.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <Label>Message for author</Label>
                    <Textarea 
                      name="message"
                      value={reservation.message}
                      onChange={handleInputChange}
                    />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <div className="pt-8">
          <ButtonPrimary className="bg-[#357965]" onClick={handleButtonClick}>
            Submit
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="sticky top-0 z-50 block bg-white md:hidden py-4 px-2"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <HeroSearchForm2Mobile />
      </div> 
      <div className="hidden md:block">
        <Header/>
      </div>
      <div
        className={`nc-CheckOutPagePageMain relative ${className}`}
        data-nc-id="CheckOutPagePageMain"
      >
        <main className="container mt-6 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%]">{renderMain()}</div>
          <div className="flex-shrink-0 lg:w-[40%] xl:w-[45%] lg:pl-8">
            {renderSidebar()}
          </div>
        </main>
      </div>
      <Footer />
      <div className="lg:hidden">
          <FooterNav/>
        </div>
    </div>
  );
};

export default Page;