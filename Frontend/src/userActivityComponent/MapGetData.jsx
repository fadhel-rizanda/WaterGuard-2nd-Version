import { useEffect, useState } from "react";
import { Loading } from "../mapComponents/Loading";
import { MapDetail } from "./MapDetail";
import searchLogo from "/ASSET/image-logo/search.png";

export const MapGetData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [noData, setNoData] = useState(false);
  const [filter, setFilter] = useState("");
  const [isRecent, setIsRecent] = useState("");
  const [isID, setIsID] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [update, setUpdate] = useState(false);
  const handleUpdate = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        setLoading(true);

        const res = await fetch("https://api2.waterguard.asia/user");
        const data = await res.json();

        if (Array.isArray(data)) {
          setData(data);
          console.log(data);
          setNoData(false);
        } else {
          console.log("Data is not an array:", data);
          setData([]);
          setNoData(true);
        }
      } catch (err) {
        console.log(err);
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
          const matchesFilter = `${item.id} - ${item.name}`
            .toLowerCase()
            .includes(filter.toLowerCase());

          const matchesCategory =
            categoryFilter === "" || item.ikaCategories === categoryFilter;

          return matchesFilter && matchesCategory;
        })
        .sort((a, b) => {
          if (isRecent === "recent") {
            return new Date(b.lastUpdate) - new Date(a.lastUpdate);
          } else if (isRecent === "oldest") {
            return new Date(a.lastUpdate) - new Date(b.lastUpdate);
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
          <div className="">Location</div> <div className="">Condition</div>
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
                  <option value="Good">Good</option>
                  <option value="Quite Good">Quite Good</option>
                  <option value="Lightly Polluted">Lightly Polluted</option>
                  <option value="Moderately Polluted">
                    Moderately Polluted
                  </option>
                  <option value="Heavily Polluted">Heavily Polluted</option>
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
              {filteredData.map((e, index) => (
                <div key={index}>
                  <MapDetail selectedData={e} handleUpdate={handleUpdate} />
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};
