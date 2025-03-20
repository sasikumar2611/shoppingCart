import { TextField, Box, FormLabel, Typography } from "@mui/material";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";
interface InputTextProps {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  startAdornment?: React.ReactNode;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  InputProps?: any;
}
const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      name,
      control,
      placeholder = "",
      label = "",
      variant = "outlined",
      fullWidth = true,
      required = false,
      disabled = false,
      startAdornment,
      minLength,
      maxLength,
      pattern,
      readOnly,
    },
    ref
  ) => {
    const CustomTextField = styled(TextField)({
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiInputBase-input": {
        fontSize: "12px !important",
        padding: "5px 5px 5px 10px !important",
        color: "#000",
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "7px",
        backgroundColor: "#fff",
        "& input": {
          backgroundColor: "#fff",
          color: "#000",
          padding: "6px",
          border: "1px solid #ccc",
          borderRadius: "25px",
          flex: 1,
          width: "250px",
          fontSize: "12px",
          height: "24px",
        },
        "& input::placeholder": {
          color: "black !important",
          fontSize: "12px",
        },
      },
    });
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel sx={{ margin: "13px 0px 16px 5px" }}>
          <Typography sx={{ fontSize: "12px", color: "black" }}>
            {label}
          </Typography>
        </FormLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: required && `${label || placeholder} is required`,
            minLength: minLength
              ? {
                  value: minLength,
                  message: `${
                    label || placeholder
                  } must be at least ${minLength} characters long`,
                }
              : undefined,
            maxLength: maxLength
              ? {
                  value: maxLength,
                  message: `${
                    label || placeholder
                  } must be less than ${maxLength} characters long`,
                }
              : undefined,
            pattern: pattern
              ? { value: pattern, message: `Invalid ${label || placeholder}` }
              : undefined,
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <CustomTextField
                {...field}
                inputRef={ref}
                placeholder={placeholder}
                variant={variant}
                fullWidth={fullWidth}
                disabled={disabled}
                error={!!error}
                InputProps={{
                  startAdornment: startAdornment,
                  inputProps: {
                    readOnly: readOnly,
                  },
                }}
              />
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
export default InputText;
