import image1 from "/ASSET/image-background/realistic-drop-with-ecosystem.jpg";
import image2 from "/ASSET/image-background/realistic-water-drop-with-ecosystem (1).jpg";
import image3 from "/ASSET/image-background/26760925_2112.i301.031.S.m004.c13.UI and UX designers concepts isometric composition.png";
import { Scrolll } from "./Scrolll";
import { PersonalInfo } from "./PersonalInfo";

export const AboutContent = () => {
  return (
    <div className="">
      {/* 1 */}
      <div className=" flex text-center flex-col justify-center items-center w-full h-screen bg-bgAbout bg-cover bg-center bg-no-repeat shadow-custom">
        <div className="text-white xl:mt-16 text-9xl font-bold text-shadow">
          About Us
        </div>
        <div className="text-white w-3/4 bg-black bg-opacity-20 p-1 rounded-xl h-fit shadow-custom">
          Welcome to WaterGuard! We provide real-time, accurate water quality
          data to help you monitor and improve water resources in Jakarta. Our
          advanced tools and user-friendly platform empower you to manage water
          quality effectively. Join us in our mission to ensure a healthier
          environment and a sustainable future for our community.
        </div>
      </div>

      {/* 2 */}
      <div className="flex py-16 pr-10 text-xs md:text-sm md:px-16 xl:px-28  gap-10 items-center">
        <img src={image1} alt="" className="md:w-2/5 rounded-xl flex w-0" />
        <div className="">
          <span className="font-semibold text-lg">
            Protecting Our Water, Preserving Our Future
          </span>{" "}
          <br />
          Understanding and maintaining water quality is essential for
          safeguarding our health and the environment. Clean water is vital for
          drinking, cooking, and sanitation, while also supporting wildlife and
          natural ecosystems. By staying informed and proactive about water
          quality, we can prevent pollution, minimize health risks, and ensure a
          sustainable environment for future generations. WaterGuard provides
          the tools you need to monitor and protect this crucial resource in
          Jakarta. <br />
          <br />
          <span className="font-semibold text-lg">
            Secure Water Quality, Strengthen Our Community
          </span>{" "}
          <br />
          Prioritizing water quality is not just about health{"-"}it{"'"}s also
          key to economic stability and community well-being. Contaminated water
          can lead to expensive health issues and costly environmental cleanups.
          By focusing on maintaining clean water, we support sustainable
          agriculture, industry, and recreation. WaterGuard empowers you with
          essential information to make informed decisions and foster practices
          that contribute to a healthier, more resilient community.
        </div>
      </div>
      <div className="px-10 text-sm md:px-16 xl:px-28 text-center shadow-custom py-14">
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
        WaterGuard enhances water quality management, offering complete control
        and a user-friendly experience.
      </div>
      <div className="flex py-16 pl-10 text-xs md:text-sm md:px-16 xl:px-28  gap-10 items-center">
        <div className="">
          <span className="font-semibold text-lg">
            Empowering You with Essential Insights
          </span>{" "}
          <br />
          At WaterGuard, we believe in empowering individuals and communities
          with the knowledge they need to make impactful decisions. Our advanced
          monitoring system offers real-time data and actionable insights into
          water quality, enabling you to address issues before they become major
          problems. With WaterGuard, you can easily track and manage water
          quality parameters, ensuring that you stay ahead of potential
          challenges and maintain the highest standards of water safety. <br />
          <br />
          <span className="font-semibold text-lg">
            Join Us in Making a Difference
          </span>{" "}
          <br />
          By choosing WaterGuard, you{"'"}re not just investing in a tool{"-"}
          you
          {"'"}re joining a movement towards better water management and
          environmental stewardship. Together, we can make a significant impact
          on our communit{"'"}s health and the planet{"'"}s future. Embrace the
          power of informed decision-making with WaterGuard, and contribute to a
          cleaner, safer, and more sustainable world for everyone.
        </div>
        <img src={image2} alt="" className="md:w-2/5 rounded-xl flex w-0" />
      </div>

      {/* 3 */}
      <div className="flex flex-col h-fit gap-10 justify-center shadow-custom mx-10 md:mx-6 xl:mx-16 rounded-3xl pt-10 ">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex justify-center items-center px-10">
            <div className="text-5xl md:text-8xl lg:text-9xl font-bold">
              <div className="">Project </div>
              <div className="font-light">Goal</div>
              <div className="text-4xl md:text-7xl lg:text-8xl font-extralight">
                WaterGuard 2.0
              </div>
            </div>
            <img src={image3} alt="" className="w-2/5" />
          </div>
          <div className="flex xl:flex-row flex-col gap-5 md:gap-10 text-sm px-10">
            <div className="">
              The development of this application represents a significant
              advancement from the original class assignment for Human and
              Computer Interaction. The initial project, created as a group
              effort, lacked the use of frameworks and databases, which limited
              its functionality and scalability. Building on this foundation, I
              embarked on a solo journey to develop a more robust and
              sophisticated application, leveraging modern technologies to
              address these limitations.
            </div>
            <div className="">
              This new version of the application was crafted entirely by me,
              reflecting a personal commitment to applying and expanding my
              technical skills. The primary objective was to construct a fully
              functional application capable of performing Create, Read, Update,
              and Delete (CRUD) operations while integrating seamlessly with a
              database. This endeavor not only aimed to enhance the application
              {"'"}s capabilities but also provided valuable hands-on experience
              with various frameworks and technologies.
            </div>
            <div className="">
              Throughout this project, I gained proficiency in several key
              technologies including React-Vite for building dynamic user
              interfaces, Tailwind CSS for streamlined styling, MySQL for
              database management, and Node.js with Express.js for server-side
              operations. Additionally, utilizing GitHub for version control
              facilitated better project management and collaboration. This
              project has been instrumental in refining my skills and preparing
              me for future challenges in software development.
            </div>
          </div>
          <Scrolll />
        </div>
        <PersonalInfo />
      </div>
    </div>
  );
};
