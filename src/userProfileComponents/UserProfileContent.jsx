import { useEffect, useRef, useState } from "react";
import { DeleteUserAccount } from "./DeleteUserAccount";
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

import guestPicture from "/ASSET/image-background/guestPicture.png";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import { UpdateRole } from "./UpdateRole";

export const UserProfileContent = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    navigate("/");
  };
  const handleUpdateUser = () => {
    dispatch({ type: "UPDATE_USER", payload: formData });
    window.localStorage.setItem("user", JSON.stringify(formData));
  };

  const [updateButton, setUpdateButton] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const timeoutRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteButton, setDeleteButton] = useState(false);
  const [logoutButton, setLogoutButton] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    role: "",
    location_name: "",
    location_lat: "",
    location_lng: "",
    profile_picture: null,
    profile_picture_extension: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || "",
        username: user.username || "",
        email: user.email || "",
        password: user.password || "",
        phone_number: user.phone_number || "",
        gender: user.gender || "",
        date_of_birth: user.date_of_birth || "",
        role: user.role || "",
        location_name: user.location_name || "",
        location_lat: user.location_lat || "",
        location_lng: user.location_lng || "",
        profile_picture: user.profile_picture || null,
        profile_picture_extension: user.profile_picture_extension || "",
      });
    }
  }, [user, successUpdate]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture" && files.length > 0) {
      console.log("File selected:", files[0]);
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
    }, 1000);
  };
  const handleHide = (e) => {
    e.preventDefault();
    setShowPassword(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
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
    }, 1000);
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

  const [onUpdate, setOnUpdate] = useState(false);

  const handleSubmit = () => {
    console.log("Submit handler called");
    setOnUpdate(!onUpdate);
    const passwordError = passwordDifficulty(formData.password);
    if (passwordError) {
      setErrorMessage(passwordError);
    } else if (
      formData.phone_number.length < 10 ||
      formData.phone_number.length > 15
    ) {
      setErrorMessage("Phone number must be between 10 - 15 numbers");
    } else {
      setErrorMessage("");
      handleUpdate();
      if (
        formData.role !== "Affiliated Professional" &&
        formData.role !== "Admin Operator"
      ) {
        setProfesional(false);
        setAdmin(false);
      }
      setChangePP(false);
      console.log("onUpdate set to true");
    }
  };

  const handleUpdate = () => {
    if (!user || !user.id) {
      console.error("User ID is missing");
      return;
    }

    const url = `http://localhost:8081/user-accounts/${formData.id}`;
    const phone_number = formData.phone_number || null;
    const gender = formData.gender || null;
    const date_of_birth = formData.date_of_birth || null;
    const role = formData.role || null;
    const location_name = formData.location_name || null;
    const location_lat = formData.location_lat || null;
    const location_lng = formData.location_lng || null;
    const profile_picture = formData.profile_picture || null;
    const profile_picture_extension = profile_picture
      ? profile_picture.name
        ? profile_picture.name.split(".").pop()
        : ""
      : null;

    const formatToSend = new FormData();
    formatToSend.append("username", formData.username);
    formatToSend.append("email", formData.email);
    formatToSend.append("password", formData.password);
    formatToSend.append("phone_number", phone_number);
    formatToSend.append("gender", gender);
    formatToSend.append("date_of_birth", date_of_birth);
    formatToSend.append("role", role);
    formatToSend.append("location_name", location_name);
    formatToSend.append("location_lat", location_lat);
    formatToSend.append("location_lng", location_lng);
    formatToSend.append("profile_picture", profile_picture);
    formatToSend.append("profile_picture_extension", profile_picture_extension);

    fetch(url, {
      method: "PUT",
      body: formatToSend,
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
        handleUpdateUser();
      })
      .catch((error) => {
        console.error("Error:", error);
        console.error(formData);
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
      id: user.id || "",
      username: user.username || "",
      email: user.email || "",
      password: user.password || "",
      phone_number: user.phone_number || "",
      gender: user.gender || "",
      date_of_birth: user.date_of_birth || "",
      role: user.role || "",
      location_name: user.location_name || "",
      location_lat: user.location_lat || "",
      location_lng: user.location_lng || "",
      profile_picture: user.profile_picture || null,
      profile_picture_extension: user.profile_picture_extension || "",
    });
    handleUpdateProfile();
    setErrorMessage("");
    if (
      formData.role !== "Affiliated Professional" &&
      formData.role !== "Admin Operator"
    ) {
      setProfesional(false);
      setAdmin(false);
    }
    setChangePP(false);
  };

  const handleDeleteAccount = () => {
    setDeleteButton(!deleteButton);
  };

  const handleLogoutAccount = () => {
    setLogoutButton(!logoutButton);
    handleLogout();
  };

  const [profesional, setProfesional] = useState(false);
  const [updateRoleButton, setUpdateRoleButton] = useState(false);

  useEffect(() => {
    if (
      formData.role === "Affiliated Professional" ||
      formData.role === "Admin Operator"
    ) {
      setProfesional(true);
      if (formData.role === "Admin Operator") {
        setAdmin(true);
      }
    } else {
      setProfesional(false);
      setAdmin(false);
    }
  }, [formData.role]);
  const handleProfesional = () => {
    setProfesional(true);
    if (formData.role === "Affiliated Professional") {
      setAdmin(false);
    }
  };
  const [admin, setAdmin] = useState(false);
  const handleAdmin = () => {
    setAdmin(true);
    setProfesional(true);
  };

  const handleImNot = () => {
    if (
      formData.role !== "Affiliated Professional" &&
      formData.role !== "Admin Operator"
    ) {
      setProfesional(false);
      setAdmin(false);
    }
  };
  const handleUpdateRoleButton = () => {
    if (
      formData.role !== "Affiliated Professional" &&
      formData.role !== "Admin Operator"
    ) {
      setUpdateRoleButton(!updateRoleButton);
    }
  };

  const handleRemovePicture = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile_picture: null,
      profile_picture_extension: "",
    }));
    setPpUrl(guestPicture);
  };

  const [changePP, setChangePP] = useState(false);
  const handleChangePP = () => {
    setChangePP(!changePP);
  };

  const [ppUrl, setPpUrl] = useState("");

  useEffect(() => {
    if (formData?.profile_picture) {
      if (typeof formData.profile_picture === "string") {
        setPpUrl(`/profile-picture/${formData.profile_picture}`);
      } else if (formData.profile_picture instanceof File) {
        const fileUrl = URL.createObjectURL(formData.profile_picture);
        setPpUrl(fileUrl);
        return () => {
          URL.revokeObjectURL(fileUrl);
        };
      }
    } else {
      setPpUrl(guestPicture);
    }
  }, [formData.profile_picture, successUpdate]);

  return (
    <div className="h-full w-full flex justify-center items-center p-10">
      <div className="w-full p-10 rounded-3xl bg-white bg-opacity-10 border-2 backdrop-blur-md flex flex-col gap-5 text-white">
        <div className="text-4xl font-bold">User Profile </div>
        <form
          action=""
          className="flex flex-wrap gap-10 justify-between"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
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
                onChange={handleInputChange}
                className={`p-1 text-black ${
                  !updateButton && "text-white  opacity-70"
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
                  !updateButton && "bg-opacity-25 opacity-70 text-white"
                } text-black rounded-md shadow-sm  border-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 sm:text-sm`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  disabled={!updateButton}
                  required
                  onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
                className={`p-1 text-black ${
                  !updateButton && "text-white opacity-70"
                } rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone_number" className="w-fit">
                Phone number
                <span
                  className={` ${
                    updateButton && "text-red-500 font-bold text-xl"
                  }`}
                >
                  *
                </span>
              </label>
              <input
                type="number"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                disabled={!updateButton}
                onChange={handleInputChange}
                required
                className={`p-1 text-black ${
                  !updateButton && "text-white  opacity-70"
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
                onChange={handleInputChange}
                className={`text-black ${
                  !updateButton &&
                  "text-white bg-white bg-opacity-30 opacity-70"
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
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className={`p-1 text-black ${
                    !updateButton && "text-white opacity-70"
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
                  onChange={handleInputChange}
                  className={`p-1 text-black ${
                    !updateButton && "text-white opacity-70"
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
                  onChange={handleInputChange}
                  className={`p-1 text-black ${
                    !updateButton && "text-white opacity-70"
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
                  disabled={!updateButton || !profesional}
                  onChange={handleInputChange}
                  value={formData.role}
                  className={`text-black ${
                    !updateButton && "text-white bg-white bg-opacity-30"
                  } block w-full p-1 rounded-md shadow-sm focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="Conventional User">Conventional User</option>
                  <option value="Affiliated Professional">
                    Affiliated Professional
                  </option>
                  {admin && formData.role !== "Affiliated Professional" && (
                    <option value="Admin Operator">Admin Operator</option>
                  )}
                </select>

                <div
                  className={`cursor-default h-fit w-fit my-2 text-white ${
                    updateButton
                      ? "cursor-pointer hover:italic hover:font-medium opacity-100"
                      : " opacity-70 "
                  } text-sm font-light trasition ease-out duration-300`}
                >
                  {!profesional ? (
                    <button
                      type="button"
                      disabled={!updateButton}
                      className="flex flex-wrap gap-1 items-center"
                      onClick={handleUpdateRoleButton}
                    >
                      You are{" "}
                      <span className="text-red-500 font-black">not</span> a
                      professional
                      <span className="text-xs">(click to change role)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!updateButton}
                      className={`cursor-default w-fit my-2 text-white ${
                        updateButton &&
                        !profesional &&
                        "cursor-pointer hover:italic hover:font-medium"
                      } text-sm font-light trasition ease-out duration-300`}
                      onClick={handleUpdateRoleButton}
                    >
                      You are{" "}
                      <span className="text-green-500 font-black">a</span>{" "}
                      professional
                    </button>
                  )}
                </div>
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
                      type="button"
                      className="flex flex-wrap justify-center items-center gap-1 h-fit text-start text-base rounded-xl text-white px-1.5 py-2.5 bg-green-500 hover:bg-green-400 active:bg-green-300 trasition ease-out duration-200 shadow-custom"
                      onClick={handleUpdateProfile}
                    >
                      <img src={updateLogo} alt="" className="w-5" />
                      <div className="text-center">Update Account</div>
                    </button>
                    <button
                      type="button"
                      className="flex flex-wrap justify-center items-center gap-1 h-fit text-start text-base rounded-xl text-white px-1.5 py-2.5 bg-gray-500 hover:bg-gray-400 active:bg-gray-300 trasition ease-out duration-200 shadow-custom"
                      onClick={handleLogoutAccount}
                    >
                      <img src={logoutLogo} alt="" className="w-5" />
                      <div className="text-center">Logout Account</div>
                    </button>
                    <button
                      type="button"
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
                    <button
                      className="text-center text-xl rounded-xl text-white p-2 mt-2 bg-green-500 hover:bg-green-400 active:bg-green-300 trasition ease-out duration-200"
                      type="submit"
                    >
                      Confirm Update Profile
                    </button>
                    <button
                      type="button"
                      className="text-center text-xl rounded-xl text-white p-2 mt-2 bg-red-500 hover:bg-red-400 active:bg-red-300 trasition ease-out duration-200"
                      onClick={handleCancelUpdate}
                    >
                      Cancel Update Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* change pp */}
          <div className="px-5 flex flex-col gap-5 ">
            {!changePP ? (
              <button
                type="button"
                onClick={handleChangePP}
                disabled={!updateButton}
                className={`flex flex-wrap gap-1 font-light ${
                  updateButton ? "hover:font-bold opacity-100" : "opacity-70"
                } text-sm transition-all ease-out duration-500`}
              >
                Do you want to{" "}
                <span className="font-black text-green-500">Change</span> your
                profile picture?
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleChangePP}
                  className="flex flex-wrap gap-1 font-light hover:font-bold text-sm transition-all ease-out duration-500"
                >
                  Do you want to{" "}
                  <span className="font-black text-red-500">Cancel</span> your
                  profile picture change?
                </button>

                <div className="flex w-full h-fit sm:ml-5">
                  <div className="p-5 w-fit gap-3 flex-col h-full rounded-3xl border-2 border-white flex justify-center items-center bg-white bg-opacity-25">
                    <div className="flex gap-3 w-fit p-5 rounded-3xl flex-col bg-black bg-opacity-30 justify-center items-center">
                      <img
                        src={ppUrl || guestPicture}
                        alt="Profile Picture"
                        className="w-52 h-52 object-cover rounded-xl"
                      />
                      <div className="text-xl">{formData.username}</div>
                    </div>

                    <div className="flex flex-col items-center gap-5">
                      <input
                        type="file"
                        id="profile_picture"
                        name="profile_picture"
                        onChange={handleInputChange}
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                        required
                        className="w-52 text-sm mt-1 font-semibold file:cursor-pointer file:text-gray-500 file:mr-4 file:py-2 file:rounded-full file:border-0 file:border-slate-200 file:text-sm file:bg-gray-300 hover:file:bg-gray-200 file:active:bg-gray-100"
                      />
                      <button
                        type="button"
                        className="text-sm bg-red-500 p-0.5 px-1 rounded-lg hover:bg-red-300 active:bg-red-100 active:text-red-500 transition-all ease-out duration-300"
                        onClick={handleRemovePicture}
                      >
                        remove picture
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>

      {updateRoleButton && (
        <UpdateRole
          verify={handleProfesional}
          imNot={handleImNot}
          onClose={handleUpdateRoleButton}
          handleAdmin={handleAdmin}
        />
      )}

      {deleteButton && (
        <DeleteUserAccount
          selectedUser={user}
          onClose={handleDeleteAccount}
          onLogout={handleLogoutAccount}
        />
      )}
    </div>
  );
};
