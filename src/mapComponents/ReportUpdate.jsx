import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import alertLogo from "/ASSET/image-logo/alert.png";
import deleteActiveIcon from "/ASSET/image-logo/deleteActive.png";
import { DeleteData } from "./DeleteData";
import { useAuthContext } from "../hooks/useAuthContext";

export const ReportUpdate = ({ selectedData, onUpdate, onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [passwordActive, setPasswordActive] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [profesional, setProfesional] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [errorMesssage, setErrorMessage] = useState("");
  const [deleteData, setDeleteData] = useState(null);
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    status: "",
    ika_score: "",
    reporter_name: user?.username || "",
    email: user?.email || "",
    description: "",
    ikaCategories: "",
    ika_file: null,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, [selectedData]);

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

  const handleClose = (e) => {
    e.preventDefault();
    setDeleteData(null);
  };

  // untuk mengirim data dalam bentuk file harus menggunakan FormData, jika tidak maka dapat menggunakna json
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8081/user/${selectedData.id}`;
    const status = profesional ? "verified" : "unverified";
    const ika_score = profesional ? formData.ika_score : null;
    const ika_file = profesional ? formData.ika_file : null;
    const file_extension = ika_file ? ika_file.name.split(".").pop() || "" : "";

    const formatToSend = new FormData();
    formatToSend.append("status", status);
    formatToSend.append("ika_score", ika_score);
    formatToSend.append("ika_file", ika_file);
    formatToSend.append("file_extension", file_extension);
    formatToSend.append("reporter_name", formData.reporter_name);
    formatToSend.append("email", formData.email);
    formatToSend.append("description", formData.description);
    formatToSend.append("ikaCategories", formData.ikaCategories);
    formatToSend.append("lastUpdate", formattedTime);

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
        if (onUpdate) onUpdate();
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const verifyPassword = (e) => {
    e.preventDefault();
    if (user.role !== "Affiliated Professional") {
      setWrongPassword(true);
      setErrorMessage(`Your role must be "Affiliated Proffesional"`);
    } else if (passwordValue !== "Admin!23") {
      setWrongPassword(true);
      setErrorMessage("Wrong Password");
    } else {
      setProfesional(!profesional);
      setWrongPassword(false);
      setPasswordActive(false);
    }
  };

  const handleDelete = () => {
    setDeleteData(selectedData);
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

          <div className="cursor-pointer w-fit mt-10 text-gray-500 hover:italic hover:font-medium text-sm font-light trasition ease-out duration-200">
            {passwordActive || profesional ? (
              <div
                className="flex gap-1 items-center"
                onClick={() => {
                  setPasswordActive(false);
                  setProfesional(false);
                }}
              >
                Are you not a Professional ?
                <span className="text-xs">(optional)</span>
              </div>
            ) : (
              <div
                className="flex gap-1 items-center"
                onClick={() => {
                  setPasswordActive(true);
                }}
              >
                Are you a Professional ?
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
                  {errorMesssage}
                </div>
              )}

              <button
                type="button"
                onClick={verifyPassword}
                className="text-start text-sm rounded-xl text-white p-2 mt-2 bg-green-500 hover:bg-green-400 active:bg-green-300 trasition ease-out duration-200"
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
                  required
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
                  className="w-full text-sm mt-1 text-gray-400 file:cursor-pointer file:text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:border-slate-200 file:text-sm file:bg-gray-300 hover:file:bg-gray-200 file:active:bg-gray-100 trasition ease-out duration-200"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <div className="flex gap-5">
              <button
                type="submit"
                className="text-start rounded-xl text-white p-2 mt-10 bg-slate-500 hover:bg-slate-400 active:bg-slate-300 trasition ease-out duration-200"
              >
                Report Update
              </button>

              <button
                type="button"
                className="text-start rounded-xl text-white p-2 mt-10 bg-red-500 hover:bg-red-400 active:bg-red-300 trasition ease-out duration-200"
                onClick={onClose}
              >
                Cancel Update
              </button>
            </div>

            {profesional && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex h-min text-start text-red-500 sm:mt-10 gap-1 border-2 border-red-500 bg-gray-100 hover:bg-red-100 active:bg-red-300 active:border-red-500 w-fit p-2 pl-1 text-sm rounded-xl trasition ease-out duration-200"
              >
                <img src={deleteActiveIcon} className="w-5 h-5" alt="" />
                delete data
              </button>
            )}
          </div>
          {deleteData !== null && (
            <DeleteData
              selectedData={deleteData}
              onUpdate={onUpdate}
              onClose={handleClose}
            />
          )}
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
    ika_file: PropTypes.string,
    file_extension: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};
