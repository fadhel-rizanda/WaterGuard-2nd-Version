import { useState } from "react";
import imageEmail from "/ASSET/image-logo/image-logo-software/gmailContact.png";
import alertLogo from "/ASSET/image-logo/alert.png";
import { useAuthContext } from "../hooks/useAuthContext";

export const EmailPersonal = () => {
  const { user } = useAuthContext();
  const [sendMail, setSendMail] = useState(false);
  const [copyEmail, setCopyEmail] = useState(false);
  const [enableCopyEmail, setEnableCopyEmail] = useState(true);
  const [emailBodyInput, setEmailBodyInput] = useState("");
  const [emailSubjectInput, setEmailSubjectInput] = useState("Water Guard: ");
  const [wrongInput, setWrongInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailBodyInput = () => {
    const trimmedEmailSubjectInput = emailSubjectInput.trim();
    const trimmedEmailBodyInput = emailBodyInput.trim();
    const words = trimmedEmailBodyInput.split(/\s+/);

    if (trimmedEmailSubjectInput === "") {
      setWrongInput(true);
      setErrorMessage("Subject cannot be null");
    } else if (trimmedEmailBodyInput === "") {
      setWrongInput(true);
      setErrorMessage("Body cannot be null");
    } else if (words.length < 100) {
      setWrongInput(true);
      setErrorMessage("Must be 100 words minimum");
    } else {
      const subject = encodeURIComponent(emailSubjectInput);
      const body = encodeURIComponent(emailBodyInput);
      window.open(
        `mailto:fadhelrizanda@gmail.com?subject=${subject}&body=${body}`
      );
      setWrongInput(false);
      setErrorMessage("");
      setSendMail(false);
      setCopyEmail(false);
    }
  };

  const handleSendMail = () => {
    setSendMail(!sendMail);
    setCopyEmail(!sendMail);
    handleClearText();
    setWrongInput(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText("fadhelrizanda@gmail.com")
      .then(() => {
        setEnableCopyEmail(false);
        setTimeout(() => setEnableCopyEmail(true), 1000);
      })
      .catch((err) => console.error("Failed to copy email: ", err));
  };

  const handleClearText = () => {
    setEmailBodyInput("");
    setEmailSubjectInput(`Water Guard: ${user.username}`);
  };

  return (
    <>
      <div className="flex flex-wrap gap-5">
        <div
          onClick={handleSendMail}
          className={`flex cursor-pointer hover:font-semibold hover:bg-gray-200 p-1 px-1.5 w-fit rounded-lg hover:shadow-custom items-center sm:hover:ml-5 transition-all ease-out duration-1000 group text-lg sm:text-xl font-light ${
            sendMail ? "ml-5 font-semibold bg-gray-200 shadow-custom" : ""
          }`}
        >
          <div className="flex gap-5">
            <img src={imageEmail} alt="email" className="h-6" />
            <div>fadhelrizanda@gmail.com</div>
          </div>
        </div>

        <div className="flex justify-center items-center ml-5 sm:ml-0">
          {copyEmail && (
            <button
              className={`text-sm text-gray-500 h-fit p-1 rounded-lg bg-gray-200 border-2 ${
                enableCopyEmail
                  ? "hover:bg-gray-100 active:bg-gray-100"
                  : "cursor-not-allowed opacity-50"
              }`}
              onClick={enableCopyEmail ? handleCopyEmail : undefined}
              disabled={!enableCopyEmail}
            >
              {enableCopyEmail ? "Copy" : "Copied!"}
            </button>
          )}
        </div>
      </div>

      {sendMail && (
        <div className="flex flex-col gap-2">
          <input
            className="resize-none sm:ml-5 px-3 py-2 border border-gray-200 rounded-md shadow-custom focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="emailSubject"
            name="emailSubject"
            type="text"
            value={emailSubjectInput}
            onChange={(e) => setEmailSubjectInput(e.target.value)}
            placeholder="Enter Subject"
          />
          <textarea
            id="emailBody"
            name="emailBody"
            value={emailBodyInput}
            rows="10"
            onChange={(e) => setEmailBodyInput(e.target.value)}
            className="resize-none sm:ml-5 px-3 py-2 border border-gray-200 rounded-md shadow-custom focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Body"
            required
          ></textarea>
          <div className="flex flex-wrap justify-between p-5 pl-0 text-white">
            <div className="ml-7 w-48 flex gap-2 text-red-500 text-sm h-fit">
              {wrongInput && (
                <>
                  <img
                    src={alertLogo}
                    alt="alert"
                    className="mt-1 w-3.5 h-3.5"
                  />
                  {errorMessage}
                </>
              )}
            </div>

            <button
              className="border-2 border-opacity-20 border-gray-500 shadow-custom text-gray-400 p-2 rounded-xl hover:bg-gray-200 hover:text-gray-500 active:bg-gray-50 transition ease-out duration-300"
              onClick={handleClearText}
            >
              Clear Text
            </button>

            <div className="flex gap-0.5 rounded-xl shadow-custom group">
              <button
                onClick={handleSendMail}
                className="border-2 border-opacity-20 border-red-500 shadow-custom bg-red-500 py-2 w-20 rounded-l-xl hover:bg-red-200 hover:text-red-500 active:bg-red-50 transition ease-out duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailBodyInput}
                className="border-2 border-opacity-20 border-green-500 shadow-custom bg-green-500 py-2 w-20 rounded-r-xl hover:bg-green-200 hover:text-green-500 active:bg-green-50 transition ease-out duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
