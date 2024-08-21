import { useEffect } from "react";
import { useState } from "react";
import { Loading } from "../mapComponents/Loading";
import { NoData } from "../mapComponents/NoData";
import { UserActivityDetail } from "./UserActivityDetail";

export const UserActivityContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Fetching data...");
    setLoading(true);
    fetch("http://localhost:8081/user-monitoring-activity/get")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
          console.log(data);
        } else {
          console.log("Data is not an array:", data);
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <NoData />;
  }

  return (
    <div className="flex flex-col p-20 pt-40 gap-10">
      {data.map((e, index) => (
        <div key={index}>
          {/* {e.user_id} */}
          <UserActivityDetail selectedData={e} />
        </div>
      ))}
    </div>
  );
};
