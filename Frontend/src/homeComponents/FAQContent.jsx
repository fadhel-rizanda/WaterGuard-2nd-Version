export const FAQContent = () => {
  const faqs = [
    {
      question: "What is WaterGuard?",
      answer:
        "WaterGuard is a comprehensive application designed to provide real-time insights and management tools for water quality. It helps users monitor water conditions, access accurate data, and manage information efficiently, all tailored to ensure clean and safe water for the community in Jakarta.",
    },
    {
      question: "How does WaterGuard help with water quality management?",
      answer:
        "WaterGuard offers a range of features including Create, Read, Update, and Delete (CRUD) operations. You can input and store new water quality data, access detailed reports and historical records, modify existing entries to ensure accuracy, and remove outdated information to keep your records up-to-date.",
    },
    {
      question: "How do I add new water quality data to the system?",
      answer:
        "You can add new water quality data using the Create function in WaterGuard. This feature allows you to input data such as pH levels and contaminants, which is then stored in the system for future reference.",
    },
    {
      question:
        "What should I do if I find incorrect information in the system?",
      answer:
        "If you encounter incorrect information, you can use the Update feature to modify the existing data. This ensures that all entries remain accurate and reflect the most current conditions.",
    },
    {
      question: "How do I remove outdated or incorrect data?",
      answer:
        "To remove outdated or incorrect data, use the Delete function in WaterGuard. This feature allows you to eliminate records that are no longer relevant, helping to maintain the integrity of your data.",
    },
    {
      question: "Can I export IKA data from WaterGuard?",
      answer:
        "Yes, WaterGuard provides options to export your data for further analysis or reporting. You can export data in various formats such as CSV or PDF, making it easy to share or analyze offline.",
    },
    {
      question:
        "How can I contact support if I have questions or issues with the application?",
      answer:
        "For any questions or issues with WaterGuard, you can contact our support team through the contact information provided in the app or on our website. We are here to assist you with any concerns you may have.",
    },
  ];

  return (
    <div className="h-fit flex justify-center w-full bg-bgFAQ bg-cover bg-center bg-no-repeat shadow-custom">
      <div className="w-4/5 my-20 flex flex-col xl:flex-row gap-10 group">
        <div className="xl:w-1/2 w-full  gap-4 flex-col text-center xl:text-start flex-wrap font-semibold text-5xl xl:text-7xl 2xl:text-8xl ">
          <span className="xl:group-hover:pl-4 trasition ease-out duration-1000">
            Frequently{" "}
          </span>
          <span className="xl:group-hover:pl-7 trasition ease-out duration-1000">
            Asked{" "}
          </span>
          <span className="font-extralight text-5xl xl:text-8xl 2xl:text-9xl xl:group-hover:pl-10 trasition ease-out duration-1000">
            Question
          </span>
        </div>

        <div className="xl:w-1/2 border-2 shadow-custom rounded-xl p-10 bg-white">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="mb-4 p-1 hover:bg-gray-100 hover:shadow-custom ease-out duration-1000 rounded-lg"
            >
              <summary className=" hover:font-semibold cursor-pointer trasition ease-out duration-1000 rounded-lg">
                {faq.question}
              </summary>
              <div className="mt-2 text-sm text-gray-700 pl-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};
