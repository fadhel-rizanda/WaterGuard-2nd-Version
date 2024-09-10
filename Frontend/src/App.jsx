import { Navbar } from "./objects/Navbar";
import { Footer } from "./objects/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Monitoring } from "./pages/Monitoring";
import { LoginSignin } from "./pages/LoginSignin";
import { UserProfile } from "./pages/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoData } from "./mapComponents/NoData";
import { ScrollToTop } from "./objects/ScrollToTop";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";
import { UserActivity } from "./pages/UserActivity";

export default function App() {
  const { dispatch } = useAuthContext();
  const loggedData = window.localStorage.getItem("user");
  useEffect(() => {
    if (loggedData) {
      const parsedData = JSON.parse(loggedData);
      dispatch({ type: "LOGIN", payload: parsedData });
    }
  }, [dispatch, loggedData]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/loginSignin" element={<LoginSignin />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/userMonitoring" element={<UserActivity />} />
            <Route path="/*" element={<NoData />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}
