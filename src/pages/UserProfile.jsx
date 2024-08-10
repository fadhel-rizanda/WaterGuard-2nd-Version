import { useEffect, useState } from "react";
import { UserProfileContent } from "../userProfileComponents/UserProfileContent";
import { Loading } from "../mapComponents/Loading";
import { NoData } from "../mapComponents/NoData";
import { UserLogoutDelete } from "../userProfileComponents/UserLogoutDelete";

export const UserProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logedout, setLogedout] = useState(false);

  useEffect(() => {
    console.log("Fetching Data...");
    setLoading(true);
    fetch("http://localhost:8081/userAccount")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
          setLogedout(false);
        } else {
          console.error("Data is not an array:", data);
          setData([]);          
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (data.length === 0 && !logedout ) {
    return <NoData />;
  }

  const selectedUser = data.length > 1 ? data[1] : {};

  const handleLogout = () => {
    setData([]);
    window.alert("Account logged out");
    setLogedout(true);
  };

  if (logedout) {
    return <UserLogoutDelete />;
  }

  return (
    <div className="pt-20 min-h-screen w-full bg-bgUserProfile bg-cover bg-center bg-no-repeat">
      <UserProfileContent selectedUser={selectedUser} onLogout={handleLogout} />
    </div>
  );
};
