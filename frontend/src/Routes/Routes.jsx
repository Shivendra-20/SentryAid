import { createBrowserRouter } from "react-router";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import UserRoot from "../Roots/UserRoot";
import AdminRoot from "../Roots/AdminRoot";
import Admin from "../Pages/Admin/Admin";
import AlertMessage from "./../Pages/Admin/AlertMessage";
import AdminLogin from "./../Pages/Admin/AdminLogin";
import MainRoot from "../Roots/MainRoot";
import EditProfile from "./../Pages/Users/EditProfile";
import VolunteerRoot from "../Roots/VolunteerRoot";
import HeatMap from "../Pages/HeatMap";
import UserProfile from "../Components/User/UserProfile";
import VolunteerRanking from "../Pages/volunteerRanking";
import VolunteerProfile from "../Components/Volunteer/VolunteerProfile";
import ReportVolunteer from "./../Pages/reportVolunteer";
import Volunteer from "./../Pages/Volunteer/Volunteer";
import Sos from "../Components/User/SOS/Sos";
import SosAlert from "../Components/Volunteer/SOS Alert/SosAlert";
import User from "../Pages/Users/User";
import CreateBulletinMsg from "../Pages/CreateBulletinMsg";
import BulletinBoard from "../Pages/BulletinBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // User Routes
      {
        path: "users/:id",
        element: <UserRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <UserProfile />,
          },
          {
            path: "volunteerRanking",
            element: <VolunteerRanking />,
          },
          {
            path: "editProfile",
            element: <EditProfile />,
          },
          {
            path: "heatMap",
            element: <HeatMap />,
          },
          {
            path: "sos",
            element: <Sos />,
          },
          {
            path: "bulletinBoard",
            element: <BulletinBoard />,
          },
        ],
      },
      {
        path: "usersLogin",
        element: <User />,
      },
      {
        path: "createBulletinMsg",
        element: <CreateBulletinMsg />,
      },

      // Volunteer Routes
      {
        path: "volunteers/:id",
        element: <VolunteerRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <VolunteerProfile />,
          },
          {
            path: "volunteerRanking",
            element: <VolunteerRanking />,
          },
          {
            path: "editProfile",
            element: <EditProfile />,
          },
          {
            path: "heatMap",
            element: <HeatMap />,
          },
          {
            path: "sosAlert",
            element: <SosAlert />,
          },
          {
            path: "bulletinBoard",
            element: <BulletinBoard />,
          },
        ],
      },
      {
        path: "/volunteerLogin", // Add userId parameter
        element: <Volunteer />,
      },
      {
        path: "/reportVolunteer/:volunteerId", // Add userId parameter
        element: <ReportVolunteer />,
      },
      // Admin Routes
      {
        path: "adminLogin",
        element: <AdminLogin />,
      },
      {
        path: "admin",
        element: <AdminRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Admin />,
          },
          {
            path: "alertMessage",
            element: <AlertMessage />,
          },
          {
            path: "heatMap",
            element: <HeatMap />,
          },
          {
            path: "bulletinBoard",
            element: <BulletinBoard />,
          },
        ],
      },
    ],
  },
]);
