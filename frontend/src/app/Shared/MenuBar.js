"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Bars3Icon } from '@heroicons/react/24/outline';
import { usePathname } from "next/navigation"; 
import NavMobile from "./NavMobile";

const MenuBar = ({
  className = "p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300",
  iconClassName = "h-8 w-8",
}) => {
  const [isVisable, setIsVisable] = useState(false);

  const pathname = usePathname();

  // Close menu when the pathname changes (useful for navigation events)
  useEffect(() => {
    setIsVisable(false);
  }, [pathname]);

  // Function to open the mobile menu
  const handleOpenMenu = () => setIsVisable(true);

  // Function to close the mobile menu
  const handleCloseMenu = () => setIsVisable(false);

  // Function to render the mobile menu content as a dialog
  const renderContent = () => {
    return (
      <Dialog
        as="div"
        className="relative z-50 overflow-hidden"
        onClose={handleCloseMenu}
        open={isVisable}  // Pass the `open` prop here
      >

        <div className="fixed inset-0">
          <div className="flex justify-end min-h-full">
            <NavMobile onClickClose={handleCloseMenu} />
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={handleOpenMenu}
        className={`focus:outline-none flex items-center justify-center ${className}`}
      >
        <Bars3Icon className={iconClassName} />
      </button>

      {/* Render Mobile Menu (NavMobile) when isVisable is true */}
      {renderContent()}
    </>
  );
};

export default MenuBar;
