import { forwardRef } from "react";
import {
  Box,
  InputLabel,
  Stack,
  styled,
  TextareaAutosize,
  TextareaAutosizeProps,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface CentralizedTextAreaProps extends TextareaAutosizeProps {
  error?: string;
  label?: string;
  grid?: number;
  isMandatory?: boolean;
  rows?: number;
  disabled?: boolean;
  placeholder?: string;
}


const CentralizedTextArea = forwardRef<
HTMLTextAreaElement,
CentralizedTextAreaProps
>(
  (
    {
      label,
      grid,
      isMandatory,
      placeholder,
      rows = 3,
      error,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const StyledTextArea = styled(TextareaAutosize)(() => ({
      // backgroundColor: theme.components.MuiInputBase.styleOverrides.root.backgroundColor,
      // color: theme.components.MuiInputBase.styleOverrides.root.color,
      backgroundColor: "#fff",
      color: disabled ? "#aaa" : "#000",
      fontSize: "14px",
      lineHeight: "1.5",
      padding: "8px",
      borderRadius: "5px",
      resize: "none",
      outline: "none",
      fontFamily: "'Roboto', sans-serif",
      border: error ? "1px solid red" : "1px solid #ccc",
      width: "100%",
      "&::placeholder": {
        color: "#000",
        fontSize: "12px",
      },
      "&:focus": {
        border: "1px solid #ccc",
      },
    }));
    return (
      <Grid size={{ xs: grid || 12 }}>
        <Stack>
          {label && (
            <InputLabel sx={{ fontSize: "14px",paddingBottom:'8px' }}>
              {label}{" "}
              {isMandatory && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>
          )}
          <StyledTextArea
            ref={ref}
            minRows={rows}
            placeholder={placeholder}
            disabled={disabled}
            {...props}
          />
          {error && (
            <Box sx={{ color: "error.main", fontSize: "12px", mt: "4px" ,ml:"16px"}}>
              {error}
            </Box>
          )}
        </Stack>
      </Grid>
    );
  }
);
export default CentralizedTextArea;
