import PropTypes from "prop-types";
import { useState } from "react";
import { DeleteLocationCondition } from "./DeleteLocationCondition";
import { DetailDisplay } from "../mapComponents/DetailDisplay";

export const MapDetail = ({ selectedData, handleUpdate }) => {
  const [deleteRecord, setDeleteRecord] = useState(false);
  const [detailRecord, setDetailRecord] = useState(false);

  const handleDeleteRecord = () => {
    setDeleteRecord(!deleteRecord);
  };

  const handleSuccess = () => {
    handleUpdate();
  };

  const handleDetailRecord = () => {
    setDetailRecord(!detailRecord);
  };

  return (
    <>
      <div className="border-4 border-b-0 border-gray-200 p-5 flex flex-col gap-3">
        <div className="flex flex-wrap justify-between font-semibold text-xl">
          <div className="">
            {selectedData.id} - {selectedData.name}
          </div>
          <div className="">{selectedData.lastUpdate}</div>
        </div>

        {/* ============================================================ */}
        <div className="border-t-2"></div>
        <div className="font-semibold">Latest Information:</div>

        <div className="flex flex-col lg:flex-row justify-between items-center">
          {selectedData.name ? (
            <div className="flex flex-col">
              <div className="flex  gap-8 overflow-auto mb-5 xl:mb-0">
                <div className="flex flex-col w-fit h-20 md:h-fit">
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

                <div className="border-l-2"></div>

                <div className="flex flex-col mb-5 xl:mb-0 w-fit h-20 md:h-fit">
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
            <button
              onClick={handleDetailRecord}
              className="p-2 rounded-xl shadow-custom bg-green-500 text-white hover:bg-green-300 active:bg-green-100 active:text-green-500 transition-all ease-out duration-500"
            >
              detail location condition
            </button>

            <button
              onClick={handleDeleteRecord}
              className="p-2 rounded-xl shadow-custom bg-red-500 text-white hover:bg-red-300 active:bg-red-100 active:text-red-500 transition-all ease-out duration-500"
            >
              delete location condition
            </button>
          </div>
        </div>
      </div>

      {/* selectedData, onClose, onUpdate */}
      {detailRecord && (
        <DetailDisplay
          selectedData={selectedData}
          onClose={handleDetailRecord}
          onUpdate={handleSuccess}
        />
      )}

      {deleteRecord && (
        <DeleteLocationCondition
          selectedData={selectedData}
          onClose={handleDeleteRecord}
          handleSuccess={handleSuccess}
        />
      )}
    </>
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
  handleUpdate: PropTypes.func,
};
