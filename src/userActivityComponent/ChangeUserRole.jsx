import { useEffect, useRef, useState } from "react";
import { CloseDisplay } from "../objects/CloseDisplay";
import PropTypes from "prop-types";
import alertLogo from "/ASSET/image-logo/alert.png";
import showLogo from "/ASSET/image-logo/mdi--show-outline.png";
import hideLogo from "/ASSET/image-logo/mdi--hide-outline.png";

export const ChangeUserRole = ({ userForm, onClose, handleSuccess }) => {
  const [passwordDelete, setPasswordDelete] = useState("");
  const [wrongPasswordDelete, setWrongPasswordDelete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [updatedRole, setUpdatedRole] = useState(userForm.role);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const verifyText = () => {
    if (passwordDelete !== "Admin!23_CHANGE_USER_ROLE") {
      setWrongPasswordDelete(true);
    } else {
      setWrongPasswordDelete(false);
      handleUpdate(userForm.id);
      console.log(userForm.id, updatedRole);
    }
  };

  const handleUpdate = (dataID) => {
    setLoading(true);
    const url = `http://localhost:8081/user-accounts/update-role/${dataID}`;

    const updatedData = {
      role: updatedRole,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        setLoading(false);
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
        setLoading(false);
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
      <div ref={modalRef} className="bg-white mx-20 sm:max-w-3xl rounded-xl border-2 shadow-custom items-center p-5 pb-8 pt-1 flex flex-col text-center sm:text-left gap-1">
        <div className="flex justify-end w-full">
          <CloseDisplay onClose={onClose} />
        </div>

        <div className="flex gap-1 justify-center items-center flex-col font-bold text-base sm:text-xl">
          Change User Role - {userForm.username}
          <div className="font-normal text-lg">
            Current role: {userForm.role}
          </div>
          <span className="font-extralight text-sm sm:text-base">
            To confirm Change, input password into the input box below
          </span>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <select
            name="role"
            id="role"
            value={updatedRole}
            onChange={(e) => setUpdatedRole(e.target.value)}
            className="text-black block w-full p-1 rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Conventional User">Conventional User</option>
            <option value="Affiliated Professional">
              Affiliated Professional
            </option>
            <option value="Admin Operator">Admin Operator</option>
          </select>

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
            disabled={loading}
            className="flex h-min text-start text-blue-500 mt-5 gap-1 border-2 border-blue-500 bg-gray-100 hover:bg-blue-100 active:bg-blue-300 active:border-blue-500 w-fit p-2 pl-1 text-sm rounded-xl transition ease-out duration-200"
            onClick={verifyText}
          >
            {loading ? "Updating..." : "Change Role"}
          </button>

          <button
            type="button"
            className="text-start rounded-xl text-white p-2 mt-5 bg-blue-500 hover:bg-blue-400 active:bg-blue-300 transition ease-out duration-200"
            onClick={onClose}
          >
            Cancel Change
          </button>
        </div>
      </div>
    </div>
  );
};

ChangeUserRole.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
  userForm: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
  }).isRequired,
};
