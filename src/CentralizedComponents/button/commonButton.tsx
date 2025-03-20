import React from 'react'
import Button from "@mui/material/Button";

import { btnstyle } from '../../common/commonStyle';

interface CentralizedButtonProps {
    label: string;
    onClick?: () => void;
    variant?: "contained" | "outlined" | "text";
    color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    sx?: object;
  }

export const CommonButton: React.FC<CentralizedButtonProps> = ({
    label,
    onClick,
    variant = "contained",
    color = "primary",
    startIcon,
    endIcon,
    disabled = false,
    fullWidth = false,
    sx = {},
  }) => {
  return (
    <Button
      variant={variant}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{ ...btnstyle, ...sx }}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

