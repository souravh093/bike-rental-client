import {
  Bike,
  Home,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const ClientSidebar = () => {
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
        to={"/dashboard/client-bike-management"}
        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      >
        <Bike className="h-4 w-4" />
        Bike Management
      </Link>
      <Link
        to={"/dashboard/my-rental"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Settings className="h-4 w-4" />
        My Rental
      </Link>
    </nav>
  );
};

export default ClientSidebar;
