import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  // Not signed in - redirect to landing with sign-in
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  // No role set - redirect to onboarding
  if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // User has a role and is on a valid path
  return children;
};

export default ProtectedRoute;