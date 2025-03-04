import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // Show loading screen until Clerk is fully initialized
  if (!isLoaded) {
    return <div>Loading...</div>; // Or replace with a loading spinner
  }

  // Redirect to login if user is not signed in
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  // Ensure user metadata is loaded before checking role
  if (user && !user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
