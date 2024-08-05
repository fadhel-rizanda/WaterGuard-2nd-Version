import monitoringLogo from "/ASSET/image-logo/monitoring.png";
import loginLogo from "/ASSET/image-logo/login.png";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const FirstSection = ({ getData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="h-screen w-full bg-bgHomeFirst bg-cover bg-center bg-no-repeat ">
      <div className="flex text-white ">
        <div className="sm:mx-16 mx-10 mt-36 lg:mt-48 flex flex-col gap-5 trasition ease-out duration-500">
          <div className="cursor-default text-5xl  2xl:text-8xl  font-semibold  trasition ease-out duration-500">
            Water Clarity Starts <br />{" "}
            <span className="font-thin text-3xl sm:text-5xl md:text-6xl lg:text-7xl trasition ease-out duration-500">
              with Smart Monitoring
            </span>{" "}
          </div>

          <div className="flex flex-wrap items-center gap-5  transition-all ease-out duration-500">
            <div className="cursor-default bg-black w-fit p-2 h-fit hover:opacity-100 px-4 bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white border-opacity-50 hover:border-opacity-100 trasition ease-out duration-1000">
              <div className="text-xl font-extralight">
                Your Current location:
              </div>
              <div className="font-bold">{getData.name}</div>
              <div className="font-bold">
                {getData.ikaCategories} - {getData.status}
              </div>
            </div>

            <div className="flex flex-wrap gap-5 gap-y-5  transition-all ease-out duration-500">
              <div className="cursor-default bg-black w-fit p-1.5 md:p-2 h-max bg-opacity-40 hover:bg-opacity-65 rounded-2xl border-2 border-white hover:border-opacity-100 border-opacity-50 trasition ease-out duration-1000 group">
                <div className="bg-white opacity-80  group-hover:opacity-100 flex flex-col gap-0 text-black p-1 md:p-9 h-14 w-14 md:h-12 md:w-12 items-center justify-center rounded-full trasition ease-out duration-500">
                  <div className="font-bold text-xs">IKA</div>
                  <div className="text-xl">{getData.ika_score}</div>
                </div>
              </div>

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

          <div className="flex gap-5 md:text-xl items-start">
            <button className="bg-white text-black hover:bg-opacity-80 active:bg-opacity-80 flex items-center font-light hover:font-semibold shadow-custom py-1 sm:py-2 pl-1 pr-2 rounded-xl trasition ease-out duration-500 group border-2 border-white">
              <img
                src={monitoringLogo}
                alt=""
                className="group-hover:w-9 w-7 trasition ease-out duration-500"
              />
              Start Monitoring
            </button>
            <button className="bg-white text-black hover:bg-opacity-80 active:bg-opacity-80 flex items-center font-light hover:font-semibold shadow-custom py-1 sm:py-2 pl-1 pr-2 rounded-xl trasition ease-out duration-500 group border-2 border-white">
              <img
                src={loginLogo}
                alt=""
                className="group-hover:w-9 w-7 trasition ease-out duration-500"
              />
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FirstSection.propTypes = {
  getData: PropTypes.object,
};
