'use client'

import { useState } from "react";
import Container from "@/components/shared/Container";
import logo from "@/assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Theme/ModeToggle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/all-bikes", label: "All Bikes" },
    { to: "/comparison", label: "Comparison" },
    { to: "/about", label: "About us" },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 sticky top-0 z-40 shadow-md">
      <Container>
        <div className="py-4 flex items-center justify-between">
          <Link to={"/"}>
            <img className="w-24 sm:w-32 lg:w-44 dark:invert" src={logo} alt="logo" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `font-semibold text-sm lg:text-base hover:text-gray-700 transition duration-75 ${
                    isActive ? "border-b border-yellow-500" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            {token ? (
              <UserMenu handleLogout={handleLogout} />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 py-4">
          <Container>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `font-semibold text-sm hover:text-gray-700 transition duration-75 ${
                      isActive ? "border-b border-yellow-500" : ""
                    }`
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              ))}
              {token ? (
                <>
                  <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                  <Link to="/dashboard/profile" onClick={closeMenu}>Profile</Link>
                  <Button variant="ghost" onClick={() => { handleLogout(); closeMenu(); }}>Logout</Button>
                </>
              ) : (
                <AuthButtons mobile closeMenu={closeMenu} />
              )}
            </nav>
          </Container>
        </div>
      )}
    </div>
  );
};

const UserMenu = ({ handleLogout }: { handleLogout: () => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link to={"/dashboard"}>Dashboard</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link to={"/dashboard/profile"}>Profile</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const AuthButtons = ({ mobile = false, closeMenu = () => {} }) => (
  <>
    <Link to={"/auth/register"} onClick={closeMenu}>
      <Button variant={mobile ? "ghost" : "outline"} className={mobile ? "w-full justify-start" : ""}>
        Sign Up
      </Button>
    </Link>
    <Link to={"/auth"} onClick={closeMenu}>
      <Button className={mobile ? "w-full justify-start" : ""}>Login</Button>
    </Link>
  </>
);

export default Header;

