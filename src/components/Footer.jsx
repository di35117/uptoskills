import React from "react";

const FooterLink = ({ icon, text }) => (
  <li className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer group">
    <span className="text-gray-400 group-hover:text-cyan-400">{icon}</span>
    <span>{text}</span>
  </li>
);

const SvgIcon = ({ d, ...props }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {d}
  </svg>
);
const IconCap = () => (
  <SvgIcon
    d={
      <>
        <path d="M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
        <path d="M22 10v6" />
      </>
    }
  />
);
const IconBuilding = () => (
  <SvgIcon
    d={
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </>
    }
  />
);
const IconMonitor = () => (
  <SvgIcon
    d={
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    }
  />
);
const IconSearch = () => (
  <SvgIcon
    d={
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    }
  />
);
const IconUsers = () => (
  <SvgIcon
    d={
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    }
  />
);
const IconBriefcase = () => (
  <SvgIcon
    d={
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    }
  />
);
const IconInfinity = () => (
  <SvgIcon
    d={
      <>
        <path d="M18.178 7.822a4 4 0 0 0-5.656 0L12 8.343l-1.522-.521a4 4 0 1 0 0 5.656L12 13.999l.522-.521a4 4 0 1 0 5.656-5.656z" />
      </>
    }
  />
);
const IconCode = () => (
  <SvgIcon
    d={
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    }
  />
);
const IconTrophy = () => (
  <SvgIcon
    d={
      <>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </>
    }
  />
);
const IconRibbon = () => (
  <SvgIcon
    d={
      <>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </>
    }
  />
);
const IconCalendar = () => (
  <SvgIcon
    d={
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    }
  />
);
const IconMessage = () => (
  <SvgIcon
    d={
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    }
  />
);
const IconHelp = () => (
  <SvgIcon
    d={
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    }
  />
);
const IconPhoneCall = () => (
  <SvgIcon
    d={
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    }
  />
);
const IconShield = () => (
  <SvgIcon
    d={
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </>
    }
  />
);
const IconMapPin = () => (
  <SvgIcon
    d={
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    }
  />
);
const IconMail = () => (
  <SvgIcon
    d={
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    }
  />
);

export const Footer = () => (
  <footer className="bg-[#0e1525] pt-16 pb-12 px-6 relative z-20 pointer-events-auto">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://res.cloudinary.com/dffm4zxpc/image/upload/v1774514098/uptoskillslogo-removebg-preview_vjal22.webp"
            alt="UptoSkills Logo"
            className="h-16 md:h-20 object-contain"
          />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mt-6 mb-2">
          Connecting Colleges, Candidates, and Corporates
        </h2>
        <p className="text-gray-400 text-sm">
          Empowering the next generation through AI-powered learning
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Our Services
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconCap />} text="For Colleges" />
            <FooterLink icon={<IconBuilding />} text="For Companies" />
            <FooterLink icon={<IconMonitor />} text="AI Interview" />
            <FooterLink icon={<IconSearch />} text="AI Assessment" />
            <FooterLink icon={<IconBuilding />} text="Campus Collaboration" />
            <FooterLink icon={<IconUsers />} text="Hire Better with Us" />
            <FooterLink icon={<IconCap />} text="College Services" />
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Jobs & Internships
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconBriefcase />} text="Jobs" />
            <FooterLink icon={<IconInfinity />} text="Internships" />
            <FooterLink icon={<IconCode />} text="IT & CS Jobs" />
            <FooterLink icon={<IconSearch />} text="Technical Jobs" />
            <FooterLink icon={<IconUsers />} text="Sales & Marketing Jobs" />
            <FooterLink icon={<IconBuilding />} text="Banking & E-Com Jobs" />
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
            Leagues and Events
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconMonitor />} text="My Leagues" />
            <FooterLink icon={<IconTrophy />} text="Hall of Fame" />
            <FooterLink icon={<IconRibbon />} text="Subscription" />
            <FooterLink icon={<IconUsers />} text="Community" />
            <FooterLink icon={<IconCalendar />} text="Events" />
            <FooterLink icon={<IconCode />} text="Hackathons" />
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            Discover
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconMessage />} text="Blog Shorts" />
            <FooterLink icon={<IconHelp />} text="Support & FAQ" />
            <FooterLink icon={<IconPhoneCall />} text="Contact Us" />
            <FooterLink icon={<IconShield />} text="Privacy Policy" />
            <FooterLink icon={<IconShield />} text="Terms & Conditions" />
            <FooterLink icon={<IconShield />} text="Shipping Policy" />
            <FooterLink icon={<IconShield />} text="Cancellation Policy" />
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Contact Info
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconMapPin />} text="Palam, New Delhi" />
            <FooterLink icon={<IconMail />} text="info@uptoskills.com" />
            <FooterLink icon={<IconPhoneCall />} text="+91-9319772294" />
          </ul>
        </div>
      </div>

      <hr className="border-white/10 mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h4 className="font-bold text-white mb-4 text-center md:text-left">
            Connect with us
          </h4>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-md bg-[#0077b5] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-[#1da1f2] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-[#ff0000] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-[#5865F2] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-[#0088cc] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h4 className="font-bold text-white mb-4">Download Our App</h4>
          <div className="flex items-center gap-3 bg-[#11231f] border border-green-800/60 hover:bg-[#16332c] transition-colors rounded-lg px-4 py-2 cursor-pointer w-fit shadow-lg shadow-green-900/20">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 3L18 12L4 21V3Z" fill="#32c36c" />
              <path d="M4 3L11.5 16.5L18 12L4 3Z" fill="#1f9b52" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-gray-300 uppercase leading-none mb-1">
                Get it on
              </span>
              <span className="text-sm text-white font-semibold leading-none mb-1">
                Google Play
              </span>
              <span className="text-[10px] text-green-400 font-medium leading-none">
                Live Now!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
