import React from 'react'
import Button from "@mui/material/Button";

import { btnstyle } from '../../common/commonStyle';

interface CentralizedButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "contained" | "outlined" | "text";
    color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    disableElevation?: boolean;
    disableRipple?: boolean;
    sx?: object;
  }

export const CommonButton: React.FC<CentralizedButtonProps> = ({
    label,
    onClick,
    type,
    variant = "contained",
    color,
    startIcon,
    endIcon,
    disabled = false,
    fullWidth = false,
    disableElevation = false,
    disableRipple = false,
    sx = {},
    ...props
  }) => {
  return (
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
  )
}

