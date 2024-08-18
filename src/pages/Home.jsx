import { useEffect, useState } from "react";
import { FirstSection } from "../homeComponents/FirstSection";
import { SecondSection } from "../homeComponents/SecondSection";
import { NoData } from "../mapComponents/NoData";
import { Loading } from "../mapComponents/Loading";
import { useAuthContext } from "../hooks/useAuthContext";

export const Home = () => {
  const { user } = useAuthContext();
  const [userLat, setUserLat] = useState(user?.location_lat || -6.2197);
  const [userLng, setUserLng] = useState(user?.location_lng || 107);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  const handleUpdate = () => {
    console.log("Handle Update Called...");
    setIsFetched((prev) => !prev);
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
          if (data === null) {
            setUserLat(-6.2197);
            setUserLng(107);
          }
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
  }, [userLat, userLng, isFetched]);

  useEffect(() => {
    let intervalId;

    if (!data.length) {
      intervalId = setInterval(() => {
        setIsFetched((prev) => !prev);
      }, 10000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [data.length]);

  if (loading) {
    return <Loading />;
  }

  if (!data.length) {
    return <NoData />;
  }

  return (
    <div className="">
      {/* first section */}
      <FirstSection getData={userData} updateData={handleUpdate} />

      {/* second section */}
      <SecondSection getData={data} onUpdate={handleUpdate} />
    </div>
  );
};
