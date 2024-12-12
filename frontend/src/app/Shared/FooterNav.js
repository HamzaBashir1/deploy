"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuBar from "./MenuBar";
import { AuthContext } from "../context/AuthContext";

const FooterNav = () => {
    const containerRef = useRef(null);
    const pathname = usePathname();
    const { user, role } = useContext(AuthContext);
  
    const [prevScrollPos, setPrevScrollPos] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        if (!containerRef.current) return;
  
        const currentScrollPos = window.pageYOffset;
        const isScrollingDown = currentScrollPos > prevScrollPos;
  
        if (isScrollingDown) {
          containerRef.current.classList.add("FooterNav--hide");
        } else {
          containerRef.current.classList.remove("FooterNav--hide");
        }
  
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [prevScrollPos]);
  
    const NAV = [
      {
        name: "Explore",
        link: "/",
        icon: MagnifyingGlassIcon,
      },
      {
        name: "Wishlists",
        link: "/Favorite",
        icon: HeartIcon,
      },
      user && role ? {
        name: role === "host" ? "Profile" : "Guest",
        link: role === "host" ? "/Profile" : "/Guest",
        icon: UserCircleIcon,
      } : {
        name: "Login",
        link: "/login",
        icon: UserCircleIcon,
      },
      {
        name: "Menu",
        icon: MenuBar,
      },
    ];
  
    const renderItem = (item, index) => {
      const isActive = pathname === item.link;
  
      return item.link ? (
        <Link
          key={index}
          href={item.link}
          className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
            isActive ? "text-neutral-900 dark:text-neutral-100" : ""
          }`}
        >
          <item.icon className={`w-6 h-6 ${isActive ? "text-[#357965]" : ""}`} />
          <span
            className={`text-[11px] leading-none mt-1 ${
              isActive ? "text-[#357965]" : ""
            }`}
          >
            {item.name}
          </span>
        </Link>
      ) : (
        <div
          key={index}
          className="flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90"
        >
          <item.icon className="w-6 h-6" />
          <span className="text-[11px] leading-none mt-1">{item.name}</span>
        </div>
      );
    };
  
    return (
      <div
        ref={containerRef}
        className="FooterNav block md:!hidden p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 transition-transform duration-300 ease-in-out"
      >
        <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center">
          {NAV.map(renderItem)}
        </div>
      </div>
    );
  };
  
  export default FooterNav;
