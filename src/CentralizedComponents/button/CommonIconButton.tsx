import { Tooltip, IconButton, IconButtonProps } from "@mui/material";
import React from "react";

interface CommonIconButtonProps extends IconButtonProps {
  showTooltip?: boolean;
  isFavourite?: boolean;
  tooltipTitle?: string;
  icon: React.ReactNode;
  checkedIcon?: React.ReactNode;
  color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
}

export const CommonIconButton: React.FC<CommonIconButtonProps> = ({
  showTooltip = true,
  isFavourite,
  tooltipTitle = "",
  icon,
  checkedIcon,
  color='primary',
  ...props 
}) => {
  return (
    <Tooltip title={showTooltip ? tooltipTitle : ""} placement="top">
      <IconButton color={color} {...props}>
        {isFavourite ? checkedIcon : icon}
      </IconButton>
    </Tooltip>
  );
};

export default CommonIconButton;
