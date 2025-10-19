import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  // Get user and loading state from our context
  const { user, loading } = useContext(AuthContext);

  // Get the current location to pass it for redirection
  const location = useLocation();
  console.log("PrivateRoute check at location:", location.pathname);

  // --- 1. Handle the loading state ---
  // While Firebase is checking the auth status, we show a spinner.
  // This prevents a logged-in user from being briefly redirected to login on a page refresh.
  if (loading) {
    console.log("PrivateRoute: Auth state is loading. Showing spinner.");
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // --- 2. Handle the authenticated user ---
  // If a user exists, they are allowed to see the content.
  if (user) {
    console.log("PrivateRoute: User is authenticated. Rendering children.");
    return children;
  }

  console.log(
    "PrivateRoute: User is not authenticated. Redirecting to /login."
  );

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
