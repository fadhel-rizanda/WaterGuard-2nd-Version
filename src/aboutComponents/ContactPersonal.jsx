import PropTypes from "prop-types";
export const ContactPersonal = ({ logo, value, link }) => {
  return (
    <a href={link} target="_blank" className="flex cursor-pointer hover:bg-gray-200 gap-5 p-1 px-1.5 w-fit rounded-lg hover:shadow-custom items-center hover:ml-3 sm:hover:ml-5 trasition ease-out duration-1000 group text-lg sm:text-xl font-light ">
      <img src={logo} alt="email" className="h-6 " />
      <div className="group-hover:font-semibold sm:group-hover:font-bold trasition ease-out duration-1000">
        {value}
      </div>
    </a>
  );
};
ContactPersonal.propTypes = {
  logo: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  link: PropTypes.string,
};
