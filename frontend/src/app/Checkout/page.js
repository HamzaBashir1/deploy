"use client";

import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useContext } from "react";
import Input from "../Shared/Input";
import Textarea from "../Shared/Textarea";
import ButtonPrimary from "../Shared/ButtonPrimary";
import StartRating from "../listing-stay-detail/component/StartRating";
import NcModal from "../Shared/NcModal/NcModal";
import ModalSelectDate from "./component/ModalSelectionDate";
import converSelectedDateToString from "../utlis/utils/converSelectedDateToString";
import Image from "next/image";
import Label from "../Shared/Label";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Page = ({ className = "" }) => {
    const user = useContext(AuthContext);
    console.log("userId",user);
    const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("1234567890");
  const [message, setMessage] = useState("");

  // Handlers to update state on input change
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
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
    name: name,
    email: email,
    phone: phone,
    message: message,
    accommodationProvider: "",
    accommodationId: "",
    // userId: "",
  });

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

  // Update reservation state when userData is available
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

  // Log updated state after it changes
  useEffect(() => {
    console.log("Updated Reservation state:", reservation);
  }, [reservation]);

  
  // Log the state when it is initialized or updated
  useEffect(() => {
    console.log("Reservation state:", reservation);
  }, [reservation]);

const send_email = async () => {
  const congrats_message = `
  <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333; background-color: #f0f0f0; padding: 20px; box-sizing: border-box;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); box-sizing: border-box;">
      <h2 style="text-align: center; color: #333;">
        <img src="/P.png" style="width: 100px; height: auto; margin-bottom: 10px;" />
        Reservation Details
      </h2>
  
      <p>Hello ${reservation.name},</p>
  
      <p>We are sending you the details of your reservation.</p>

      <!-- Accommodation Image -->
      <div style="text-align: center; margin: 20px 0;">
        <img src="${userData?.data?.images[0]}" alt="Accommodation" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);" />
      </div>
  
      <h3 style="color: #333;">Reservation Request</h3>
      <p>From ${userData?.checkInDate} to ${userData?.checkOutDate} (${userData?.nights} nights)</p>
      <p>${numberOfPersons} persons</p>
  
      <h3 style="color: #333;">Customer Contact</h3>
      <p>${reservation.name}</p>
      <p>${reservation.email}</p>
      <p>${reservation.phone}</p>
  
      <h3 style="color: #333;">Message to the Host</h3>
      <p>${reservation.message || "N/A"}</p>
  
      <h3 style="color: #333;">Information</h3>
      <ul style="list-style-type: none; padding: 0;">
        <li>Check-in from 0:00</li>
        <li>Check-out by 12:00</li>
        <li>Advance payment required</li>
        <li>Total price: €${userData?.total}</li>
      </ul>
  
      <p>We look forward to your visit!</p>
  
      <p style="text-align: center;">Best regards,</p>
      <p style="text-align: center;">Putko</p>
    </div>
  </div>
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


const handle_submit = async () => {
    console.log("Submitting reservation:", reservation);

  // Basic email validation
//   const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!email_regex.test(reservation.email)) {
//     return toast("Please enter a valid email address.");
//   }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });

    if (response.ok) {
      // alert("Reservation sent successfully!");
      toast.success("Reservation sent successfully!");
      send_email(); // Send the email after the reservation is saved

      // Reset form after successful reservation
      setReservation({
        checkInDate: userData.checkInDate || "",
        checkOutDate: userData.checkOutDate || "",
        numberOfPersons: userData.guests || 1,
        totalPrice: totalPrice || 0,
        name: "",
        email: "",
        phone: "",
        message: "",
        accommodationProvider: userData.data.userId._id|| "user",
        accommodationId: userData.listingId || "",
        // userId: userId || ""
      });
    } else {
      // alert("Failed to send reservation.");
      toast.error("Failed to send reservation.");
    }
  } catch (error) {
    console.error("Error submitting reservation:", error);
    toast.error("There was an error sending your reservation. Please try again later.");
    // alert("There was an error sending your reservation. Please try again later.");
  }
};

    const handleButtonClick = async () => {
    
      // Then call the handle_submit function
      await handle_submit();

    //   router.push("/Thanks");
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
    const propertyname = userData?.name;

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
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
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {propertyType} {rentalform} in {city}, {country}
              </span>
              <span className="text-base font-medium mt-1 block">
                {propertyname}
              </span>
            </div>
            <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                {beds} beds · {bathroom} baths
            </span>
            <div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
            <span>${priceMonThus} x 3 days</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
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
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            {/* <ModalSelectDate */}
              {/* renderChildren={({ openModal }) => ( */}
                <button
                //   onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {converSelectedDateToString([startDate, endDate])}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                </button>
              {/* )} */}
            {/* /> */}
            <button
              type="button"
              className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
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
              <PencilSquareIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </div>
        <div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
          <div className="mt-6">
            <Tab.Group>
              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Name</Label>
                    <Input value={name} onChange={handleNameChange} />
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input value={email} onChange={handleEmailChange} />
                  </div>
                  <div className="flex space-x-5">
                    <div className="flex-1 space-y-1">
                      <Label>Phone Number</Label>
                      <Input  value={phone} onChange={handlePhoneChange}/>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <Label>Message for author</Label>
                    <Textarea value={message} onChange={handleMessageChange}/>
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
    <div
      className={`nc-CheckOutPagePageMain relative ${className}`}
      data-nc-id="CheckOutPagePageMain"
    >
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-[60%] xl:w-[55%]">{renderMain()}</div>
        <div className="flex-shrink-0 lg:w-[40%] xl:w-[45%] lg:pl-8">
          {renderSidebar()}
        </div>
      </main>
    </div>
  );
};

export default Page;
