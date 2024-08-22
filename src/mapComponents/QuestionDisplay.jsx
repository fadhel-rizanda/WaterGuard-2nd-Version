import PropTypes from "prop-types";
import { CloseDisplay } from "../objects/CloseDisplay";
import location1 from "/ASSET/image-logo/image-logo-location/location-1.png";
import location2 from "/ASSET/image-logo/image-logo-location/location-2.png";
import location3 from "/ASSET/image-logo/image-logo-location/location-3.png";
import location4 from "/ASSET/image-logo/image-logo-location/location-4.png";
import location5 from "/ASSET/image-logo/image-logo-location/location-5.png";
import locationCheck from "/ASSET/image-logo/image-logo-location/location-check.png";
import locationQuestion from "/ASSET/image-logo/image-logo-location/location-question.png";
import { IndicatorInformation } from "../objects/IndicatorInformation";
import { useEffect, useRef } from "react";

export const QuestionDisplay = ({ onClose }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
        <div
          ref={modalRef}
          className="overflow-auto max-h-[80vh] no-scrollbar bg-white mx-20 sm:max-w-3xl rounded-xl border-2 shadow-custom  flex flex-col p-10 pt-5"
        >
          <CloseDisplay onClose={onClose} />
          {/* 1 */}
          <div className="">
            <div className="text-xl font-bold mb-1.5">
              Indicators Informations
            </div>
            <div className="md:pl-5">
              <IndicatorInformation location={location1} value={"Good"} />
              <IndicatorInformation location={location2} value={"Quite Good"} />
              <IndicatorInformation
                location={location3}
                value={"Lightly Polluted"}
              />
              <IndicatorInformation
                location={location4}
                value={"Moderately Polluted"}
              />
              <IndicatorInformation
                location={location5}
                value={"Heavily Polluted"}
              />

              <div className="border-b-2 my-2 border-gray-300"></div>
              {/* 2 */}
              <div className="">
                <div className="flex gap-1 items-center p-0.5 pr-2 rounded-xl hover:bg-gray-100 w-fit trasition ease-out duration-200">
                  <img
                    src={locationCheck}
                    alt=""
                    className="w-4 h-4 md:w-5 md:h-5"
                  />
                  <div className="text-sm md:text-lg font-light">
                    Water Quality <b className="font-bold">Verified</b> by
                    Profesionals
                  </div>
                </div>
                <div className="flex gap-1 items-center p-0.5 pr-2 rounded-xl hover:bg-gray-100 w-fit trasition ease-out duration-200">
                  <img
                    src={locationQuestion}
                    alt=""
                    className="w-4 h-4 md:w-5 md:h-5"
                  />
                  <div className="text-sm md:text-lg font-light">
                    Water Quality <b className="font-bold">Unverified</b> by
                    Profesionals
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="mt-5">
            <div className="text-xl font-bold mb-1.5">Water Index Quality</div>
            <ul className="text-sm md:text-lg font-light pl-5 md:pl-10 list-disc">
              <li className="hover:bg-gray-100 w-fit p-0.5 px-2 rounded-xl trasition ease-out duration-200">
                <b className="font-semibold">IKA {">"} 70:</b> Water Quality{" "}
                <b className="font-bold">Good</b>
              </li>
              <li className="hover:bg-gray-100 w-fit p-0.5 px-2 rounded-xl trasition ease-out duration-200">
                <b className="font-semibold">60 ≤ IKA ≤ 70: </b>
                Water Quality <b className="font-bold">Quite Good</b>
              </li>
              <li className="hover:bg-gray-100 w-fit p-0.5 px-2 rounded-xl trasition ease-out duration-200">
                <b className="font-semibold">50 ≤ IKA ≤ 60:</b> Water Quality{" "}
                <b className="font-bold">Lightly Polluted</b>
              </li>
              <li className="hover:bg-gray-100 w-fit p-0.5 px-2 rounded-xl trasition ease-out duration-200">
                <b className="font-semibold">30 ≤ IKA ≤ 50:</b> Water Quality{" "}
                <b className="font-bold">Moderately Polluted</b>
              </li>
              <li className="hover:bg-gray-100 w-fit p-0.5 px-2 rounded-xl trasition ease-out duration-200">
                <b className="font-semibold">IKA {"<"} 30:</b> Water Quality{" "}
                <b className="font-bold">Heavily Polluted</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

QuestionDisplay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
