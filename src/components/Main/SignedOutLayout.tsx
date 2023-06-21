import NavBarSignedOut from "../NavBar/NavBarSignedOut.tsx";
import { ReactNode, RefObject } from "react";

interface Props {
  drawerToggle: boolean;
  drawerRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  onDrawerToggle: (value: boolean) => void;
}

function SignedOutLayout({
  drawerToggle,
  drawerRef,
  children,
  onDrawerToggle,
}: Props) {
  return (
    <>
      <NavBarSignedOut
        drawerToggle={drawerToggle}
        onDrawerToggle={onDrawerToggle}
        drawerRef={drawerRef}
      />
      {children}
    </>
  );
}

export default SignedOutLayout;
