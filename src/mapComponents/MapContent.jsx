import { MapDisplay } from "./MapDisplay";
import { useState, useEffect } from "react";
import searchLogo from "/ASSET/image-logo/search.png";
import questionLogo from "/ASSET/image-logo/question.png";
import { NoData } from "./NoData";
import { Loading } from "./Loading";
import { AddData } from "./AddData";
import { DetailDisplay } from "./DetailDisplay";
import { QuestionDisplay } from "./QuestionDisplay";

export const MapContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [addButton, setAddButton] = useState(false);
  const [questionDisplay, setQuestionDisplay] = useState(false);
  const [statusFilter, setStatusFilter] = useState({
    verified: false,
    unverified: false,
  });
  const [updateData, setUpdateData] = useState(false);

  const handleClose = () => {
    setSelectedData(null);
  };
  const questionHandleClose = () => {
    setQuestionDisplay(false);
  };

  const addHandleClose = () => {
    setAddButton(false);
  };

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
        } else {
          console.error("Data is not an array:", data);
          setData([]);
        }
        setLoading(false);
        setUpdateData(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [updateData]);

  if (loading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <NoData />;
  }

  const filteredData = Array.isArray(data)
    ? data.filter((item) => {
        const matchesFilter = item.name
          .toLowerCase()
          .includes(filter.toLowerCase());

        const matchesStatus =
          (statusFilter.verified && item.status === "verified") ||
          (statusFilter.unverified && item.status === "unverified") ||
          (!statusFilter.verified && !statusFilter.unverified);

        const matchesCategory =
          categoryFilter === "" || item.ikaCategories === categoryFilter;

        return matchesFilter && matchesStatus && matchesCategory;
      })
    : [];

  const handleStatusFilterChange = (event) => {
    const { id, checked } = event.target;
    setStatusFilter((prevFilter) => ({
      ...prevFilter,
      [id]: checked,
    }));
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const getCategoryClass = (category) => {
    if (category === "Good") return "text-blue-500";
    else if (category === "Quite Good") return "text-teal-400";
    else if (category === "Lightly Polluted") return "text-green-500";
    else if (category === "Moderately Polluted") return "text-yellow-500";
    else if (category === "Heavily Polluted") return "text-red-500";
  };

  const getScoreClass = (score) => {
    if (score >= 70) return "text-blue-500";
    else if (score >= 60 && score < 70) return "text-teal-400";
    else if (score >= 50 && score < 60) return "text-green-500";
    else if (score >= 30 && score < 50) return "text-yellow-500";
    else if (score < 30) return "text-red-500";
  };

  return (
    <div className="flex flex-wrap p-6 pt-0 md:p-10 md:pt-0 gap-9 justify-center">
      {/* Map */}
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-full lg:w-4/5 flex flex-col justify-center">
          <MapDisplay getData={filteredData} onUpdate={handleUpdate} detailActive={true} />
        </div>
      </div>

      <div className="w-full lg:w-4/5">
        <div className="flex justify-center">
          <form
            action=""
            className="flex flex-wrap w-7/12 sm:w-fit gap-5 gap-y-1 text-base font-light justify-center bg-gray-100 hover:bg-gray-200 p-1.5 px-2.5 rounded-t-xl shadow-inner trasition ease-out duration-200"
          >
            <div className="hover:font-normal trasition ease-out duration-200">
              <input
                type="checkbox"
                id="verified"
                checked={statusFilter.verified}
                onChange={handleStatusFilterChange}
                className="cursor-pointer"
              />
              <label htmlFor="verified" className="pl-2 cursor-pointer">
                Verified
              </label>
            </div>

            <div className="hover:font-normal trasition ease-out duration-200">
              <input
                type="checkbox"
                id="unverified"
                checked={statusFilter.unverified}
                onChange={handleStatusFilterChange}
                className="cursor-pointer"
              />
              <label htmlFor="unverified" className="pl-2 cursor-pointer">
                Unverified
              </label>
            </div>

            <div>
              <select
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                className="rounded-lg  cursor-pointer focus:outline-none border-2 border-gray-200 focus:border-gray-300"
              >
                <option value="">Select a category</option>
                <option value="Good">Good</option>
                <option value="Quite Good">Quite Good</option>
                <option value="Lightly Polluted">Lightly Polluted</option>
                <option value="Moderately Polluted">Moderately Polluted</option>
                <option value="Heavily Polluted">Heavily Polluted</option>
              </select>
            </div>
          </form>
        </div>
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
              <div
                className="h-fit mx-1 mt-2 w-fit bg-white hover:bg-gray-300 active:bg-gray-200 rounded-3xl trasition ease-out duration-200"
                onClick={() => setQuestionDisplay(true)}
              >
                <img src={questionLogo} className="w-6 h-6" alt="" />
              </div>
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

        {questionDisplay && <QuestionDisplay onClose={questionHandleClose} />}
        <div className="flex justify-center">
          <button
            aria-label="clear search"
            className="flex gap-5 text-base font-light justify-center bg-gray-100 hover:bg-gray-200 py-1 px-3 rounded-b-xl shadow-md trasition ease-out duration-200"
            onClick={() => setAddButton(true)}
          >
            + Add Data
          </button>
          {addButton && (
            <AddData onClose={addHandleClose} onUpdate={handleUpdate} />
          )}
        </div>
      </div>

      {filteredData.length > 0 ? (
        filteredData.map((e, index) => (
          <div
            key={index}
            className="cursor-pointer justify-center flex flex-col hover:bg-gray-100 active:bg-gray-200 w-full sm:w-2/5 md:w-1/3 lg:w-1/4 shadow-custom rounded-lg min-h-40 sm:min-h-48 trasition ease-out duration-200"
            onClick={() => setSelectedData(e)}
          >
            <div className="p-4 flex flex-col sm:flex-row sm:text-sm justify-between font-semibold border-b-2 border-gray-300">
              <h3 className="w-full sm:w-2/5">{e.name}</h3>
              <div className="text-left sm:text-right font-normal mt-2 sm:mt-0">
                {e.lastUpdate}
              </div>
            </div>
            <div className="p-4">
              {e.status === "verified" ? (
                <>
                  <p className="text-green-500 flex items-center gap-1">
                    <span className="text-black">Status:</span> {e.status}
                  </p>
                  <span className={getCategoryClass(e.ikaCategories)}>
                    <span className="text-black">Category: </span>
                    {e.ikaCategories}
                    <span className={getScoreClass(e.ika_score)}>
                      {" "}
                      - {e.ika_score} IKA Score
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <p className="text-red-500 flex items-center gap-1">
                    <span className="text-black">Status:</span> {e.status}
                  </p>
                  <span className={getCategoryClass(e.ikaCategories)}>
                    <span className="text-black">Category: </span>
                    {e.ikaCategories}
                  </span>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full text-center">- No data found -</div>
      )}

      {selectedData && (
        <DetailDisplay
          selectedData={selectedData}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};
