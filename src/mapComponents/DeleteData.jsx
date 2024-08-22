import PropTypes from "prop-types";
import deleteActiveIcon from "/ASSET/image-logo/deleteActive.png";
import { useState } from "react";
import alertLogo from "/ASSET/image-logo/alert.png";
import { useAuthContext } from "../hooks/useAuthContext";

export const DeleteData = ({
  selectedData,
  formattedTime,
  onUpdate,
  onClose,
}) => {
  const [textDelete, setTextDelete] = useState("");
  const { user } = useAuthContext();

  const getFirstWord = (str) => {
    const firstWord = str.split(" ")[0];
    return (
      firstWord.replace(/[^a-zA-Z0-9]/g, "") + "_" + selectedData.id + "_delete"
    );
  };

  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const verifyText = () => {
    if (textDelete !== getFirstWord(selectedData.name)) {
      setErrorMessage("Wrong Text");
    } else if (adminPassword !== "Admin!23DELETE") {
      setErrorMessage("Wrong Delete Password");
    } else {
      deleteData(selectedData.id);
    }
  };

  const deleteData = async (dataID) => {
    const url = `http://localhost:8081/user/${dataID}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error deleting water conditions: ${errorText}`);
      }

      const data = await response.json();
      console.log("Water conditions deleted successfully:", data);
      await postUserActivity();
      if (onUpdate) onUpdate();
      onClose();
    } catch (error) {
      console.log("Error in deleteData:", error);
    }
  };
  const postUserActivity = async () => {
    const url = `http://localhost:8081/user-monitoring-activity/post`;
    const location_id = selectedData.id;
    const location_name = selectedData.name;
    const user_activity = "DELETE";
    const verify =
      user.role === "Affiliated Professional" ? "verified" : "unverified";
    const location_category = selectedData.ikaCategories;
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

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white mx-20 sm:max-w-3xl rounded-xl border-2 shadow-custom items-center p-7 flex flex-col text-center sm:text-left gap-1">
        <div className="flex gap-1 justify-center items-center flex-col font-bold text-base sm:text-xl">
          Are you sure you want to delete this data?
          <span className="font-extralight text-sm sm:text-lg">
            To confirm, type the red text below into the input box
          </span>
        </div>
        <div className="">
          &quot;
          <span className="text-red-500">
            {getFirstWord(selectedData.name)}
          </span>
          &quot;
        </div>
        <div className="">
          <input
            type="text"
            id="textDelete"
            name="textDelete"
            onChange={(e) => setTextDelete(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Text"
          />
        </div>

        <div className="">
          <input
            type="password"
            id="adminPassword"
            name="adminPassword"
            onChange={(e) => setAdminPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Delete Password"
          />
        </div>

        {errorMessage && (
          <div className="mt-2 flex gap-1 text-red-500 items-center text-sm">
            <img src={alertLogo} alt="alert" className="w-3.5 h-3.5" />
            {errorMessage}
          </div>
        )}

        <div className="flex gap-5 text-xs sm:text-base">
          <button
            type="button"
            className="flex h-min text-start text-red-500 mt-8 gap-1 border-2 border-red-500 bg-gray-100 hover:bg-red-100 active:bg-red-300 active:border-red-500 w-fit p-2 pl-1 text-sm rounded-xl trasition ease-out duration-200"
            onClick={verifyText}
          >
            <img src={deleteActiveIcon} className="w-5 h-5" alt="" />
            Delete Data
          </button>

          <button
            type="button"
            className="text-start rounded-xl text-white p-2 mt-8 bg-red-500 hover:bg-red-400 active:bg-red-300 trasition ease-out duration-200"
            onClick={onClose}
          >
            Cancel Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteData.propTypes = {
  selectedData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    ikaCategories: PropTypes.string.isRequired,
  }),

  formattedTime: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};
