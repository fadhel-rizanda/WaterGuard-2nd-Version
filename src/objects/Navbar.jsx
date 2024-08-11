import appLogo from "/ASSET/image-logo/waterGuard.png";
import loginLogo from "/ASSET/image-logo/login.png";
import hamburgerLogo from "/ASSET/image-logo/hamburger.png";
import homeLogo from "/ASSET/image-logo/home.png";
import monitoringLogo from "/ASSET/image-logo/monitoring.png";
import aboutLogo from "/ASSET/image-logo/about.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export const Navbar = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const { user } = useAuthContext();

  const handleHamburger = () => {
    setHamburgerActive(!hamburgerActive);
  };

  useEffect(() => {
    const handleWindowSize = () => {
      if (window.innerWidth >= 768) {
        setHamburgerActive(false);
      }
    };

    window.addEventListener("resize", handleWindowSize);
    handleWindowSize();

    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-100 shadow-custom px-5 py-2 flex items-center justify-between lg:text-xl h-16">
        <div className="w-1/3">
          <Link
            to={"/"}
            onClick={() => setHamburgerActive(false)}
            className="flex items-center cursor-pointer w-fit hover:pl-2 transition-all duration-500 ease-out group"
          >
            <img
              src={appLogo}
              alt="WaterGuard Logo"
              className="w-10 lg:w-12 h-auto"
            />
            <div className="text-2xl lg:text-3xl group-hover:font-semibold group-hover:text-gray-400 group-active:text-gray-300 font-light transition-all ease-out duration-500">
              WaterGuard
            </div>
          </Link>
        </div>

        <div className="hidden md:flex gap-10">
          <Link
            to={"/"}
            className="cursor-pointer hover:font-semibold hover:text-gray-400 transition-all ease-out duration-500 active:text-gray-300"
          >
            Home
          </Link>
          <Link
            to={"/monitoring"}
            className="cursor-pointer hover:font-semibold hover:text-gray-400 transition-all ease-out duration-500 active:text-gray-300"
          >
            Monitoring
          </Link>
          <Link
            to={"/about"}
            className="cursor-pointer hover:font-semibold hover:text-gray-400 transition-all ease-out duration-500 active:text-gray-300"
          >
            About
          </Link>
        </div>

        <div className="flex gap-5 items-center w-1/3 justify-end">
          <div className="flex justify-end w-28 hover:pr-2 group transition-all duration-500 ease-out">
            {user ? (
              <Link
                to={"/userProfile"}
                onClick={() => setHamburgerActive(false)}
                className="flex items-center gap-1 hover:pr-2 cursor-pointer transition-all duration-500 ease-out"
              >
                <div className="flex items-center gap-1 group-hover:font-semibold group-hover:text-gray-400 active:text-gray-300 font-light transition-all duration-500">
                  <span>{user.username}</span>
                </div>
              </Link>
            ) : (
              <Link
                to={"/loginSignin"}
                onClick={() => setHamburgerActive(false)}
                className="flex items-center gap-1 hover:pr-2 cursor-pointer transition-all duration-500 ease-out"
              >
                <img src={loginLogo} alt="Login Icon" className="w-5 h-5" />
                <div className="group-hover:font-semibold group-hover:text-gray-400 active:text-gray-300 font-light transition-all duration-500">
                  Login
                </div>
              </Link>
            )}
          </div>

          <img
            src={hamburgerLogo}
            alt="Hamburger Icon"
            className="w-7 h-5 flex md:hidden px-1 rounded-xl cursor-pointer transition-all duration-200 ease-out active:bg-gray-300"
            onClick={handleHamburger}
          />
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-opacity-75 flex justify-center mt-14 w-full bg-gray-300 z-40 menu-transition ${
          hamburgerActive ? "menu-transition-active" : ""
        }`}
      >
        <div className="flex opacity-85 bg-white h-3/4 shadow-custom w-full flex-col gap-5 text-xl p-10 rounded-b-3xl">
          <Link
            to={"/"}
            onClick={() => setHamburgerActive(false)}
            className="cursor-pointer hover:text-gray-400 hover:pl-1 hover:font-bold active:text-gray-300 flex gap-1 items-center border-b-2 border-black pb-3 transition-all duration-500 ease-out"
          >
            <img src={homeLogo} alt="Home Icon" className="w-8" />
            <div className="mt-1">Home</div>
          </Link>
          <Link
            to={"/monitoring"}
            onClick={() => setHamburgerActive(false)}
            className="cursor-pointer hover:text-gray-400 hover:pl-1 hover:font-bold active:text-gray-300 flex gap-1 items-center border-b-2 border-black pb-3 transition-all duration-500 ease-out"
          >
            <img src={monitoringLogo} alt="Monitoring Icon" className="w-8" />
            <div>Monitoring</div>
          </Link>
          <Link
            to={"/about"}
            onClick={() => setHamburgerActive(false)}
            className="cursor-pointer hover:text-gray-400 hover:pl-1 hover:font-bold active:text-gray-300 flex gap-1 items-center border-b-2 border-black pb-3 transition-all duration-500 ease-out"
          >
            <img src={aboutLogo} alt="About Icon" className="w-8" />
            <div>About</div>
          </Link>
        </div>
      </div>
    </>
  );
};
