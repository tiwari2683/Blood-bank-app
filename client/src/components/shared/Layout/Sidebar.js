import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const menuItems = {
    organisation: [
      { path: "/", icon: "fa-solid fa-warehouse", name: "Inventory" },
      { path: "/donar", icon: "fa-solid fa-hand-holding-medical", name: "Donar" },
      { path: "/hospital", icon: "fa-solid fa-hospital", name: "Hospital" },
    ],
    admin: [
      { path: "/donar-list", icon: "fa-solid fa-warehouse", name: "Donar List" },
      { path: "/hospital-list", icon: "fa-solid fa-hand-holding-medical", name: "Hospital List" },
      { path: "/org-list", icon: "fa-solid fa-hospital", name: "Organisation List" },
    ],
    donar: [
      { path: "/orgnaisation", icon: "fa-sharp fa-solid fa-building-ngo", name: "Organisation" },
      { path: "/donation", icon: "fa-sharp fa-solid fa-building-ngo", name: "Donation" },
    ],
    hospital: [
      { path: "/orgnaisation", icon: "fa-sharp fa-solid fa-building-ngo", name: "Organisation" },
      { path: "/consumer", icon: "fa-sharp fa-solid fa-building-ngo", name: "Consumer" },
    ],
  };

  const items = menuItems[user?.role] || [];

  return (
    <div className="sidebar d-flex flex-column">
      <div className="sidebar-header text-center py-4 bg-danger text-white">
        <h5 className="mb-0 fw-bold">Menu</h5>
      </div>
      <div className="menu flex-grow-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              className={`menu-item ${isActive ? "active" : ""}`}
            >
              <Link to={item.path} className="d-flex align-items-center">
                <i className={`${item.icon} me-3`}></i>
                <span>{item.name}</span>
              </Link>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: #f8f9fa;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: 0;
          transition: width 0.3s ease;
        }
        .sidebar-header {
          border-bottom: 2px solid #fff;
        }
        .menu {
          padding: 1rem 0;
        }
        .menu-item {
          padding: 0.75rem 1.5rem;
          transition: all 0.3s ease;
        }
        .menu-item a {
          color: #495057;
          text-decoration: none;
          font-size: 1.1rem;
        }
        .menu-item:hover,
        .menu-item.active {
          background-color: #dc3545;
          color: #fff;
        }
        .menu-item:hover a,
        .menu-item.active a {
          color: #fff;
        }
        .menu-item i {
          font-size: 1.2rem;
        }
        @media (max-width: 768px) {
          .sidebar {
            width: 0;
            overflow: hidden;
          }
          .sidebar.active {
            width: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;