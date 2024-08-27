import { useState, useEffect } from "react";
import axios from "axios";

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const API_key = `33a1d0157e21a0a59d6b0de805698404`;

export const GetUserLocation = () => {
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [userLocationName, setUserLocationName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const successCallback = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setUserLat(lat);
      setUserLng(lon);
      setError(null);

      const finalAPIEndpoint = `${API_endpoint}lat=${lat}&lon=${lon}&appid=${API_key}`;
      axios
        .get(finalAPIEndpoint)
        .then((response) => {
          console.log(response.data);
          setUserLocationName(response.data.name);
        })
        .catch((err) => {
          console.error("Error fetching weather data:", err);
          setError("Unable to fetch weather data.");
        });
    };

    const errorCallback = (error) => {
      console.error("Error fetching location:", error);
      setError(
        "Unable to fetch location. Please check your location settings."
      );
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
    return () => {
      setUserLat(null);
      setUserLng(null);
      setError(null);
    };
  }, []);

  return { userLocationName, userLat, userLng, error };
};
