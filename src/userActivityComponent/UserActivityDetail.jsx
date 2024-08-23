import PropTypes from "prop-types";
import { ChangeUserRole } from "./ChangeUserRole";
import { useState } from "react";
import { DeleteUserAccount } from "./DeleteUserAccount";
import { DeleteRecord } from "./DeleteRecord";

export const UserActivityDetail = ({
  selectedData,
  userForm,
  locationForm,
  handleUpdate,
}) => {
  const isoDateString = selectedData.activity_time;
  const date = new Date(isoDateString);

  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const formattedDate = date.toLocaleDateString(undefined, optionsDate);
  const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

  const [changeUserRole, setChangeUserRole] = useState(false);
  const handleChangeRole = () => {
    setChangeUserRole(!changeUserRole);
  };

  const [deleteUserAccount, setDeleteUserAccount] = useState(false);
  const handleDeleteAccount = () => {
    setDeleteUserAccount(!deleteUserAccount);
  };

  const [deleteRecord, setDeleteRecord] = useState(false);
  const handleDeleteRecord = () => {
    setDeleteRecord(!deleteRecord);
  };

  const handleSuccess = () => {
    handleUpdate();
  };

  return (
    <>
      <div className="border-4 border-b-0 border-gray-200 p-5 flex flex-col gap-3">
        <div className="flex flex-wrap justify-between font-semibold text-xl">
          <div className="">
            {selectedData.id} - {selectedData.user_activity}
          </div>
          <div className="">
            {formattedDate} - {formattedTime}
          </div>
        </div>

        <div className="overflow-x-auto font-light text-xl">
          {selectedData.user_activity_description}
        </div>

        {/* ============================================================ */}
        <div className="border-t-2"></div>
        <div className="text-xl font-bold">Latest Information:</div>

        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex  gap-8 overflow-auto mb-5 xl:mb-0">
            {userForm.username ? (
              <div className="flex flex-col w-fit h-20 md:h-fit">
                {" "}
                <div className="font-semibold">User Description:</div>
                <div className="flex flex-col pl-3 text-sm">
                  <div className="">
                    Username: {userForm.username ? `${userForm.username}` : "-"}
                  </div>
                  <div className="">
                    Role: {userForm.role ? `${userForm.role}` : "-"}
                  </div>
                  <div className="">
                    Email: {userForm.email ? `${userForm.email}` : "-"}
                  </div>
                  <div className="">
                    Phone Number:{" "}
                    {userForm.phone_number ? `${userForm.phone_number}` : "-"}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" w-1/2 flex flex-wrap justify-center items-center text-center text-gray-400">
                {" "}
                - User data not found -
              </div>
            )}

            {/* ============================================================ */}
            <div className="border-l-2"></div>

            {locationForm.location_name ? (
              <div className="flex flex-col mb-5 xl:mb-0 w-fit h-20">
                <div className="font-semibold">Location Description:</div>{" "}
                <div className="flex flex-col pl-3 text-sm">
                  <div className="">
                    Address:{" "}
                    {locationForm.location_name
                      ? `${locationForm.location_name}`
                      : "-"}
                  </div>
                  <div className="">
                    Status:{" "}
                    {locationForm.status ? `${locationForm.status}` : "-"}
                  </div>
                  <div className="">
                    Category:{" "}
                    {locationForm.category ? `${locationForm.category}` : "-"}
                  </div>
                  <div className="">
                    Last updated time:{" "}
                    {locationForm.lastUpdate
                      ? `${locationForm.lastUpdate}`
                      : "-"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center items-center text-center text-gray-400 w-1/2">
                {" "}
                - location data not found -
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleChangeRole}
              className="p-2 rounded-xl shadow-custom bg-blue-500 text-white hover:bg-blue-300 active:bg-blue-100 active:text-blue-500 transition-all ease-out duration-500"
            >
              change user role
            </button>
            <button
              onClick={handleDeleteAccount}
              className="p-2 rounded-xl shadow-custom bg-red-500 text-white hover:bg-red-300 active:bg-red-100 active:text-red-500 transition-all ease-out duration-500"
            >
              delete user account
            </button>

            <button
              onClick={handleDeleteRecord}
              className="p-2 rounded-xl shadow-custom text-red-500 hover:bg-red-100 active:bg-red-300 transition-all ease-out duration-500"
            >
              delete record
            </button>
          </div>
        </div>
      </div>
      {changeUserRole && (
        <div className="">
          <ChangeUserRole
            userForm={userForm}
            onClose={handleChangeRole}
            handleSuccess={handleSuccess}
          />
        </div>
      )}
      {deleteUserAccount && (
        <DeleteUserAccount
          userForm={userForm}
          onClose={handleDeleteAccount}
          handleSuccess={handleSuccess}
        />
      )}
      {deleteRecord && (
        <DeleteRecord
          selectedData={selectedData}
          onClose={handleDeleteRecord}
          handleSuccess={handleSuccess}
        />
      )}
    </>
  );
};

// Define prop types
UserActivityDetail.propTypes = {
  selectedData: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    location_id: PropTypes.number,
    user_activity: PropTypes.string,
    user_activity_description: PropTypes.string,
    activity_time: PropTypes.string,
  }).isRequired,

  userForm: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
  }).isRequired,

  locationForm: PropTypes.shape({
    id: PropTypes.number,
    location_name: PropTypes.string,
    status: PropTypes.string,
    category: PropTypes.string,
    lastUpdate: PropTypes.string,
  }).isRequired,

  handleUpdate: PropTypes.func,
};
