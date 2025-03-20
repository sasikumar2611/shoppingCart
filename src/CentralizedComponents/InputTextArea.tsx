import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { Box, FormLabel, Typography } from "@mui/material";
import { styled } from "@mui/system";
interface InputTextAreaProps {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  readOnly?: any;
  disabled?: boolean;
}
const StyledTextArea = styled("textarea")(() => ({
  backgroundColor: "#fff",
  color: "#000",
  fontSize: "12px",
  lineHeight: "1.5",
  padding: "9px",
  borderRadius: "15px",
  border: "1px solid #ccc",
  resize: "none",
  outline: "none",
  fontFamily: "'Roboto', sans-serif",
  "&::placeholder": {
    color: "#aaa",
    fontSize: "12px",
  },
  "&:focus": {
    border: "1px solid #ccc",
  },
}));
const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  (
    {
      name,
      control,
      label,
      placeholder,
      rows,
      readOnly,
      required = false,
      disabled = false,
    },
    ref
  ) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {label && (
          <FormLabel sx={{ margin: "13px 0px 16px 0px" }}>
            <Typography sx={{ fontSize: "12px", color: "black" }}>
              {label}
            </Typography>
          </FormLabel>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: required
              ? `${label || "This field"} is required`
              : undefined,
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledTextArea
                {...field}
                ref={ref}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
              />
              {error && (
                <Box sx={{ color: "error.main", fontSize: "10px", mt: "4px" }}>
                  {error.message}
                </Box>
              )}
            </>
          )}
        />
      </Box>
    );
  }
);
export default InputTextArea;
