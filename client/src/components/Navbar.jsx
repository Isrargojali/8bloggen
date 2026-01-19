import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirecting
import Logo from "../assets/logo.png"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check user login state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect user to login page on logout
  };

  // Function to generate avatar initials
  const generateAvatar = (name) => {
    if (!name) return "AA"; // Default fallback
    const nameParts = name.split(" ");
    const firstLetter = nameParts[0].charAt(0).toUpperCase();
    const secondLetter = nameParts.length > 1 ? nameParts[1].charAt(0).toUpperCase() : "";
    return firstLetter + secondLetter;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 z-50">
      <div className="flex items-center justify-between">
      <img
        src={Logo} // Replace with the correct path to your logo image
        alt="ATT BlogGen Logo"
        className="w-22 h-auto" // Adjust width and height as needed
      />

        {/* Hamburger Menu */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-4 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/blogs" className="text-gray-700 hover:text-blue-600">Blogs</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white font-semibold"
                >
                  {generateAvatar(user.name)}
                </div>
                <span className="text-gray-800 font-semibold">{user.name}</span>
              </Link>
              {user.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} mt-4 space-y-4`}>
        <Link to="/" className="text-gray-700 hover:text-blue-600 block">Home</Link>
        <Link to="/blogs" className="text-gray-700 hover:text-blue-600 block">Blogs</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600 block">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600 block">Contact</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="flex items-center space-x-2 px-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white font-semibold"
              >
                {generateAvatar(user.name)}
              </div>
              <span className="text-gray-800 font-semibold">{user.name}</span>
            </Link>
            {user.isAdmin && (
              <Link
                to="/admin/dashboard"
                className="text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 block"
              >
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 block"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 block"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
