import PropTypes from "prop-types";
import { VerifiedDetail } from "./VerifiedDetail";
import { UnverifiedDetail } from "./UnverifiedDetail";
export const DetailDisplay = ({ selectedData, onClose, onUpdate }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-fit  sm:max-w-3xl rounded-xl border-2 shadow-custom items-center p-7 mx-10 pt-2 flex flex-col text-center sm:text-left">
        {selectedData.status === "verified" ? (
          <VerifiedDetail
            selectedData={selectedData}
            onClose={onClose}
            onUpdate={onUpdate}
          />
        ) : (
          <UnverifiedDetail
            selectedData={selectedData}
            onClose={onClose}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </div>
  );
};

DetailDisplay.propTypes = {
  selectedData: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    ikaCategories: PropTypes.string,
    lastUpdate: PropTypes.string,
    description: PropTypes.string,
    reporter_name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
