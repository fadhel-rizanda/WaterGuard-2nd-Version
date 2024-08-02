import monitoringLogo from "/ASSET/image-logo/monitoring.png";
import loginLogo from "/ASSET/image-logo/login.png";
import { NoData } from "../mapComponents/NoData";
import { Loading } from "../mapComponents/Loading";
import { useEffect, useState } from "react";
export const FirstSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const userLat = -6.2197; // bikin jd props
  const userLng = 107; // bikin jd props

  useEffect(() => {
    console.log("Fetching Data...");
    setLoading(true);
    fetch("http://localhost:8081/user")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
          const relevantData = data.find(
            (item) => item.lat === userLat && item.lng === userLng
          );
          setUserData(relevantData || null);
        } else {
          console.error("Data is not an array:", data);
          setData([]);
          setUserData(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userLat, userLng]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data.length) {
    return <NoData />;
  }
  return (
    <div className="h-screen w-full bg-bgHomeFirst bg-cover bg-center bg-no-repeat">
      <div className="flex text-white ">
        <div className="ml-16 mt-32 flex flex-col gap-5">
          <div className="text-8xl font-semibold">
            Water Clarity Starts <br />{" "}
            <span className="font-thin text-7xl ">with Smart Monitoring</span>{" "}
          </div>

          <div className="flex flex-row items-center gap-5 max-h-32">
            <div className="bg-black w-fit p-2 px-4 bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white border-opacity-50 hover:border-opacity-100 trasition ease-out duration-1000">
              <div className="text-xl font-extralight">
                Your Current location status:
              </div>
              <div className="font-bold">{userData.name}</div>
              <div className="">
                Condition: {userData.ikaCategories} - {userData.status}
              </div>
            </div>

            <div className="bg-black w-fit p-2 bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white hover:border-opacity-100 border-opacity-50 trasition ease-out duration-1000 group">
              <div className="bg-white bg-opacity-75 group-hover:bg-opacity-100 flex flex-col gap-0 p-9 text-black h-12 w-12 items-center justify-center rounded-full trasition ease-out duration-1000">
                <div className="font-bold text-xs">IKA</div>
                <div className="text-3xl">{userData.ika_score}</div>
              </div>
            </div>

            <div className="flex items-center bg-black w-fit p-6 bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white border-opacity-50 hover:border-opacity-100 trasition ease-out duration-1000">
              <ul className="flex gap-5  opacity-75 hover:opacity-100 trasition ease-out duration-1000">
                <li className="chart box-border">
                  <span className="text-4xl font-normal ">
                    {currentTime.getHours()}
                  </span>{" "}
                  Hours
                </li>
                <li className="chart box-border">
                  <span className="text-4xl font-normal">
                    {currentTime.getMinutes()}
                  </span>{" "}
                  Minutes
                </li>
                <li className="chart box-border">
                  <span className="text-4xl font-normal">
                    {currentTime.getSeconds()}
                  </span>{" "}
                  Second
                </li>
              </ul>
            </div>
          </div>
          <div className="flex mt-5 gap-5 text-2xl items-center">
            <button className="bg-white text-black hover:bg-opacity-60 active:bg-opacity-80 flex items-center font-light hover:font-bold shadow-custom py-2 pl-0.5 pr-2 rounded-xl trasition ease-out duration-1000 group border-2 border-white">
              <img
                src={monitoringLogo}
                alt=""
                className="group-hover:w-9 w-7 trasition ease-out duration-1000"
              />
              Start Monitoring
            </button>
            <button className="bg-white text-black hover:bg-opacity-60 active:bg-opacity-80 flex items-center font-light hover:font-bold shadow-custom p-2   rounded-xl trasition ease-out duration-1000 group border-2 border-white gap-1">
              <img
                src={loginLogo}
                alt=""
                className="group-hover:w-9 w-7 trasition ease-out duration-1000"
              />
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
