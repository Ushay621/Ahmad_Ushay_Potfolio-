// 
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Resume", href: "#resume", id: "resume" },
    { name: "Contact", href: "#contact", id: "contact", isButton: true },
  ];

  // Detect active section on scroll and hash change
  useEffect(() => {
    const sections = ["home", "about", "resume", "contact"];

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      setActiveSection(hash);
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Initial check
    handleHashChange();
    handleScroll();

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-[#282c34] text-white shadow-lg rounded-[32px] mt-4 md:mt-6 border border-gray-700/50 w-fit">
      <div className="px-3 sm:px-4 md:px-6 py-2 md:py-3 flex justify-center items-center">
        <ul className="flex items-center space-x-4 sm:space-x-5 md:space-x-6 font-inter">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`px-2 sm:px-3 md:px-5 py-1.5 md:py-2 rounded-full transition duration-300 font-semibold text-xs sm:text-sm md:text-base ${link.isButton
                    ? isActive
                      ? "bg-green-400 text-gray-800 hover:bg-green-500"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                    : isActive
                      ? "text-green-400 hover:text-green-300"
                      : "text-gray-300 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
