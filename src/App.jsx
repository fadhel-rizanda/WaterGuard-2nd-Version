import { Navbar } from "./objects/Navbar";
// import { Footer } from "./objects/Footer";
// import Monitoring from "./pages/Monitoring";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="">
        <Home />
        {/* <Monitoring /> */}
      </div>
      {/* <Footer /> */}
    </>
  );
}
