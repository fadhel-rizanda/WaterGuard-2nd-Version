import graph_1_70 from "/ASSET/image-logo/image-graphic/graph4.png";

import graph_2_70 from "/ASSET/image-logo/image-graphic/graph1.png";
import graph_2_60 from "/ASSET/image-logo/image-graphic/graph8.png";

import graph_3_60 from "/ASSET/image-logo/image-graphic/graph2.png";
import graph_3_50 from "/ASSET/image-logo/image-graphic/graph7.png";

import graph_4_50 from "/ASSET/image-logo/image-graphic/graph6.png";
import graph_4_30 from "/ASSET/image-logo/image-graphic/graph5.png";
import graph_5_30 from "/ASSET/image-logo/image-graphic/graph3.png";

import { IndicatorFile } from "../objects/IndicatorFile";

export const SecondSection = () => {
  return (
    <div className="min-h-screen">
      <div className="h-full flex flex-col items-center">
        <div className="py-16 pt-20 sm:pt-16 px-10 text-xs md:text-sm md:px-16 xl:px-28 text-center">
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
        <div className="flex items-center py-14 pl-28  border-y-2 w-full shadow-custom">
          <div className="flex flex-col gap-10">
            <div className="text-xl font-light pr-28">
              The IKA Score measures water quality based on contamination
              levels. Higher scores indicate cleaner water, while lower scores
              reflect increasing pollution. Here{"'"}s a brief overview:
            </div>
            <div className="flex flex-col gap-5 pl-5">
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
                  "60 ≤ IKA Score < 70, Generally acceptable quality with minor concerns. Still suitable for most purposes but requires regularmonitoring."
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
      </div>
    </div>
  );
};

// <IndicatorFile value={"Good >"} right={graph_1_70} />
// <IndicatorFile left={graph_2_60} value={"≤ Quite Good ≤ "} right={graph_2_70} />
// <IndicatorFile left={graph_3_50} value={"≤ Lightly Polluted ≤ "} right={graph_3_60} />
// <IndicatorFile left={graph_4_30} value={"≤ Moderately Polluted ≤ "} right={graph_4_50} />
// <IndicatorFile left={graph_5_30} value={"< Heavily Polluted"} />
