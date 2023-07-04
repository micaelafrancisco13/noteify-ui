import { customColors } from "../components/common/SideDrawerMenuItems.tsx";

export interface NavbarLink {
  color: customColors;
  ariaLabel: string;
  navigateTo: string;
  label: string;
}

export const navbarLinks: NavbarLink[] = [
  {
    color: "simple_white",
    ariaLabel: "Features",
    navigateTo: "/features",
    label: "Features",
  },
  {
    color: "simple_white",
    ariaLabel: "About the developer",
    navigateTo: "/about-the-developer",
    label: "About the Developer",
  },
];

export const authLinks: NavbarLink[] = [
  {
    color: "paper_gray",
    ariaLabel: "Sign in to your account",
    navigateTo: "/auth/sign-in",
    label: "Sign in",
  },
  {
    color: "primary",
    ariaLabel: "Register an account",
    navigateTo: "/auth/sign-up",
    label: "Start for free",
  },
];
