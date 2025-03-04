import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    if (!user) return;

    setIsUpdating(true);
    try {
      // Explicitly update user metadata
      await user.update({
        unsafeMetadata: { 
          role: role,
          completedOnboarding: true 
        }
      });

      console.log(`Role updated to: ${role}`);
      navigateUser(role);
    } catch (err) {
      console.error("Error updating role:", err);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    // More robust role checking
    if (isLoaded && user) {
      const userRole = user.unsafeMetadata?.role;
      if (userRole) {
        navigateUser(userRole);
      }
    }
  }, [user, isLoaded]);

  if (!isLoaded || isUpdating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="gradient-title font-extrabold text-6xl sm:text-8xl tracking-tighter text-center mb-16">
        I am a...
      </h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
          disabled={isUpdating}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
          disabled={isUpdating}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;