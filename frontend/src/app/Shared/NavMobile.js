"use client";

import React from "react";
import Logo from "../Shared/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ButtonClose from "./ButtonClose";
import ButtonPrimary from "./ButtonPrimary";

// Example static data for testing
const DUMMY_DATA = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "About",
    href: "/About",
  },
  {
    id: 3,
    name: "Contact Us",
    href: "/Contact",
  },
  {
    id: 4,
    name: "Listing",
    href: "/listing-stay-map"
  }
];

const NavMobile = ({ data = DUMMY_DATA, onClickClose }) => {
  // Function to render nested menu items
  const renderMenuChild = (children) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {children.map((child) => (
          <li key={child.id}>
            <Link
              href={child.href || "#"}
              className="block px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  // Function to render main menu items
  const renderItem = (item) => (
    <Disclosure key={item.id} as="li" className="text-neutral-900 dark:text-white">
      {({ open }) => (
        <>
          <div className="flex items-center w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
            <Link
              href={item.href || "#"}
              className={`py-2.5 pr-3 ${!item.children ? "block w-full" : ""}`}
            >
              {item.name}
            </Link>
            {item.children && (
              <Disclosure.Button className="py-2.5 flex items-center justify-end flex-1">
                <ChevronDownIcon
                  className={`ml-2 h-4 w-4 text-neutral-500 transform transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </Disclosure.Button>
            )}
          </div>
          {item.children && (
            <Disclosure.Panel>{renderMenuChild(item.children)}</Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5 relative">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them.
          </span>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">{data.map(renderItem)}</ul>
      <div className="flex items-center justify-between py-6 px-5">
        <a
          className="inline-block"
          href="https://themeforest.net/item/chisfis-online-booking-nextjs-template/43399526"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonPrimary>Get Template</ButtonPrimary>
        </a> 
      </div> 
    </div>
  );
};

export default NavMobile;
