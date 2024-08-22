import { useRef, useState } from "react";
import { CloseDisplay } from "../objects/CloseDisplay";
import PropTypes from "prop-types";
import alertLogo from "/ASSET/image-logo/alert.png";
import showLogo from "/ASSET/image-logo/mdi--show-outline.png";
import hideLogo from "/ASSET/image-logo/mdi--hide-outline.png";
import { useAuthContext } from "../hooks/useAuthContext";

export const UpdateRole = ({ verify, onClose, imNot, handleAdmin }) => {
  const { user } = useAuthContext();
  const [passwordRole, setPasswordRole] = useState("");
  const [wrongPasswordRole, setWrongPasswordRole] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let [errorCounter, setErrorCounter] = useState(1);
  const timeoutRef = useRef(null);
  const verifyText = () => {
    if (passwordRole === "Admin!23" || passwordRole === "Professional!23") {
      setWrongPasswordRole(false);
      if (passwordRole === "Admin!23") {
        handleAdmin();
      }
      verify();
      onClose();
    } else {
      setWrongPasswordRole(true);
      setErrorCounter((e) => e + 1);
      console.log(errorCounter);
      if (errorCounter === 3) {
        onClose();
      }
    }
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

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white mx-20 sm:max-w-3xl rounded-xl border-2 shadow-custom items-center p-5 pb-8 pt-1 flex flex-col text-center sm:text-left gap-1">
        <div className="flex justify-end w-full">
          <CloseDisplay onClose={onClose} />
        </div>

        <div className="flex gap-1 justify-center items-center flex-col font-bold text-base sm:text-xl">
          Are You an Affiliated Professional?
          <div>
            &quot;
            {user.username}
            &quot;
          </div>
          <span className="font-extralight text-sm sm:text-lg text-center">
            To verify, input Professional password <br />{" "}
            <span className="text-base">into the input box below</span>
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between p-1 bg-white text-black rounded-md shadow-sm border-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 sm:text-sm">
            <input
              type={showPassword ? "text" : "password"}
              id="passwordRole"
              name="passwordRole"
              onChange={(e) => setPasswordRole(e.target.value)}
              required
              placeholder="Enter Password"
              className="bg-white w-full focus:outline-none"
            />
            {user.password.trim() !== "" && (
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
            )}
          </div>
        </div>

        {wrongPasswordRole && (
          <div className="mt-2 flex gap-1 text-red-500 items-center text-sm">
            <img src={alertLogo} alt="alert" className="w-3.5 h-3.5" />
            Wrong Password
          </div>
        )}

        <div className="flex gap-5 text-xs sm:text-base">
          <button
            type="button"
            className="text-start flex items-center justify-center w-20 rounded-xl text-white p-2 mt-5 bg-green-500 hover:bg-green-400 active:bg-green-300 transition ease-out duration-200"
            onClick={verifyText}
          >
            I Am
          </button>

          <button
            type="button"
            className="text-start flex items-center justify-center w-20 rounded-xl text-white p-2 mt-5 bg-red-500 hover:bg-red-400 active:bg-red-300 transition ease-out duration-200"
            onClick={() => {
              imNot();
              onClose();
            }}
          >
            I{"'"}m not
          </button>
        </div>
      </div>
    </div>
  );
};

UpdateRole.propTypes = {
  onClose: PropTypes.func,
  verify: PropTypes.func,
  imNot: PropTypes.func,
  handleAdmin: PropTypes.func,
};
