import { Navigate } from "react-router-dom";
import SignedInLayout from "./SignedInLayout.tsx";
import { RefObject } from "react";

interface Props {
  drawerToggle: boolean;
  drawerRef: RefObject<HTMLDivElement>;
  onDrawerToggle: (value: boolean) => void;
}

function Homepage({ drawerToggle, drawerRef, onDrawerToggle }: Props) {
  // if (!user) return <LandingPage />
  // otherwise,

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
