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

export default function App() {
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
            <Route path="/*" element={<NoData />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}
