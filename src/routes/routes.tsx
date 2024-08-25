import AuthLayout from "@/layout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import BikeManagement from "@/pages/Dashboard/Admin/BikeManagement/BikeManagement";
import Profile from "@/pages/Dashboard/Admin/Porfile/Profile";
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
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin-bike-management",
        element: <BikeManagement />
      }
    ],
  },
]);

export default router;
