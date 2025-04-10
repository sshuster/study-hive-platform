
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-tutorBlue-600">StudyHive</span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/" 
                  ? "text-tutorBlue-600 bg-tutorBlue-50" 
                  : "text-gray-700 hover:text-tutorBlue-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/pricing" 
                  ? "text-tutorBlue-600 bg-tutorBlue-50" 
                  : "text-gray-700 hover:text-tutorBlue-600 hover:bg-gray-50"
              }`}
            >
              Pricing
            </Link>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.includes("/dashboard") 
                    ? "text-tutorBlue-600 bg-tutorBlue-50" 
                    : "text-gray-700 hover:text-tutorBlue-600 hover:bg-gray-50"
                }`}
              >
                Dashboard
              </Link>
            ) : null}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.role === "admin" ? "Administrator" : "Student"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-tutorBlue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tutorBlue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            onClick={closeMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/" 
                ? "text-tutorBlue-600 bg-tutorBlue-50" 
                : "text-gray-700 hover:text-tutorBlue-600 hover:bg-gray-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/pricing"
            onClick={closeMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/pricing" 
                ? "text-tutorBlue-600 bg-tutorBlue-50" 
                : "text-gray-700 hover:text-tutorBlue-600 hover:bg-gray-50"
            }`}
          >
            Pricing
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.includes("/dashboard") 
                  ? "text-tutorBlue-600 bg-tutorBlue-50" 
                  : "text-gray-700 hover:text-tutorBlue-600 hover:bg-gray-50"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>
        {!isAuthenticated ? (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-2">
              <Link to="/login" onClick={closeMenu} className="w-full">
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link to="/register" onClick={closeMenu} className="w-full">
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-tutorBlue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-tutorBlue-600" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.username}</div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.role === "admin" ? "Administrator" : "Student"}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/profile"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tutorBlue-600 hover:bg-gray-50"
              >
                Your Profile
              </Link>
              <button
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
