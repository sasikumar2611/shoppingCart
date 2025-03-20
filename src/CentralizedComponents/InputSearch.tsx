import React from "react";
import {
  OutlinedInput,
  InputAdornment,
  FormControl,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
interface InputSearchProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  ariaLabel?: string;
  sx?: object;
  size?: "small" | "medium";
}
export const Inputsearch: React.FC<InputSearchProps> = ({
  value,
  onChange,
  ariaLabel = "Search input",
  size = "small",
  sx = {},
}) => {
  const theme = useTheme();
  const bgColor = theme.palette.mode === "dark" ? "#03ac9b" : "#7d4dfa";
  const FontColor = theme.palette.mode === "dark" ? "white" : "black";

  const InputSearchStyle = {
    height: "100%",
    fontSize: "10px",
    borderRadius: "25px",
   
    backgroundColor: "#e3e2e2",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "20px",
      backgroundColor: bgColor,
      padding: "3px",
      borderRadius: "25px",
      color: FontColor,
    },
    "& .MuiInputBase-input": {
      padding: "8px 10px 8px 3px",
      fontSize: "14px",
      color:'black',
      "&::placeholder": {
        fontSize: "12px",
        color: "#565656",
      },
    },
    "& .MuiInputAdornment-outlined": {
      marginRight: "3px",
    },
  };
  return (
    <FormControl
      sx={{
        margin: '0.25rem 0px',
        ...sx,
        width: "200px !important",
        backgroundColor: "#E3E2E2",
        borderRadius: "25px",
        "& .MuiInputBase-formControl": {
          paddingLeft: "5px",
        },
      }}
      variant="outlined"
    >
      <OutlinedInput
        id="input-search"
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        placeholder="Search"
        size={size}
        sx={InputSearchStyle}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ fontSize: "18px", color: "white !important" }} />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
