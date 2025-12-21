import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DonationRequests from "../pages/donation/DonationRequests";
import DashboardLayout from "../components/DashboardLayout/dashboardLayout";
import Profile from "../pages/dashboard/profile/Profile";
import CreateDonationRequest from "../pages/dashboard/donor/CreateDonationRequest";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import AllDonationRequests from "../pages/dashboard/admin/AllDonationRequests";
import DashboardHome from "../pages/dashboard/DashboardHome/DashboardHome";
import SearchDonors from "../pages/search/SearchDonors";
import MyDonationRequests from "../pages/dashboard/donor/MyDonationRequests";
import Funding from "../pages/funding/Funding";

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
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "search",
        element: <SearchDonors />
      },
      {
        path: "donation-requests",
        element: <DonationRequests />
      },
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardHome />
      },
      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "funding",
        element: <Funding/>,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequests />,
      }
    ]
  }
]);