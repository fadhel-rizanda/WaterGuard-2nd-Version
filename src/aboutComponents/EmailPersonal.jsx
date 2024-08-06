import { useState } from "react";
import imageEmail from "/ASSET/image-logo/image-logo-software/gmailContact.png";
import alertLogo from "/ASSET/image-logo/alert.png";

export const EmailPersonal = () => {
  const [sendMail, setSendMail] = useState(false);
  const [copyEmail, setCopyEmail] = useState(false);
  const [enableCopyEmail, setEnableCopyEmail] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [wrongInput, setWrongInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailInput = () => {
    const trimmedEmailInput = emailInput.trim();
    const words = trimmedEmailInput.split(/\s+/);

    if (trimmedEmailInput === "") {
      setWrongInput(true);
      setErrorMessage("Cannot be null");
    } else if (words.length < 100) {
      setWrongInput(true);
      setErrorMessage("Must be 100 words minimum");
    } else {
      console.log(emailInput);
      setWrongInput(false);
      setErrorMessage("");
      setSendMail(false);
    }
  };

  const handleSendMail = () => {
    setSendMail(!sendMail);
    setCopyEmail(!sendMail);
    setEmailInput("");
    setWrongInput(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText("fadhelbaihaqir25@gmail.com")
      .then(() => {
        setEnableCopyEmail(false);
        setTimeout(() => setEnableCopyEmail(true), 5000);
      })
      .catch((err) => console.error("Failed to copy email: ", err));
  };

  return (
    <>
      <div className="flex gap-5">
        <div
          onClick={handleSendMail}
          className={`flex cursor-pointer hover:font-semibold hover:bg-gray-200 p-1 px-1.5 w-fit rounded-lg hover:shadow-custom items-center hover:ml-3 sm:hover:ml-5 transition-all ease-out duration-1000 group text-lg sm:text-xl font-light  ${
            sendMail && "ml-5 font-semibold bg-gray-200 shadow-custom"
          }`}
        >
          <div className="flex gap-5">
            <img src={imageEmail} alt="email" className="h-6" />
            <div>fadhelbaihaqir25@gmail.com</div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {copyEmail && (
            <button
              className={`text-sm text-gray-500 h-fit p-1 rounded-lg bg-gray-200 border-2 ${
                enableCopyEmail
                  ? "hover:bg-gray-100 active:bg-gray-100"
                  : "cursor-not-allowed opacity-50 "
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
        <div className="flex flex-col">
          <textarea
            id="email"
            name="email"
            value={emailInput}
            rows="10"
            onChange={(e) => setEmailInput(e.target.value)}
            className="resize-none sm:ml-5 px-3 py-2 border border-gray-200 rounded-md shadow-custom focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Text"
            required
          ></textarea>
          <div className="flex justify-between p-5 pl-0 text-white">
            <div className="ml-7 flex gap-1 text-red-500 text-sm items-center h-fit">
              {wrongInput && (
                <>
                  <img src={alertLogo} alt="alert" className=" w-3.5 h-3.5" />
                  {errorMessage}
                </>
              )}
            </div>
            <div className="flex gap-0.5 rounded-xl shadow-custom group">
              <button
                onClick={handleSendMail}
                className="border-2 border-opacity-20 border-red-500 shadow-custom bg-red-500 py-2 w-20 rounded-l-xl hover:bg-red-200 hover:text-red-500 active:bg-red-50 transition ease-out duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailInput}
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
