import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { CloseDisplay } from "./CloseDisplay";

export const AddData = ({ onUpdate, onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [profesional, setProfesional] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lng: "",
    status: "",
    ika_score: "",
    reporter_name: "",
    email: "",
    description: "",
    ikaCategories: "",
    lastUpdate: "",
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formattedTime = `${
    currentTime.getMonth() + 1
  }/${currentTime.getDate()}/${currentTime.getFullYear()} ${currentTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8081/`;
    const status = profesional ? "verified" : "unverified";
    const ika_score = profesional ? formData.ika_score : null;

    const insertedData = {
      ...formData,
      ika_score,
      status,
      lastUpdate: formattedTime,
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
        if (onUpdate) onUpdate();
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white  w-4/5  sm:max-w-3xl rounded-xl border-2 shadow-custom p-7 pr-0 pt-2 flex flex-col text-center sm:text-left">
        <div className="flex flex-col lg:gap-2 overflow-auto max-h-[80vh] pr-5">
          <CloseDisplay onClose={onClose} />

          <div className="flex flex-col sm:flex-row justify-between pb-5 sm:text-2xl">
            <div>Report Updated Information</div>
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

            <div
              className="cursor-pointer w-fit mt-10 text-gray-500 hover:italic hover:font-medium text-sm font-light"
              onClick={() => setProfesional(!profesional)}
            >
              {profesional
                ? "Are You not a Professional ?"
                : "Are You a Professional ?"}{" "}
              <span className="text-xs">(optional)</span>
            </div>

            {profesional && (
              <div className="mt-1 mb-4 flex gap-5 items-center flex-col md:flex-row">
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
                    htmlFor="ika_calculation_file"
                    className="block text-sm font-medium text-gray-700"
                  >
                    IKA Calculation File:
                  </label>
                  <input
                    type="file"
                    id="ika_calculation_file"
                    name="ika_calculation_file"
                    required
                    className=" mt-1 w-full text-sm text-gray-400 file:text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:border-slate-200 file:text-sm file:bg-gray-300 hover:file:bg-gray-200 file:active:bg-gray-100"
                  />
                </div>
              </div>
            )}
            <div className="flex gap-5">
              <button
                type="submit"
                className="text-start rounded-xl text-white p-2 mt-10 bg-slate-500 hover:bg-slate-400 active:bg-slate-300"
              >
                Add Data
              </button>

              <button
                type="button"
                className="text-start rounded-xl text-white p-2 mt-10 bg-red-500 hover:bg-red-400 active:bg-red-300"
                onClick={onClose}
              >
                Cancel Add
              </button>
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
