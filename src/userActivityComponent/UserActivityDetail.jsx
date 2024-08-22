import PropTypes from "prop-types";

export const UserActivityDetail = ({
  selectedData,
  userForm,
  locationForm,
}) => {
  const isoDateString = selectedData.activity_time;
  const date = new Date(isoDateString);

  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const formattedDate = date.toLocaleDateString(undefined, optionsDate);
  const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

  return (
    <div className="border-4 border-b-0 border-gray-200 p-5 flex flex-col gap-3">
      <div className="flex justify-between font-semibold text-xl">
        <div className="">
          {selectedData.id} - {selectedData.user_activity}
        </div>
        <div className="">
          {formattedDate} - {formattedTime}
        </div>
      </div>

      <div className="font-light text-xl">
        {selectedData.user_activity_description}
      </div>

      {/* ============================================================ */}
      <div className="border-t-2"></div>
      <div className="text-xl font-bold">Latest Information:</div>

      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap gap-8 ">
          {userForm.username ? (
            <div className="flex flex-col">
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
            <div className="w-fit flex flex-wrap justify-center items-center text-center text-gray-400">
              {" "}
              - User data not found -
            </div>
          )}

          {/* ============================================================ */}
          <div className="border-l-2"></div>

          {locationForm.location_name ? (
            <div className="flex flex-col">
              <div className="font-semibold">Location Description:</div>{" "}
              <div className="flex flex-col pl-3 text-sm">
                <div className="">
                  Address:{" "}
                  {locationForm.location_name
                    ? `${locationForm.location_name}`
                    : "-"}
                </div>
                <div className="">
                  Status: {locationForm.status ? `${locationForm.status}` : "-"}
                </div>
                <div className="">
                  Category:{" "}
                  {locationForm.category ? `${locationForm.category}` : "-"}
                </div>
                <div className="">
                  Last updated time:{" "}
                  {locationForm.lastUpdate ? `${locationForm.lastUpdate}` : "-"}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-fit flex flex-wrap justify-center items-center text-center text-gray-400">
              {" "}
              - location data not found -
            </div>
          )}
        </div>

        <div className="flex gap-3">
        <button className="p-2 rounded-xl shadow-custom bg-blue-500 text-white hover:bg-blue-300 active:bg-blue-100 active:text-blue-500 transition-all ease-out duration-500">
            change user role
          </button>
          <button className="p-2 rounded-xl shadow-custom bg-red-500 text-white hover:bg-red-300 active:bg-red-100 active:text-red-500 transition-all ease-out duration-500">
            delete user account
          </button>
        </div>
      </div>
    </div>
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
    username: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
  }).isRequired,

  locationForm: PropTypes.shape({
    location_name: PropTypes.string,
    status: PropTypes.string,
    category: PropTypes.string,
    lastUpdate: PropTypes.string,
  }).isRequired,
};
