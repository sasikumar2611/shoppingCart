import { forwardRef } from "react";
import { InputLabel, Stack, TextField, TextFieldProps } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface CentralizedTextFieldProps {
  errorMessage?: string;
  focused?: boolean;
  label?: string;
  grid?: number;
  isMandatory?: boolean;
}
const CentralizedTextInput = forwardRef<
  HTMLInputElement,
  CentralizedTextFieldProps & TextFieldProps
>(({ errorMessage, focused, label, grid, isMandatory, ...props }, ref) => {
  return (
    <Grid size={{ xs: grid || 12 }}>
      <Stack >
        {label && (
          <InputLabel sx={{ fontSize: "14px" }}>
            {label}{" "}
            {isMandatory && (
              <span style={{ color: "red", marginLeft: "4px" }}>*</span>
            )}
          </InputLabel>
        )}
        <TextField
          size="small"
          margin="normal"
          error={!!errorMessage}
          helperText={errorMessage}
          ref={ref}
          {...props}
        />
      </Stack>
    </Grid>
  );
});
export default CentralizedTextInput;
