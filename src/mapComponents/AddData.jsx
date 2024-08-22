import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { CloseDisplay } from "../objects/CloseDisplay";
import alertLogo from "/ASSET/image-logo/alert.png";
import { useAuthContext } from "../hooks/useAuthContext";

export const AddData = ({ onUpdate, onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [passwordActive, setPasswordActive] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [profesional, setProfesional] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lng: "",
    status: "",
    ika_score: "",
    reporter_name: user?.username || "",
    email: user?.email || "",
    description: "",
    ikaCategories: "",
    lastUpdate: "",
    ika_file: null,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "ika_file" && files.length > 0) {
      console.log(files[0]);
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

  const formattedTime = `${
    currentTime.getMonth() + 1
  }/${currentTime.getDate()}/${currentTime.getFullYear()} ${currentTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}`;

  const verifyPassword = () => {
    if (passwordValue === "admin123") {
      setProfesional(!profesional);
      setWrongPassword(false);
      setPasswordActive(false);
    } else {
      setWrongPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8081/water-conditions`;
    const status = profesional ? "verified" : "unverified";
    const ika_score = profesional ? formData.ika_score : null;
    const ika_file = profesional ? formData.ika_file : null;
    const file_extension = ika_file ? ika_file.name.split(".").pop() || "" : "";

    const formatToSend = new FormData();
    formatToSend.append("name", formData.name);
    formatToSend.append("lat", formData.lat);
    formatToSend.append("lng", formData.lng);
    formatToSend.append("status", status);
    formatToSend.append("ika_score", ika_score);
    formatToSend.append("reporter_name", formData.reporter_name);
    formatToSend.append("email", formData.email);
    formatToSend.append("description", formData.description);
    formatToSend.append("ikaCategories", formData.ikaCategories);
    formatToSend.append("lastUpdate", formattedTime);
    formatToSend.append("ika_file", ika_file);
    formatToSend.append("file_extension", file_extension);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formatToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error posting water conditions: ${errorText}`);
      }

      const data = await response.json();
      console.log("Water conditions posted successfully:", data);

      if (onUpdate) onUpdate();
      onClose();

      await postUserActivity();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const getLocationId = async (location_name, location_time) => {
    try {
      const response = await fetch("http://localhost:8081/user");
      if (!response.ok)
        throw new Error(`Error fetching user data: ${response.statusText}`);

      const data = await response.json();
      console.log("Fetched user data:", data);

      if (Array.isArray(data)) {
        const location = data.find(
          (loc) =>
            loc.name === location_name && loc.lastUpdate === location_time
        );
        if (location) {
          console.log(location.id);
          return location.id;
        } else {
          throw new Error(
            `Location with name '${location_name}' and time '${location_time}' not found`
          );
        }
      } else {
        throw new Error("Server response is not an array");
      }
    } catch (error) {
      console.error("Error in getLocationId:", error);
      throw error;
    }
  };
  const postUserActivity = async () => {
    const url = `http://localhost:8081/user-monitoring-activity/post`;
    const location_id = await getLocationId(formData.name, formattedTime);
    const location_name = formData.name;
    const user_activity = "ADD";
    const verify =
      user.role === "Affiliated Professional" ? "verified" : "unverified";
    const location_category = formData.ikaCategories;
    const user_activity_description = `${user_activity}_${user.id}_${user.username}_${location_id}_${location_name}_${location_category}_${formattedTime}_${verify}`;

    const insertedData = {
      user_id: user.id,
      location_id: location_id,
      user_activity: user_activity,
      user_activity_description: user_activity_description,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insertedData),
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      <div ref={modalRef} className="bg-white w-4/5  sm:max-w-3xl rounded-xl border-2 shadow-custom p-7 pt-2 flex flex-col text-center sm:text-left">
        <div className="flex flex-col lg:gap-2 overflow-auto max-h-[80vh] no-scrollbar">
          <CloseDisplay onClose={onClose} />

          <div className="flex flex-col sm:flex-row justify-between pb-5 sm:text-2xl">
            <div>Add New Information</div>
            <div className="flex gap-2 justify-center sm:justify-start items-center">
              <div className="font-light">{formattedTime}</div>
              {!profesional ? (
                <div className="text-red-500 text-xl font-semibold">
                  unverified
                </div>
              ) : (
                <div className="text-green-500 text-xl font-semibold">
                  verified
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Location Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Text"
              />
            </div>
            <div className="mb-4 flex gap-5">
              <div className="w-1/2">
                <label
                  htmlFor="lat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Latitude:
                </label>
                <input
                  type="number"
                  id="lat"
                  name="lat"
                  value={formData.lat}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Text"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="lng"
                  className="block text-sm font-medium text-gray-700"
                >
                  Longitude:
                </label>
                <input
                  type="number"
                  id="lng"
                  name="lng"
                  value={formData.lng}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Text"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="reporter_name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="reporter_name"
                name="reporter_name"
                value={formData.reporter_name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Text"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Text"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="resize-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Text"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="ikaCategories"
                className="block text-sm font-medium text-gray-700"
              >
                Category:
              </label>
              <select
                id="ikaCategories"
                name="ikaCategories"
                value={formData.ikaCategories}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Good">Good</option>
                <option value="Quite Good">Quite Good</option>
                <option value="Lightly Polluted">Lightly Polluted</option>
                <option value="Moderately Polluted">Moderately Polluted</option>
                <option value="Heavily Polluted">Heavily Polluted</option>
              </select>
            </div>

            <div className="cursor-pointer w-fit mt-10 text-gray-500 hover:italic hover:font-medium text-sm font-light trasition ease-out duration-300">
              {passwordActive || profesional ? (
                <div
                  className="flex gap-1 items-center"
                  onClick={() => {
                    setPasswordActive(false);
                    setProfesional(false);
                  }}
                >
                  Are You not a Professional ?
                  <span className="text-xs">(optional)</span>
                </div>
              ) : (
                <div
                  className="flex gap-1 items-center"
                  onClick={() => {
                    setPasswordActive(true);
                  }}
                >
                  Are You a Professional ?
                  <span className="text-xs">(optional)</span>
                </div>
              )}{" "}
            </div>

            {passwordActive && !profesional && (
              <div className="my-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPasswordValue(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Text"
                />

                {wrongPassword && (
                  <div className="mt-2 flex gap-1 text-red-500  items-center text-sm">
                    <img src={alertLogo} alt="alert" className="w-3.5 h-3.5" />
                    wrong password
                  </div>
                )}

                <button
                type="button"
                  onClick={verifyPassword}
                  className="text-start text-sm rounded-xl text-white p-2 mt-2 bg-green-500 hover:bg-green-400 active:bg-green-300 trasition ease-out duration-300"
                >
                  Verify
                </button>
              </div>
            )}

            {profesional && (
              <div className="mt-4 mb-4 flex gap-5 items-center flex-col sm:flex-row">
                <div className="">
                  <label
                    htmlFor="ika_score"
                    className="block text-sm font-medium text-gray-700"
                  >
                    IKA Score:
                  </label>
                  <input
                    type="number"
                    id="ika_score"
                    name="ika_score"
                    value={formData.ika_score}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter Text"
                  />
                </div>
                <div className="w-56">
                  <label
                    htmlFor="ika_file"
                    className="block text-sm font-medium text-gray-700"
                  >
                    IKA Calculation File:
                  </label>
                  <input
                    type="file"
                    id="ika_file"
                    name="ika_file"
                    onChange={handleInputChange}
                    required
                    className="w-full text-sm mt-1 text-gray-400 file:cursor-pointer file:text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:border-slate-200 file:text-sm file:bg-gray-300 hover:file:bg-gray-200 file:active:bg-gray-100 trasition ease-out duration-300"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <div className="flex gap-5">
                <button
                  type="button"
                  className="text-start rounded-xl text-white p-2 mt-10 bg-red-500 hover:bg-red-400 active:bg-red-300 trasition ease-out duration-300"
                  onClick={onClose}
                >
                  Cancel Additon
                </button>

                <button
                  type="submit"
                  className="text-start rounded-xl text-white p-2 mt-10 bg-slate-500 hover:bg-slate-400 active:bg-slate-300 trasition ease-out duration-300"
                >
                  Add Data
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AddData.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};
