import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { centralizedTextFieldStyle } from "../common/commonStyle";
interface CentralizedTextFieldProps {
  errorMessage?: string;
  focused?: boolean;
}
const CentralizedTextField = forwardRef<
  HTMLInputElement,
  CentralizedTextFieldProps & TextFieldProps
>(({ errorMessage, focused, ...props }, ref) => {
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      focused={focused}
      sx={centralizedTextFieldStyle}
      error={!!errorMessage}
      helperText={errorMessage}
      ref={ref}
      {...props}
    />
  );
});
export default CentralizedTextField;
