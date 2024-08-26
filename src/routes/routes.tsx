import AuthLayout from "@/layout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import AboutUs from "@/pages/About/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import BikeManagement from "@/pages/Dashboard/Admin/BikeManagement/BikeManagement";
import Profile from "@/pages/Dashboard/Admin/Porfile/Profile";
import Users from "@/pages/Dashboard/Admin/Users/Users";
import BikeDetails from "@/pages/Dashboard/Client/BikeDetails/BikeDetails";
import ClientBikeManagement from "@/pages/Dashboard/Client/ClientBikeManagement/ClientBikeManagement";
import Error from "@/pages/Error/Error";
import Home from "@/pages/Home/Home";
import PrivateRoute from "@/private/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      // Admin Dashboard
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin-bike-management",
        element: <BikeManagement />
      },
      {
        path: "users",
        element: <Users />
      },

      // Client Dashboard
      {
        path: "client-bike-management",
        element: <ClientBikeManagement />
      },
      {
        path: "bike-details/:id",
        element: <BikeDetails />
      }
    ],
  },
]);

export default router;
