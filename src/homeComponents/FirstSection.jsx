import monitoringLogo from "/ASSET/image-logo/monitoring.png";
import refreshLogo from "/ASSET/image-logo/refresh.png";
import loginLogo from "/ASSET/image-logo/login.png";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuthContext } from "../hooks/useAuthContext";

export const FirstSection = ({ getData, updateData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuthContext();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const getCategoryClass = (category) => {
    switch (category) {
      case "Good":
        return "bg-blue-500";
      case "Quite Good":
        return "bg-teal-400";
      case "Lightly Polluted":
        return "bg-green-500";
      case "Moderately Polluted":
        return "bg-yellow-500";
      case "Heavily Polluted":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const getCategoryClassBorder = (category) => {
    switch (category) {
      case "Good":
        return "border-blue-500";
      case "Quite Good":
        return "border-teal-400";
      case "Lightly Polluted":
        return "border-green-500";
      case "Moderately Polluted":
        return "border-yellow-500";
      case "Heavily Polluted":
        return "border-red-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className="min-h-screen pb-20 w-full items-center bg-bgHomeFirst bg-cover bg-center bg-no-repeat ">
      <div className="flex text-white">
        <div className="sm:mx-16 mx-10 mt-28 lg:mt-52 flex flex-col gap-5 trasition ease-out duration-500">
          <div className="cursor-default text-5xl  2xl:text-8xl  font-semibold  trasition ease-out duration-500">
            Water Clarity Starts <br />{" "}
            <span className="font-thin text-3xl sm:text-5xl md:text-6xl lg:text-7xl trasition ease-out duration-500">
              with Smart Monitoring
            </span>{" "}
          </div>

          <div className="flex flex-wrap items-center gap-5  transition-all ease-out duration-500">
            <div className="cursor-default bg-black w-fit p-2 h-fit hover:opacity-100 px-4 bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white border-opacity-50 hover:border-opacity-100 trasition ease-out duration-1000">
              <div className="text-xl font-light">
                {user ? (
                  !user.location_lat ? (
                    <>
                      <span className="text-xs font-thin">
                        {"No data for your location yet"}
                      </span>
                      <br /> {"Latest Updated Location:"}
                    </>
                  ) : (
                    "Your Current location:"
                  )
                ) : (
                  <>
                    <span className="text-xs font-thin">
                      {"No data for your location yet"}
                    </span>
                    <br /> {"Latest Updated Location:"}
                  </>
                )}
              </div>
              <div className="font-bold">{getData.name}</div>
              <div className="font-bold">
                {getData.ikaCategories} - {getData.status}
              </div>

              <div className="flex gap-3 items-center">
                <div className=" font-extralight">
                  Updated in: {getData.lastUpdate}
                </div>
                <img
                  src={refreshLogo}
                  alt=""
                  className="cursor-pointer w-4 h-4 hover:rotate-45 active:rotate-180 transition-all ease-out duration-200"
                  onClick={updateData}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 gap-y-5  transition-all ease-out duration-500">
              {getData.ika_score ? (
                <div
                  className={`cursor-default group bg-black w-fit p-1 md:p-2 h-max bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white ${getCategoryClassBorder(
                    getData.ikaCategories
                  )} hover:border-opacity-100 border-opacity-50 trasition ease-out duration-1000 group`}
                >
                  <div
                    className={`${getCategoryClass(
                      getData.ikaCategories
                    )} opacity-80  group-hover:opacity-100 flex flex-col gap-0 text-black p-1 md:p-9 h-14 w-14 md:h-12 md:w-12 items-center justify-center rounded-full trasition ease-out duration-500`}
                  >
                    <div className="font-bold text-xs">IKA</div>
                    <div className="text-xl">{getData.ika_score}</div>
                  </div>
                </div>
              ) : (
                <div
                  className={`cursor-default group bg-black w-fit p-1 md:p-2 h-max bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white ${getCategoryClassBorder(
                    getData.ikaCategories
                  )} hover:border-opacity-100 border-opacity-50 trasition ease-out duration-1000 group`}
                >
                  <div
                    className={`${getCategoryClass(
                      getData.ikaCategories
                    )} opacity-80  group-hover:opacity-100 flex flex-col gap-0 text-black md:p-9 h-14 w-min min-w-20 max-w-24 md:h-12 md:w-12 items-center justify-center rounded-xl trasition ease-out duration-500`}
                  >
                    <div className="text-center">{getData.ikaCategories}</div>
                  </div>
                </div>
              )}

              <div className="cursor-default flex items-center bg-black w-fit p-4 md:p-6 h-max bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white border-opacity-50 hover:border-opacity-100 trasition ease-out duration-500">
                <ul className="flex gap-2 sm:gap-5 text-sm sm:w-80 justify-between opacity-80 hover:opacity-100 trasition ease-out duration-500">
                  <li className="flex gap-0.5 items-end chart box-border h-fit">
                    <div className="flex justify-end text-3xl sm:text-4xl font-normal w-fit">
                      {currentTime.getHours()}
                    </div>{" "}
                    Hours
                  </li>
                  <li className="flex gap-0.5 items-end chart box-border h-fit">
                    <div className="flex justify-end text-3xl sm:text-4xl font-normal w-fit">
                      {currentTime.getMinutes()}
                    </div>{" "}
                    Minutes
                  </li>
                  <li className="flex gap-0.5 items-end chart box-border h-fit">
                    <div className="flex justify-end text-3xl sm:text-4xl font-normal w-9">
                      {currentTime.getSeconds()}
                    </div>{" "}
                    Second
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`flex ${
              user && "flex-col"
            } gap-5 md:text-xl items-start`}
          >
            <Link
              to={"/monitoring"}
              className="bg-white text-black hover:bg-opacity-80 active:bg-opacity-80 flex items-center font-light hover:font-semibold shadow-custom py-1 sm:py-2 pl-1 pr-2 rounded-xl trasition ease-out duration-500 group border-2 border-white"
            >
              <img
                src={monitoringLogo}
                alt=""
                className="group-hover:w-9 w-7 trasition ease-out duration-500"
              />
              Start Monitoring
            </Link>
            {user ? (
              !(
                user.phone_number &&
                user.gender &&
                user.date_of_birth &&
                user.role &&
                user.location_name &&
                user.location_lat &&
                user.location_lng
              ) && (
                <Link
                  to={"/userProfile"}
                  className="mb-10 flex-col xl:flex-row  gap-x-3 gap-y-0 bg-black bg-opacity-50 text-white text-shadow text-xl sm:text-4xl xl:text-5xl font-thin hover:bg-opacity-80 active:bg-opacity-80 flex hover:font-semibold shadow-custom p-1 sm:p-2 rounded-xl trasition ease-out duration-500 group border-2 border-white border-opacity-0 hover:border-white "
                >
                  Welcome <span className="font-medium">{user.username}</span>
                  <span className="font-thin"> lets complete your profile</span>
                </Link>
              )
            ) : (
              <Link
                to={"/loginSignin"}
                className="bg-white text-black hover:bg-opacity-80 active:bg-opacity-80 flex items-center font-light hover:font-semibold shadow-custom py-1 sm:py-2 pl-1 pr-2 rounded-xl trasition ease-out duration-500 group border-2 border-white"
              >
                <img
                  src={loginLogo}
                  alt=""
                  className="group-hover:w-9 w-7 trasition ease-out duration-500"
                />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

FirstSection.propTypes = {
  getData: PropTypes.object,
  updateData: PropTypes.func,
};
