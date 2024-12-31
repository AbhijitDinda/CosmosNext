// import { NavLink } from "react-router-dom";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Candidates",
      path: "/candidates",
    },
    {
      name: "Assessments",
      path: "/assessments",
    },
    {
      name: "Test Groups",
      path: "/test-groups",
    },
    {
      name: "Admin Accounts",
      path: "/admin-accounts",
    },
  ];

  const username = "Hi User";
  return (
    <>
      <div className="border fixed top-0 hidden lg:flex justify-between w-full py-2 md:py-3 px-8 md:px-11 items-center bg-White z-10">
        <div className="flex justify-center items-center gap-1 md:gap-14">
          <img src="/svgs/logo.svg" alt="" className="size-12" />
          {
            <div className="flex p-2 justify-center items-center md:gap-10">
              {routes.map((route) => (
                <Link
                  href={route.path}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "text-TEXT_P text-sm md:text-lg"
                      : isActive
                        ? "text-Primary font-bold text-sm md:text-lg relative border-b-2 border-Primary"
                        : "text-TEXT_P normal text-sm md:text-lg"
                  }
                >
                  {route.name}
                  <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 bg-Primary transition-all duration-200 ease-in-out" />
                </Link>
              ))}
            </div>
          }
        </div>

        <div className="flex justify-center items-center gap-5 font-OpenSans text-lg text-TEXT_P">
          <img src="/svgs/Control.svg" alt="" />
          <div>{username}</div>
        </div>
      </div>

      <div className="lg:hidden border bg-White">
        <div className="flex justify-between items-center p-4 border-b-2">
          <div className="flex gap-4 items-center">
            <MenuIcon
              size={24}
              onClick={handleMenu}
              className="cursor-pointer"
            />
            <img src="/svgs/logo.svg" alt="" className="size-8" />
          </div>
          <img src="/svgs/Control.svg" alt="" />
        </div>
        <div
          className={
            open
              ? "flex flex-col items-center gap-4 p-4 duration-500 transition-all ease-in opacity-100 size-full origin-center"
              : "hidden"
          }
        >
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-TEXT_P text-sm md:text-lg"
                  : isActive
                    ? "text-Primary font-bold text-sm md:text-lg relative border-b-2 border-Primary"
                    : "text-TEXT_P font-normal text-sm md:text-lg relative group"
              }
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
