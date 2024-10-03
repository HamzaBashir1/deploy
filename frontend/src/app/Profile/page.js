"use client";
import React, { useState, useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from "../context/AuthContext";
import { FaHome, FaBars, FaEnvelope, FaCalendarAlt, FaChartLine, FaList, FaFileInvoice } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import { RiMenu2Fill, RiHotelLine } from "react-icons/ri";
import { MdOutlineEmail, MdOutlineShowChart, MdEuro, MdOutlinePercent, MdOutlineSubscriptions } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSync, GoSignOut } from "react-icons/go";
import { BsPersonCircle } from 'react-icons/bs';
import { FaHourglassHalf } from "react-icons/fa6";
import { HiOutlineDotsHorizontal, HiMenuAlt2 } from "react-icons/hi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import Header from "../components/Header/Header";
import Card from "./component/Card";
import { toast } from 'react-toastify';
import Overview from './component/Overview';
import Calender from './component/Calender';
import News from './component/News';
import Rating from './component/Rating';
import Statistics from './component/Statistics';
import Reservation from './component/Reservation';
import Price from './component/Price'
import Invoice from './component/Invoice'
import Subscription from './component/Subscription'
import { BiDotsHorizontalRounded, BiPlus } from 'react-icons/bi';
import AdditionalServices from './component/AdditionalServices'
import LastMinute from './component/LastMinute'
import { BiTime } from 'react-icons/bi';
import Synchronization from './component/Synchronization'
import AddAccommodation from './component/AddAccommodation'
import page from '../login/page';
import AccommodationShow from './component/AccommodationShow'

const ProfilePage = () => {
    const handleCardClick = (page) => {
        // Set the active page or perform any action when a card is clicked
        setActivePage(page);
        console.log(`Card clicked: ${page}`);
      };
  const { dispatch, user } = useContext(AuthContext);
  const [activePage, setActivePage] = useState(' ');
  const [sidebarOpen, setSidebarOpen] = useState(false);  // State to track sidebar visibility
  const sidebarRef = useRef(null);  // Reference to sidebar for detecting clicks outside
  const router = useRouter(); 

  const handleLogout = () => {
      try {
          dispatch({ type: "LOGOUT" });
          toast.success("Successfully logged out");
          router.push('/');
      } catch (error) {
          toast.error("Logout failed. Please try again.");
      }
  };

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);  // Close the sidebar if clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch the correct current date when the component mounts
  useEffect(() => {
    const now = new Date(); // Fetch the current date immediately
    setCurrentDate(now);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get day and month for display
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });

  return (
      <div className="flex bg-[#EEF1F5]">
          {/* Sidebar */}
          <aside 
              ref={sidebarRef}  // Attach the ref to the sidebar
              id="logo-sidebar" 
              className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#292A34] ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } sm:translate-x-0`}
          >
              <div className="h-full px-3 py-4 overflow-y-auto">
                  <Link href="/" className="flex items-center ps-2.5 mb-5 py-5">
                      <Image src="/putko.png" width={100} height={100} className="w-20 h-6 me-3 sm:h-7" alt="Putko Logo" />
                  </Link>
                  <ul className="space-y-2 font-medium text-white">
                  {[
                    { icon: <RxDashboard />, text: 'Overview', href: '#', page: ' ' },
                    { icon: <RiMenu2Fill />, text: 'Reservation requests', href: '#', page: 'reservation' },
                    { icon: <MdOutlineEmail />, text: 'News', href: '#', page: 'News' },
                    { icon: <LuCalendarDays />, text: 'Occupancy calendar', href: '#', page: 'Calender' },
                    { icon: <MdOutlineShowChart />, text: 'Statistics', href: '#', page: 'Statistics' },
                    { icon: <FaRegStar />, text: 'Rating', href: '#', page: 'Rating' },
                  
                    // { icon: <MdOutlinePercent />, text: 'Promotions and discounts', href: '#' },
                    { icon: <BiTime/>, text: 'Last Minutes', href: '', page:'LastMinute'},
                    { icon: <RiHotelLine />, text: 'Accommodation', href: '#', page: 'AccommodationShow' },
                    { icon: <GoSync />, text: 'Calender synchronization', href: '#', page: 'Synchronization' },
                    // { icon: <MdOutlineSubscriptions />, text: 'Subscription', href: '#', page: 'Subscription' },
                    // { icon: <FaFileInvoice/>, text: 'Invoice', href: '#', page:'Invoice'},
                    // { icon: <BiDotsHorizontalRounded/>, text: 'Additional Services', href: '#', page:'AdditionalServices'},
                    { icon: <BiPlus/>, text: 'Add Accommodation', href: '#', page:'AddAccommodation'},
                  ].map(({ icon, text, href, page }) => (
                    <li key={text}>
                      <Link
                        href={href}
                        className={`flex items-center gap-5 p-2 rounded-lg hover:bg-[#41424e] ${
                          activePage === page ? 'bg-[#41424e]' : ''
                        }`} // Apply active styling if the tab is active
                        onClick={() => setActivePage(page)}
                      >
                        {icon}
                        <span className="text-sm font-medium">{text}</span>
                      </Link>
                    </li>
                  ))}
                      <li>
                          <button
                              onClick={handleLogout}
                              className='flex items-center gap-5 p-2 rounded-lg hover:bg-[#41424e] text-white w-full text-left'
                          >
                              <GoSignOut />
                              <span className="text-sm font-medium">Logout</span>
                          </button>
                      </li>
                  </ul>
              </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:ml-64">
              {/* Navbar for small screens */}
              <div className="flex items-center justify-between lg:hidden">
              
                  <FaBars
                      className="text-2xl text-gray-700 cursor-pointer hover:text-black"
                      onClick={() => setSidebarOpen(!sidebarOpen)}  // Toggle sidebar visibility
                  />
                  <div className="space-x-4 ">
                      <FaHome className="text-2xl text-gray-700 hover:text-black" />
                  </div>
                  <div>
                      <FaList className="text-2xl text-gray-700 hover:text-black" />
                  </div>
                  <FaEnvelope className="text-2xl text-gray-700 hover:text-black" />
                  <div>
                      <FaCalendarAlt className="text-2xl text-gray-700 hover:text-black" />
                  </div>
                  <div>
                      <FaChartLine className="text-2xl text-gray-700 hover:text-black" />
                  </div>
              </div>

              {/* Conditionally show Header only on Overview page */}
              {activePage === ' ' && (
                  <div className='hidden lg:inline'>
                      <Header />
                  </div>
              )}

              {/* Conditional page rendering */}
              {activePage === '' && (
                 <Overview />
              )}
              {activePage === 'reservation' && (
                  <Reservation />
              )}
              {activePage === 'News' && (
                  <News/>
              )}
              {activePage === 'Calender' && (
                  <Calender />
              )}
              {activePage === 'Rating' && (
                  <Rating />
              )}
              {activePage === 'Statistics' && (
                  <Statistics/>
              )}
              
              {/* {activePage === 'Invoice' && (
                  <Invoice/>
              )}
              {activePage === 'Subscription' && (
                  <Subscription/>
              )}
              {activePage === 'AdditionalServices' && (
                  <AdditionalServices />
              )} */}
              {activePage === 'LastMinute' && (
                  <LastMinute />
              )}
              {activePage === 'Synchronization' && (
                  <Synchronization />
              )}
              {activePage === 'AddAccommodation' && (
                  <AddAccommodation />
              )}
              {activePage === 'AccommodationShow' && (
                  <AccommodationShow />
              )}

              {/* More content on the Overview page */}
              {activePage === ' ' && (
                  <div>
                      <div className='flex justify-between mx-5 bg-[#EEF1F5] py-5 flex-row lg:flex-row items-center'>
                          <div className='flex flex-row items-center gap-2 sm:gap-5'>
                              <h1 className='text-[#292A34] text-6xl sm:text-8xl'>{day}</h1>
                              <span className='text-[#292A34] text-lg sm:text-2xl'>{month}</span>
                          </div>
                          <div className='mt-4 sm:mt-0'>
                              <BsPersonCircle className="text-[#292A34] text-xl" />
                          </div>
                      </div>

                      {/* Subscription Info */}
                      <div className='flex justify-between bg-[#FFFDCC] py-5 px-5 sm:mx-5 mb-5 flex-col sm:flex-row items-center'>
                          <div className='flex flex-row items-center gap-5'>
                              <FaHourglassHalf size={45} />
                              <div className='flex flex-col text-center sm:text-left'>
                                  <h1 className='text-[#292A34] font-semibold text-sm sm:text-base'>Subscription ends Aug 27, 2025</h1>
                                  <p className='text-xs sm:text-sm'>355 days left until expiration</p>
                              </div>
                          </div>
                          <button className='bg-[#292A34] py-2 sm:py-3 px-4 sm:px-6 rounded-md text-white mt-4 sm:mt-0'>Extend Subscription</button>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 bg-[#EEF1F5]">
                      {[
                        { title: "Reservation requests", Icon: RiMenu2Fill, page: "reservation" },
                        { title: "News", Icon: MdOutlineEmail, page: "News" },
                        { title: "Occupancy calendar", Icon: LuCalendarDays, page: "Calender" },
                        { title: "Statistics", Icon: MdOutlineShowChart, page: "Statistics" },
                        { title: "Rating", Icon: FaRegStar, page: "Rating" },
                        // { title: "Prices", Icon: MdEuro, page: "Prices" },
                        // { title: "Promotions and discounts", Icon: MdOutlinePercent, page: "Promotions" },
                        { title: "Last minute", Icon: WiTime10, page: "LastMinute" },
                        { title: "Accommodation", Icon: RiHotelLine, page: "AccommodationShow" },
                        { title: "Synchronization", Icon: GoSync, page: "Synchronization" },
                        { title: "Subscription", Icon: MdOutlineSubscriptions, page: "Subscription" },
                        // { title: "Additional services", Icon: HiOutlineDotsHorizontal, page: "AdditionalServices" },
                        // { title: "Invoices", Icon: LiaFileInvoiceSolid, page: "Invoices" },
                        // { title: "Billing data", Icon: HiMenuAlt2, page: "BillingData" },
                        { title: "Add Accommodation", Icon: BiPlus, page: "AddAccommodation" },
                      ].map(({ title, Icon, page }, index) => (
                        <Card
                          key={index}
                          title={title}
                          Icon={Icon}
                          iconSize="4xl"
                          customClasses="bg-gray-100"
                          onClick={() => handleCardClick(page)} // Add onClick handler
                        />
                      ))}
                    </div>
                    
                  </div>
              )}
          </div>
      </div>
  );
};

export default ProfilePage;
