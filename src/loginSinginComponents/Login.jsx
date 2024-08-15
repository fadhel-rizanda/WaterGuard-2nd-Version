import { useState, useRef, useEffect } from "react";
import usernameLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (2).png";
import passwordLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (4).png";
import showLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (5).png";
import hideLogo from "/ASSET/image-logo/image-logo-loginSingin/clarity--email-line (3).png";
import alertLogo from "/ASSET/image-logo/alert.png";
import { Loading } from "../mapComponents/Loading";
import { NoData } from "../mapComponents/NoData";
import PropTypes from "prop-types";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const Login = ({ onDirect, onForget }) => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleLogin = (formData) => {
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const timeoutRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Data...");
        const response = await fetch("http://localhost:8081/userAccount");
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
    const account = data.find((item) => item.username === username);
    if (account) {
      if (account.password !== password) {
        console.log(account.password);
        console.log(password);
        setErrorMessage("Wrong Password");
        setNoDataFound(true);
      } else {
        setNoDataFound(false);
        handleLogin(account);
      }
    } else {
      setErrorMessage("Account Not Found");
      setNoDataFound(true);
    }
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShowPassword(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowPassword(false);
    }, 5000);
  };

  const handleHide = (e) => {
    e.preventDefault();
    setShowPassword(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center py-20">
      <div className="lg:w-1/3 p-10 pb-16 rounded-3xl bg-white bg-opacity-10 border-2 backdrop-blur-md flex flex-col gap-8">
        <div className="text-6xl text-shadow font-semibold flex justify-center text-white">
          Login
        </div>

        <form
          className="flex flex-col gap-8 w-full justify-center items-center"
          onSubmit={findAccount}
        >
          <div className="flex gap-1 border-2 w-full justify-center items-center rounded-full pr-3 bg-opacity-0 focus-within:shadow-custom">
            <input
              type="text"
              name="Username"
              id="Username"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-l-full py-2 pl-3 focus:outline-none placeholder:text-white bg-white bg-opacity-0 text-white"
            />
            <label htmlFor="Username">
              <img src={usernameLogo} alt="Username Icon" className="w-5 h-5" />
            </label>
          </div>

          <div
            className={`flex gap-1 border-2 w-full justify-center items-center rounded-full pr-3 bg-opacity-0 focus-within:shadow-custom ${
              password.trim() !== "" ? "bg-white" : ""
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-l-full py-2 pl-3 focus:outline-none placeholder:text-white bg-white bg-opacity-0 text-white"
            />

            {password.trim() !== "" && (
              <button
                onClick={showPassword ? handleHide : handleShow}
                type="button"
              >
                <img
                  src={showPassword ? hideLogo : showLogo}
                  alt={showPassword ? "Hide Password" : "Show Password"}
                  className="w-5 h-5"
                />
              </button>
            )}
            {password.trim() === "" && (
              <label htmlFor="password">
                <img
                  src={passwordLogo}
                  alt="Password Icon"
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
              type="button"
              onClick={onForget}
              className="font-light hover:font-semibold active:font-semibold hover:text-gray-300 active:text-gray-500 transition-all ease-out duration-500"
            >
              Forgot password?
            </button>
          </div>

          <button
            className="flex justify-center w-full bg-white p-2.5 rounded-full font-bold hover:bg-gray-300 active:bg-gray-400 transition-all ease-out duration-300"
            type="submit"
          >
            Login
          </button>

          {noDataFound && (
            <div className="flex items-center gap-2 text-red-500 text-xl font-black">
              <img src={alertLogo} alt="Alert Icon" className="w-6 h-6" />
              <div>{errorMessage}</div>
            </div>
          )}

          <div className="text-white font-light">
            Don{"'"}t have an account?{" "}
            <button
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

Login.propTypes = {
  onDirect: PropTypes.func,
  onForget: PropTypes.func,
};
