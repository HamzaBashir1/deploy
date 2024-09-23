"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Accommodation from "./Accommodation";
import Users from './Users';
import { toast } from 'react-toastify';
import { AuthContext, useAuth } from "../../context/AuthContext";
import Hosts from "./Hosts"
// import { Base_URL } from "../../config";
import Email from "../component/Email"

const MyAccount = () => {
    const [tab, setTab] = useState("bookings");
    
    // Use the user, role, and token from the context
    const { dispatch, user, role, token } = useContext(AuthContext);
    // const { ,  } = useAuth();
    const router = useRouter();


    console.log("env", process.env.NEXT_PUBLIC_BASE_URL);
    const handleLogout = () => {
        try {
            dispatch({ type: "LOGOUT" });
            toast.success("Successfully logged out");
            router.push('/Admin-Login');
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    const handleDeleteAccount = async () => {
      const adminId = user?._id; // Get adminId from the user object
    
      if (!adminId) {
        toast.error("Admin ID not found.");
        return;
      }
    
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/${adminId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // include the token in the Authorization header
          },
        });
    
        if (response.ok) {
          const data = await response.json();
            toast.success("Account deleted successfully.");
            dispatch({ type: "LOGOUT" });
            router.push('/Admin-Login'); // Redirect to login after deletion
        }
      } catch (error) {
        console.error("Error in handleDeleteAccount:", error); // Log the error for debugging
        toast.error("An unexpected error occurred: " + error.message);
      }
    };
    
    
    

    return (
        <section>
            <div className="max-w-[1170px] px-5 mx-auto bg-white">
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="pb-[50px] px-[30px] rounded-md">
                        <div className="flex items-center justify-center">
                            <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                                <img
                                    src={user?.photo || "https://via.placeholder.com/100"}
                                    alt="admin"
                                    className="w-full h-full rounded-full"
                                />
                            </figure>
                        </div>
                        <div className="text-center mt-4">
                            <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                                {user?.name}
                            </h3>
                            <p className="text-textColor text-[15px] leading-6 font-medium">
                                {user?.email}
                            </p>
                        </div>

                        <div className="mt-[50px] md:mt-[100px]">
                            <button
                                onClick={handleLogout}
                                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                            >
                                Logout
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-2 md:px-[30px]">
                        <div>
                            <button
                                onClick={() => setTab("users")}
                                className={`${
                                    tab === "users" ? "bg-blue-500 text-white  font-normal" : ""
                                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                            >
                                Users Collection
                            </button>

                            <button
                                onClick={() => setTab("accommodation")}
                                className={`${
                                    tab === "accommodation" ? "bg-blue-500 text-white font-normal" : ""
                                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                            >
                                Accommodation Collection
                            </button>
                            <button
                                onClick={() => setTab("hosts")}
                                className={`${
                                    tab === "hosts" ? "bg-blue-500 text-white font-normal" : ""
                                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                            >
                                Hosts Collection
                            </button>
                            <button
                                onClick={() => setTab("email")}
                                className={`${
                                    tab === "hosts" ? "bg-blue-500 text-white font-normal" : ""
                                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                            >
                                Email Subscribe
                            </button>
                        </div>
                        {tab === "users" && <Users />}
                        {tab === "accommodation" && <Accommodation />}
                        {tab === "hosts" && <Hosts />}
                        {tab === "email" && <Email/>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyAccount;
