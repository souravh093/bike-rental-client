import Container from "@/components/shared/Container";
import logo from "@/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Theme/ModeToggle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  logout,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <Container>
        <div className="py-6 flex items-center justify-between">
          <Link to={"/"}>
            <img className="w-44" src={logo} alt="logo" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to={"/"}
              className="font-semibold hover:text-gray-700 transition duration-75"
            >
              Home
            </Link>
            <Link
              to={"/about"}
              className="font-semibold hover:text-gray-700 transition duration-75"
            >
              About us
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to={"/auth/register"}>
                  <Button variant={"outline"}>Sing Up</Button>
                </Link>
                <Link to={"/auth"}>
                  <Button>Login</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
