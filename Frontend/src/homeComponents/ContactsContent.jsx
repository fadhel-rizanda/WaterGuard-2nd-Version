import { FooterLogo } from "../objects/FooterLogo";
import emailLogo from "/ASSET/image-logo/email.png";
import instagramLogo from "/ASSET/image-logo/instagram.png";
import facebookLogo from "/ASSET/image-logo/facebook.png";
import phoneLogo from "/ASSET/image-logo/phone.png";
import twitterLogo from "/ASSET/image-logo/twitter.png";
import image5 from "/ASSET/image-background/12980932_5113470.png";

export const ContactsContent = () => {
  return (
    <div className="flex justify-center py-10 md:pt-0">
      <div className="flex justify-center items-center md:items-start gap-8">
        <div className="hidden sm:flex w-2/5 flex-col md:mt-16 lg:mt-10">
          <img src={image5} alt="" className="w-full" />
          <div className=" sm:flex md:hidden font-semibold text-4xl xl:text-6xl 2xl:text-7xl">
            Contact Us
          </div>
        </div>

        <div className="w-fit flex flex-col gap-5 items-center justify-center md:mt-10">
          <div className="sm:hidden md:flex font-semibold text-6xl 2xl:text-7xl ">
            Contact Us
          </div>
          <div className="flex flex-col font-light text-xl xl:text-2xl 2xl:text-3xl gap-3">
            <div className="w-fit hover:font-bold ">
              <FooterLogo logo={emailLogo} value={"WaterGuard@gmail.com"} />
            </div>
            <div className="w-fit hover:font-bold">
              <FooterLogo logo={phoneLogo} value={"+62 821 176 14370"} />
            </div>
            <div className="w-fit hover:font-bold">
              <FooterLogo logo={facebookLogo} value={"WaterGuard"} />
            </div>
            <div className="w-fit hover:font-bold">
              <FooterLogo logo={twitterLogo} value={"@waterGuard"} />
            </div>
            <div className="w-fit hover:font-bold">
              <FooterLogo logo={instagramLogo} value={"@WaterGuard"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
