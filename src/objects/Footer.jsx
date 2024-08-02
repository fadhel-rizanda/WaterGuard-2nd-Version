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

export const Footer = () => {
  return (
    <>
      <footer className="bg-blue-950 pb-28 pt-20 px-10 text-white flex flex-col items-center gap-10">
        <div className="flex flex-wrap  xl:items-start items-center  gap-10 justify-center border-t-orange-50 border-t-2 pt-10 md:pt-16 lg:px-10">
          <div className="cursor-default w-fit h-fit flex flex-col gap-2 items-center hover:text-blue-400 trasition ease-out duration-300">
            <div className="flex gap-4 items-center">
              <img src={appLogo} alt="WaterGuard Logo" className="w-20" />
              <div className="text-5xl font-bold">WaterGuard</div>
            </div>
            <div className="font-thin text-xl">
              Water Clarity Starts with Smart Monitoring
            </div>
          </div>

          <div className="flex flex-col gap-3 w-fit">
            <FooterLogo logo={homeLogo} value={"Home"} />
            <FooterLogo logo={monitoringLogo} value={"Monitoring"} />
            <FooterLogo logo={aboutLogo} value={"About"} />
            <FooterLogo logo={loginLogo} value={"Login"} />
          </div>

          <div className="flex flex-col gap-3 w-fit">
            <FooterLogo logo={emailLogo} value={"WaterGuard@gmail.com"} />
            <FooterLogo logo={phoneLogo} value={"+62 821 176 14370"} />
            <FooterLogo logo={facebookLogo} value={"WaterGuard"} />
            <FooterLogo logo={twitterLogo} value={"@waterGuard"} />
            <FooterLogo logo={instagramLogo} value={"@WaterGuard"} />
          </div>
        </div>

        <div className="md:text-xl">
          Created by{" "}
          <a
            href=""
            className="text-blue-400 font-semibold hover:text-white hover:font-bold trasition ease-out duration-500"
          >
            fadhelbaihaqir25@gmail.com
          </a>
          . | © 2024.
        </div>
      </footer>
    </>
  );
};
