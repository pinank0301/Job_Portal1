import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const location = useLocation();

  useEffect(() => {
    console.group('ProtectedRoute Debug');
    console.log('Current Path:', location.pathname);
    console.log('Is Loaded:', isLoaded);
    console.log('Is Signed In:', isSignedIn);
    console.log('User Object:', user);
    console.log('User Role:', user?.unsafeMetadata?.role);
    console.groupEnd();
  }, [isLoaded, isSignedIn, user, location]);

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
    console.warn('User not signed in - redirecting to landing');
    return <Navigate to="/?sign-in=true" replace />;
  }

  // No role set - redirect to onboarding
  if (!user?.unsafeMetadata?.role && location.pathname !== "/onboarding") {
    console.warn('No role set - redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  // User has a role and is on a valid path
  return children;
};

export default ProtectedRoute;