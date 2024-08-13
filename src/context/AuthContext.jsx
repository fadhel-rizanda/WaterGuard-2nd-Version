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
    fetch("http://localhost:8081/userAccount")
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
    fetch(`http://localhost:8081/userAccount/${updatedUser.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
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
