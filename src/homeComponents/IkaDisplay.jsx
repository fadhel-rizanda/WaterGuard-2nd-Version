import PropTypes from "prop-types";

export const IkaDisplay = ({ getData }) => {
  const getCategoryClass = (category) => {
    switch (category) {
      case "Good":
        return "-blue-500";
      case "Quite Good":
        return "-teal-400";
      case "Lightly Polluted":
        return "-green-500";
      case "Moderately Polluted":
        return "-yellow-500";
      case "Heavily Polluted":
        return "-red-500";
      default:
        return "-gray-500";
    }
  };
  return (
    <div>
      {getData.ika_score ? (
        <div
          className={`cursor-default group bg-black w-fit p-1 md:p-2 h-max bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white border${getCategoryClass(
            getData.ikaCategories
          )} hover:border-opacity-100 border-opacity-50 trasition ease-out duration-1000 group`}
        >
          <div
            className={`bg${getCategoryClass(
              getData.ikaCategories
            )} opacity-80  group-hover:opacity-100 flex flex-col gap-0 text-black p-1 md:p-9 h-14 w-14 md:h-12 md:w-12 items-center justify-center rounded-full trasition ease-out duration-500`}
          >
            <div className="font-bold text-xs">IKA</div>
            <div className="text-xl">{getData.ika_score}</div>
          </div>
        </div>
      ) : (
        <div
          className={`cursor-default group bg-black w-fit p-1 md:p-2 h-max bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white border${getCategoryClass(
            getData.ikaCategories
          )} hover:border-opacity-100 border-opacity-50 trasition ease-out duration-1000 group`}
        >
          <div
            className={`bg${getCategoryClass(
              getData.ikaCategories
            )} opacity-80  group-hover:opacity-100 flex flex-col gap-0 text-black md:p-9 h-14 w-20 md:h-12 md:w-12 items-center justify-center rounded-xl trasition ease-out duration-500`}
          >
            <div className="text-xs text-center">{getData.ikaCategories}</div>
          </div>
        </div>
      )}
    </div>
  );
};

IkaDisplay.propTypes = {
  getData: PropTypes.object,
};
