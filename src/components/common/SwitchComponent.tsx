import { FormControlLabel, Switch } from "@mui/material";

interface Props {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function SwitchComponent({ label, checked, onChange }: Props) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          inputProps={{ "aria-label": label }}
        />
      }
      label={label}
      sx={{ mb: 4 }}
    />
  );
}

export default SwitchComponent;
