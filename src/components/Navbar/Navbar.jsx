import Link from "next/link";
import { useRouter } from "next/router";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleMenu = () => {
    setOpen(!open);
  };

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
                className={`${
                  router.pathname.startsWith(route.path)
                    ? "text-Primary font-bold text-sm md:text-lg relative border-b-2 border-Primary"
                    : "text-TEXT_P font-normal text-sm md:text-lg"
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 font-OpenSans text-lg text-TEXT_P">
          <Image src="/svgs/Control.svg" alt="Control" width={24} height={24} />
          <div>{username}</div>
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
          className={`${
            open
              ? "flex flex-col items-center gap-4 p-4 transition-all ease-in opacity-100"
              : "hidden"
          }`}
        >
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`${
                router.pathname.startsWith(route.path)
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
