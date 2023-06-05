import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomButton from "../custom/CustomButton.tsx";
import { ReactNode } from "react";

const StyledListButton = styled(CustomButton)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  textTransform: "none",
})) as typeof Button;

export interface DrawerMenuItem {
  color: string;
  ariaLabel: string;
  startIcon: ReactNode;
  onSelectMenuItem: () => void;
  buttonChildren: ReactNode;
}

interface Props {
  dominantItem?: ReactNode;
  menuItems: DrawerMenuItem[];
}

function SideDrawerMenuItems({ dominantItem, menuItems }: Props) {
  return (
    <Stack paddingX={18 / 8} paddingY={30 / 8}>
      {dominantItem}
      {menuItems.map((menuItem) => (
        <StyledListButton
          color={menuItem.color}
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
