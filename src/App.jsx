import { Navbar } from "./objects/Navbar";
import { Footer } from "./objects/Footer";
// import { Home } from "./pages/Home";
// import { About } from "./pages/About";
// import { Monitoring } from "./pages/Monitoring";
import { LoginSignin } from "./pages/LoginSignin";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="">
        {/* <Home /> */}
        {/* <About /> */}
        {/* <Monitoring /> */}
        <LoginSignin />
      </div>
      <Footer />
    </>
  );
}
