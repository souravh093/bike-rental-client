import { Bike, Home, ShoppingCart, Undo2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        to={"/dashboard"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        to={"/dashboard/admin-bike-management"}
        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      >
        <Bike className="h-4 w-4" />
        Bike Management
      </Link>
      <Link
        to={"/dashboard/return-bike"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Undo2 className="h-4 w-4" />
        Return Bikes
      </Link>
      <Link
        to={"/dashboard/users"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Users className="h-4 w-4" />
        Users Management
      </Link>
      <Link
        to={"/dashboard/coupon-management"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <ShoppingCart className="h-4 w-4" />
        Coupon Management
      </Link>
    </nav>
  );
};

export default AdminSidebar;
