import { IconButton } from "@mui/material";
import { MyLink } from "../../utils/myLinks.ts";

function SocialMedia({ link, linkTitle, buttonTitle, socialIcon }: MyLink) {
  return (
    <a href={link} target="_blank" rel="noreferrer" title={linkTitle}>
      <IconButton size="large" title={buttonTitle}>
        {socialIcon}
      </IconButton>
    </a>
  );
}

export default SocialMedia;
