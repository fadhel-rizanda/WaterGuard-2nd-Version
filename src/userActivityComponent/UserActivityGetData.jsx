import { useEffect, useState } from "react";
import { Loading } from "../mapComponents/Loading";
import { NoData } from "../mapComponents/NoData";
import { UserActivityDetail } from "./UserActivityDetail";
import searchLogo from "/ASSET/image-logo/search.png";

export const UserActivityGetData = () => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [update, setUpdate] = useState(false);
  const [showList, setShowList] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        setLoading(true);

        const res = await fetch(
          "http://localhost:8081/user-monitoring-activity/get"
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setData(data);
          console.log(data);

          await handleUser();
          await handleLocation();
        } else {
          console.log("Data is not an array:", data);
          setData([]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUser = async () => {
    try {
      console.log("Fetching user data...");
      const res = await fetch("http://localhost:8081/userAccount");
      const data = await res.json();

      if (Array.isArray(data)) {
        setUserData(data);
        console.log(data);
      } else {
        console.log("User data is not an array:", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLocation = async () => {
    try {
      console.log("Fetching location data...");
      const res = await fetch("http://localhost:8081/user");
      const data = await res.json();

      if (Array.isArray(data)) {
        setLocationData(data);
        console.log(data);
      } else {
        console.log("Location data is not an array:", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <NoData />;
  }

  // const handleUpdate = () => {
  //   setUpdate(!update);
  // };

  const handleShowList = () => {
    setShowList(!showList);
    setFilter("");
  };

  const filteredData = Array.isArray(data)
    ? data.filter((item) => {
        const matchesFilter = item.user_activity_description
          .toLowerCase()
          .includes(filter.toLowerCase());
        return matchesFilter;
      })
    : [];

  return (
    <>
      <div
        className={` text-5xl font-semibold flex justify-center items-end hover:bg-gray-300 rounded-3xl p-5 cursor-pointer ${
          showList ? "bg-gray-300 mx-16" : "mx-12 hover:mx-16"
        } transition-all ease-out duration-1000`}
        onClick={handleShowList}
      >
        <div className="w-min flex gap-1.5">
          <div className="">User</div> <div className="">Activity</div>
        </div>
        <div className="w-full border-y-2 border-black rounded-full"></div>
      </div>
      {showList && (
        <div className="mx-20 mb-10 flex flex-col gap-8">
          <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-3xl shadow-custom trasition ease-out duration-200">
            <div className="relative">
              <div className="flex">
                <input
                  id="filterName"
                  type="text"
                  className="w-full p-2 pl-10 focus:outline-none border-2 border-gray-100 focus:border-gray-300 rounded-3xl"
                  placeholder="Enter text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />{" "}
                <button
                  onClick={() => setFilter("")}
                  className="text-3xl mx-1 h-min w-min text-gray-500 hover:text-red-500 active:text-red-300 trasition ease-out duration-200"
                >
                  &times;
                </button>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  src={searchLogo}
                  alt="Search"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0 border-b-4 border-gray-200">
            {filteredData.map((e, index) => {
              const user = userData.find((user) => user.id === e.user_id);
              const location = locationData.find(
                (location) => location.id === e.location_id
              );

              const userForm = user
                ? {
                    username: user.username,
                    role: user.user_role,
                    email: user.email,
                    phone_number: user.phone_number,
                  }
                : {
                    username: "",
                    role: "",
                    email: "",
                    phone_number: "",
                  };

              const locationForm = location
                ? {
                    location_name: location.name,
                    status: location.status,
                    category: location.ikaCategories,
                    lastUpdate: location.lastUpdate,
                  }
                : {
                    location_name: "",
                    status: "",
                    category: "",
                    lastUpdate: "",
                  };

              return (
                <div key={index}>
                  <UserActivityDetail
                    selectedData={e}
                    userForm={userForm}
                    locationForm={locationForm}
                    // handleUpdate={handleUpdate}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
