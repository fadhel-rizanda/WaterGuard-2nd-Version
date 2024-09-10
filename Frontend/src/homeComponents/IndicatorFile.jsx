import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const IndicatorFile = ({ left, value, right, description }) => {
  const [logoActive, setLogoActive] = useState(false);

  useEffect(() => {
    const handleWindowSize = () => {
      if (window.innerWidth >= 901) {
        setLogoActive(true);
      } else {
        setLogoActive(false);
      }
    };

    window.addEventListener("resize", handleWindowSize);
    handleWindowSize();

    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  return (
    <div className="flex items-center gap-5 lg:hover:pl-5  font-light hover:font-semibold hover:text-black text-gray-400 trasition ease-out duration-1000 w-fit ">
      <div className="flex w-fit justify-between  hover:p-5 lg:hover:p-3 text-center border-2 shadow-custom items-center gap-2 p-3 rounded-full trasition ease-out duration-1000">
        {left && <img src={left} className="w-10" alt="Left icon" />}
        <div>{value}</div>
        {right && <img src={right} className="w-10" alt="Right icon" />}
      </div>
      {logoActive && description && (
        <div className="text-xs xl:text-base">{description}</div>
      )}
    </div>
  );
};

IndicatorFile.propTypes = {
  left: PropTypes.string,
  value: PropTypes.string.isRequired,
  right: PropTypes.string,
  description: PropTypes.string,
};
