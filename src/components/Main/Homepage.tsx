import { Navigate } from "react-router-dom";
import SignedInLayout from "./SignedInLayout.tsx";
import { RefObject } from "react";
import useAuth from "../../hooks/useAuth.ts";
import LandingPage from "./LandingPage.tsx";

interface Props {
  drawerToggle: boolean;
  drawerRef: RefObject<HTMLDivElement>;
  onDrawerToggle: (value: boolean) => void;
}

function Homepage({ drawerToggle, drawerRef, onDrawerToggle }: Props) {
  const { getCurrentUser } = useAuth();

  if (!getCurrentUser()) return <LandingPage />;

  return (
    <SignedInLayout
      drawerToggle={drawerToggle}
      drawerRef={drawerRef}
      onDrawerToggle={(toggle) => onDrawerToggle(toggle)}
    >
      <Navigate to={"/notes"} />
    </SignedInLayout>
  );
}

export default Homepage;
