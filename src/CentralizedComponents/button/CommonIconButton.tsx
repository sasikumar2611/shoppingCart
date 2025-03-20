import { Tooltip, IconButton } from "@mui/material";
import React from "react";


interface CommonIconButtonProps {
  showTooltip?: boolean;
  isFavourite?: boolean;
  tooltipTitle?: string;
  icon: React.ReactNode;
  color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
  checkedIcon?: React.ReactNode;
  onClick?: any
}

export const CommonIconButton: React.FC<CommonIconButtonProps> = ({
  showTooltip = true,
  isFavourite,
  tooltipTitle = "",
  icon,
  color = "primary",
  checkedIcon,
  onClick,
}) => {
  return (
    <>
      <Tooltip title={showTooltip ? tooltipTitle : ""} placement="top">
        <IconButton color={color} onClick={onClick}>
          {isFavourite ? icon : checkedIcon}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CommonIconButton;
