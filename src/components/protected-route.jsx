import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    // Give a short delay to ensure metadata is fully loaded
    const checkRoleTimeout = setTimeout(() => {
      setIsCheckingRole(false);
    }, 1000);

    return () => clearTimeout(checkRoleTimeout);
  }, [user]);

  // Show loading screen until Clerk is fully initialized
  if (!isLoaded || isCheckingRole) {
    return <div>Loading...</div>; // Or replace with a more sophisticated loading spinner
  }

  // Redirect to login if user is not signed in
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  // Ensure user metadata is loaded before checking role
  if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;