"use client";
import Link from "next/link";
import React, { useState } from "react";
import ButtonPrimary from "../Shared/Button/ButtonPrimary";
import ButtonSecondary from "../Shared/Button/ButtonSecondary";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white w-full">
      <nav className="flex items-center justify-between w-full bg-transparent py-8 px-48">
        {/* Logo and Hamburger Button */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/putko.png" className="h-8" alt="Logo" />
          </Link>
          {/* Hamburger Button */}
          <button
            className="block lg:hidden p-2 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 6h14a1 1 0 010 2H3a1 1 0 010-2zm0 6h14a1 1 0 010 2H3a1 1 0 010-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Links and Dropdowns */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 text-sm font-medium"></ul>

          {/* Right Elements */}
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">

            <ButtonSecondary className="bg-transparent text-neutral-600">
                List your Property
            </ButtonSecondary>
            {/* Notifications */}
            <a href="#" className="relative text-gray-600 dark:text-neutral-200">
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

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                  alt="User"
                />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg dark:bg-gray-700">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
