import PropTypes from "prop-types";
import { UserDetail } from "./UserDetail";
import { LocationDetail } from "./LocationDetail";

export const UserActivityDetail = ({ selectedData }) => {
  const isoDateString = selectedData.activity_time;
  const date = new Date(isoDateString);

  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const formattedDate = date.toLocaleDateString(undefined, optionsDate);
  const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

  return (
    <div>
      <div className="">{selectedData.id}</div>
      <div className="">
        {formattedDate} - {formattedTime}
      </div>
      
      <UserDetail user_id={selectedData.user_id} />
      <LocationDetail location_id={selectedData.location_id} />

      <div className="">{selectedData.user_activity}</div>
      <div className="">{selectedData.user_activity_description}</div>
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
};
