import { useEffect, useRef, useState } from "react";
import { CloseDisplay } from "../objects/CloseDisplay";
import PropTypes from "prop-types";
import alertLogo from "/ASSET/image-logo/alert.png";
import deleteActiveIcon from "/ASSET/image-logo/deleteActive.png";
import showLogo from "/ASSET/image-logo/mdi--show-outline.png";
import hideLogo from "/ASSET/image-logo/mdi--hide-outline.png";

export const DeleteRecord = ({ selectedData, onClose, handleSuccess }) => {
  const [passwordDelete, setPasswordDelete] = useState("");
  const [wrongPasswordDelete, setWrongPasswordDelete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const timeoutRef = useRef(null);

  const verifyText = () => {    
    if (passwordDelete !== "Admin!23_DELETE_RECORD") {
      setWrongPasswordDelete(true);
    } else {
      setWrongPasswordDelete(false);
      deleteData(selectedData.id);
    }
  };

  const deleteData = (dataID) => {
    const url = `https://api2.waterguard.asia/user-monitoring-activity/delete/${dataID}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        handleSuccess();
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleShow = () => {
    setShowPassword(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowPassword(false);
    }, 5000);
  };

  const handleHide = () => {
    setShowPassword(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white mx-20 sm:max-w-3xl rounded-xl border-2 shadow-custom items-center p-5 pb-8 pt-1 flex flex-col text-center sm:text-left gap-1"
      >
        <div className="flex justify-end w-full">
          <CloseDisplay onClose={onClose} />
        </div>

        <div className="flex gap-1 justify-center items-center flex-col font-bold text-base sm:text-xl">
          Are you sure you want to delete this record?
          <div className="font-light">
            &quot;
            {selectedData.id} - {selectedData.user_activity_description}
            &quot;
          </div>
          <span className="font-extralight text-sm sm:text-lg">
            To confirm, input password into the input box below
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between p-1 bg-white text-black rounded-md shadow-sm border-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 sm:text-sm">
            <input
              type={showPassword ? "text" : "password"}
              id="passwordDelete"
              name="passwordDelete"
              onChange={(e) => setPasswordDelete(e.target.value)}
              required
              placeholder="Enter Password"
              className="bg-white w-full focus:outline-none"
            />
            <button
              onClick={showPassword ? handleHide : handleShow}
              type="button"
            >
              <img
                src={showPassword ? hideLogo : showLogo}
                alt="toggle password visibility"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {wrongPasswordDelete && (
          <div className="mt-2 flex gap-1 text-red-500 items-center text-sm">
            <img src={alertLogo} alt="alert" className="w-3.5 h-3.5" />
            Wrong Password
          </div>
        )}

        <div className="flex gap-5 text-xs sm:text-base">
          <button
            type="button"
            className="flex h-min text-start text-red-500 mt-5 gap-1 border-2 border-red-500 bg-gray-100 hover:bg-red-100 active:bg-red-300 active:border-red-500 w-fit p-2 pl-1 text-sm rounded-xl transition ease-out duration-200"
            onClick={verifyText}
          >
            <img src={deleteActiveIcon} className="w-5 h-5" alt="delete" />
            Delete Record
          </button>

          <button
            type="button"
            className="text-start rounded-xl text-white p-2 mt-5 bg-red-500 hover:bg-red-400 active:bg-red-300 transition ease-out duration-200"
            onClick={onClose}
          >
            Cancel Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteRecord.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
  selectedData: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    location_id: PropTypes.number,
    user_activity: PropTypes.string,
    user_activity_description: PropTypes.string,
    activity_time: PropTypes.string,
  }).isRequired,
};
