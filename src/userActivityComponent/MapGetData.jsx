import { useEffect, useState } from "react";
import { Loading } from "../mapComponents/Loading";
import { NoData } from "../mapComponents/NoData";
import { MapDetail } from "./MapDetail";
import searchLogo from "/ASSET/image-logo/search.png";

export const MapGetData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        setLoading(true);

        const res = await fetch("http://localhost:8081/user");
        const data = await res.json();

        if (Array.isArray(data)) {
          setData(data);
          console.log(data);
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

  if (loading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <NoData />;
  }

  const handleShowList = () => {
    setShowList(!showList);
    setFilter("");
  };

  const filteredData = Array.isArray(data)
    ? data.filter((item) => {
        const matchesFilter = item.name
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
          <div className="">Location</div> <div className="">Condition</div>
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
            {filteredData.map((e, index) => (
              <div key={index}>
                <MapDetail selectedData={e} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
