import PropTypes from "prop-types";

export const MapDetail = ({ selectedData }) => {
  return (
    <div className="border-4 border-b-0 border-gray-200 p-5 flex flex-col gap-2">
      <div className="flex justify-between font-bold text-xl">
        <div className="">
          {selectedData.id} - {selectedData.name}
        </div>
        <div className="">{selectedData.lastUpdate}</div>
      </div>

      {/* ============================================================ */}
      <div className="border-t-2"></div>
      <div className="font-semibold">Latest Information:</div>

      <div className="flex flex-wrap justify-between items-center">
        {selectedData.name ? (
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-10">
              <div className="flex flex-col">
                <div className="flex flex-col pl-3 text-sm">
                  <div className="">
                    Last update:{" "}
                    {selectedData.lastUpdate
                      ? `${selectedData.lastUpdate}`
                      : "-"}
                  </div>
                  <div className="">
                    Lat: {selectedData.lat ? `${selectedData.lat}` : "-"}
                  </div>
                  <div className="">
                    Lng: {selectedData.lng ? `${selectedData.lng}` : "-"}
                  </div>
                  <div className="">
                    Status:{" "}
                    {selectedData.status ? `${selectedData.status}` : "-"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col pl-3 text-sm">
                <div className="">
                  Category:{" "}
                  {selectedData.ikaCategories
                    ? `${selectedData.ikaCategories}`
                    : "-"}
                </div>
                <div className="">
                  Ika score:{" "}
                  {selectedData.ika_score ? `${selectedData.ika_score}` : "-"}
                </div>
                <div className="">
                  Reporter name:{" "}
                  {selectedData.reporter_name
                    ? `${selectedData.reporter_name}`
                    : "-"}
                </div>
                <div className="">
                  Reporter email:{" "}
                  {selectedData.email ? `${selectedData.email}` : "-"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-fit flex flex-wrap justify-center items-center text-center text-gray-400">
            {" "}
            - User data not found -
          </div>
        )}

        <div className="flex gap-3">
        <button className="p-2 rounded-xl shadow-custom bg-red-500 text-white hover:bg-red-300 active:bg-red-100 active:text-red-500 transition-all ease-out duration-500">
            delete location condition
          </button>
        </div>
      </div>
    </div>
  );
};

MapDetail.propTypes = {
  selectedData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    status: PropTypes.string,
    ika_score: PropTypes.number,
    ikaCategories: PropTypes.string,
    lastUpdate: PropTypes.string,
    reporter_name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
