import Link from "next/link";
import { useRouter } from "next/router";
import { MenuIcon } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { User, LogOut } from 'lucide-react';
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown
  const router = useRouter();

  const handleMenu = () => {
    setOpen(!open);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const routes = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Candidates", path: "/candidates" },
    { name: "Assessments", path: "/assessments" },
    { name: "Test Groups", path: "/test-groups" },
    { name: "Admin Accounts", path: "/admin-accounts" },
  ];

  const username = "Hi User";

  return (
    <>
      {/* Desktop Navbar */}
      <div className="border fixed top-0 hidden lg:flex justify-between w-full py-2 md:py-3 px-8 md:px-11 items-center bg-white z-10">
        <div className="flex justify-center items-center gap-1 md:gap-14">
          <Image src="/svgs/logo.svg" alt="Logo" width={48} height={48} />
          <div className="flex p-2 justify-center items-center md:gap-10">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`${router.pathname.startsWith(route.path)
                    ? "text-Primary font-bold text-sm md:text-lg relative border-b-2 border-Primary"
                    : "text-TEXT_P font-normal text-sm md:text-lg"
                  }`}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center items-center gap-5 font-OpenSans text-lg text-TEXT_P">
          <Image src="/svgs/Control.svg" alt="Control" width={24} height={24} />
          <div>{username}</div>
          <div
            ref={dropdownRef} // Attach ref to dropdown container
            className="relative cursor-pointer"
            onClick={toggleDropdown}
          >
            <CircleUserRound />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-20 overflow-hidden">
                {/* Profile Option */}
                {/* <div
                  className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
                  onClick={handleProfile}
                >
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  Profile
                </div> */}

                {/* Log Out Option */}
                <div
                  className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 cursor-pointer transition duration-150 ease-in-out"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-2" /> {/* Lucide Log Out Icon */}
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden border bg-white">
        <div className="flex justify-between items-center p-4 border-b-2">
          <div className="flex gap-4 items-center">
            <MenuIcon
              size={24}
              onClick={handleMenu}
              className="cursor-pointer"
            />
            <Image src="/svgs/logo.svg" alt="Logo" width={32} height={32} />
          </div>
          <Image src="/svgs/Control.svg" alt="Control" width={24} height={24} />
        </div>
        <div
          className={`${open
              ? "flex flex-col items-center gap-4 p-4 transition-all ease-in opacity-100"
              : "hidden"
            }`}
        >
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`${router.pathname.startsWith(route.path)
                  ? "text-Primary font-bold text-sm md:text-lg relative border-b-2 border-Primary"
                  : "text-TEXT_P font-normal text-sm md:text-lg relative group"
                }`}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
