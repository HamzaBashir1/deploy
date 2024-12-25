"use client";
import Link from "next/link";
import React, { useContext, useState, useRef, useEffect } from "react";
import ButtonSecondary from "../Shared/Button/ButtonSecondary";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { FormContext } from "../FormContext";

const Header = () => {
  const router = useRouter();
  const { user, role, dispatch } = useContext(AuthContext);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const { selectedpage, updateSelectedpage } = useContext(FormContext);
  const menuRef = useRef(null); // Reference to the dropdown menu

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

  // Handle menu visibility toggle
  const toggleMenu = () => {
    setProfileMenuOpen((prev) => !prev);
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
      <nav className="flex items-center justify-between w-full px-6 py-6 bg-transparent md:px-6 2xl:px-48">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/putko.png" className="h-8" alt="Logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="items-center hidden space-x-4 lg:flex">
          <ButtonSecondary className="bg-transparent text-neutral-600" onClick={handlego}>
            List your Property
          </ButtonSecondary>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center focus:outline-none"
                onClick={toggleMenu}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.photo || "https://tecdn.b-cdn.net/img/new/avatars/2.jpg"}
                  alt={user?.name || "User"}
                />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-40 w-48 mt-2 bg-white rounded-md shadow-lg top-12">
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
      </nav>
    </header>
  );
};

export default Header;
