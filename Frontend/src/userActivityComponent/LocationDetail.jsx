import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export const LocationDetail = ({ location_id }) => {
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    console.log("Fetching data...");
    fetch("http://localhost:8081/user")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const location = data.find((location) => location.id === location_id);
          setSelectedData(location || null);
          console.log(data);
        } else {
          console.log("Data is not an array:", data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location_id]);

  if (!selectedData) {
    return <div>No data found for user ID {location_id}</div>;
  }
  return (
    <div>
      LocationDetail - {location_id} - {selectedData.name}
    </div>
  );
};

LocationDetail.propTypes = {
  location_id: PropTypes.number,
};
