"use client"
import { Base_URL } from "../../config.js";
import React, { useState, useEffect } from "react";
import { BsArrowRight, BsStarFill } from "react-icons/bs";
import { GiTick } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";


const ReservationPage = ({ checkInDate, checkOutDate, guests, totalPrice, nights, onClose, data }) => {

  useEffect(() => {
    setReservation((prevReservation) => ({
      ...prevReservation,
      diet: Array.isArray(data?.diet) ? data.diet.join(', ') : data?.diet || "",
      accommodationId: data?._id || "",
      userId: data?.userId || "",
      // accommodationProviderId: data?.
    }));
  }, [data]);
  // console.log("Accommodation ID:", _id);
  const u = localStorage.getItem("user");
  const s = JSON.parse(u);
  const userIda  = s._id;
console.log("start",userIda)
const [error, setError] = useState(null);


  const [reservation, setReservation] = useState({
    checkInDate: checkInDate || "",
    checkOutDate: checkOutDate || "",
    numberOfPersons: guests || 1,
    totalPrice: totalPrice || 0,
    name:"",
    surname: "",
    email: "",
    phone: "",
    agreeToTerms: false,
    withChildren: false,
    withPet: false,
    useVoucher: false,
    issueInvoice: false,
    message: "",
    diet: data?.diet,
    accommodationProvider:data?.userId._id|| "user",
    accommodationId: data?._id || "",
    userId: userIda || ""
  });
  const AccommodationName = data?.name || "Accommodation Name";
  const locationDetails = data?.locationDetails || {};

  const accommodationId = data?._id || "Accommodation Name";
 
  // const = data?._id || "Accommodation Name";
  // console.log("data",data.userId._id)
 const  accommodationProvider = data.userId._id
  console.log("accommodationId",accommodationId,"userid",userIda,"accommodationProvider",accommodationProvider)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setReservation({ ...reservation, [name]: checked });
  };

const send_email = async () => {
  const congrats_message = `
  <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333; background-color: #f0f0f0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
      <h2 style="text-align: center; color: #333;">Reservation Details</h2>

      <p>Hello ${reservation.name} ${reservation.surname},</p>

      <p>We are sending you the details of your reservation.</p>

      <h3 style="color: #333;">Reservation Request</h3>
      <p>From ${checkInDate} to ${checkOutDate} (${nights} nights)</p>
      <p>${guests} persons</p>
      <p>No meals included</p>

      <h3 style="color: #333;">Customer Contact</h3>
      <p>${reservation.name} ${reservation.surname}</p>
      <p>${reservation.email}</p>
      <p>${reservation.phone}</p>

      <h3 style="color: #333;">Traveling with Children</h3>
      <p>${reservation.withChildren ? "Yes" : "No"}</p>

      <h3 style="color: #333;">Message to the Host</h3>
      <p>${reservation.message || "N/A"}</p>

      <h3 style="color: #333;">Additional Information</h3>
      <ul style="list-style-type: none; padding: 0;">
        <li>Arriving with Children: ${reservation.withChildren ? "Yes" : "No"}</li>
        <li>Traveling with Pet: ${reservation.withPet ? "Yes" : "No"}</li>
        <li>Using Voucher: ${reservation.useVoucher ? "Yes" : "No"}</li>
        <li>Requesting Invoice: ${reservation.issueInvoice ? "Yes" : "No"}</li>
      </ul>

      <h3 style="color: #333;">Information</h3>
      <ul style="list-style-type: none; padding: 0;">
        <li>Check-in from 0:00</li>
        <li>Check-out by 12:00</li>
        <li>Advance payment required</li>
        <li>Total price: €${totalPrice}</li>
      </ul>

      <p>We look forward to your visit!</p>

      <p style="text-align: center;">Best regards,</p>
      <p style="text-align: center;">Your team</p>
    </div>
  </div>
  `;



  try {
    const response = await fetch(`${Base_URL}/api/send`, {
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
      alert("Email sent successfully!");
    } else {
      const data = await response.json();
      setError(data.error || "Failed to send email");
    }
  } catch (err) {
    setError("An error occurred while sending the email.");
  }
};

const handle_submit = async (e) => {
  e.preventDefault();

  // if (!reservation.agree_to_terms) {
  //   return alert("Please agree to the terms and conditions.");
  // }

  // Basic email validation
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email_regex.test(reservation.email)) {
    return alert("Please enter a valid email address.");
  }

  try {
    const response = await fetch(`${Base_URL}/reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });

    if (response.ok) {
      alert("Reservation sent successfully!");
      send_email(); // Send the email after the reservation is saved

      // Reset form after successful reservation
      setReservation({
        check_in_date: "",
        check_out_date: "",
        number_of_persons: 1,
        total_price: 0,
        name: "",
        surname: "",
        email: "",
        phone: "",
        agree_to_terms: false,
        with_children: false,
        with_pet: false,
        use_voucher: false,
        issue_invoice: false,
        message: "",
        diet: "",
        accommodation_provider: "",
        accommodation_id: "",
        user_id: "",
      });
    } else {
      alert("Failed to send reservation.");
    }
  } catch (error) {
    console.error("Error submitting reservation:", error);
    alert("There was an error sending your reservation. Please try again later.");
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full h-full max-w-full p-4 overflow-y-auto bg-white rounded-lg lg:h-auto lg:max-h-screen sm:p-8">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none">
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-4 lg:flex-row sm:px-6 lg:px-40">
          <div className="flex-1 space-y-5">
            <h1 className="text-2xl font-bold lg:text-4xl">Non-binding reservation</h1>

            <div className="p-5 bg-white rounded shadow sm:p-10">
              <h1 className="text-base sm:text-lg">
                The reservation request is non-binding and must be{" "}
                <span className="font-bold">confirmed directly by the accommodation provider</span>.
                Prices, occupancy, and conditions are determined by the accommodation provider.
              </h1>
            </div>

            <div className="p-5 bg-white rounded shadow sm:p-10">
              <div className="text-lg font-bold">Reservation request</div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <div className="space-y-2">
                  <h1>Date from - to</h1>
                  <h1 className="font-bold">{checkInDate} - {checkOutDate}</h1>
                </div>
                <button className="text-red-500">Change</button>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <div className="space-y-2">
                  <h1>Number of persons</h1>
                  <h1 className="font-bold">{guests} persons</h1>
                </div>
                <button className="text-red-500">Change</button>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <div className="space-y-2">
                  <h1>Accommodation</h1>
                  <h1 className="font-bold">{AccommodationName}</h1>
                </div>
                <button className="text-red-500">Change</button>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <div className="space-y-2">
                  <h1>Diet</h1>
                  <p>{data?.diet || "N/A"}</p>
                </div>
                <button className="text-red-500">Change</button>
              </div>
            </div>

            <div className="p-5 space-y-3 bg-white rounded shadow sm:p-10">
              <h1 className="text-lg font-bold">Contact details</h1>
              <input
                name="name"
                value={reservation.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                name="surname"
                value={reservation.surname}
                onChange={handleInputChange}
                placeholder="Surname"
                required
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                name="email"
                value={reservation.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                name="phone"
                value={reservation.phone}
                onChange={handleInputChange}
                type="tel"
                placeholder="Phone"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="p-5 bg-white rounded shadow sm:p-10">
              <h1 className="text-lg font-bold">Additional information</h1>
              <p>Notify the accommodation provider of additional information about your stay.</p>
              <hr className="my-3" />
              <div className="space-y-5">
                <div className="flex items-center">
                  <input
                    id="children-checkbox"
                    name="withChildren"
                    checked={reservation.withChildren}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <label htmlFor="children-checkbox" className="ml-2 text-sm">
                    We arrive with children
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="pet-checkbox"
                    name="withPet"
                    checked={reservation.withPet}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <label htmlFor="pet-checkbox" className="ml-2 text-sm">
                    We would like to come with a pet
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="voucher-checkbox"
                    name="useVoucher"
                    checked={reservation.useVoucher}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <label htmlFor="voucher-checkbox" className="ml-2 text-sm">
                    I am interested in using a recreation voucher
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="invoice-checkbox"
                    name="issueInvoice"
                    checked={reservation.issueInvoice}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <label htmlFor="invoice-checkbox" className="ml-2 text-sm">
                    Please issue an invoice
                  </label>
                </div>
              </div>
            </div>

            <textarea
                  name="message"
                  value={reservation.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Message"
                  className="w-full p-2 border rounded"
                />


	{/* What Happens After Submission */}
          <div className="p-5 bg-white rounded shadow sm:p-10">
            <h1 className="text-2xl font-bold">What happens after submission?</h1>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-300 rounded-full">1</div>
              <h1>The non-binding reservation will be sent directly to the accommodation provider.</h1>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-300 rounded-full">2</div>
              <h1>The host will contact you using the provided information.</h1>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-300 rounded-full">3</div>
              <h1>You will agree on final details with the accommodation provider.</h1>
            </div>
          </div>



            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  id="terms-checkbox"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={reservation.agreeToTerms}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                  required
                />
                <label htmlFor="terms-checkbox" className="ml-2 text-sm">
                  I agree to the <span className="text-blue-600">terms and conditions</span>
                </label>
              </div>
              <button
                onClick={handle_submit}
                className="flex items-center justify-center w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Send reservation <BsArrowRight className="ml-2" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-5 rounded shadow lg:mx-20">
          <div className="flex items-start space-x-5">
            <img src="/bed.png" alt="Accommodation" className="object-cover w-16 h-16 rounded" />
            <div className="space-y-2">
              <h1 className="text-xl font-bold">{AccommodationName}</h1>
              <h1 className="flex items-center">
                  {data?.reviews?.map((_, index) => (
                    <BsStarFill key={index} className="text-yellow-500" />
                  ))}
                  {Array.from({ length: 5 - (data?.reviews?.length || 0) }, (_, index) => (
                    <BsStarFill key={index} className="text-gray-300" />
                  ))}
                </h1>
                <p className="text-gray-500">{data?.reviews?.length || 0} reviews</p>
              <p>{data?.propertyType}, {locationDetails?.city}, {locationDetails?.country}  </p>
              <h1 className="flex items-center"><GiTick /> Verified accommodation</h1>
            </div>
          </div>

          <div className="p-5 space-y-5 bg-white rounded shadow sm:p-10">
            <h1 className="text-lg font-bold">Price details</h1>
            <hr />
            <div className="flex justify-between">
              <h1>{AccommodationName} ( {guests} persons / {nights})</h1>
              <p>€{totalPrice}</p>
            </div>
            <hr />
            <p>The displayed price is indicative and may vary depending on the date and conditions of the reservation. The accommodation provider will inform you of the exact price after sending the non-binding reservation.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;