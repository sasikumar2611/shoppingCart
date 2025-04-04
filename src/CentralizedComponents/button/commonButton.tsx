import React from "react";
import Button from "@mui/material/Button";
import { btnstyle } from "../../common/commonStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

interface CentralizedButtonProps {
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | "file";
  variant?: "contained" | "outlined" | "text";
  // color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
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
    const btncolor = useSelector((state: RootState) => state.product.color);
  
  return type === "file" ? (
    <Button
      component="label" 
      variant={variant}

      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{ ...btnstyle(btncolor), ...sx }}
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
  
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{ ...btnstyle(btncolor), ...sx }}
      disableElevation={disableElevation}
      disableRipple={disableRipple}
      onClick={onClick}
      {...props}
    >
      {label}
    </Button>
  );
};
