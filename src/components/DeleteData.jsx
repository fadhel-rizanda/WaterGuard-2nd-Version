import PropTypes from "prop-types";
import deleteActiveIcon from "/ASSET/image-logo/deleteActive.png";
import { useState } from "react";
import alertLogo from "/ASSET/image-logo/alert.png";

export const DeleteData = ({ selectedData, onUpdate, onClose }) => {
  const [textDelete, setTextDelete] = useState("");
  const [wrongTextDelete, setWrongTextDelete] = useState(false);

  const getFirstWord = (str) => {
    const firstWord = str.split(" ")[0];
    return (
      firstWord.replace(/[^a-zA-Z0-9]/g, "") + "_" + selectedData.id + "_delete"
    );
  };

  const verifyText = () => {
    if (textDelete !== getFirstWord(selectedData.name)) {
      setWrongTextDelete(true);
    } else {
      setWrongTextDelete(false);
      deleteData(selectedData.id);
    }
  };

  const deleteData = (dataID) => {
    const url = `http://localhost:8081/user/${dataID}`; // Hapus ':'
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
        if (onUpdate) onUpdate();
        onClose();
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
          {wrongTextDelete && (
            <div className="mt-2 flex gap-1 text-red-500 items-center text-sm">
              <img src={alertLogo} alt="alert" className="w-3.5 h-3.5" />
              Wrong text
            </div>
          )}
        </div>

        <div className="flex gap-5 text-xs sm:text-base">
          <button
            type="button"
            className="flex h-min text-start text-red-500 mt-8 gap-1 border-2 border-red-500 bg-gray-100 hover:bg-red-100 active:bg-red-300 active:border-red-500 w-fit p-2 pl-1 text-sm rounded-xl"
            onClick={verifyText}
          >
            <img src={deleteActiveIcon} className="w-5 h-5" alt="" />
            Delete Data
          </button>

          <button
            type="button"
            className="text-start rounded-xl text-white p-2 mt-8 bg-red-500 hover:bg-red-400 active:bg-red-300"
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
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};
