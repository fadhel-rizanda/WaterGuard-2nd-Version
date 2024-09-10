import { createBrowserRouter } from "react-router-dom";

import { About } from "../pages/About";
import { Home } from "../pages/Home";
import { Monitoring } from "../pages/Monitoring";
import { UserProfile } from "../pages/UserProfile";
import { Layout } from "../layouts/Layout";
import { NoData } from "../mapComponents/NoData";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NoData />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/monitoring",
        element: <Monitoring />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <UserProfile />,
      },
    ],
  },
]);
