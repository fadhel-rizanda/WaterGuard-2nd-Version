import { useEffect, useState } from "react";
import { Loading } from "../mapComponents/Loading";
import { UserActivityDetail } from "./UserActivityDetail";
import searchLogo from "/ASSET/image-logo/search.png";

export const UserActivityGetData = () => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [showList, setShowList] = useState(false);
  const [noData, setNoData] = useState(false);
  const [filter, setFilter] = useState("");
  const [isRecent, setIsRecent] = useState("");
  const [isID, setIsID] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        setLoading(true);

        const [dataRes, userRes, locationRes] = await Promise.all([
          fetch("http://localhost:8081/user-monitoring-activity/get"),
          fetch("http://localhost:8081/userAccount"),
          fetch("http://localhost:8081/user"),
        ]);

        const [data, userData, locationData] = await Promise.all([
          dataRes.json(),
          userRes.json(),
          locationRes.json(),
        ]);

        if (Array.isArray(data)) {
          setData(data);
          setNoData(false);
        } else {
          setData([]);
          setNoData(true);
        }

        if (Array.isArray(userData)) {
          setUserData(userData);
        } else {
          console.log("User data is not an array:", userData);
        }

        if (Array.isArray(locationData)) {
          setLocationData(locationData);
        } else {
          console.log("Location data is not an array:", locationData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [update]);

  if (loading) {
    return <Loading />;
  }

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleShowList = () => {
    setShowList(!showList);
    setFilter("");
    setIsRecent("");
    setIsID("");
    setCategoryFilter("");
  };

  const filteredData = Array.isArray(data)
    ? data
        .filter((item) => {
          const matchesFilter = `${item.id} - ${item.user_activity_description}`
            .toLowerCase()
            .includes(filter.toLowerCase());

          const matchesCategory =
            categoryFilter === "" || item.user_activity === categoryFilter;

          return matchesFilter && matchesCategory;
        })
        .sort((a, b) => {
          if (isRecent === "recent") {
            return new Date(b.activity_time) - new Date(a.activity_time);
          } else if (isRecent === "oldest") {
            return new Date(a.activity_time) - new Date(b.activity_time);
          }

          if (isID === "asc") {
            return a.id - b.id;
          } else if (isID === "desc") {
            return b.id - a.id;
          }
          return 0;
        })
    : [];

  return (
    <>
      <div
        className={`text-3xl md:text-5xl font-semibold flex justify-center items-end hover:bg-gray-300 rounded-3xl p-5 cursor-pointer ${
          showList
            ? "bg-gray-300 mx-9 md:mx-16"
            : "mx-5 md:mx-12 hover:mx-9 md:hover:mx-16"
        } transition-all ease-out duration-1000`}
        onClick={handleShowList}
      >
        <div className="w-min flex gap-1.5">
          <div className="">User</div> <div className="">Activity</div>
        </div>
        <div className="w-full border-y-2 border-black rounded-full"></div>
      </div>

      {showList &&
        (noData ? (
          <div className="w-full flex justify-center items-center text-center">
            - no data found -
          </div>
        ) : (
          <div className="mx-10 md:mx-20 mb-10 flex flex-col gap-8 transition-all ease-out duration-500">
            <div className="flex flex-col items-center">
              <div className="w-full bg-gray-100 hover:bg-gray-200 p-2 rounded-3xl shadow-custom trasition ease-out duration-200">
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
              <div className="p-2 pt-1.5 bg-gray-100 hover:bg-gray-300 rounded-b-xl flex flex-wrap w-52 sm:w-fit items-center justify-center gap-1.5 shadow-lg transition-all ease-out duration-500">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-lg cursor-pointer focus:outline-none border-2 border-gray-200 focus:border-blue-500"
                >
                  <option value="">
                    {categoryFilter === ""
                      ? "Select a category"
                      : "Remove Category"}
                  </option>
                  <option value="UPDATE">Update</option>
                  <option value="ADD">Add</option>
                  <option value="DELETE">Delete</option>
                </select>

                <select
                  onChange={(e) => setIsRecent(e.target.value)}
                  className="rounded-lg cursor-pointer focus:outline-none border-2 border-gray-200 focus:border-blue-500"
                >
                  <option value="">
                    {isRecent === "" ? "Sort by time" : "Remove by time"}
                  </option>
                  <option value="recent">Recent</option>
                  <option value="oldest">Oldest</option>
                </select>

                <select
                  onChange={(e) => setIsID(e.target.value)}
                  className="rounded-lg cursor-pointer focus:outline-none border-2 border-gray-200 focus:border-blue-500"
                >
                  <option value="">
                    {isID === "" ? "Sort by ID" : "Remove by ID"}
                  </option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
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
                      id: Number(user.id),
                      username: user.username,
                      role: user.role,
                      email: user.email,
                      phone_number: user.phone_number,
                    }
                  : {
                      id: NaN,
                      username: "",
                      role: "",
                      email: "",
                      phone_number: "",
                    };

                const locationForm = location
                  ? {
                      id: Number(location.id),
                      location_name: location.name,
                      status: location.status,
                      category: location.ikaCategories,
                      lastUpdate: location.lastUpdate,
                    }
                  : {
                      id: NaN,
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
                      handleUpdate={handleUpdate}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </>
  );
};
