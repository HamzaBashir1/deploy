"use client";
import React, { useState } from "react";
import Account from "./component/Account";
import Footer from "../components/Footer/Footer";
import FooterNav from "../Shared/FooterNav";
import Header from "../components/Header";
import HeroSearchForm2Mobile from "../components/HeroSearchForm2Mobile";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div>
        <div
        className="sticky top-0 z-50 block bg-white md:hidden py-4 px-2"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <HeroSearchForm2Mobile />
      </div> 
      <div className="hidden md:block">
        <Header/>
      </div>
    <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
      {/* Header Section */}
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
        <div className="container">
          <nav className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              {/* Profile Tab */}
              <li className="mr-2">
                <button
                  onClick={() => setActiveTab("Profile")}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "Profile"
                      ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                >
                  Account
                </button>
              </li>
              {/* Dashboard Tab */}
              {/* <li className="mr-2">
                <button
                  onClick={() => setActiveTab("Dashboard")}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "Dashboard"
                      ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                >
                  Dashboard
                </button>
              </li> */}
              {/* Settings Tab */}
              {/* <li className="mr-2">
                <button
                  onClick={() => setActiveTab("Settings")}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "Settings"
                      ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                >
                  Settings
                </button>
              </li> */}
              {/* Contacts Tab */}
              {/* <li className="mr-2">
                <button
                  onClick={() => setActiveTab("Contacts")}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "Contacts"
                      ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                >
                  Contacts
                </button>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32">
        {activeTab === "Profile" && <Account />}
        {/* {activeTab === "Dashboard" && <div>Dashboard Content</div>}
        {activeTab === "Settings" && <div>Settings Content</div>}
        {activeTab === "Contacts" && <div>Contacts Content</div>} */}
      </div>
    </div>
    <Footer />
      <div className="lg:hidden">
          <FooterNav/>
        </div>
    </div>
  );
};

export default Page;
