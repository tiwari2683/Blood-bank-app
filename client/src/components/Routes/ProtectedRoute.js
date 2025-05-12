import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";
import API from "../../services/API";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await API.get("/auth/current-user");
        if (data?.success) {
          dispatch(getCurrentUser(data));
        }
      } catch (error) {
        localStorage.clear();
        console.log(error);
      }
    };

    if (localStorage.getItem("token")) {
      getUser();
    }
  }, [dispatch]); // Added `dispatch` as dependency

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  if (!isAuthenticated && !localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;