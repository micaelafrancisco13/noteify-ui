import { ReactNode } from "react";

export interface MyLink {
  link: string;
  linkTitle: string;
  buttonTitle: string;
  socialIcon: ReactNode;
}

export const myLinks = [
  {
    link: "https://www.linkedin.com/in/micaelafrancisco13/",
    linkTitle: `Developer's LinkedIn`,
    buttonTitle: "LinkedIn",
  },
  {
    link: "https://micaelafrancisco.vercel.app/",
    linkTitle: `Developer's Portfolio`,
    buttonTitle: "Portfolio",
  },
];
