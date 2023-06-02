import { Button, ButtonProps } from "@mui/material";

function CustomButton(props: ButtonProps) {
  return (
    <Button {...props} sx={{ maxWidth: "200px" }}>
      {props.children}
    </Button>
  );
}

export default CustomButton;
