import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import usernameLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (2).png";
import passwordLogo from "/ASSET/image-logo/image-logo-loginSingin/mdi--password-outline.png";
import passwordReLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (4).png";
import showLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (5).png";
import hideLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (3).png";
import emailLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (1).png";
import alertLogo from "/ASSET/image-logo/alert.png";
import { Loading } from "../mapComponents/Loading";
import { NoData } from "../mapComponents/NoData";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = ({ onDirect, onForget }) => {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRe: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    showPassword: false,
    showPasswordRe: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const timeoutRef = useRef(null);
  const timeoutRef2 = useRef(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updateAccount, setUpdateAccount] = useState([]);

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const handleLogin = () => {
    dispatch({ type: "LOGIN", payload: formData });
    if (rememberMe) {
      window.localStorage.setItem("user", JSON.stringify(formData));
    }
    navigate("/");
  };
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Data...");
        const response = await fetch(
          "https://api2.waterguard.asia/userAccount"
        );
        const result = await response.json();

        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error("Data is not an array:", result);
          setData([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <NoData />;
  }

  const findAccount = (e) => {
    e.preventDefault();
    if (formData.passwordRe !== formData.password) {
      setErrorMessage("Password and Re-enter Password must be same");
    } else {
      const account = data.find((item) => item.username === formData.username);
      if (account === undefined) {
        console.log(formData.username);
        setErrorMessage("Account Not Found");
      } else if (account.email !== formData.email) {
        setErrorMessage("Incorrect Email, email cannot be different");
      } else {
        setUpdateAccount(account);
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    setErrorMessage("handle submit");
    const passwordError = passwordDifficulty(formData.password);
    if (passwordError) {
      setErrorMessage(passwordError);
    } else {
      setErrorMessage("");
      handleUpdate();
    }
  };

  const handleUpdate = () => {
    const url = `https://api2.waterguard.asia/user-accounts/forgot-password/${updateAccount.id}`;

    const updatedData = {
      password: formData.password,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
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
        setErrorMessage("");
        handleLogin();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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

  const handleShowPasswordRe = (e) => {
    e.preventDefault();
    setPasswordVisibility((prevState) => ({
      ...prevState,
      showPasswordRe: true,
    }));

    if (timeoutRef2.current) {
      clearTimeout(timeoutRef2.current);
    }
    timeoutRef2.current = setTimeout(() => {
      setPasswordVisibility((prevState) => ({
        ...prevState,
        showPasswordRe: false,
      }));
    }, 5000);
  };
  const handleHidePasswordRe = (e) => {
    e.preventDefault();
    setPasswordVisibility((prevState) => ({
      ...prevState,
      showPasswordRe: false,
    }));

    if (timeoutRef2.current) {
      clearTimeout(timeoutRef2.current);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center py-20">
      <div className="lg:w-1/3 p-10 pb-16 rounded-3xl bg-white bg-opacity-10 border-2 backdrop-blur-md flex flex-col gap-8">
        <div className="text-center  text-6xl text-shadow font-semibold flex flex-col justify-center text-white">
          Forgot <br />
          <span className="font-thin text-5xl">Password</span>
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
              placeholder="Username"
              required
              onChange={handleInputChange}
              className="w-full rounded-l-full py-2 pl-3 focus:outline-none placeholder:text-white bg-white bg-opacity-0 text-white"
            />
            <label htmlFor="Username">
              <img src={usernameLogo} alt="Username Icon" className="w-5 h-5" />
            </label>
          </div>

          <div className="flex gap-1 border-2 w-full justify-center items-center rounded-full pr-3 bg-opacity-0 focus-within:shadow-custom">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              onChange={handleInputChange}
              className="w-full rounded-l-full py-2 pl-3 focus:outline-none placeholder:text-white bg-white bg-opacity-0 text-white"
            />
            <label htmlFor="Username">
              <img src={emailLogo} alt="Username Icon" className="w-5 h-5" />
            </label>
          </div>

          <div
            className={`flex gap-1 border-2 w-full justify-center items-center rounded-full pr-3 bg-opacity-0 focus-within:shadow-custom 
                ${formData.password.trim() !== "" ? "bg-white" : ""}
            `}
          >
            <input
              type={passwordVisibility.showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="New password"
              required
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
                  alt={
                    passwordVisibility.showPassword
                      ? "Hide Password"
                      : "Show Password"
                  }
                  className="w-5 h-5"
                />
              </button>
            )}
            {formData.password.trim() === "" && (
              <label htmlFor="password">
                <img
                  src={passwordLogo}
                  alt="Password Icon"
                  className="w-5 h-5"
                />
              </label>
            )}
          </div>

          <div
            className={`flex gap-1 border-2 w-full justify-center items-center rounded-full pr-3 bg-opacity-0 focus-within:shadow-custom 
                ${formData.passwordRe.trim() !== "" ? "bg-white" : ""}
            `}
          >
            <input
              type={passwordVisibility.showPasswordRe ? "text" : "password"}
              name="passwordRe"
              id="passwordRe"
              placeholder="Re-enter new password"
              required
              onChange={handleInputChange}
              className="w-full rounded-l-full py-2 pl-3 focus:outline-none placeholder:text-white bg-white bg-opacity-0 text-white"
            />

            {formData.passwordRe.trim() !== "" && (
              <button
                onClick={
                  passwordVisibility.showPasswordRe
                    ? handleHidePasswordRe
                    : handleShowPasswordRe
                }
                type="button"
              >
                <img
                  src={passwordVisibility.showPasswordRe ? hideLogo : showLogo}
                  alt={
                    passwordVisibility.showPasswordRe
                      ? "Hide Password"
                      : "Show Password"
                  }
                  className="w-5 h-5"
                />
              </button>
            )}
            {formData.passwordRe.trim() === "" && (
              <label htmlFor="passwordRe">
                <img
                  src={passwordReLogo}
                  alt="PasswordRe Icon"
                  className="w-5 h-5"
                />
              </label>
            )}
          </div>

          <div className="w-full flex flex-col xl:flex-row gap-2 justify-between items-center text-white">
            <div className="flex gap-2 items-center cursor-pointer font-light hover:font-semibold active:font-semibold hover:text-gray-300 active:text-gray-400 transition-all ease-out duration-300">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="h-3 w-3 cursor-pointer"
                onChange={handleRememberMe}
              />
              <label htmlFor="rememberMe" className="cursor-pointer">
                Remember me
              </label>
            </div>
            <button
              onClick={onForget}
              type="button"
              className="font-light hover:font-semibold active:font-semibold hover:text-gray-300 active:text-gray-500 transition-all ease-out duration-500"
            >
              Already remember password?
            </button>
          </div>

          <button
            className="flex justify-center w-full bg-white p-2.5 rounded-full font-bold hover:bg-gray-300 active:bg-gray-400 transition-all ease-out duration-300"
            type="submit"
          >
            Update Password
          </button>

          {errorMessage != "" && (
            <div className="flex gap-2 text-red-500 font-bold">
              <img src={alertLogo} alt="Alert Icon" className="w-4 h-4 mt-1" />
              <div>{errorMessage}</div>
            </div>
          )}

          <div className="text-white font-light">
            Don{"'"}t have an account?{" "}
            <button
              type="button"
              onClick={onDirect}
              className="font-semibold hover:font-black hover:text-gray-300 active:text-gray-500 transition-all ease-out duration-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
ForgotPassword.propTypes = {
  onDirect: PropTypes.func,
  onForget: PropTypes.func,
};
