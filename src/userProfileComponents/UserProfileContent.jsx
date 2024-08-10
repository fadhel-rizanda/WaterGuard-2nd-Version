import { useRef, useState } from "react";
import { DeleteUserAccount } from "./DeleteUserAccount";
import PropTypes from "prop-types";
import passwordLogo from "/ASSET/image-logo/mdi--password.png";
import passwordDisableLogo from "/ASSET/image-logo/mdi--passwordwhite.png";
import showLogo from "/ASSET/image-logo/mdi--show-outline.png";
import hideLogo from "/ASSET/image-logo/mdi--hide-outline.png";
import showDisableLogo from "/ASSET/image-logo/mdi--show-outline23.png";
import hideDisableLogo from "/ASSET/image-logo/mdi--hide-outline23.png";
import alertLogo from "/ASSET/image-logo/alert.png";
import successLogo from "/ASSET/image-logo/success.png";

import logoutLogo from "/ASSET/image-logo/logout.png";
import updateLogo from "/ASSET/image-logo/update.png";
import deleteLogo from "/ASSET/image-logo/delete.png";

export const UserProfileContent = ({ selectedUser, onLogout }) => {
  const [updateButton, setUpdateButton] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const timeoutRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteButton, setDeleteButton] = useState(false);
  const [logoutButton, setLogoutButton] = useState(false);
  const [formData, setFormData] = useState({
    username: selectedUser.username || "",
    email: selectedUser.email || "",
    password: selectedUser.password || "",
    phone_number: selectedUser.phone_number || "",
    gender: selectedUser.gender || "",
    date_of_birth: selectedUser.date_of_birth || "",
    role: selectedUser.role || "",
    location_name: selectedUser.location_name || "",
    location_lat: selectedUser.location_lat || "",
    location_lng: selectedUser.location_lng || "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    setUpdateButton(!updateButton);
    setErrorMessage("");
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShowPassword(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowPassword(false);
    }, 5000);
  };

  const handleSuccessActive = () => {
    setSuccessUpdate(true);
    setErrorMessage("data have been updated");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSuccessUpdate(false);
      setErrorMessage("");
    }, 5000);
  };

  const handleHide = (e) => {
    e.preventDefault();
    setShowPassword(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // ab!a1A12
  const passwordDifficulty = (password) => {
    const containSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const containSpace = /\s/.test(password);
    const containNumAlpha = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
    const containUpLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const containLength = password.length >= 8;

    if (!containSymbol) {
      return "Password must contain a symbol";
    } else if (containSpace) {
      return "Password cannot contain spaces";
    } else if (!containNumAlpha) {
      return "Password must contain both numbers and letters";
    } else if (!containUpLower) {
      return "Password must contain both uppercase and lowercase letters";
    } else if (!containLength) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordError = passwordDifficulty(formData.password);
    if (passwordError) {
      setErrorMessage(passwordError);
    } else if (
      formData.phone_number !== "" &&
      (formData.phone_number.length < 10 || formData.phone_number.length > 15)
    ) {
      setErrorMessage("Phone number must be between 10 - 15 numbers");
    } else {
      setErrorMessage("");
      handleUpdate();
    }
  };

  const handleUpdate = () => {
    const url = `http://localhost:8081/user-accounts/${selectedUser.id}`;
    const phone_number = formData.phone_number || null;
    const gender = formData.gender || null;
    const date_of_birth = formData.date_of_birth || null;
    const role = formData.role || null;
    const location_name = formData.location_name || null;
    const location_lat = formData.location_lat || null;
    const location_lng = formData.location_lng || null;

    const updatedData = {
      ...formData,
      phone_number,
      gender,
      date_of_birth,
      role,
      location_name,
      location_lat,
      location_lng,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
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
        setErrorMessage("");
        handleSuccessActive();
        setUpdateButton(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleCancelUpdate = (e) => {
    e.preventDefault();
    setFormData({
      username: selectedUser.username || "",
      email: selectedUser.email || "",
      password: selectedUser.password || "",
      phone_number: selectedUser.phone_number || "",
      gender: selectedUser.gender || "",
      date_of_birth: selectedUser.date_of_birth || "",
      role: selectedUser.role || "",
      location_name: selectedUser.location_name || "",
      location_lat: selectedUser.location_lat || "",
      location_lng: selectedUser.location_lng || "",
    });
    handleUpdateProfile();
    setErrorMessage("");
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setDeleteButton(!deleteButton);
  };
  const handleLogoutAccount = () => {
    setLogoutButton(!logoutButton);
    console.log("logout account");
    onLogout();
  };

  return (
    <div className="h-full w-full flex justify-center items-center p-10">
      <div className="w-full p-10 rounded-3xl bg-white bg-opacity-10 border-2 backdrop-blur-md flex flex-col gap-5 text-white">
        <div className="text-4xl font-bold">User Profile </div>

        <form
          action=""
          className="flex flex-wrap gap-10 justify-between"
          onSubmit={handleSubmit}
        >
          {/* left */}
          <div className="w-full lg:w-1/2 px-5 flex flex-col gap-2">
            <div className="text-2xl font-semibold">Your profile</div>
            <div className="flex flex-col ">
              <label htmlFor="username" className="w-fit">
                Username
                <span
                  className={` ${
                    updateButton && "text-red-500 font-bold text-xl"
                  }`}
                >
                  *
                </span>
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                disabled={!updateButton}
                required
                onChange={handleChangeInput}
                className={`p-1 text-black ${
                  !updateButton && "text-white"
                } rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="w-fit">
                Password
                <span
                  className={` ${
                    updateButton && "text-red-500 font-bold text-xl"
                  }`}
                >
                  *
                </span>
              </label>
              <div
                className={`flex justify-between p-1 bg-white ${
                  !updateButton && "bg-opacity-25 text-white"
                } text-black rounded-md shadow-sm  border-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 sm:text-sm`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  disabled={!updateButton}
                  required
                  onChange={handleChangeInput}
                  className={`bg-white w-full focus:outline-none ${
                    !updateButton && "bg-opacity-0"
                  }`}
                />

                {formData.password.trim() !== "" && (
                  <button
                    onClick={showPassword ? handleHide : handleShow}
                    type="button"
                  >
                    <img
                      src={
                        !updateButton
                          ? showPassword
                            ? hideDisableLogo
                            : showDisableLogo
                          : showPassword
                          ? hideLogo
                          : showLogo
                      }
                      alt=""
                      className="w-5 h-5"
                    />
                  </button>
                )}
                {formData.password.trim() === "" && (
                  <label htmlFor="password" className="w-fit">
                    <img
                      src={updateButton ? passwordLogo : passwordDisableLogo}
                      alt=""
                      className={`w-5 h-5 ${!updateButton && "opacity-75"}`}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="w-fit">
                Email
                <span
                  className={` ${
                    updateButton && "text-red-500 font-bold text-xl"
                  }`}
                >
                  *
                </span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                disabled={!updateButton}
                onChange={handleChangeInput}
                required
                className={`p-1 text-black ${
                  !updateButton && "text-white"
                } rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone_number" className="w-fit">
                Phone number
              </label>
              <input
                type="number"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                disabled={!updateButton}
                onChange={handleChangeInput}
                className={`p-1 text-black ${
                  !updateButton && "text-white"
                } rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="w-fit">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                disabled={!updateButton}
                onChange={handleChangeInput}
                className={`text-black ${
                  !updateButton && "text-white bg-white bg-opacity-30"
                } block w-full p-1 rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="date_of_birth" className="w-fit">
                Date of birth{" "}
              </label>
              <input
                type="date"
                name="date_of_birth"
                id="date_of_birth"
                value={formatDate(formData.date_of_birth)}
                disabled={!updateButton}
                onChange={handleChangeInput}
                className={`p-1 text-black ${!updateButton && "text-white"} ${
                  !updateButton && "opacity-70"
                } rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
          </div>

          {/* right */}
          <div className="w-full lg:w-2/5 px-5 flex flex-col justify-between gap-10 lg:gap-0">
            <div className=" flex flex-col gap-2">
              <div className="text-2xl font-semibold">
                Your Address Location
              </div>
              <div className="flex flex-col">
                <label htmlFor="location_name" className="w-fit">
                  Location Name
                </label>
                <input
                  type="text"
                  name="location_name"
                  id="location_name"
                  value={formData.location_name}
                  disabled={!updateButton}
                  onChange={handleChangeInput}
                  className={`p-1 text-black ${
                    !updateButton && "text-white"
                  } rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="location_lat" className="w-fit">
                  Location Lat
                </label>
                <input
                  type="number"
                  name="location_lat"
                  id="location_lat"
                  value={formData.location_lat}
                  disabled={!updateButton}
                  onChange={handleChangeInput}
                  className={`p-1 text-black ${
                    !updateButton && "text-white"
                  } rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="location_lng" className="w-fit">
                  Location Lng
                </label>
                <input
                  type="number"
                  name="location_lng"
                  id="location_lng"
                  value={formData.location_lng}
                  disabled={!updateButton}
                  onChange={handleChangeInput}
                  className={`p-1 text-black ${
                    !updateButton && "text-white"
                  } rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="role" className="w-fit">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  disabled={!updateButton}
                  onChange={handleChangeInput}
                  className={`text-black ${
                    !updateButton && "text-white bg-white bg-opacity-30"
                  } block w-full p-1 rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Conventional User">Conventional User</option>
                  <option value="Affiliated Professional">
                    Affiliated Professional
                  </option>
                </select>
              </div>
            </div>

            {errorMessage !== "" && (
              <div
                className={`flex items-center gap-2 text-lg font-black ${
                  successUpdate ? "text-green-500" : "text-red-500"
                }`}
              >
                <img
                  src={successUpdate ? successLogo : alertLogo}
                  alt=""
                  className="w-6 h-6"
                />
                <div className="">{errorMessage}</div>
              </div>
            )}
            <div className="flex w-full justify-center">
              <div className="flex gap-4 justify-center">
                {!updateButton ? (
                  <>
                    <button
                      className="flex flex-wrap justify-center items-center gap-1 h-fit text-start text-base rounded-xl text-white px-1.5 py-2.5 bg-green-500 hover:bg-green-400 active:bg-green-300 trasition ease-out duration-200 shadow-custom"
                      onClick={handleUpdateProfile}
                    >
                      <img src={updateLogo} alt="" className="w-5" />
                      <div className="text-center">Update Account</div>
                    </button>
                    <button
                      className="flex flex-wrap justify-center items-center gap-1 h-fit text-start text-base rounded-xl text-white px-1.5 py-2.5 bg-gray-500 hover:bg-gray-400 active:bg-gray-300 trasition ease-out duration-200 shadow-custom"
                      onClick={handleLogoutAccount}
                    >
                      <img src={logoutLogo} alt="" className="w-5" />
                      <div className="text-center">Logout Account</div>
                    </button>
                    <button
                      className="flex flex-wrap justify-center items-center gap-1 h-fit text-start text-base rounded-xl text-white px-1.5 py-2.5 bg-red-500 hover:bg-red-400 active:bg-red-300 trasition ease-out duration-200 shadow-custom"
                      onClick={handleDeleteAccount}
                    >
                      <img src={deleteLogo} alt="" className="w-5" />
                      <div className="text-center">Delete Account</div>
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button className="text-start text-xl rounded-xl text-white p-2 mt-2 bg-green-500 hover:bg-green-400 active:bg-green-300 trasition ease-out duration-200">
                      Confirm Update Profile
                    </button>
                    <button
                      className="text-start text-xl rounded-xl text-white p-2 mt-2 bg-red-500 hover:bg-red-400 active:bg-red-300 trasition ease-out duration-200"
                      onClick={handleCancelUpdate}
                    >
                      Cancel Update Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      {deleteButton && (
        <DeleteUserAccount
          selectedUser={selectedUser}
          onClose={handleDeleteAccount}
          onLogout={handleLogoutAccount}
        />
      )}
    </div>
  );
};

UserProfileContent.propTypes = {
  selectedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,

    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    phone_number: PropTypes.string,
    gender: PropTypes.string,
    date_of_birth: PropTypes.string,
    role: PropTypes.string,
    location_name: PropTypes.string,
    location_lat: PropTypes.number,
    location_lng: PropTypes.number,
  }),
  onLogout: PropTypes.func,
};
