import { Box, IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
    showPassword: boolean;
    hasInput: boolean;
    setShowPassword: (value: boolean) => void;
}

function PasswordEyeIcon({ showPassword, hasInput, setShowPassword }: Props) {
    return (
        <InputAdornment position="end">
            <IconButton
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                edge="end"
                disabled={!hasInput}
            >
                {hasInput ? (
                    showPassword ? (
                        <VisibilityOffIcon/>
                    ) : (
                        <VisibilityIcon/>
                    )
                ) : (
                    <Box sx={{ width: "24px", height: "24px" }}/>
                )}
            </IconButton>
        </InputAdornment>
    );
}

export default PasswordEyeIcon;
