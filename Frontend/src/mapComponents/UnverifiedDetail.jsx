import PropTypes from "prop-types";
import { ReportUpdate } from "./ReportUpdate";
import { useState } from "react";
import { VerificationDisplay } from "./VerificationDisplay";

export const UnverifiedDetail = ({ selectedData, onClose, onUpdate }) => {
  const [showReportUpdate, setShowReportUpdate] = useState(false);

  const handleUpdate = () => {
    console.log("Update triggered");
    if (onUpdate) {
      onUpdate();
    }
  };

  return (
    <>
      <div className="flex flex-col lg:gap-2 overflow-auto max-h-[80vh] no-scrollbar">
        <VerificationDisplay selectedData={selectedData} onClose={onClose} />

        {showReportUpdate ? (
          <ReportUpdate
            selectedData={selectedData}
            onClose={() => {
              setShowReportUpdate(false);
            }}
            onUpdate={handleUpdate}
          />
        ) : (
          <div className="pt-5">
            <button
              className="text-start rounded-xl text-white p-2 bg-slate-500 hover:bg-slate-400 active:bg-slate-300 trasition ease-out duration-200"
              onClick={() => setShowReportUpdate(true)}
            >
              Report Update
            </button>
          </div>
        )}
      </div>
    </>
  );
};

UnverifiedDetail.propTypes = {
  selectedData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    ikaCategories: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reporter_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
