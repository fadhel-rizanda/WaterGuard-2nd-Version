import { FooterLogo } from "../objects/FooterLogo";
import emailLogo from "/ASSET/image-logo/email.png";
import instagramLogo from "/ASSET/image-logo/instagram.png";
import facebookLogo from "/ASSET/image-logo/facebook.png";
import phoneLogo from "/ASSET/image-logo/phone.png";
import twitterLogo from "/ASSET/image-logo/twitter.png";

export const ContactsContent = () => {
  return (
    <div className="w-1/2">
      <div className="flex flex-col gap-3 w-fit text-xl">
        <FooterLogo logo={emailLogo} value={"WaterGuard@gmail.com"} />
        <FooterLogo logo={phoneLogo} value={"+62 821 176 14370"} />
        <FooterLogo logo={facebookLogo} value={"WaterGuard"} />
        <FooterLogo logo={twitterLogo} value={"@waterGuard"} />
        <FooterLogo logo={instagramLogo} value={"@WaterGuard"} />
      </div>
    </div>
  );
};
