// MUI Imports
import { InputAdornment, IconButton } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

export function ToggleIcon(props: ToggleIconProps) {
  // ** Props
  const { value, onChange } = props;

  // ** Change
  const handleClick = () => onChange(!value);

  return (
    <InputAdornment position="end">
      <IconButton onClick={handleClick}>
        {value ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
      </IconButton>
    </InputAdornment>
  );
}

export interface ToggleIconProps {
  value: boolean;
  onChange(v: boolean): void;
}
