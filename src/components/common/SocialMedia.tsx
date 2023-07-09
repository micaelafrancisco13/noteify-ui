import { ReactNode } from "react";
import { IconButton } from "@mui/material";

interface Props {
  link: string;
  linkTitle: string;
  buttonTitle: string;
  socialIcon: ReactNode;
}

function SocialMedia({ link, linkTitle, buttonTitle, socialIcon }: Props) {
  return (
    <a href={link} target="_blank" rel="noreferrer" title={linkTitle}>
      <IconButton title={buttonTitle}>{socialIcon}</IconButton>
    </a>
  );
}

export default SocialMedia;
