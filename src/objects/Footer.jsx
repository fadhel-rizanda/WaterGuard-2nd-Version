import appLogo from "/ASSET/image-logo/waterGuard.png";
import emailLogo from "/ASSET/image-logo/emailFooter.png";
import instagramLogo from "/ASSET/image-logo/instagramFooter.png";
import facebookLogo from "/ASSET/image-logo/facebookFooter.png";
import phoneLogo from "/ASSET/image-logo/phoneFooter.png";
import twitterLogo from "/ASSET/image-logo/twitterFooter.png";

export const Footer = () => {
  return (
    <>
      <footer className="bg-blue-950 py-20 px-10 text-white flex flex-col items-center gap-20">
        <div className="  flex gap-10 justify-center">
          
          <div className="cursor-default w-fit h-fit flex flex-col gap-2 items-center">
            <div className="flex gap-4 items-center">
              <img src={appLogo} alt="WaterGuard Logo" className="w-20" />
              <div className="text-5xl font-bold">WaterGuard</div>
            </div>
            <div className="font-thin text-xl">
              Water Clarity Starts with Smart Monitoring
            </div>
          </div>

          <div className="flex flex-col gap-2 font-extralight text-2xl w-fit">
            <div className="cursor-pointer hover:text-gray-400 trasition ease-out duration-300">Home</div>
            <div className="cursor-pointer hover:text-gray-400 trasition ease-out duration-300">Monitoring</div>
            <div className="cursor-pointer hover:text-gray-400 trasition ease-out duration-300">About</div>
            <div className="cursor-pointer hover:text-gray-400 trasition ease-out duration-300">Login</div>
          </div>

          <div className="flex flex-col gap-5 font-extralight w-fit">
            <div className="flex gap-3 items-center hover:text-gray-400 trasition ease-out duration-300">
              <img src={emailLogo} alt="Email Icon" className="w-5 h-5" />
              <div>WaterGuard@gmail.com</div>
            </div>
            <div className="flex gap-3 items-center hover:text-gray-400 trasition ease-out duration-300">
              <img src={phoneLogo} alt="Phone Icon" className="w-5 h-5" />
              <div>+62 821 176 14370</div>
            </div>
            <div className="flex gap-3 items-center hover:text-gray-400 trasition ease-out duration-300">
              <img src={facebookLogo} alt="Facebook Icon" className="w-5 h-5" />
              <div>WaterGuard</div>
            </div>
            <div className="flex gap-3 items-center hover:text-gray-400 trasition ease-out duration-300">
              <img src={twitterLogo} alt="Twitter Icon" className="w-5 h-5" />
              <div>@waterGuard</div>
            </div>
            <div className="flex gap-3 items-center hover:text-gray-400 trasition ease-out duration-300">
              <img
                src={instagramLogo}
                alt="Instagram Icon"
                className="w-5 h-5"
              />
              <div>@WaterGuard</div>
            </div>
          </div>

          <div className="relative w-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15866.475045867255!2d106.9736839!3d-6.1817522999999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698bb0788036d7%3A0x911719b301d7bfb6!2sHarapan%20Indah%2C%20RT.005%2FRW.010%2C%20Medan%20Satria%2C%20Bekasi%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1722519429357!5m2!1sen!2sid"
              className="absolute top-0 left-0 w-full h-52 p-1 border-2 border-white rounded-xl hover:border-gray-400 trasition ease-out duration-500"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="">
          Created by <a href="" className="text-blue-400 font-semibold hover:text-white trasition ease-out duration-300">fadhelbaihaqir25@gmail.com</a>. | © 2024.
        </div>
      </footer>
    </>
  );
};
