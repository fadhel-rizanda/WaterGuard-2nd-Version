import PropTypes from "prop-types";
import noData from "/ASSET/image-logo/image-logo-location/location-no_data.png";
import { CloseDisplay } from "../objects/CloseDisplay";

export const VerificationDisplay = ({ selectedData, onClose }) => {
  const getScoreClass = (score) => {
    if (score >= 70) return "text-blue-500";
    else if (score >= 60 && score < 70) return "text-teal-400";
    else if (score >= 50 && score < 60) return "text-green-500";
    else if (score >= 30 && score < 50) return "text-yellow-500";
    else return "text-red-500";
  };

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
        return "text-gray-500";
    }
  };
  return (
    <>
      <CloseDisplay onClose={onClose} />
      {selectedData ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between flex-col xl:flex-row font-medium text-xl sm:text-2xl gap-10">
            <div className="md:w-80">
              <div className="max-w-sm">{selectedData.name}</div>
              <div className={getCategoryClass(selectedData.ikaCategories)}>
                {selectedData.ikaCategories}
                {selectedData.status === "verified" && (
                  <>
                    <span className={getScoreClass(selectedData.ika_score)}>
                      {" "}
                      - {selectedData.ika_score} IKA Score
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-center sm:justify-start">
              <div className="font-light">{selectedData.lastUpdate}</div>

              {selectedData.status === "unverified" ? (
                <div className="text-red-500 text-xl font-semibold">
                  {selectedData.status}
                </div>
              ) : (
                <div className="text-green-500 text-xl font-semibold">
                  {selectedData.status}
                </div>
              )}
            </div>
          </div>

          {selectedData.status === "unverified" && (
            <div className="font-light">
              Reported By: {selectedData.reporter_name}
            </div>
          )}

          <div className="text-sm md:text-base">{selectedData.description}</div>
        </div>
      ) : (
        <div className="flex text-4xl justify-center text-center gap-3">
          <img src={noData} alt="No data" className="w-10" />
          No Data Available...
        </div>
      )}
    </>
  );
};

VerificationDisplay.propTypes = {
  selectedData: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    ikaCategories: PropTypes.string,
    ika_score: PropTypes.number,
    lastUpdate: PropTypes.string,
    description: PropTypes.string,
    reporter_name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
