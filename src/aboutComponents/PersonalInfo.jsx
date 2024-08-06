import { useEffect, useState } from "react";
import imagePersonal from "/ASSET/image-background/personal-pict.jpg";

import imageLinkedin from "/ASSET/image-logo/image-logo-software/linkedinContact.png";
import imageWhatsapp from "/ASSET/image-logo/image-logo-software/whatsappContact.png";
import imageGithub from "/ASSET/image-logo/image-logo-software/github.png";
import imageInstagram from "/ASSET/image-logo/image-logo-software/instagramContact.png";

import { ContactPersonal } from "./ContactPersonal";
import { EmailPersonal } from "./EmailPersonal";

export const PersonalInfo = () => {
  const [titleActive, setTitleActive] = useState(false);

  useEffect(() => {
    const handleWindowSize = () => {
      if (window.innerWidth < 767) {
        setTitleActive(true);
      } else {
        setTitleActive(false);
      }
    };

    window.addEventListener("resize", handleWindowSize);
    handleWindowSize();

    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center">
      <div className="md:w-1/3 rounded-3xl flex items-center md:items-start justify-center gap-5">
        <img
          src={imagePersonal}
          alt="Personal portrait of Fadhel Baihaqi Rizanda"
          className="rounded-2xl shadow-custom w-1/3 md:w-full"
        />
        {titleActive && (
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-end flex flex-col">
            <div>My</div>
            <div className="font-light">Personal</div>
            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight">
              Information
            </div>
          </div>
        )}
      </div>
      {/* DetailPersonalInfo.jsx */}
      <div className="md:w-1/2">
        {!titleActive && (
          <div className="text-5xl md:text-8xl lg:text-9xl font-bold md:text-end flex flex-col text-center">
            <div>My</div>
            <div className="font-light">Personal</div>
            <div className="text-4xl md:text-7xl lg:text-8xl font-extralight">
              Information
            </div>
          </div>
        )}

        <div className="px-10 md:px-0 text-sm xl:text-base flex flex-col gap-7  lg:mt-7">
          <div className="">
            I’m Fadhel Baihaqi Rizanda, a 20-year-old software engineering
            student currently in my 5th semester at Binus University. Residing
            in Harapan Indah, Pejuang, Medan Satria, Bekasi Kota, Jawa Barat, I
            am deeply committed to refining my technical skills and preparing
            for my future career. My academic journey is driven by a strong
            passion to excel and equip myself for the professional world,
            particularly with upcoming internships in semesters 6-7. My aim is
            to rapidly adapt to real-world work environments, leveraging the
            skills and knowledge I acquire to build a solid foundation for a
            successful career in software engineering.
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-4xl font-semibold">My Contacts:</div>
            <ul className="flex flex-col gap-3 sm:mx-5">
              <EmailPersonal />
              <ContactPersonal logo={imageWhatsapp} value="+62 821 176 14370" />
              <ContactPersonal
                logo={imageLinkedin}
                value="Fadhel Rizanda"
                link="https://www.linkedin.com/in/fadhelrizanda?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              />
              <ContactPersonal
                logo={imageGithub}
                value="fadhel-rizanda"
                link="https://github.com/fadhel-rizanda"
              />
              <ContactPersonal
                logo={imageInstagram}
                value="@fadhelbrr"
                link="https://www.instagram.com/fadhelbrr?igsh=YjV2bTVnbTRkcWgx"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
