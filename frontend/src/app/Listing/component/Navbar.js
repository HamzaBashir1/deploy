"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext"; // Assuming AuthContext is here

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(AuthContext);

  const handleScroll = () => {
    if (headerRef.current) {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (menuRef.current) {
      menuRef.current.classList.toggle("show_menu");
    }
  };

  return (
    <nav
      ref={headerRef}
      className="bg-white border-gray-200 fixed top-0 left-0 w-full z-50"
    >
      <div className="flex flex-wrap items-center justify-between mx-4 md:mx-20 p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/putko.png" className="h-8" alt="Logo" />
        </Link>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 md:hidden lg:hidden xl:hidden">
          
          {/* Menu Button */}
          <Link href="/Favorite">
              <FaRegHeart className="text-xl text-gray-900 cursor-pointer hover:text-gray-600 " />
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 w-10 h-10 text-sm text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-hamburger"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 mt-16 mr-4 w-80 bg-white z-40 rounded-lg shadow-lg ${
          isMenuOpen ? "block" : "hidden"
        }`}
        id="navbar-hamburger"
      >
        <div className="relative h-full">
          <ul className="flex flex-col font-medium mt-8 rounded-lg">
            <h1 className="font-bold px-4 py-2">For Customers</h1>
            {/* <li>
              <Link
                href="/Blog"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
              >
                Blog For Customers
              </Link>
            </li> */}
            <li>
              <Link
                href="/FAQ"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/Booking"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
              >
                How Booking Works
              </Link>
            </li>
            <hr />
            <h1 className="font-bold px-4 py-2">For Accommodation Providers</h1>
            {/* <li>
              <Link
                href="/Blog"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
              >
                Blog For Providers
              </Link>
            </li> */}
            <li>
              <Link
                href="/FAQ"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/BUY"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
              >
                Rent with Putko
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
