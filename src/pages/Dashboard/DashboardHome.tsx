import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import DashboardHomeAdmin from "./DashboardHomeAdmin";
import DashboardHomeClient from "./DashboardHomeClient";

const DashboardHome = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const role = currentUser ? currentUser.role : null;
  return (
    <div>
      {role === "admin" ? (
        <DashboardHomeAdmin />
      ) : (
        <DashboardHomeClient />
      )}
    </div>
  );
};

export default DashboardHome;
