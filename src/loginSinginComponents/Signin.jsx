import { useState, useRef, useEffect } from "react";
import usernameLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (2).png";
import emailLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (1).png";
import passwordLogo from "/ASSET/image-logo/image-logo-loginSingin/mdi--password-outline.png";
import confirmPasswordLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (4).png";
import showLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (5).png";
import hideLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (3).png";
import alertLogo from "/ASSET/image-logo/alert.png";
import { Loading } from "../mapComponents/Loading";
import { NoData } from "../mapComponents/NoData";
import PropTypes from "prop-types";

export const Signin = ({ onDirect }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [passwordVisibility, setPasswordVisibility] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const [noDataFound, setNoDataFound] = useState(false);
  const timeoutRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("Fetching Data...");
    setLoading(true);
    fetch("http://localhost:8081/userAccount")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error("Data is not an array:", data);
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (data.length === 0) {
    return <NoData />;
  }

  const findAccount = (e) => {
    e.preventDefault();
    const account = data.find((item) => item.username === formData.username);
    if (account !== undefined) {
      setErrorMessage("Username Already Used");
      setNoDataFound(true);
    } else if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password & confirm password have to be the same");
      setNoDataFound(true);
    } else {
      const passwordError = passwordDifficulty(formData.password);
      if (passwordError) {
        setErrorMessage(passwordError);
        setNoDataFound(true);
      } else {
        setNoDataFound(false);
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const url = `http://localhost:8081/user-accounts`;
    const insertedData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insertedData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // ab!a1A12
  const passwordDifficulty = (password) => {
    const containSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const containSpace = /\s/.test(password);
    const containNumAlpha = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
    const containUpLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const containLength = password.length >= 8;

    if (!containSymbol) {
      return "Password must contain a symbol";
    } else if (containSpace) {
      return "Password cannot contain spaces";
    } else if (!containNumAlpha) {
      return "Password must contain both numbers and letters";
    } else if (!containUpLower) {
      return "Password must contain both uppercase and lowercase letters";
    } else if (!containLength) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  // ===========================================
  const handleShowPassword = (e) => {
    e.preventDefault();
    setPasswordVisibility((prevState) => ({
      ...prevState,
      showPassword: true,
    }));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setPasswordVisibility((prevState) => ({
        ...prevState,
        showPassword: false,
      }));
    }, 5000);
  };
  const handleHidePassword = (e) => {
    e.preventDefault();
    setPasswordVisibility((prevState) => ({
      ...prevState,
      showPassword: false,
    }));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  // ===========================================
  // ===========================================
  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setPasswordVisibility((prevState) => ({
      ...prevState,
      showConfirmPassword: true,
    }));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setPasswordVisibility((prevState) => ({
        ...prevState,
        showConfirmPassword: false,
      }));
    }, 5000);
  };
  const handleHideConfirmPassword = (e) => {
    e.preventDefault();
    setPasswordVisibility((prevState) => ({
      ...prevState,
      showConfirmPassword: false,
    }));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  // ===========================================

  return (
    <div className="h-full w-full py-20 flex justify-center items-center">
      <div className="lg:w-1/3 p-10 pb-16 rounded-3xl bg-white bg-opacity-10 border-2 backdrop-blur-md flex flex-col gap-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-6xl text-shadow font-semibold flex justify-center text-white">
            Signin
          </div>
          <div className="text-white">Create Your Own Account</div>
        </div>

        <form
          className="flex flex-col gap-8 w-full justify-center items-center"
          onSubmit={findAccount}
        >
          <div className="flex gap-1 border-2 w-full justify-center items-center rounded-full pr-3 bg-opacity-0 focus-within:shadow-custom">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              required
              value={formData.username}
              onChange={handleInputChange}
              className="w-full rounded-l-full py-2 pl-3 focus:outline-none placeholder:text-white bg-white bg-opacity-0 text-white"
            />
            <label htmlFor="username">
              <img src={usernameLogo} alt="" className="w-5 h-5" />
            </label>
          </div>

          <div className="flex gap-1 border-2 w-full justify-center items-center rounded-full pr-3 bg-opacity-0 focus-within:shadow-custom">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-l-full py-2 pl-3 focus:outline-none placeholder:text-white bg-white bg-opacity-0 text-white"
            />
            <label htmlFor="email">
              <img src={emailLogo} alt="" className="w-5 h-5" />
            </label>
          </div>

          <div
            className={`flex gap-1 border-2 w-full justify-center items-center rounded-full pr-3 bg-opacity-0 focus-within:shadow-custom ${
              formData.password.trim() !== "" ? "bg-white" : ""
            }`}
          >
            <input
              type={passwordVisibility.showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-l-full py-2 pl-3 focus:outline-none placeholder:text-white bg-white bg-opacity-0 text-white"
            />

            {formData.password.trim() !== "" && (
              <button
                onClick={
                  passwordVisibility.showPassword
                    ? handleHidePassword
                    : handleShowPassword
                }
                type="button"
              >
                <img
                  src={passwordVisibility.showPassword ? hideLogo : showLogo}
                  alt=""
                  className="w-5 h-5"
                />
              </button>
            )}
            {formData.password.trim() === "" && (
              <label htmlFor="password">
                <img src={passwordLogo} alt="" className="w-5 h-5" />
              </label>
            )}
          </div>

          <div
            className={`flex gap-1 border-2 w-full justify-center items-center rounded-full pr-3 bg-opacity-0 focus-within:shadow-custom ${
              formData.password.trim() !== "" ? "bg-white" : ""
            }`}
          >
            <input
              type={
                passwordVisibility.showConfirmPassword ? "text" : "password"
              }
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full rounded-l-full py-2 pl-3 focus:outline-none placeholder:text-white bg-white bg-opacity-0 text-white"
            />

            {formData.confirmPassword.trim() !== "" && (
              <button
                onClick={
                  passwordVisibility.showConfirmPassword
                    ? handleHideConfirmPassword
                    : handleShowConfirmPassword
                }
                type="button"
              >
                <img
                  src={
                    passwordVisibility.showConfirmPassword ? hideLogo : showLogo
                  }
                  alt=""
                  className="w-5 h-5"
                />
              </button>
            )}
            {formData.confirmPassword.trim() === "" && (
              <label htmlFor="password">
                <img src={confirmPasswordLogo} alt="" className="w-5 h-5" />
              </label>
            )}
          </div>

          <div className="flex flex-col w-full gap-2">
            <button
              className="flex justify-center w-full bg-white p-2.5 rounded-full font-bold hover:bg-gray-300 active:bg-gray-400 transition-all ease-out duration-300"
              type="submit"
            >
              Signin
            </button>

            {noDataFound && (
              <div className="flex gap-2 text-red-500 font-bold">
                <img src={alertLogo} alt="" className="w-4 h-4  mt-1" />
                <div className="">{errorMessage}</div>
              </div>
            )}
          </div>

          <div className="text-white">
            Already have an account?{" "}
            <button
              onClick={onDirect}
              className="font-semibold hover:text-gray-300 active:text-gray-500 transition-all ease-out duration-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Signin.propTypes = {
  onDirect: PropTypes.func,
};
