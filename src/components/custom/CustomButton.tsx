import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = ButtonProps & { maxWidth?: string; drawerToggle?: boolean };

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "maxWidth" && prop !== "drawerToggle",
})<{
  maxWidth?: string;
  drawerToggle?: boolean;
}>(({ theme, maxWidth, drawerToggle }) => ({
  maxWidth: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: drawerToggle ? "100%" : maxWidth,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: maxWidth ? maxWidth : "100%",
  },
}));

function CustomButton(props: Props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

export default CustomButton;
