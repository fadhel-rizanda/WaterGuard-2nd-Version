import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const UserDetail = ({ user_id }) => {
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    console.log("Fetching data...");
    fetch("http://localhost:8081/userAccount")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const user = data.find((user) => user.id === user_id);
          setSelectedData(user || null);
          console.log(data);
        } else {
          console.log("Data is not an array:", data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  if (!selectedData) {
    return <div>No data found for user ID {user_id}</div>;
  }

  return (
    <div>
      UserDetail - {user_id} - {selectedData.username}
    </div>
  );
};

UserDetail.propTypes = {
  user_id: PropTypes.number,
};
