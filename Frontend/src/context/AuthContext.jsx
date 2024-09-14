import { createContext, useEffect, useReducer, useState } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching Data...");
    setLoading(true);
    fetch("https://api2.waterguard.asia/userAccount")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const user = data.find(
            (item) => item.username === state.user?.username
          );
          if (user) {
            dispatch({ type: "LOGIN", payload: user });
          }
        } else {
          console.error("Data is not an array:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [state.user?.username]);

  const updateUser = (updatedUser) => {
    const url = `https://api2.waterguard.asia/userAccount/${updatedUser.username}`;

    const formData = new FormData();
    formData.append("username", updatedUser.username);
    formData.append("email", updatedUser.email);
    formData.append("phone_number", updatedUser.phone_number);
    formData.append("gender", updatedUser.gender);
    formData.append("date_of_birth", updatedUser.date_of_birth);
    formData.append("role", updatedUser.role);
    formData.append("location_name", updatedUser.location_name);
    // formData.append("location_lat", updatedUser.location_lat);
    // formData.append("location_lng", updatedUser.location_lng);

    // Check if profile_picture is a file, append it to formData
    if (updatedUser.profile_picture) {
      formData.append("profile_picture", updatedUser.profile_picture);
      formData.append(
        "profile_picture_extension",
        updatedUser.profile_picture_extension
      );
    }

    fetch(url, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch({ type: "UPDATE_USER", payload: data });
        }
      })
      .catch((err) => console.error("Failed to update user: ", err));
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, dispatch, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
