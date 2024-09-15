import { useEffect, useState } from "react";
import { FirstSection } from "../homeComponents/FirstSection";
import { SecondSection } from "../homeComponents/SecondSection";
import { NoData } from "../mapComponents/NoData";
import { Loading } from "../mapComponents/Loading";
import { useAuthContext } from "../hooks/useAuthContext";

export const Home = () => {
  const { user } = useAuthContext();
  const [userLat, setUserLat] = useState(user?.location_lat || null);
  const [userLng, setUserLng] = useState(user?.location_lng || null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [noData, setNoData] = useState(false);

  const handleUpdate = () => {
    console.log("Handle Update Called...");
    setIsFetched((prev) => !prev);
  };

  const getNewestData = async () => {
    console.log("Fetching Newest Data...");
    setLoading(true);
    try {      
      const response = await fetch("https://api2.waterguard.asia/user-newest");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setUserData(data[0]);
        setNoData(false);
      } else {
        setUserData(null);
        setNoData(true);
      }
    } catch (err) {
      console.error(err);
      setUserData(null);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {      
      if (user && user.location_lat && user.location_lng) {
        setUserLat(user.location_lat);
        setUserLng(user.location_lng);
      }

      console.log("Fetching User Data...");
      setLoading(true);
      try {
        const response = await fetch("https://api2.waterguard.asia/user");
        const data = await response.json();
        if (Array.isArray(data)) {
          setData(data);
          let relevantData = data.find(
            (item) => item.lat === userLat && item.lng === userLng
          );
          if (!relevantData) {
            await getNewestData();
            setNoData(true);
          } else {
            setNoData(false);
            setUserData(relevantData);
          }
        } else {
          console.error("Data is not an array:", data);
          setData([]);
          setUserData(null);
          setNoData(true);
        }
      } catch (err) {
        console.error(err);
        setData([]);
        setUserData(null);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, userLat, userLng, isFetched]);

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

  if (data.length === 0) {
    return <NoData />;
  }

  return (
    <div className="">
      <FirstSection
        getData={userData}
        updateData={handleUpdate}
        noData={noData}
      />

      <SecondSection getData={data} onUpdate={handleUpdate} />
    </div>
  );
};
