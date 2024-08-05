import { Navbar } from "./objects/Navbar";
import { Footer } from "./objects/Footer";
// import Monitoring from "./pages/Monitoring";
// import { Home } from "./pages/Home";
import { About } from "./pages/About";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="">
        {/* <Home /> */}
        <About />
        {/* <Monitoring /> */}
      </div>
      <Footer />
    </>
  );
}
