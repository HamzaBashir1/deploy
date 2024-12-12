"use client"
import { Base_URL } from "../config";
import React, { useState, useEffect, useContext } from "react";
import { BsArrowLeft, BsArrowRight, BsStarFill } from "react-icons/bs";
import { GiTick } from "react-icons/gi";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import { PiNumberCircleOneFill, PiNumberCircleThreeFill, PiNumberCircleTwoFill } from "react-icons/pi";
import Footer from "../components/Footer/Footer";
import Navbar from "../Favorite/component/Navbar";
import { toast } from "react-toastify";
import HeroSearchForm2Mobile from "../components/HeroSearchForm2Mobile";
import Header from "../components/Header";
import FooterNav from "../Shared/FooterNav";


const Page = () => {
    const router = useRouter();  // Initialize router
    // const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        try {
          if (storedData) {
            setUserData(JSON.parse(storedData));
          }
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }, []);
      

    console.log("userData", userData);
    // Handle data extraction safely
    const data = userData?.data || {};

    console.log("Data:", data);
    // console.log("User ID:", user?._id);
    // const userId  = user?._id;

    useEffect(() => {
        if (userData && data) {
          setReservation((prev) => ({
            ...prev,
            checkInDate: userData.checkInDate || "",
            checkOutDate: userData.checkOutDate || "",
            numberOfPersons: userData.guests || 1,
            totalPrice: userData.total || 0,
            diet:Array.isArray(data?.diet) ? data?.diet.join(', ') : data?.diet || "",
            accommodationProvider: data?.userId?._id || "",
            accommodationId: data?._id || "",
            // userId: userId || "",
          }));
        }
      }, [userData, data]);
      

    
    // console.log("start",userId);
    const [error, setError] = useState(null);
    const checkInDate = userData && userData.checkInDate; // Will be undefined if userData is null

 const checkOutDate = userData?.checkOutDate;
 const numberOfPersons = userData?.guests;
 const totalPrice = userData?.total
 console.log("checkin",checkInDate,"checkout", checkOutDate,"numberOfPersons",numberOfPersons,"numberOfPersons", totalPrice);

 const accommodationId = data?._id || "Accommodation Name";
 
 const  accommodationProvider = data?.userId?._id
 
  console.log("accommodationId",accommodationId,"accommodationProvider",accommodationProvider);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setReservation(prev => ({ ...prev, [name]: checked }));
  };

  const [reservation, setReservation] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfPersons: 1,
    totalPrice: 0,
    name: "",
    surname: "",
    email: "",
    phone: "",
    agreeToTerms: false,
    withChildren: false,
    withPet: false,
    useVoucher: false,
    issueInvoice: false,
    message: "",
    diet: "",
    accommodationProvider: "",
    accommodationId: "",
    userId: ""
  });

  // Update state when userData or data becomes available
  useEffect(() => {
    if (userData && data) {
      setReservation({
        checkInDate: userData.checkInDate || "",
        checkOutDate: userData.checkOutDate || "",
        numberOfPersons: userData.guests || 1,
        totalPrice: userData.total || 0,
        name: "", 
        surname: "",
        email: "",
        phone: "",
        agreeToTerms: false,
        withChildren: false,
        withPet: false,
        useVoucher: false,
        issueInvoice: false,
        message: "",
        diet: Array.isArray(data?.diet) ? data?.diet.join(', ') : data?.diet || "",
        accommodationProvider: accommodationProvider || "user",
        accommodationId: accommodationId || "",
        // userId: userId || ""
      });
    }
  }, [userData, data]);

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
  
      <p>Hello ${reservation.name} ${reservation.surname},</p>
  
      <p>We are sending you the details of your reservation.</p>

      <!-- Accommodation Image -->
      <div style="text-align: center; margin: 20px 0;">
        <img src="${userData?.data?.images[0]}" alt="Accommodation" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);" />
      </div>
  
      <h3 style="color: #333;">Reservation Request</h3>
      <p>From ${userData?.checkInDate} to ${userData?.checkOutDate} (${userData?.nights} nights)</p>
      <p>${numberOfPersons} persons</p>
      <p>Diet: ${userData?.data?.diet}</p>
  
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
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email_regex.test(reservation.email)) {
    return toast("Please enter a valid email address.");
  }

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
        checkInDate: checkInDate || "",
        checkOutDate: checkOutDate || "",
        numberOfPersons: numberOfPersons || 1,
        totalPrice: totalPrice || 0,
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
        diet: Array.isArray(data?.diet) ? data?.diet.join(', ') : data?.diet || "",
        accommodationProvider:data?.userId?._id|| "user",
        accommodationId: data?._id || "",
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

    const incrementInterestCount = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${accommodationId}/interest`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error("Error incrementing view count:", response.statusText);
            }
        } catch (error) {
            console.error("Error incrementing view count:", error);
        }
    };


    const handleButtonClick = async () => {
      // Call the function to increment interest count
      await incrementInterestCount(accommodationId); // Pass the accommodationId here
    
      // Then call the handle_submit function
      await handle_submit();

      router.push("/Thanks");
    };

    

    
  return (
    <div className="">
        <div
          className="sticky top-0 z-50 block bg-white md:hidden py-4 px-2"
          style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
        >
          <HeroSearchForm2Mobile />
        </div> 
        <div className="hidden md:block">
          <Header/>
        </div>
            <div className="mt-6">
                <div className="p-4 bg-white rounded-lg sm:p-8">
                    <div className="flex flex-col gap-5 px-4 lg:flex-row sm:px-6 lg:px-40">
                    <div className="flex-1 space-y-5">
                    <button onClick={() => router.back()} className="flex items-center text-sm py-2 text-[#58CAAA]">
                        <span className="mr-1"><IoIosArrowBack /></span> Back
                    </button>
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
                            <h1 className="font-bold">{userData?.checkInDate} - {userData?.checkOutDate}</h1>
                            </div>
                            <button className="text-red-500"></button>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                            <div className="space-y-2">
                            <h1>Number of persons</h1>
                            <h1 className="font-bold">{userData?.guests} persons</h1>
                            </div>
                            <button className="text-red-500"></button>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                            <div className="space-y-2">
                            <h1>Accommodation</h1>
                            <h1 className="font-bold">{data?.name}</h1>
                            </div>
                            <button className="text-red-500"></button>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                            <div className="space-y-2">
                            <h1>Diet</h1>
                            <p className="font-bold">{data?.diet}</p>
                            </div>
                            <button className="text-red-500"></button>
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
                                
                                <PiNumberCircleOneFill size={24} className="text-gray-500"/>
                            
                                <h1>The non-binding reservation will be sent directly to the accommodation provider.</h1>
                            </div>
                            <div className="flex items-start space-x-4">
                                
                                <PiNumberCircleTwoFill size={24} className="text-gray-500" />
                            
                                <h1>The host will contact you using the provided information.</h1>
                            </div>
                            <div className="flex items-start space-x-4">
                                
                                <PiNumberCircleThreeFill size={24} className="text-gray-500" />
                            
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
                            onClick={handleButtonClick}
                            className="flex items-center justify-center w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Send reservation <BsArrowRight className="ml-2" />
                        </button>
                        </div>
                    </div>

                    <div className="flex-1 space-y-5  lg:mx-20">
                        <div className="bg-white rounded shadow">
                    <div className="flex items-start space-x-5 ">
                        <img src="/bed.png" alt="Accommodation" className="object-cover w-16 h-16 rounded" />
                        <div className="space-y-2">
                        <h1 className="text-xl font-bold">{data?.name}</h1>
                        <h1 className="flex items-center">
                            {data?.reviews?.map((_, index) => (
                                <BsStarFill key={index} className="text-yellow-500" />
                            ))}
                            {Array.from({ length: 5 - (data?.reviews?.length || 0) }, (_, index) => (
                                <BsStarFill key={index} className="text-gray-300" />
                            ))}
                            </h1>
                            <p className="text-gray-500">{data?.reviews?.length || 0} reviews</p>
                        <p>{data?.propertyType}, {data?.locationDetails?.city}, {data?.locationDetails?.country}  </p>
                        <h1 className="flex items-center"><GiTick /> Verified accommodation</h1>
                        </div>
                    </div>

                    <div className="p-5 space-y-5  sm:p-10">
                        <h1 className="text-lg font-bold">Price details</h1>
                        <hr />
                        <div className="flex justify-between">
                        <h1>{data?.name} ( {userData?.guests} persons / {userData?.nights} nights)</h1>
                        <p>€{userData?.total}</p>
                        </div>
                        <hr />
                        <p>The displayed price is indicative and may vary depending on the date and conditions of the reservation. The accommodation provider will inform you of the exact price after sending the non-binding reservation.</p>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
      <Footer/>
      <div className="lg:hidden">
          <FooterNav/>
        </div>       
    </div>
  );
};

export default Page;