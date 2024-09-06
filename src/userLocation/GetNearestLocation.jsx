import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const GetNearestLocation = ({ lat, lng }) => {
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handlePredict = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/predict",
          { location: [lat, lng] }, 
          {
            headers: {
              "Content-Type": "application/json", 
            },
          }
        );
        setPrediction(response.data.predicted_id); 
        setError("");
      } catch (err) {
        if (err.response) {
          setError(`Error: ${err.response.data.error}`);
        } else if (err.request) {
          setError("Error: No response received from server");
        } else {
          setError(`Error: ${err.message}`);
        }
      }
    };

    if (lat && lng) {
      handlePredict();
    }
  }, [lat, lng]);

  return { prediction, error };
};

GetNearestLocation.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};
