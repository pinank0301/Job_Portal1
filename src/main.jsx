import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { shadesOfPurple } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
      publishableKey={PUBLISHABLE_KEY}
      afterSignInUrl="/onboarding"  // Explicitly set after sign-in route
      afterSignOutUrl="/"
      signInUrl="/"  // Ensure sign-in is on landing page
      routerPush={(to) => {
        // Custom router push to help diagnose routing issues
        console.log('Clerk routing to:', to);
        window.history.pushState({}, '', to);
      }}
      routerReplace={(to) => {
        console.log('Clerk replacing route to:', to);
        window.history.replaceState({}, '', to);
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);