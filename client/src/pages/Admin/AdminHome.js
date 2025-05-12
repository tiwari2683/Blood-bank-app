import React, { useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import { FaUsers, FaHospital, FaTint, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Mock data for tabs (replace with API calls)
  const [activeTab, setActiveTab] = useState("donors");
  const data = {
    donors: [
      { id: 1, name: "John Doe", email: "john@example.com", bloodGroup: "O+", date: "2025-04-01" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", bloodGroup: "A-", date: "2025-04-02" },
    ],
    hospitals: [
      { id: 1, name: "City Hospital", location: "New York", contact: "123-456-7890", date: "2025-04-01" },
      { id: 2, name: "General Clinic", location: "Los Angeles", contact: "987-654-3210", date: "2025-04-03" },
    ],
    inventory: [
      { id: 1, bloodGroup: "O+", quantity: 500, type: "Available", date: "2025-04-01" },
      { id: 2, bloodGroup: "A-", quantity: 300, type: "Low", date: "2025-04-02" },
    ],
    requests: [
      { id: 1, hospital: "City Hospital", bloodGroup: "O+", quantity: 200, status: "Pending", date: "2025-04-01" },
      { id: 2, hospital: "General Clinic", bloodGroup: "A-", quantity: 150, status: "Approved", date: "2025-04-03" },
    ],
  };

  const getTabData = () => {
    return data[activeTab] || [];
  };

  const handleLogout = () => {
    navigate("/login"); // Adjust to your logout route
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-[calc(100vh-70px)] p-4">
        {/* Enhanced Header */}
        <div className="mb-6">
          <div
            className="bg-gradient-to-r from-red-600 to-red-500 p-4 rounded-lg shadow-md flex justify-between items-center text-white"
          >
            <div>
              <h2 className="text-xl font-bold">Blood Bank Admin Panel</h2>
              <p className="text-sm opacity-90">
                Welcome, <span className="font-medium">{user?.name || "Admin"}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center bg-white text-red-600 font-medium py-1 px-3 rounded-full hover:bg-red-100 transition-colors duration-300"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-3">
              <div className="flex space-x-6 border-b">
                <button
                  className={`flex items-center py-2 px-4 text-gray-700 hover:text-red-600 transition-colors duration-300 ${
                    activeTab === "donors" ? "border-b-2 border-red-600 text-red-600" : ""
                  }`}
                  onClick={() => setActiveTab("donors")}
                >
                  <FaUsers className="mr-2" /> Donors
                </button>
                <button
                  className={`flex items-center py-2 px-4 text-gray-700 hover:text-red-600 transition-colors duration-300 ${
                    activeTab === "hospitals" ? "border-b-2 border-red-600 text-red-600" : ""
                  }`}
                  onClick={() => setActiveTab("hospitals")}
                >
                  <FaHospital className="mr-2" /> Hospitals
                </button>
                <button
                  className={`flex items-center py-2 px-4 text-gray-700 hover:text-red-600 transition-colors duration-300 ${
                    activeTab === "inventory" ? "border-b-2 border-red-600 text-red-600" : ""
                  }`}
                  onClick={() => setActiveTab("inventory")}
                >
                  <FaTint className="mr-2" /> Inventory
                </button>
                <button
                  className={`flex items-center py-2 px-4 text-gray-700 hover:text-red-600 transition-colors duration-300 ${
                    activeTab === "requests" ? "border-b-2 border-red-600 text-red-600" : ""
                  }`}
                  onClick={() => setActiveTab("requests")}
                >
                  <FaChartLine className="mr-2" /> Requests
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content in Table */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h5 className="text-lg font-bold text-gray-800 mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} List
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-200">
                  <tr>
                    {activeTab === "donors" && (
                      <>
                        <th className="p-2 border-b">ID</th>
                        <th className="p-2 border-b">Name</th>
                        <th className="p-2 border-b">Email</th>
                        <th className="p-2 border-b">Blood Group</th>
                        <th className="p-2 border-b">Date</th>
                      </>
                    )}
                    {activeTab === "hospitals" && (
                      <>
                        <th className="p-2 border-b">ID</th>
                        <th className="p-2 border-b">Name</th>
                        <th className="p-2 border-b">Location</th>
                        <th className="p-2 border-b">Contact</th>
                        <th className="p-2 border-b">Date</th>
                      </>
                    )}
                    {activeTab === "inventory" && (
                      <>
                        <th className="p-2 border-b">ID</th>
                        <th className="p-2 border-b">Blood Group</th>
                        <th className="p-2 border-b">Quantity</th>
                        <th className="p-2 border-b">Type</th>
                        <th className="p-2 border-b">Date</th>
                      </>
                    )}
                    {activeTab === "requests" && (
                      <>
                        <th className="p-2 border-b">ID</th>
                        <th className="p-2 border-b">Hospital</th>
                        <th className="p-2 border-b">Blood Group</th>
                        <th className="p-2 border-b">Quantity</th>
                        <th className="p-2 border-b">Status</th>
                        <th className="p-2 border-b">Date</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {getTabData().length > 0 ? (
                    getTabData().map((item) => (
                      <tr key={item.id} className="hover:bg-gray-100 transition-colors duration-200">
                        <td className="p-2 border-b">{item.id}</td>
                        {activeTab === "donors" && (
                          <>
                            <td className="p-2 border-b">{item.name}</td>
                            <td className="p-2 border-b">{item.email}</td>
                            <td className="p-2 border-b">{item.bloodGroup}</td>
                            <td className="p-2 border-b">{item.date}</td>
                          </>
                        )}
                        {activeTab === "hospitals" && (
                          <>
                            <td className="p-2 border-b">{item.name}</td>
                            <td className="p-2 border-b">{item.location}</td>
                            <td className="p-2 border-b">{item.contact}</td>
                            <td className="p-2 border-b">{item.date}</td>
                          </>
                        )}
                        {activeTab === "inventory" && (
                          <>
                            <td className="p-2 border-b">{item.bloodGroup}</td>
                            <td className="p-2 border-b">{item.quantity}</td>
                            <td className="p-2 border-b">{item.type}</td>
                            <td className="p-2 border-b">{item.date}</td>
                          </>
                        )}
                        {activeTab === "requests" && (
                          <>
                            <td className="p-2 border-b">{item.hospital}</td>
                            <td className="p-2 border-b">{item.bloodGroup}</td>
                            <td className="p-2 border-b">{item.quantity}</td>
                            <td className="p-2 border-b">{item.status}</td>
                            <td className="p-2 border-b">{item.date}</td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={activeTab === "requests" ? 6 : 5}
                        className="p-4 text-center text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;