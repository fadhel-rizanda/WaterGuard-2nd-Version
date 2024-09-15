import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const AddUserActivity = ({
  user_id,
  user_role,
  user_activity,
  location_name,
  location_time,
}) => {
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const response = await fetch("https://api2.waterguard.asia/user");
        if (!response.ok)
          throw new Error(`Error fetching data: ${response.statusText}`);

        const data = await response.json();

        if (Array.isArray(data)) {
          const location = data.find(
            (loc) =>
              loc.name === location_name && loc.lastUpdate === location_time
          );
          setSelectedData(location || null);
          console.log(data);
        } else {
          console.log("Data is not an array:", data);
        }
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchData();
  }, [location_name, location_time]);

  useEffect(() => {
    const postUserActivity = async () => {
      if (!selectedData) return;

      const url = `https://api2.waterguard.asia/user-monitoring-activity/post`;
      const user_activity_description = `${user_activity}_${user_id}_${user_role}_${location_name}`;

      const formatToSend = new FormData();
      formatToSend.append("user_id", user_id);
      formatToSend.append("location_id", selectedData.id);
      formatToSend.append("user_activity", user_activity);
      formatToSend.append(
        "user_activity_description",
        user_activity_description
      );

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formatToSend,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Post error: ${errorText}`);
        }

        const data = await response.json();
        console.log("Success:", data);
      } catch (error) {
        console.error("Post error:", error);
      }
    };

    postUserActivity();
  }, [selectedData, user_id, user_activity, location_name]);

  return null; 
};

AddUserActivity.propTypes = {
  user_id: PropTypes.number.isRequired,
  user_role: PropTypes.string.isRequired,
  user_activity: PropTypes.string.isRequired,
  location_name: PropTypes.string.isRequired,
  location_time: PropTypes.string.isRequired,
};
