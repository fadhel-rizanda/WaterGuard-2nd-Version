import { Navbar } from "./objects/Navbar";
import { Footer } from "./objects/Footer";
import Monitoring from "./pages/Monitoring";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="pt-11">
        <Monitoring />
      </div>
      <Footer/>
    </>
  );
}
