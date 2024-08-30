import AuthLayout from "@/layout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import AboutUs from "@/pages/About/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import BikeDetailsClient from "@/pages/BikeDetailsClient/BikeDetailsClient";
import Comparison from "@/pages/Comparision/Comparision";
import BikeManagement from "@/pages/Dashboard/Admin/BikeManagement/BikeManagement";
import CouponManagement from "@/pages/Dashboard/Admin/CouponManagement/CouponManagement";
import Profile from "@/pages/Dashboard/Admin/Porfile/Profile";
import ReturnBike from "@/pages/Dashboard/Admin/ReturnBike/ReturnBike";
import Users from "@/pages/Dashboard/Admin/Users/Users";
import BikeDetails from "@/pages/Dashboard/Client/BikeDetails/BikeDetails";
import Booking from "@/pages/Dashboard/Client/Booking/Booking";
import ClientBikeManagement from "@/pages/Dashboard/Client/ClientBikeManagement/ClientBikeManagement";
import PaymentBooking from "@/pages/Dashboard/Client/PaymentBooking/PaymentBooking";
import DashboardHome from "@/pages/Dashboard/DashboardHome";
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
        element: <AboutUs />,
      },
      {
        path: "/comparison",
        element: <Comparison />,
      },
      {
        path: "/bike-details-client/:id",
        element: <BikeDetailsClient />,
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
      // Admin Dashboard
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin-bike-management",
        element: <BikeManagement />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "coupon-management",
        element: <CouponManagement />,
      },
      {
        path: "return-bike",
        element: <ReturnBike />,
      },

      // Client Dashboard
      {
        path: "client-bike-management",
        element: <ClientBikeManagement />,
      },
      {
        path: "bike-details/:id",
        element: <BikeDetails />,
      },
      {
        path: "payment-booking",
        element: <PaymentBooking />,
      },
      {
        path: "my-rental",
        element: <Booking />,
      },
      {
        path: "my-rental-paid",
        element: <Booking />,
      },
    ],
  },
]);

export default router;
