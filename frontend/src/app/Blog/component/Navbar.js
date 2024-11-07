"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For toggling the search bar
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token, dispatch } = useContext(AuthContext);

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

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle the search bar on click
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setIsSearchOpen(false); // Close search bar after submitting
  };
 
  return (
    <nav
      ref={headerRef}
      className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-wrap items-center justify-between p-4 mx-4 md:mx-20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/putko.png" className="h-8" alt="Logo" />
        </Link>

        {/* Centered Search Input for Large Screens */}
        <div className="hidden md:flex justify-center flex-1">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[400px]">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for articles..."
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4FBE9F] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 transition-all duration-300 ease-in-out"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300">
              <BiSearch />
            </button>
          </form>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Show user image only on large screens */}
          {token && user ? (
            <Link href={`/${role === 'guest' ? 'Guest' : 'Profile'}`} className="hidden md:flex items-center">
              <figure className={`w-[30px] ${!user?.photo ? 'mr-6' : ''}`}>
                {user?.photo ? (
                  <img src={user.photo} className="w-full rounded-full" alt={user.name} />
                ) : (
                  <span className="text-lg text-gray-900 font-semibold">{user?.name}</span>
                )}
              </figure>
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-[#4FBE9F] py-2 px-6 text-white font-[600] flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-[#39A78E]">
                Login
              </button>
            </Link>
          )}

          {/* Search Icon for Small Screens */}
          <button onClick={toggleSearchBar} className="block md:hidden">
            <BiSearch className="text-xl text-gray-900 dark:text-gray-100 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300" />
          </button>

          {/* Heart Icon */}
          <FaRegHeart className="text-xl text-gray-900 dark:text-gray-100 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300" />

          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className="w-10 h-10 p-2 text-sm text-gray-900 bg-gray-100 rounded-lg dark:text-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all duration-300 ease-in-out"
            aria-controls="navbar-hamburger"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar Dropdown for Small Screens */}
      {isSearchOpen && (
        <div className="block md:hidden p-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[400px] mx-auto">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for articles..."
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4FBE9F] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 transition-all duration-300 ease-in-out"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300">
              <BiSearch />
            </button>
          </form>
        </div>
      )}
       {/* Menu for Small Screens */}
       <div
       className={`fixed top-0 right-0 mt-16 mr-4 w-80 bg-gray-50 dark:bg-gray-900 dark:border-gray-600 z-40 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
         isMenuOpen ? "block" : "hidden"
       }`}
       id="navbar-hamburger"
     >
       <div className="relative h-full">
         <ul className="flex flex-col mt-8 font-medium rounded-lg">
           <h1 className="px-4 py-3 text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
             For Customers
           </h1>
           <li>
             <Link
               href="/Blog"
               className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-200"
             >
               Blog for Customers
             </Link>
           </li>
           <li>
             <Link
               href="/FAQ"
               className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-200"
             >
               FAQ
             </Link>
           </li>
           <li>
             <Link
               href="/Booking"
               className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-200"
             >
               How Booking Works
             </Link>
           </li>

           <hr className="my-4 border-gray-300 dark:border-gray-600" />

           <h1 className="px-4 py-3 text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
             For Accommodation Providers
           </h1>
           <li>
             <Link
               href="/Blog"
               className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-200"
             >
               Blog for Providers
             </Link>
           </li>
           <li>
             <Link
               href="/FAQ"
               className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-200"
             >
               FAQ
             </Link>
           </li>
           <li>
             <Link
               href="/BUY"
               className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-200"
             >
               Rent with Putko
             </Link>
           </li>
           <li onClick={handleLogout} className="px-3 py-2">
              Logout
           </li>
         </ul>
       </div>
     </div>
    </nav>
  );
};

export default Navbar;
