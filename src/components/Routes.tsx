import React from "react";

export const HomePage = React.lazy(() => import("./home/home.component"));
export const CourtLocatorPage = React.lazy(
  () => import("./courtmap/courtmap.component")
);
export const LoginPage = React.lazy(() => import("./login/login.component"));

// Proper Route Definition To Go Here
