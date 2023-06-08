import { Navigate } from "react-router-dom";

function Homepage() {
  // if (!user) return <LandingPage />
  // otherwise,

  return <Navigate to={"/notes"} />;
}

export default Homepage;
