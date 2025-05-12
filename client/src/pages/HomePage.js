import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Added missing import
import Spinner from "../components/shared/Spinner"; // Added missing import
import Modal from "../components/shared/modal/Modal"; // Added missing import

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Now defined

  useEffect(() => {
    if (user?.role === "admin") navigate("/admin");
  }, [user, navigate]);

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) setData(data?.inventory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  const getBloodGroupColor = (group) => {
    const colors = {
      "A+": "#ff6b6b", "A-": "#ff8787",
      "B+": "#4ecdc4", "B-": "#6be3da",
      "AB+": "#45b7d1", "AB-": "#63c9e3",
      "O+": "#96c93d", "O-": "#b3d667"
    };
    return colors[group] || "#gray";
  };

  const compatibilityData = {
    "O-": { canDonateTo: ["All"], canReceiveFrom: ["O-"] },
    "O+": { canDonateTo: ["O+", "A+", "B+", "AB+"], canReceiveFrom: ["O+", "O-"] },
    "A-": { canDonateTo: ["A-", "A+", "AB-", "AB+"], canReceiveFrom: ["A-", "O-"] },
    "A+": { canDonateTo: ["A+", "AB+"], canReceiveFrom: ["A+", "A-", "O+", "O-"] },
    "B-": { canDonateTo: ["B-", "B+", "AB-", "AB+"], canReceiveFrom: ["B-", "O-"] },
    "B+": { canDonateTo: ["B+", "AB+"], canReceiveFrom: ["B+", "B-", "O+", "O-"] },
    "AB-": { canDonateTo: ["AB-", "AB+"], canReceiveFrom: ["AB-", "A-", "B-", "O-"] },
    "AB+": { canDonateTo: ["AB+"], canReceiveFrom: ["AB+", "A+", "A-", "B+", "B-", "O+", "O-", "AB-"] }
  };

  return (
    <Layout>
      <div className="container py-6">
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <Spinner /> // Now defined
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-red-600 mb-4">Quick Actions</h4>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors mr-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Inventory
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                data-bs-toggle="modal"
                data-bs-target="#compatibilityModal"
              >
                Compatibility Guide
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-red-600 mb-4">Inventory Overview</h4>
              <p className="text-gray-700">Total Records: {data.length}</p>
            </div>
            {data.map((record) => (
              <div
                key={record._id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
              >
                <span
                  className="inline-block px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: getBloodGroupColor(record.bloodGroup) }}
                >
                  {record.bloodGroup}
                </span>
                <p className="mt-2">Type: {record.inventoryType}</p>
                <p className={record.quantity < 100 ? "text-red-600" : "text-green-600"}>
                  Quantity: {record.quantity} ML
                </p>
                <p>Date: {moment(record.createdAt).format("DD/MM/YYYY")}</p>
              </div>
            ))}
          </div>
        )}

        <div className="modal fade" id="compatibilityModal" tabIndex="-1" aria-labelledby="compatibilityModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-red-600 text-white">
                <h5 className="modal-title" id="compatibilityModalLabel">Blood Type Compatibility</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Blood Type</th>
                      <th>Can Donate To</th>
                      <th>Can Receive From</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(compatibilityData).map(([bloodType, info]) => (
                      <tr key={bloodType}>
                        <td>
                          <span
                            className="badge rounded-pill"
                            style={{ backgroundColor: getBloodGroupColor(bloodType) }}
                          >
                            {bloodType}
                          </span>
                        </td>
                        <td>{info.canDonateTo.join(", ")}</td>
                        <td>{info.canReceiveFrom.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <Modal /> 
      </div>
    </Layout>
  );
};

export default React.memo(HomePage);