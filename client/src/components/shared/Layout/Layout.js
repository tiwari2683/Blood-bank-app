import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <Sidebar />
        </div>
        <main className="flex-1 p-6 ml-0 md:ml-64 transition-all duration-300">
          <button
            onClick={toggleSidebar}
            className="md:hidden bg-red-600 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-700 transition-colors"
          >
            {sidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
          {children}
        </main>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(Layout);