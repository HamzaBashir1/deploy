"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext"; // Assuming AuthContext is here
import { BiSearch } from "react-icons/bi";

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

   // Close menu when scrolling
   useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <nav
      ref={headerRef}
      className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed top-0 left-0 w-full z-50"
    >
      <div className="flex flex-wrap items-center justify-between mx-4 md:mx-20 p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/putko.png" className="h-8" alt="Logo" />
        </Link>

        {/* Centered Search Input */}
        <div className="flex-1 flex justify-center">
          <div className="relative lg:w-full lg:max-w-[400px]">
            <input
              type="search"
              placeholder="Search for accommodation..."
              className="w-full py-2 pl-4 pr-1 lg:pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4FBE9F]"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">
              <BiSearch />
            </span>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 ">
          {/* Profile or Login */}
          {token && user ? (
            <Link
              href={`/${role === "guest" ? "Profile" : "Profile"}`}
              className="flex items-center"
            >
              <figure className="w-[45px]">
                <img src={user?.photo} className="w-full rounded-full" alt={user?.name} />
              </figure>
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-[#4FBE9F] py-2 px-6 text-white font-[600] flex items-center justify-center rounded-lg">
                Login
              </button>
            </Link>
          )}

          {/* Heart Icon */}
          <Link href="/Favorite">
            <FaRegHeart className="text-xl text-gray-900 cursor-pointer dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300" />
          </Link>
          
          {/* Menu Button (hidden on mobile) */}
          <button
            onClick={toggleMenu}
            className="hidden sm:flex p-2 w-10 h-10 text-sm text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
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
        className={`fixed top-0 right-0 mt-16 mr-4 w-80 bg-white dark:bg-gray-800 dark:border-gray-700 z-40 rounded-lg shadow-lg ${
          isMenuOpen ? "block" : "hidden"
        }`}
        id="navbar-hamburger"
      >
        <div className="relative h-full">
          <ul className="flex flex-col font-medium mt-8 rounded-lg">
            <h1 className="font-bold px-4 py-2">For Customers</h1>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Blog For Customers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                How Booking Works
              </Link>
            </li>
            <hr />
            <h1 className="font-bold px-4 py-2">For Accommodation Providers</h1>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Blog For Providers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Rent with Putko
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-2"></div>
    </nav>
  );
};

export default Navbar;
