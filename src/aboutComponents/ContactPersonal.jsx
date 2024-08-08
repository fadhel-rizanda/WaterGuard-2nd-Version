import PropTypes from "prop-types";
import { useState } from "react";
export const ContactPersonal = ({ logo, value, link }) => {
  const [copyWhatsapp, setCopyWhatsapp] = useState(false);
  const [enableCopyWhatsapp, setEnableCopyWhatsapp] = useState(true);

  const handleCopyWhatsapp = () => {
    navigator.clipboard
      .writeText("+62 821 176 14370")
      .then(() => {
        setEnableCopyWhatsapp(false);
        setTimeout(() => setEnableCopyWhatsapp(true), 5000);
      })
      .catch((err) => console.error("Failed to copy Whatsapp: ", err));
  };

  const handleClick = () => {
    if (value === "+62 821 176 14370") {
      setCopyWhatsapp(!copyWhatsapp);
    }
  };

  return (
    <div className="flex gap-5">
      <a
        href={link}
        onClick={handleClick}
        target="_blank"
        className={`flex cursor-pointer hover:bg-gray-200 gap-5 p-1 px-1.5 w-fit rounded-lg hover:shadow-custom items-center hover:ml-3 sm:hover:ml-5 trasition ease-out duration-1000 group text-lg sm:text-xl font-light ${copyWhatsapp && "ml-3 sm:ml-5  bg-gray-200 font-semibold sm:font-bold"}`}
      >
        <img src={logo} alt="Whatsapp" className="h-6 " />
        <div className=" trasition ease-out duration-1000">
          {value}
        </div>
      </a>
      <div className="flex justify-center items-center">
        {copyWhatsapp && (
          <button
            className={`text-sm text-gray-500 h-fit p-1 rounded-lg bg-gray-200 border-2 ${
              enableCopyWhatsapp
                ? "hover:bg-gray-100 active:bg-gray-100"
                : "cursor-not-allowed opacity-50 "
            }`}
            onClick={enableCopyWhatsapp ? handleCopyWhatsapp : undefined}
            disabled={!enableCopyWhatsapp}
          >
            {enableCopyWhatsapp ? "Copy" : "Copied!"}
          </button>
        )}
      </div>
    </div>
  );
};
ContactPersonal.propTypes = {
  logo: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  link: PropTypes.string,
};
