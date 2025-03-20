import { forwardRef } from "react";
import { Select, MenuItem, FormLabel, Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { styled } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../App.css";
interface InputSelectProps {
  name: string;
  control?: any;
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  options?: any;
  onChange?: any;
  getOptionLabel?: any;
  sx?: any;
  disabledOptions?: any;
}
const InputSelect = forwardRef<HTMLInputElement, InputSelectProps>(
  (
    {
      name,
      control,
      label,
      readOnly,
      placeholder = "Select",
      fullWidth = true,
      required = false,
      disabled = false,
      options,
      onChange,
      getOptionLabel,
      disabledOptions = [],
      sx,
    },
    ref
  ) => {
    const selectArrow = styled(KeyboardArrowDownIcon)(() => ({
      fontSize: "16px",
    }));
    const CustomSelect = styled(Select)(() => ({
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiSelect-root": {
        backgroundcolor: "#fff !important",
      },
      "& .MuiOutlinedInput-input": {
        fontSize: "12px !important",
        padding: "6px 10px !important",
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "7px",
        backgroundcolor: "#fff !important",
      },
      "& .MuiSelect-select": {
        backgroundColor: "#fff",
        color: "#000",
        padding: "4px",
        margin: "1px 0px",
        border: "1px solid #ccc",
        borderRadius: "25px",
        flex: 1,
        width: "250px",
        fontSize: "12px",
        minHeight: "10px",
      },
      "& .MuiSelect-select::placeholder": {
        color: "#aaa !important",
        opacity: 0.5,
      },
    }));
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel sx={{ fontSize: "12px", margin: "13px 0px 16px 0px" }}>
          <Typography sx={{ fontSize: "12px", color: "black", ml: 2 }}>
            {label}
          </Typography>
        </FormLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: required ? `${placeholder} is required` : false,
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <CustomSelect
                {...field}
                inputRef={ref}
                displayEmpty={true}
                disabled={disabled}
                error={!!error}
                fullWidth={fullWidth}
                value={field.value || ""}
                sx={sx}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (onChange) {
                    onChange(e.target.value);
                  }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "150px",
                      width: "140px",
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        padding: "4px 8px",
                      },
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                      "-ms-overflow-style": "none",
                      "scrollbar-width": "none",
                    },
                  },
                }}
                inputProps={{ readOnly: readOnly }}
                IconComponent={selectArrow}
              >
                <MenuItem disabled value="" sx={{ color: "black" }}>
                  {placeholder}
                </MenuItem>
                {options?.map((option: any) => (
                  <MenuItem
                    sx={{ color: "black" }}
                    key={option.id}
                    value={option.id}
                    disabled={disabledOptions.includes(option.id)}
                  >
                    {getOptionLabel(option)}
                  </MenuItem>
                ))}
              </CustomSelect>
              {error && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  {error.message}
                </p>
              )}
            </>
          )}
        />
      </Box>
    );
  }
);
export default InputSelect;
