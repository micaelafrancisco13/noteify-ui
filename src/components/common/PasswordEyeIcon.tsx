import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

function PasswordEyeIcon({ showPassword, setShowPassword }: Props) {
  return (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowPassword(!showPassword)}
        aria-label="Toggle password visibility"
        edge="end"
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  );
}

export default PasswordEyeIcon;
