import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = ButtonProps & { maxWidth?: string };

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "maxWidth",
})<{
  maxWidth?: string;
}>(({ theme, maxWidth }) => ({
  maxWidth: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: maxWidth ? maxWidth : "100%",
  },
}));

function CustomButton(props: Props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

export default CustomButton;
