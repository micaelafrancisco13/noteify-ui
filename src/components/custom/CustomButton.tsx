import { Button, ButtonProps } from "@mui/material";

function CustomButton(props: ButtonProps) {
  return <Button {...props}>{props.children}</Button>;
}

export default CustomButton;
