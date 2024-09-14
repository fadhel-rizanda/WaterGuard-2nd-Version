import PropTypes from "prop-types";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

export const WaterConditionActivity = ({
  selectedData,
  activity_type,
  adminActivity,
}) => {
  const { user } = useAuthContext();
  const [fetched, setfetched] = useState(false);

  if (adminActivity && !fetched) {
    console.log("UPDATE ACTIVITY TRIGGERED");
    console.log(user.id);
    console.log(selectedData.id);

    const url = `https://api2.waterguard.asia/water-conditions-activity`;
    const insertedData = {
      admin_id: user.id.toString(),
      location_id: selectedData.id.toString(),
      activity_type: activity_type,
      activity_description: `${activity_type}-{${user.id}-${user.username}}-{${selectedData.id}-${selectedData.name}}`,
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
        setfetched(!fetched);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return null;
};

WaterConditionActivity.propTypes = {
  selectedData: PropTypes.object.isRequired,
  activity_type: PropTypes.string.isRequired,
  adminActivity: PropTypes.bool.isRequired,
};
