import React, { useState, useEffect } from "react";
import {
  NavSearchIcon,
  ChatIcon,
  NotificationIcon,
  MenuIcon,
  CloseIcon,
  NavChevronDown,
} from "./Icons";

const navItems = [
  {
    name: "Learn & Earn",
    links: [
      "League Home",
      "All Leagues",
      "Global Hall of Fame",
      "Pro Rewards Track",
      "Community",
    ],
  },
  {
    name: "Jobs",
    links: [
      "IT & CS Jobs",
      "Technical Jobs",
      "Sales & Marketing Jobs",
      "Banking & E-Com Jobs",
      "IT & CS Internships",
      "Technical Internships",
      "Sales & Marketing Internships",
      "Banking & E-Com Internships",
      "AI Interview",
      "AI Assessment",
      "Job Fairs",
    ],
  },
  {
    name: "Compete",
    links: [
      "All Events",
      "Hackathons",
      "Student Events",
      "Startupthon",
      "Voting Events",
      "Awards",
      "FAQ",
      "Guides",
      "Thrill",
      "Event Communities",
      "Global Community",
    ],
  },
  {
    name: "Discover",
    links: [
      "Intern with UptoSkills",
      "Refer & Earn",
      "UptoSkills Pro",
      "Blogs",
      "Blog Shorts",
      "Guides",
      "FAQ",
      "Support",
    ],
  },
];

const UserActions = () => (
  <div className="flex flex-row items-center gap-4">
    <button className="p-2 text-gray-300 transition bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800 hover:text-white pointer-events-auto cursor-pointer z-50">
      <NavSearchIcon />
    </button>
    <button className="text-gray-300 transition hover:text-white pointer-events-auto cursor-pointer z-50">
      <ChatIcon />
    </button>
    <button className="text-gray-300 transition hover:text-white pointer-events-auto cursor-pointer z-50">
      <NotificationIcon />
    </button>
    <button className="relative w-9 h-9 overflow-hidden border-2 border-orange-500 rounded-full ml-1 pointer-events-auto cursor-pointer z-50">
      <img
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=0284c7"
        alt="User Profile"
        className="object-cover w-full h-full"
      />
    </button>
  </div>
);

const DropdownMenu = ({ links }) => (
  <ul className="absolute left-0 w-48 py-2 mt-2 bg-[#0e1525] border border-gray-700 rounded-lg shadow-xl top-full">
    {links.map((link, index) => (
      <li key={index}>
        <a
          href="#"
          className="block px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white pointer-events-auto cursor-pointer z-50"
        >
          {link}
        </a>
      </li>
    ))}
  </ul>
);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0e1525]/70 backdrop-blur-md pointer-events-auto">
      <div className="flex flex-row items-center justify-between px-6 h-20 mx-auto max-w-7xl">
        <div className="flex flex-row items-center gap-4 h-full">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-gray-200 focus:outline-none md:hidden pointer-events-auto cursor-pointer z-50"
          >
            <MenuIcon />
          </button>
          <img
            src="https://res.cloudinary.com/dffm4zxpc/image/upload/v1774514098/uptoskillslogo-removebg-preview_vjal22.webp"
            alt="UptoSkills Logo"
            className="h-[76px] md:h-[76px] object-contain py-1 scale-[1.3] md:scale-[1.4] origin-left"
          />
        </div>

        <ul className="flex-row items-center gap-8 hidden md:flex h-full">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative group h-full flex items-center"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex flex-row items-center gap-1.5 py-2.5 text-[15px] font-semibold text-gray-200 transition hover:text-white pointer-events-auto cursor-pointer z-50">
                {item.name}
                <NavChevronDown />
              </button>
              {activeDropdown === item.name && (
                <DropdownMenu links={item.links} />
              )}
            </li>
          ))}
        </ul>

        <div className="flex flex-row items-center gap-6">
          <div className="hidden md:block">
            <UserActions />
          </div>

          <button className="flex flex-row items-center gap-1.5 px-6 py-2.5 text-sm font-bold text-white transition rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:opacity-90 hidden md:flex pointer-events-auto cursor-pointer z-50">
            For Enterprise
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0e1525] flex flex-col md:hidden w-full h-[100dvh] overflow-hidden pointer-events-auto">
          <div className="flex flex-row items-center justify-between px-6 h-20 border-b border-white/10 shrink-0">
            <div className="flex flex-row items-center gap-4 h-full">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-200 focus:outline-none pointer-events-auto cursor-pointer z-50"
              >
                <CloseIcon />
              </button>
              <img
                src="https://res.cloudinary.com/dffm4zxpc/image/upload/v1774514098/uptoskillslogo-removebg-preview_vjal22.webp"
                alt="UptoSkills Logo"
                className="h-[76px] object-contain py-1 scale-[1.3] origin-left"
              />
            </div>
          </div>

          <div className="flex flex-col flex-grow gap-6 overflow-y-auto p-6">
            <div className="flex flex-row items-center w-full gap-3 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg shrink-0">
              <NavSearchIcon />
              <input
                type="search"
                placeholder="Search..."
                className="flex-grow w-full text-sm text-white placeholder-gray-400 bg-transparent outline-none pointer-events-auto z-50"
              />
            </div>

            <div className="flex justify-around items-center border-b border-gray-800 pb-6 shrink-0">
              <button className="text-gray-300 transition hover:text-white pointer-events-auto cursor-pointer z-50">
                <ChatIcon />
              </button>
              <button className="text-gray-300 transition hover:text-white pointer-events-auto cursor-pointer z-50">
                <NotificationIcon />
              </button>
              <button className="relative w-10 h-10 overflow-hidden border-2 border-orange-500 rounded-full pointer-events-auto cursor-pointer z-50">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=0284c7"
                  alt="User Profile"
                  className="object-cover w-full h-full"
                />
              </button>
            </div>

            <ul className="flex flex-col gap-4 shrink-0">
              {navItems.map((item, index) => (
                <li key={index} className="group flex flex-col">
                  <button
                    className="flex flex-row items-center justify-between w-full py-2 text-base font-semibold text-gray-200 transition hover:text-white pointer-events-auto cursor-pointer z-50"
                    onClick={(e) => {
                      const ul = e.currentTarget.nextElementSibling;
                      ul.classList.toggle("hidden");
                    }}
                  >
                    {item.name}
                    <NavChevronDown />
                  </button>
                  <ul className="hidden pl-4 mt-2 mb-2 space-y-3 border-l border-gray-800 ml-2">
                    {item.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="text-sm font-medium text-gray-400 transition hover:text-white block py-1 pointer-events-auto cursor-pointer z-50"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <button className="flex flex-row items-center justify-center w-full gap-1.5 px-8 py-3.5 mt-auto mb-4 font-bold text-white transition rounded-full shadow-[0_0_15px_rgba(249,115,22,0.3)] bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 shrink-0 pointer-events-auto cursor-pointer z-50">
              For Enterprise
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
