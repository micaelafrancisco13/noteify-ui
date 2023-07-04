import {
  Box,
  Button,
  ButtonPropsVariantOverrides,
  Divider,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomButton from "../custom/CustomButton.tsx";
import { ReactNode } from "react";
import { OverridableStringUnion } from "@mui/types";
import { ButtonPropsColorOverrides } from "@mui/material/Button/Button";

const StyledListButton = styled(CustomButton)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  textTransform: "none",
})) as typeof Button;

export interface DrawerMenuItem {
  color: string;
  variant?: string;
  ariaLabel: string;
  startIcon?: ReactNode;
  onSelectMenuItem: () => void;
  buttonChildren: ReactNode;
}

interface Props {
  stackSpacing: number;
  stackDirection: "row" | "column";
  dominantItem?: ReactNode;
  menuItems: DrawerMenuItem[];
}

function SideDrawerMenuItems({
  stackSpacing,
  stackDirection,
  dominantItem,
  menuItems,
}: Props) {
  return (
    <Stack
      paddingX={18 / 8}
      paddingY={30 / 8}
      spacing={stackSpacing}
      direction={stackDirection}
    >
      {dominantItem && (
        <Box>
          {dominantItem}
          <Divider sx={{ my: 2 }} />
        </Box>
      )}
      {menuItems.map((menuItem, index) => (
        <StyledListButton
          fullWidth
          key={index}
          variant={
            menuItem.variant as
              | OverridableStringUnion<
                  "text" | "contained" | "outlined",
                  ButtonPropsVariantOverrides
                >
              | undefined
          }
          color={
            menuItem.color as OverridableStringUnion<
              | "inherit"
              | "primary"
              | "secondary"
              | "success"
              | "error"
              | "info"
              | "warning",
              ButtonPropsColorOverrides
            >
          }
          aria-label={menuItem.ariaLabel}
          startIcon={menuItem.startIcon}
          onClick={menuItem.onSelectMenuItem}
        >
          {menuItem.buttonChildren}
        </StyledListButton>
      ))}
    </Stack>
  );
}

export default SideDrawerMenuItems;
