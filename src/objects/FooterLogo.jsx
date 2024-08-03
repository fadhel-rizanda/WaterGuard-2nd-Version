import PropTypes from "prop-types";

export const FooterLogo = ({ logo, value }) => {
  return (
    <div className="hover:pl-2 flex md:text-xl items-center gap-2 cursor-pointer hover:text-gray-400 trasition ease-out duration-500">
      <img src={logo} alt="" className="w-6 h-6 md:w-7 md:h-7" />
      {value}
    </div>
  );
};

FooterLogo.propTypes = {
  logo: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
