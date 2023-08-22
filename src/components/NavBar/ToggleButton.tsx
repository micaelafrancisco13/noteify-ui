import { IconButton } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface Props {
    drawerToggle: boolean;
    onDrawerToggle: (toggle: boolean) => void;
}

function ToggleButton({ drawerToggle, onDrawerToggle }: Props) {
    return (
        <IconButton
            aria-label="Toggle side drawer"
            onClick={() => onDrawerToggle(!drawerToggle)}
        >
            {drawerToggle ? <CloseOutlinedIcon/> : <MenuOutlinedIcon/>}
        </IconButton>
    );
}

export default ToggleButton;
