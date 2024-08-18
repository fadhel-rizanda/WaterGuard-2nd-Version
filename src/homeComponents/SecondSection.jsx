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
import image3 from "/ASSET/image-background/1579.jpg";
import image4 from "/ASSET/image-background/7165.jpg";

import PropTypes from "prop-types";
import { ContactsContent } from "./ContactsContent";

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

        <div className="px-10 text-sm md:px-16 xl:px-28 text-center shadow-custom py-20">
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
        <div className="flex flex-col w-full py-5 bg-gradient-to-r  from-teal-500 via-blue-600 to-teal-500 ">
          <div className="h-3"></div>
          <div className="w-full flex h-96 flex-col justify-center">
            <MapDisplay
              getData={getData}
              onUpdate={onUpdate}
              detailActive={false}
            />
          </div>
          <div className="h-3"></div>
        </div>
        <div className="flex flex-col gap-10 items-center py-14 lg:py-20  border-y-2 w-full shadow-custom">
          <div className="flex flex-col gap-5 px-10 lg:px-20">
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
          <div className="w-full flex flex-col gap-5 md:gap-10 xl:gap-16 lg:gap-20 lg:mt-10">
            <div className="flex justify-start">
              <div className="flex justify-between items-center">
                <div className="lg:w-2/3 h-fit p-5 mr-10 pl-2 lg:p-10 lg:pr-20 shadow-custom rounded-r-3xl lg:rounded-r-full lg:text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                  In Indonesia, the Indicator of Water Quality (IKA) is used to
                  measure water pollution levels and assess water quality
                  effectively. This system categorizes water quality based on
                  the IKA score, where water with a score above 70 is considered
                  very clean and meets safety standards, making it suitable for
                  all uses. A score between 60 and 70 indicates generally
                  acceptable quality, still usable with some caution, but
                  requires regular monitoring to maintain good quality. Regular
                  testing and maintenance of water sources are essential to
                  ensure that water remains within these acceptable ranges.
                  Meanwhile, a score between 50 and 60 signifies light
                  pollution, meaning the water is usable but requires efforts to
                  mitigate health risks. It is important to address sources of
                  contamination to improve water quality and prevent further
                  degradation.
                </div>
                <img
                  src={image3}
                  alt=""
                  className="md:w-1/4 rounded-xl lg:flex hidden xl:mr-20 md:mr-10"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex lg:justify-between justify-end items-center">
                <img
                  src={image4}
                  alt=""
                  className="md:w-1/4 rounded-xl lg:flex hidden xl:ml-20 md:ml-10"
                />

                <div className="lg:w-2/3 h-fit p-5 ml-10 pr-2 lg:p-10 lg:pl-20 shadow-custom rounded-l-3xl lg:rounded-l-full text-end lg:text-center bg-gradient-to-r from-teal-500 to-blue-600 text-white">
                  An IKA score between 30 and 50 reflects moderate pollution,
                  with a significant level of contamination that needs immediate
                  action to reduce risks. Water with a score below 30 is heavily
                  polluted, posing serious health risks and requiring urgent
                  remediation. Prompt intervention is critical to protect public
                  health and restore water quality. In water monitoring
                  applications, IKA assessment is crucial for providing clear
                  information about water quality, prompting corrective actions,
                  and ensuring effective monitoring through technologies such as
                  real-time quality sensors for accurate readings. Implementing
                  these technologies helps in timely detection and management of
                  water quality issues, ensuring safer water for communities.
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="lg:w-4/5 text-center shadow-custom p-5 mx-5 lg:p-10 lg:px-20 rounded-3xl lg:rounded-full bg-gradient-to-r  from-blue-700 via-teal-600 to-blue-700 text-white">
                Effective water quality management relies on combining accurate
                IKA assessments with proactive measures to address pollution and
                implement remediation strategies. Continuous monitoring
                technologies are crucial, providing real-time data that enables
                prompt detection of contamination and timely interventions to
                prevent health risks and maintain safe water standards. Clear
                protocols and action plans must be established to manage varying
                IKA scores, ensuring swift responses to moderate and severe
                pollution. Alongside technological advancements, community
                awareness and engagement are vital. Educating the public on
                water conservation and pollution prevention fosters responsible
                behavior and supports local water protection initiatives. By
                integrating real-time monitoring, prompt action, public
                involvement, and sustainable practices, authorities and
                organizations can enhance water quality management, leading to
                cleaner, safer water and a healthier environment for all.
              </div>
            </div>
          </div>
        </div>
        <ContactsContent />
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
