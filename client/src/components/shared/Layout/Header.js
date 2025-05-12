import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center text-2xl font-bold hover:scale-105 transition-transform duration-300">
          <BiDonateBlood size={30} className="mr-2" />
          Blood Bank
        </Link>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <BiUserCircle size={24} />
            <span className="text-sm">
              {user?.name || user?.hospitalName || user?.organisationName}
              <span className="ml-2 bg-white text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                {user?.role}
              </span>
            </span>
          </div>
          {location.pathname === "/" || location.pathname === "/donar" || location.pathname === "/hospital" ? (
            <Link to="/analytics" className="text-white hover:text-gray-200 transition-colors">
              Analytics
            </Link>
          ) : (
            <Link to="/" className="text-white hover:text-gray-200 transition-colors">
              Home
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-white text-red-600 px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Header); // Memoize to prevent unnecessary re-renders