"use client"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetchData from "../hooks/useFetchData";
import { Base_URL, token } from "../config";
import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error";
import { useRouter } from "next/navigation";
import Profile from "./component/Profile";
import { toast } from "react-toastify";
import Booking from "./component/Booking";
import Navbar from "../Favorite/component/Navbar";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";


const Page = () => {
  const router = useRouter(); 
  const { dispatch, user } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");
  
  // Fetch user profile data
  const { data: userData, loading, error } = useFetchData(user ? `${process.env.NEXT_PUBLIC_BASE_URL}/users/${user._id}` : null);

  console.log("useData",userData);

  // Logout function
  const handleLogout = () => {
    try {
        dispatch({ type: "LOGOUT" });
        toast.success("Successfully logged out");
        router.push('/');
    } catch (error) {
        toast.error("Logout failed. Please try again.");
    }
};

  // Delete account function
  // const handleDeleteAccount = async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?._id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.success) {
  //         dispatch({ type: "LOGOUT" });
  //       } else {
  //         console.log("Error deleting account");
  //       }
  //     } else {
  //       console.log("Error deleting account:", response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.log("Error deleting account", error);
  //   }
  // };


  return (
    <div>
      <Header />
        <section className="my-20">
          <div className="max-w-[1150px] px-5 mx-auto">
            {loading && !error && <Loading />}

            {error && !loading && <Error errMessage={error} />}
            {!loading && !error && (
              <div className="grid md:grid-cols-3 gap-10">
                <div className="pb-[50px] px-[30px] rounded-md">
                  <div className="flex items-center justify-center">
                    <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                    {userData.photo ? (
                      <img src={userData.photo} alt="User Photo" className="w-full h-full rounded-full" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        No Photo
                      </div>
                    )}

                    </figure>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{userData.name}</h3>
                    <p className="text-textColor text-[15px] leading-6 font-medium">{userData.email}</p>
                    <p className="text-textColor text-[15px] leading-6 font-medium">
                      role: <span className="ml-2 text-gray-500 text-lg">Guest</span>
                    </p>
                  </div>

                  <div className="mt-[50px] md:mt-[100px]">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                    >
                      Logout
                    </button>
                    {/* <button 
                    onClick={handleDeleteAccount}
                    className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                      Delete Account
                    </button> */}
                  </div>
                </div>

                <div className="md:col-span-2 md:px-[30px]">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setTab("bookings")}
                      className={`${
                        tab === "bookings" && "bg-blue-700 text-white font-normal"
                      } p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor w-full sm:w-auto`}
                    >
                      My Bookings
                    </button>

                    <button
                      onClick={() => setTab("settings")}
                      className={`${
                        tab === "settings" && "bg-blue-700 text-white font-normal"
                      } p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor w-full sm:w-auto`}
                    >
                      Profile Settings
                    </button>
                  </div>

                  {tab === "bookings" && <Booking />}
                  {tab === "settings" && <Profile user={userData} />}
                </div>

              </div>
            )}
          </div>
        </section>
      <Footer/>
    </div>
  );
};

export default Page;