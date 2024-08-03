import appLogo from "/ASSET/image-logo/waterGuard.png";
import loginLogo from "/ASSET/image-logo/login.png";
import hamburgerLogo from "/ASSET/image-logo/hamburger.png";
import homeLogo from "/ASSET/image-logo/home.png";
import monitoringLogo from "/ASSET/image-logo/monitoring.png";
import aboutLogo from "/ASSET/image-logo/about.png";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
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
          <div className="flex items-center cursor-pointer w-fit hover:pl-2 transition-padding duration-500 ease-out">
            <img
              src={appLogo}
              alt="WaterGuard Logo"
              className="w-10 lg:w-12 h-auto"
            />
            <div className="text-2xl lg:text-3xl hover:font-semibold hover:text-gray-400 active:text-gray-300 font-light trasition ease-out duration-500">
              WaterGuard
            </div>
          </div>
        </div>

        <div className="hidden md:flex gap-10">
          <div className="cursor-pointer hover:text-gray-400 transition ease-out duration-100 active:text-gray-300">
            <div className="hover:font-bold trasition ease-out duration-300">
              Home
            </div>
          </div>
          <div className="cursor-pointer hover:text-gray-400 transition ease-out duration-100 active:text-gray-300">
            <div className="hover:font-bold trasition ease-out duration-300">
              Monitoring
            </div>
          </div>
          <div className="cursor-pointer hover:text-gray-400 transition ease-out duration-100 active:text-gray-300">
            <div className="hover:font-bold trasition ease-out duration-300">
              About
            </div>
          </div>
        </div>

        <div className="flex gap-5 items-center w-1/3 justify-end">
          <img
            src={hamburgerLogo}
            alt="Hamburger Icon"
            className="w-7 hover:px-0 px-1 active:px-0 h-5 flex md:hidden active:bg-gray-300 rounded-xl cursor-pointer transition-padding duration-200 ease-out"
            onClick={handleHamburger}
          />
          <div className="flex items-center gap-1 justify-end w-20 hover:pr-2 cursor-pointer hover:text-gray-400 active:text-gray-300 transition-padding duration-500 ease-out">
            <img src={loginLogo} alt="Login Icon" className="w-5 h-5" />
            <div className="hover:font-semibold hover:text-gray-400 active:text-gray-300 font-light trasition ease-out duration-500">
              Login
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-opacity-75 flex justify-center mt-14 w-full bg-gray-300 z-40 menu-transition ${
          hamburgerActive ? "menu-transition-active" : ""
        }`}
      >
        <div className="flex opacity-85 bg-white h-3/4 shadow-custom w-full flex-col gap-5 text-xl font-semibold p-10 rounded-b-3xl">
          <div className="cursor-pointer hover:text-gray-400 hover:pl-1 active:text-gray-300 flex gap-1 items-center border-b-2 border-black pb-3 transition-padding duration-200 ease-out">
            <img src={homeLogo} alt="Home Icon" className="w-8" />
            <div className="mt-1">Home</div>
          </div>
          <div className="cursor-pointer hover:text-gray-400 hover:pl-1 active:text-gray-300 flex gap-1 items-center border-b-2 border-black pb-3 transition-padding duration-200 ease-out">
            <img src={monitoringLogo} alt="Monitoring Icon" className="w-8" />
            <div className="">Monitoring</div>
          </div>
          <div className="cursor-pointer hover:text-gray-400 hover:pl-1 active:text-gray-300 flex gap-1 items-center border-b-2 border-black pb-3 transition-padding duration-200 ease-out">
            <img src={aboutLogo} alt="About Icon" className="w-8" />
            <div className="">About</div>
          </div>
        </div>
      </div>
    </>
  );
};
