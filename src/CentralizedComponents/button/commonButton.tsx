import React from "react";
import Button from "@mui/material/Button";
import { btnstyle } from "../../common/commonStyle";

interface CentralizedButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | "file";
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  disableElevation?: boolean;
  disableRipple?: boolean;
  sx?: object;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CommonButton: React.FC<CentralizedButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "contained",
  color,
  startIcon,
  endIcon,
  disabled = false,
  fullWidth = false,
  disableElevation = false,
  disableRipple = false,
  sx = {},
  onChange,
  ...props
}) => {
  return type === "file" ? (
    <Button
      component="label" 
      variant={variant}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{ ...btnstyle, ...sx }}
      disableElevation={disableElevation}
      disableRipple={disableRipple}
      {...props}
    >
      {label}
      <input type="file" accept="image/*" hidden onChange={onChange} />
    </Button>
  ) : (
    <Button
      type={type}
      variant={variant}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{ ...btnstyle, ...sx }}
      disableElevation={disableElevation}
      disableRipple={disableRipple}
      onClick={onClick}
      {...props}
    >
      {label}
    </Button>
  );
};
