import { FC } from "react";
import { Button, ButtonProps } from "@mui/material";

const CustomButton: FC<ButtonProps> = (props) => {
  const { children } = props;

  return <Button {...props}>{children}</Button>;
};

export default CustomButton;
