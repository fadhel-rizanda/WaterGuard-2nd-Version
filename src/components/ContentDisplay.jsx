import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const ContentDisplay = ({ filteredData, onSelectData }) => {
  const [localSelectedData, setLocalSelectedData] = useState(null);

  useEffect(() => {
    if (localSelectedData) {
      onSelectData(localSelectedData);
    }
  }, [localSelectedData, onSelectData]);

  const getCategoryClass = (category) => {
    switch (category) {
      case "Good":
        return "text-blue-500";
      case "Quite Good":
        return "text-teal-400";
      case "Lightly Polluted":
        return "text-green-500";
      case "Moderately Polluted":
        return "text-yellow-500";
      case "Heavily Polluted":
        return "text-red-500";
      default:
        return "";
    }
  };

  const getScoreClass = (score) => {
    if (score >= 70) return "text-blue-500";
    if (score >= 60) return "text-teal-400";
    if (score >= 50) return "text-green-500";
    if (score >= 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      {filteredData.length > 0 ? (
        filteredData.map((e, index) => (
          <div
            key={index}
            className="cursor-pointer justify-center flex flex-col hover:bg-gray-300 active:bg-gray-200 w-full sm:w-2/5 md:w-1/3 lg:w-1/4 shadow-custom rounded-lg min-h-40 sm:min-h-48"
            onClick={() => setLocalSelectedData(e)}
          >
            <div className="p-4 flex flex-col sm:flex-row sm:text-sm justify-between font-semibold border-b-2 border-gray-300">
              <h3 className="w-full sm:w-2/5">{e.name}</h3>
              <div className="text-left sm:text-right font-normal mt-2 sm:mt-0">
                {e.lastUpdate}
              </div>
            </div>
            <div className="p-4">
              {e.status === "verified" ? (
                <>
                  <p className="text-green-500 flex items-center gap-1">
                    <span className="text-black">Status:</span> {e.status}
                  </p>
                  <span className={getCategoryClass(e.ikaCategories)}>
                    <span className="text-black">Category: </span>
                    {e.ikaCategories}
                    <span className={getScoreClass(e.ika_score)}>
                      {" "}
                      - {e.ika_score} IKA Score
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <p className="text-red-500 flex items-center gap-1">
                    <span className="text-black">Status:</span> {e.status}
                  </p>
                  <span className={getCategoryClass(e.ikaCategories)}>
                    <span className="text-black">Category: </span>
                    {e.ikaCategories}
                  </span>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full text-center">- No data found -</div>
      )}
    </>
  );
};

ContentDisplay.propTypes = {
  filteredData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      ikaCategories: PropTypes.string.isRequired,
      lastUpdate: PropTypes.string.isRequired,
      ika_score: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelectData: PropTypes.func.isRequired,
};
