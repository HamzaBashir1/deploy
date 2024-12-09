"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import ButtonSecondary from "../Shared/Button/ButtonSecondary";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const Header = () => {
  const router = useRouter();
  const { user, role, dispatch } = useContext(AuthContext);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md w-full">
      <nav className="flex items-center justify-between w-full bg-transparent py-6 px-6 md:px-6 2xl:px-48">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/putko.png" className="h-8" alt="Logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          <ButtonSecondary className="bg-transparent text-neutral-600">
            List your Property
          </ButtonSecondary>
          <a href="#" className="relative text-gray-600">
            <svg
              className="h-6 w-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              1
            </span>
          </a>
          {user ? (
            <div className="relative">
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

      {/* Mobile Dropdown Menu */}
      {isProfileMenuOpen && (
        <div className="absolute right-0 lg:right-14 top-12 bg-white shadow-lg z-40 mt-2 w-48 rounded-md">
            <ul className="flex flex-col space-y-1 py-2 px-4 text-sm font-medium">
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
            <li >
                <button
                
                
                className="block px-2 py-1 text-gray-700 hover:bg-gray-100"
                >
                Settings
                </button>
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
    </header>
  );
};

export default Header;
