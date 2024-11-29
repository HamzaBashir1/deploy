"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext"; // Assuming AuthContext is here

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token, dispatch } = useContext(AuthContext);

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
      className="top-0 left-0 z-50 w-full bg-[#F5F5F5] border-gray-200"
    >
      <div className="flex flex-wrap items-center justify-between p-4 md:px-5 lg:px-10 xl:px-14 2xl:px-18 max-w-[1820px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/putko.png" className="h-8" alt="Logo" />
        </Link>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Profile or Login */}
          {token && user ? (
            <Link
              href={`/${role === 'guest' ? 'Guest' : 'Profile'}`}
              className="flex items-center"
            >
              <figure className={`w-[30px] ${!user?.photo ? 'mr-6' : ''}`}>
                {user?.photo ? (
                  <img src={user.photo} className="w-full rounded-full" alt={user.name} />
                ) : (
                  <span className="text-lg text-gray-900 cursor-pointer hover:text-gray-600 font-semibold">{user?.name}</span>
                )}
              </figure>
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-[#58CAAA] py-2 px-6 text-white font-[600] flex items-center justify-center rounded-lg">
                Login
              </button>
            </Link>
          )}
          
          {/* Menu Button */}
          <Link href="/Favorite">
            <FaRegHeart className="text-xl text-gray-900 cursor-pointer hover:text-gray-600" />
          </Link>
          <button
              onClick={toggleMenu}
              className="w-10 h-10 p-2 text-sm text-gray-900 transition-all duration-300 bg-transparent border-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
          className={`fixed top-0 right-0 mt-16 mr-4 w-80 bg-gray-50 z-40 rounded-lg shadow-lg ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-hamburger"
        >
          <div className="relative h-full">
            <ul className="flex flex-col mt-8 font-medium rounded-lg">
              <h1 className="px-4 py-2 font-bold">For Customers</h1>
              {/* <li>
                <Link
                  href="/Blog"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100"
                >
                  Blog For Customers
                </Link>
              </li> */}
              <li>
                <Link
                  href="/FAQ"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/Booking"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100"
                >
                  How Booking Works
                </Link>
              </li>
              <hr />
              <h1 className="px-4 py-2 font-bold">For Accommodation Providers</h1>
              <li>
                {/* <Link
                  href="/Blog"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100"
                >
                  Blog For Providers
                </Link> */}
              </li>
              <li>
                <Link
                  href="/FAQ"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/BUY"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100"
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
