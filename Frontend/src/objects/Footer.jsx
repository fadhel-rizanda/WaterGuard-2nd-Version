import appLogo from "/ASSET/image-logo/waterGuard.png";
import emailLogo from "/ASSET/image-logo/emailFooter.png";
import instagramLogo from "/ASSET/image-logo/instagramFooter.png";
import facebookLogo from "/ASSET/image-logo/facebookFooter.png";
import phoneLogo from "/ASSET/image-logo/phoneFooter.png";
import twitterLogo from "/ASSET/image-logo/twitterFooter.png";
import loginLogo from "/ASSET/image-logo/loginFooter.png";
import homeLogo from "/ASSET/image-logo/homeFooter.png";
import monitoringLogo from "/ASSET/image-logo/monitoringFooter.png";
import aboutLogo from "/ASSET/image-logo/aboutFooter.png";
import { FooterLogo } from "./FooterLogo";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="bg-blue-950 pb-20 sm:pb-28 sm:pt-20 sm:px-10 text-white flex flex-col items-center gap-10">
        <div className="flex flex-wrap xl:items-start items-center  gap-5 sm:gap-10 justify-center border-t-orange-50 border-t-2 pt-10 md:pt-16 lg:px-10">
          <Link
            to={"/"}
            className="cursor-default w-fit h-fit flex flex-col gap-2 items-center hover:text-blue-400 trasition ease-out duration-300"
          >
            <div className="flex items-center">
              <img src={appLogo} alt="WaterGuard Logo" className="w-20" />
              <div className="text-3xl sm:text-5xl font-bold">WaterGuard</div>
            </div>
            <div className="font-thin text-base md:text-xl">
              Water Clarity Starts with Smart Monitoring
            </div>
          </Link>

          <div className="flex flex-col gap-3 sm:w-32">
            <Link to={"/"}>
              <FooterLogo logo={homeLogo} value={"Home"} />
            </Link>
            <Link to={"/monitoring"}>
              <FooterLogo logo={monitoringLogo} value={"Monitoring"} />
            </Link>
            <Link to={"/about"}>
              <FooterLogo logo={aboutLogo} value={"About"} />
            </Link>
            <Link to={"/loginSignin"}>
              <FooterLogo logo={loginLogo} value={"Login"} />
            </Link>
          </div>

          <div className="flex flex-col text-sm sm:text-base md:text-xl gap-3 sm:w-72">
            <FooterLogo logo={emailLogo} value={"WaterGuard@gmail.com"} />
            <FooterLogo logo={phoneLogo} value={"+62 821 176 14370"} />
            <FooterLogo logo={facebookLogo} value={"WaterGuard"} />
            <FooterLogo logo={twitterLogo} value={"@waterGuard"} />
            <FooterLogo logo={instagramLogo} value={"@WaterGuard"} />
          </div>
        </div>

        <div className="text-sm sm:text-basemd:text-xl">
          Created by{" "}
          <a
            href="mailto:fadhelrizanda@gmail.com"
            className="text-blue-400 font-semibold hover:text-white hover:font-bold trasition ease-out duration-500"
          >
            fadhelrizanda@gmail.com
          </a>
          . | © 2024.
        </div>
      </footer>
    </>
  );
};
