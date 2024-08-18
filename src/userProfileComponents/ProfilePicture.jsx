import guestPicture from "/ASSET/image-background/guestPicture.png";
import { useAuthContext } from "../hooks/useAuthContext";
import PropTypes from "prop-types";
import { useState } from "react";

export const ProfilePicture = ({ onUpdate }) => {
  const { user } = useAuthContext();  

  if (user.profile_picture) {
    console.log("user pp", user.profile_picture);
  }

  if (onUpdate) {
    console.log("ONUPDATE TRIGERRED HANDLE FILE UPLOAD!!!");
    handleFileUpload();
  }

  const [fileInput, setFileInput] = useState(null);
  const handleFileUpload = () => {
    if (!onUpdate || !fileInput) return;

    const url = `http://localhost:8081/user-accounts/file-pp/${user.id}`;
    const profile_picture_extension = fileInput.name.split(".").pop() || "";

    const formatToSend = new FormData();
    formatToSend.append("profile_picture", fileInput);
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
        console.log("Success pp upload:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex w-full h-fit ml-5">
      <div className="p-5 w-fit gap-3 flex-col h-full rounded-3xl border-2 border-white flex justify-center items-center bg-white bg-opacity-25">
        <div className="flex gap-3 w-fit p-5 rounded-3xl flex-col bg-black bg-opacity-30 justify-center items-center">
          <img
            src={
              (user.profile_picture &&
                `/profile-picture/${user.profile_picture}`) ||
              guestPicture
            }
            alt="Profile"
            className="w-52 h-52 rounded-full object-cover"
          />
          <div className="text-xl">{user.username}</div>
        </div>

        <div className="flex">
          <input
            type="file"
            id="profile_picture"
            name="profile_picture"
            onChange={(e) => {
              setFileInput(e.target.files[0]);
            }}
            accept="image/png, image/jpeg, image/jpg, image/gif"
            required
            className="w-52 text-sm mt-1 font-semibold file:cursor-pointer file:text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:border-slate-200 file:text-sm file:bg-gray-300 hover:file:bg-gray-200 file:active:bg-gray-100 transition ease-out duration-300"
          />
        </div>
      </div>
    </div>
  );
};

ProfilePicture.propTypes = {
  onUpdate: PropTypes.bool,
};
