import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const ReportUpdate = ({ selectedData, onUpdate, onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [profesional, setProfesional] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    ika_score: "",
    reporter_name: "",
    email: "",
    description: "",
    ikaCategories: "",
  });
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, [selectedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8081/user/${selectedData.id}`;
    const status = profesional ? "verified" : "unverified";
    const ika_score = profesional ? formData.ika_score : null;

    const updatedData = {
      ...formData,
      ika_score,
      status,
      lastUpdate: formattedTime,
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
        if (onUpdate) onUpdate();
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const formattedTime = `${
    currentTime.getMonth() + 1
  }/${currentTime.getDate()}/${currentTime.getFullYear()} ${currentTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="pt-10 relative">
      <div className="flex flex-col sm:flex-row justify-between border-t-2 pt-10 pb-5 sm:text-2xl">
        <div>Report Updated Information</div>
        <div className="flex gap-2 justify-center sm:justify-start items-center">
          <div className="font-light">{formattedTime}</div>
          {!profesional ? (
            <div className="text-red-500 text-xl font-semibold">unverified</div>
          ) : (
            <div className="text-green-500 text-xl font-semibold">verified</div>
          )}
        </div>
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
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
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
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
            <div className="mt-1 mb-4 flex gap-5 items-center">
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
                  className="w-full text-sm text-gray-400 file:text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:border-slate-200 file:text-sm file:bg-gray-300 hover:file:bg-gray-200 file:active:bg-gray-100"
                />
              </div>
            </div>
          )}

          <div className="flex gap-5">
            <button
              type="submit"
              className="text-start rounded-xl text-white p-2 mt-10 bg-slate-500 hover:bg-slate-400 active:bg-slate-300"
            >
              Report Update
            </button>

            <button
              type="button"
              className="text-start rounded-xl text-white p-2 mt-10 bg-red-500 hover:bg-red-400 active:bg-red-300"
              onClick={onClose}
            >
              Cancel Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ReportUpdate.propTypes = {
  selectedData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.string,
    ika_score: PropTypes.number,
    ikaCategories: PropTypes.string,
    lastUpdate: PropTypes.string,
    description: PropTypes.string,
    reporter_name: PropTypes.string,
    email: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};
