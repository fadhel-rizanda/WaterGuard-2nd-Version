import { Outlet } from "react-router-dom";
import { Navbar } from "../objects/Navbar";
export const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet/>
      </main>
    </>
  );
};
