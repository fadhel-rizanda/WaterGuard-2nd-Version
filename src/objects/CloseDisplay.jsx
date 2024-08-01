import PropTypes from "prop-types";
export const CloseDisplay = ({ onClose }) => {
  return (
    <div className="flex  justify-end">
      <button
        className="text-right text-3xl w-min hover:text-red-500 active:text-red-300 trasition ease-out duration-200"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};
CloseDisplay.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};
