import PropTypes from "prop-types";

export const IndicatorFile = ({ left, value, right, description }) => {
  return (
    <div className="flex items-center gap-5 hover:pl-10 font-light hover:font-semibold hover:text-black text-gray-400 trasition ease-out duration-1000 w-fit">
      <div className="flex w-fit justify-between text-center border-2 shadow-custom items-center gap-2 p-3 rounded-full">
        {left && <img src={left} className="w-10" alt="Left icon" />}
        <div>{value}</div>
        {right && <img src={right} className="w-10" alt="Right icon" />}
      </div>
      {description}
    </div>
  );
};

IndicatorFile.propTypes = {
  left: PropTypes.string,
  value: PropTypes.string.isRequired,
  right: PropTypes.string,
  description: PropTypes.string,
};

IndicatorFile.defaultProps = {
  left: "",
  right: "",
};
