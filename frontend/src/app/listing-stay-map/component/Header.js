"use client";
import Link from "next/link";
import React, { useContext, useState, useRef, useEffect } from "react";
import ButtonSecondary from "../../Shared/ButtonSecondary";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const { user, role, dispatch } = useContext(AuthContext);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the menu element

  
    // Logout function
    const handleLogout = () => {
      try {
        dispatch({ type: "LOGOUT" });
        toast.success("Successfully logged out");
        router.push('/');
      } catch (error) {
        console.log("Logout failed. Please try again.");
      }
    };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlego = () => {
      if (!user) {
        toast.warn("Please log in as a host to list your property");
        return;
      }
      if (role === "host") {
        updateSelectedpage("AddAccommodation");
        router.push("/Profile");
      } else {
        toast.error("Only hosts can list properties. Please log in as a host.");
      }
    };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav className="flex items-center justify-between w-full px-6 py-6 bg-transparent md:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/putko.png" className="h-8" alt="Logo" />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="items-center hidden space-x-4 lg:flex">
          <ButtonSecondary className="bg-transparent text-neutral-600" onClick={handlego}>
            List your Property
          </ButtonSecondary>
          {/* <a href="#" className="relative text-gray-600">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              1
            </span>
          </a> */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.photo || "https://tecdn.b-cdn.net/img/new/avatars/2.jpg"}
                  alt={user?.name || "User"}
                />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg">
                  <ul className="flex flex-col px-4 py-2 space-y-1 text-sm font-medium">
                    <li>
                      <Link
                        href={`/${role === "guest" ? "Guest" : "Profile"}`}
                        className="flex items-center px-2 py-1 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Favorite"
                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100"
                      >
                        Favourite
                      </Link>
                    </li>
                    <li>
                      {role === "guest" ? (
                        <Link
                          href="/Account"
                          className="block px-2 py-1 text-gray-700 hover:bg-gray-100"
                        >
                          Account 
                        </Link>
                      ) : (
                        <Link
                          href={`/host-detail/${user?._id}`}
                          className="block px-2 py-1 text-gray-700 hover:bg-gray-100"
                        >
                          Host Account
                        </Link>
                      )}
                    </li>
                    <li>
                      <Link
                        href="/ticket-view"
                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100"
                      >
                       Help Support
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <Link
                        href="#"
                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-[#4FBE9F] py-2 px-6 text-white font-[600] flex items-center justify-center rounded-lg">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Profile Icon */}
        <div className="lg:hidden">
          {user ? (
            <button
              className="flex items-center focus:outline-none"
              onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
            >
              <img
                className="w-8 h-8 rounded-full"
                src={user?.photo || "https://tecdn.b-cdn.net/img/new/avatars/2.jpg"}
                alt={user?.name || "User"}
              />
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-[#4FBE9F] py-2 px-6 text-white font-[600] flex items-center justify-center rounded-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
