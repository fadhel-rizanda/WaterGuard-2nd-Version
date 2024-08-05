import { useEffect, useState } from "react";
import { FirstSection } from "../homeComponents/FirstSection";
import { SecondSection } from "../homeComponents/SecondSection";
import { NoData } from "../mapComponents/NoData";
import { Loading } from "../mapComponents/Loading";

export const Home = () => {
  const userLat = -6.2197; // bikin jd props
  const userLng = 107; // bikin jd props
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [updateData, setUpdateData] = useState(false);

  const handleUpdate = () => {
    console.log("Handle Update Called...");
    setUpdateData(true);
  };

  useEffect(() => {
    console.log("Fetching Data...");
    setLoading(true);
    fetch("http://localhost:8081/user")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
          const relevantData = data.find(
            (item) => item.lat === userLat && item.lng === userLng
          );
          setUserData(relevantData || null);
        } else {
          console.error("Data is not an array:", data);
          setData([]);
          setUserData(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userLat, userLng, updateData]);

  if (loading) {
    return <Loading />;
  }

  if (!data.length) {
    return <NoData />;
  }

  return (
    <div className="">
      {/* first section */}
      <FirstSection getData={userData} />

      {/* second section */}
      <SecondSection getData={data} onUpdate={handleUpdate} />
    </div>
  );
};
