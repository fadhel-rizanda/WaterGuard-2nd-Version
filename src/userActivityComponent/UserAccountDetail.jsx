import PropTypes from "prop-types";

export const UserAccountDetail = ({ selectedData }) => {
  const isoDateCreateString = selectedData.create_account_time;
  const isoDateBirthString = selectedData.date_of_birth;
  const dateCreate = new Date(isoDateCreateString);
  const dateBirth = new Date(isoDateBirthString);

  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const formattedDateCreate = dateCreate.toLocaleDateString(
    undefined,
    optionsDate
  );
  const formattedTimeCreate = dateCreate.toLocaleTimeString(
    undefined,
    optionsTime
  );
  const formattedDateBirth = dateBirth.toLocaleDateString(
    undefined,
    optionsDate
  );
  const formattedTimeBirth = dateBirth.toLocaleTimeString(
    undefined,
    optionsTime
  );

  return (
    <div className="border-4 border-b-0 border-gray-200 p-5 flex flex-col gap-2">
      <div className="flex justify-between font-bold text-xl">
        <div className="">
          {selectedData.id} - {selectedData.username}
        </div>
        <div className="">
          {formattedDateCreate} - {formattedTimeCreate}
        </div>
      </div>

      {/* ============================================================ */}
      <div className="border-t-2"></div>
      <div className="font-semibold">Latest Information:</div>

      <div className="flex flex-wrap justify-between items-center">
        {selectedData.username ? (
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-10">
              <div className="flex flex-col">
                <div className="flex flex-col pl-3 text-sm">
                  <div className="">
                    Username:{" "}
                    {selectedData.username ? `${selectedData.username}` : "-"}
                  </div>
                  <div className="">
                    Role: {selectedData.role ? `${selectedData.role}` : "-"}
                  </div>
                  <div className="">
                    Gender:{" "}
                    {selectedData.gender
                      ? selectedData.gender === "M"
                        ? "Male"
                        : "Female"
                      : "-"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col pl-3 text-sm">
                <div className="">
                  Date of birth:{" "}
                  {selectedData.date_of_birth
                    ? `${formattedDateBirth} - ${formattedTimeBirth}`
                    : "-"}
                </div>
                <div className="">
                  Phone Number:{" "}
                  {selectedData.phone_number
                    ? `${selectedData.phone_number}`
                    : "-"}
                </div>

                <div className="">
                  Email: {selectedData.email ? `${selectedData.email}` : "-"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-fit flex flex-wrap justify-center items-center text-center text-gray-400">
            {" "}
            - User data not found -
          </div>
        )}

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

UserAccountDetail.propTypes = {
  selectedData: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    gender: PropTypes.string,
    date_of_birth: PropTypes.string,
    role: PropTypes.string,
    create_account_time: PropTypes.string,
  }).isRequired,
};
