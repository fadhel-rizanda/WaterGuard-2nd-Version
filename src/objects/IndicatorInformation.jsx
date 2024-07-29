import PropTypes from "prop-types";
export const IndicatorInformation = ({ location, value }) => {
  return (
    <div className="flex gap-1 items-center p-0.5 pr-2 rounded-xl hover:bg-gray-100 w-fit">
      <img src={location} alt="" className="w-4 h-4 md:w-5 md:h-5" />
      <div className="text-sm md:text-lg font-light">
        Water Quality <b className="font-bold">{value}</b>
      </div>
    </div>
  );
};

IndicatorInformation.propTypes = {
  location: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
