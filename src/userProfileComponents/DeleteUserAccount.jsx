import { CloseDisplay } from "../objects/CloseDisplay";
import PropTypes from "prop-types";

export const DeleteUserAccount = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white  w-4/5  sm:max-w-3xl rounded-xl border-2 shadow-custom p-7 pt-2 flex flex-col text-center sm:text-left">
        <div className="flex flex-col lg:gap-2 overflow-auto max-h-[80vh] no-scrollbar"></div>
        <CloseDisplay onClose={onClose} />
        <div className="">DeleteUserAccount</div>
      </div>
    </div>
  );
};

DeleteUserAccount.propTypes = {
//   selectedUser: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//   }),
  onClose: PropTypes.func,
};
