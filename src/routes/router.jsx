import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import SearchDoners from "../pages/search/searchDoners";
import DonationRequests from "../pages/donation/DonationRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "search",
        element: <SearchDoners />
      },
      {
        path: "donation-requests",
        element: <DonationRequests/>
      },
    ]
  },
]);