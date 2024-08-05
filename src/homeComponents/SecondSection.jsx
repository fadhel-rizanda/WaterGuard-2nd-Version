import graph_1_70 from "/ASSET/image-logo/image-graphic/graph4.png";
import graph_2_70 from "/ASSET/image-logo/image-graphic/graph1.png";
import graph_2_60 from "/ASSET/image-logo/image-graphic/graph8.png";
import graph_3_60 from "/ASSET/image-logo/image-graphic/graph2.png";
import graph_3_50 from "/ASSET/image-logo/image-graphic/graph7.png";
import graph_4_50 from "/ASSET/image-logo/image-graphic/graph6.png";
import graph_4_30 from "/ASSET/image-logo/image-graphic/graph5.png";
import graph_5_30 from "/ASSET/image-logo/image-graphic/graph3.png";

import { MapDisplay } from "../mapComponents/MapDisplay";
import { FAQContent } from "./FAQContent";
import { IndicatorFile } from "./IndicatorFile";

import image1 from "/ASSET/image-background/realistic-drop-with-ecosystem.jpg";
import image2 from "/ASSET/image-background/realistic-water-drop-with-ecosystem (1).jpg";

import PropTypes from "prop-types";

export const SecondSection = ({ getData, onUpdate }) => {
  return (
    <div className="min-h-screen">
      <div className="h-full flex flex-col items-center">
        <div className="flex py-16 pr-10 text-sm md:px-16 xl:px-28  gap-10 items-center">
          <img src={image1} alt="" className="md:w-2/5 rounded-xl flex w-0" />
          <div className="">
            <span className="font-semibold text-lg">
              Protecting Our Water, Preserving Our Future
            </span>{" "}
            <br />
            Understanding and maintaining water quality is essential for
            safeguarding our health and the environment. Clean water is vital
            for drinking, cooking, and sanitation, while also supporting
            wildlife and natural ecosystems. By staying informed and proactive
            about water quality, we can prevent pollution, minimize health
            risks, and ensure a sustainable environment for future generations.
            WaterGuard provides the tools you need to monitor and protect this
            crucial resource in Jakarta. <br />
            <br />
            <span className="font-semibold text-lg">
              Secure Water Quality, Strengthen Our Community
            </span>{" "}
            <br />
            Prioritizing water quality is not just about health{"-"}it{"'"}s
            also key to economic stability and community well-being.
            Contaminated water can lead to expensive health issues and costly
            environmental cleanups. By focusing on maintaining clean water, we
            support sustainable agriculture, industry, and recreation.
            WaterGuard empowers you with essential information to make informed
            decisions and foster practices that contribute to a healthier, more
            resilient community.
          </div>
        </div>

        <div className="px-10 text-sm md:px-16 xl:px-28 text-center shadow-custom py-14 lg:py-20">
          At WaterGuard, we provide a powerful solution for efficient water
          quality management through our application. Designed with a robust set
          of features, WaterGuard allows users to easily perform Create, Read,
          Update, and Delete (CRUD) operations, making it an essential tool for
          water monitoring. The Create function enables users to input and store
          new water quality data, including parameters like pH levels and
          contaminants. The Read function allows access to detailed reports and
          historical data, offering real-time insights and comprehensive records
          for informed decision-making. The Update feature lets users modify
          existing data, ensuring accuracy and current information. Lastly, the
          Delete function allows the removal of outdated or erroneous data,
          maintaining the integrity of records. With these capabilities,
          WaterGuard enhances water quality management, offering complete
          control and a user-friendly experience.
        </div>

        <div className="flex py-14 lg:py-20 pl-10 text-sm md:px-16 xl:px-28  gap-10 items-center">
          <div className="">
            <span className="font-semibold text-lg">
              Empowering You with Essential Insights
            </span>{" "}
            <br />
            At WaterGuard, we believe in empowering individuals and communities
            with the knowledge they need to make impactful decisions. Our
            advanced monitoring system offers real-time data and actionable
            insights into water quality, enabling you to address issues before
            they become major problems. With WaterGuard, you can easily track
            and manage water quality parameters, ensuring that you stay ahead of
            potential challenges and maintain the highest standards of water
            safety. <br />
            <br />
            <span className="font-semibold text-lg">
              Join Us in Making a Difference
            </span>{" "}
            <br />
            By choosing WaterGuard, you{"'"}re not just investing in a tool{"-"}
            you
            {"'"}re joining a movement towards better water management and
            environmental stewardship. Together, we can make a significant
            impact on our communit{"'"}s health and the planet{"'"}s future.
            Embrace the power of informed decision-making with WaterGuard, and
            contribute to a cleaner, safer, and more sustainable world for
            everyone.
          </div>
          <img src={image2} alt="" className="md:w-2/5 rounded-xl flex w-0" />
        </div>

        {/* display map */}
        <div className="flex flex-col w-full justify-center items-center shadow-custom">
          <div className="h-3"></div>
          <div className="w-full flex h-80 sm:h-96 flex-col justify-center">
            <MapDisplay
              getData={getData}
              onUpdate={onUpdate}
              detailActive={false}
            />
          </div>
          <div className="h-3"></div>
        </div>
        <div className="flex items-center py-14 lg:py-20 px-10 lg:px-20 border-y-2 w-full shadow-custom">
          <div className="flex flex-col gap-5">
            <div className="md:text-xl md:font-light">
              The IKA Score measures water quality based on contamination
              levels. Higher scores indicate cleaner water, while lower scores
              reflect increasing pollution. Here{"'"}s a brief overview:
            </div>
            <div className="flex lg:flex-col flex-wrap justify-center lg:justify-start gap-5 lg:pl-10">
              <IndicatorFile
                value={"Good"}
                right={graph_1_70}
                description={
                  "IKA Score > 70, Water quality is excellent, meeting or exceeding safety standards with low contaminants. Suitable for all uses."
                }
              />
              <IndicatorFile
                left={graph_2_60}
                value={"Quite Good"}
                right={graph_2_70}
                description={
                  "60 ≤ IKA Score < 70, Generally acceptable quality with minor concerns. Still suitable for most purposes but requires regular monitoring."
                }
              />
              <IndicatorFile
                left={graph_3_50}
                value={"Lightly Polluted"}
                right={graph_3_60}
                description={
                  "50 ≤ IKA Score < 60, Contains noticeable contaminants. Usable but with potential health risks; needs improvement."
                }
              />
              <IndicatorFile
                left={graph_4_30}
                value={"Moderately Polluted"}
                right={graph_4_50}
                description={
                  "30 ≤ IKA Score < 50, Significant pollution levels affecting safety. Not ideal for consumption; requires action to reduce pollution."
                }
              />
              <IndicatorFile
                left={graph_5_30}
                value={"Heavily Polluted"}
                description={
                  "30 ≤ IKA Score, Severe contamination with serious health risks. Not suitable for use; urgent remediation needed."
                }
              />
            </div>
          </div>
        </div>
        <FAQContent />
      </div>
    </div>
  );
};

SecondSection.propTypes = {
  getData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
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
};
