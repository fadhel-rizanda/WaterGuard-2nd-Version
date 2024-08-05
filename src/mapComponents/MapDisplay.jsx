import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { VerifiedDetail } from "./VerifiedDetail";
import { UnverifiedDetail } from "./UnverifiedDetail";
import { Loading } from "./Loading";

import check1 from "/ASSET/image-logo/image-logo-location/location-check-1.png";
import check2 from "/ASSET/image-logo/image-logo-location/location-check-2.png";
import check3 from "/ASSET/image-logo/image-logo-location/location-check-3.png";
import check4 from "/ASSET/image-logo/image-logo-location/location-check-4.png";
import check5 from "/ASSET/image-logo/image-logo-location/location-check-5.png";

import question1 from "/ASSET/image-logo/image-logo-location/location-question-1.png";
import question2 from "/ASSET/image-logo/image-logo-location/location-question-2.png";
import question3 from "/ASSET/image-logo/image-logo-location/location-question-3.png";
import question4 from "/ASSET/image-logo/image-logo-location/location-question-4.png";
import question5 from "/ASSET/image-logo/image-logo-location/location-question-5.png";

import noData from "/ASSET/image-logo/image-logo-location/location-no_data.png";

delete L.Icon.Default.prototype._getIconUrl;

const getIcon = (item) => {
  let iconUrl = noData;

  if (item.status === "verified") {
    if (item.ika_score >= 70) {
      iconUrl = check1;
    } else if (item.ika_score >= 60 && item.ika_score < 70) {
      iconUrl = check2;
    } else if (item.ika_score >= 50 && item.ika_score < 60) {
      iconUrl = check3;
    } else if (item.ika_score >= 30 && item.ika_score < 50) {
      iconUrl = check4;
    } else if (item.ika_score < 30) {
      iconUrl = check5;
    }
  } else {
    if (item.ikaCategories === "Good") {
      iconUrl = question1;
    } else if (item.ikaCategories === "Quite Good") {
      iconUrl = question2;
    } else if (item.ikaCategories === "Lightly Polluted") {
      iconUrl = question3;
    } else if (item.ikaCategories === "Moderately Polluted") {
      iconUrl = question4;
    } else if (item.ikaCategories === "Heavily Polluted") {
      iconUrl = question5;
    }
  }

  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [1, -35],
  });
};

export const MapDisplay = ({ getData, onUpdate, detailActive }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);

  const handleClose = () => {
    setSelectedData(null);
  };

  const handleUpdate = () => {
    console.log("Update triggered...");
    if (onUpdate) {
      onUpdate();
    }
  };

  useEffect(() => {
    setData(getData);
    setLoading(false);
  }, [getData]);

  if (loading) {
    return <Loading />;
  }

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
    <>    
      <div className="h-custom shadow-custom overflow-hidden"> {/* rounded-3xl */}
        <MapContainer
          center={[data[0]?.lat ?? 0, data[0]?.lng ?? 0]}
          zoom={13}
          style={{ height: "100%", width: "100%", zIndex: "0" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data.map((item, index) => (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={getIcon(item)}
              eventHandlers={{
                click: () => {
                  setSelectedData(item);
                },
              }}
            >
              <Popup>
                <div className="flex flex-col sm:flex-row sm:text-sm justify-between font-semibold border-b-2 border-gray-300 gap-1 h-min">
                  <h3 className="w-full sm:w-3/5">{item.name}</h3>
                  <div className="font-normal mt-2 sm:mt-0 w-32">
                    {item.lastUpdate}
                  </div>
                </div>
                <div className="flex flex-col">
                  {item.status === "verified" ? (
                    <p className="text-green-500 h-min">
                      <span className="text-black">Status:</span> {item.status}
                      <br />
                      <span className={getCategoryClass(item.ikaCategories)}>
                        <span className="text-black">Category: </span>
                        {item.ikaCategories}
                        {item.ika_score != null && (
                          <span className={getScoreClass(item.ika_score)}>
                            {" "}
                            - {item.ika_score} IKA Score
                          </span>
                        )}
                      </span>
                    </p>
                  ) : (
                    <p className="text-red-500 h-min">
                      <span className="text-black">Status:</span> {item.status}
                      <br />
                      <span className={getCategoryClass(item.ikaCategories)}>
                        <span className="text-black">Category: </span>
                        {item.ikaCategories}
                      </span>
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {detailActive && selectedData && (
        <div className="flex flex-col justify-center items-center mt-10">
          <div className="w-fit rounded-3xl border-2 shadow-custom items-center p-7 pt-2 flex justify-center text-center sm:text-left">
            {selectedData.status === "verified" ? (
              <VerifiedDetail
                selectedData={selectedData}
                onClose={handleClose}
                onUpdate={handleUpdate}
              />
            ) : (
              <UnverifiedDetail
                selectedData={selectedData}
                onClose={handleClose}
                onUpdate={handleUpdate}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

MapDisplay.propTypes = {
  getData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      ika_score: PropTypes.number,
      ikaCategories: PropTypes.string.isRequired,
      lastUpdate: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      reporter_name: PropTypes.string,
      email: PropTypes.string,
    })
  ).isRequired,
  onUpdate: PropTypes.func,
  detailActive: PropTypes.bool.isRequired, 
};
