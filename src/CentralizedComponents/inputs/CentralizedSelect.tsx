import { forwardRef, useEffect, useState } from "react";
import {
  Autocomplete,
  InputLabel,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface OptionType {
  id: number | string;
  label: string;
}

interface CentralizedTextFieldProps {
  errorMessage?: boolean;
  options?: OptionType[];
  label?: string;
  grid?: number;
  isMandatory?: boolean;
  value?: OptionType | null;
  onChange?: (selectedOption: OptionType | null) => void; // Removed unnecessary event parameter
}

const CentralizedSelectInput = forwardRef<
  HTMLInputElement,
  CentralizedTextFieldProps & TextFieldProps
>(
  (
    {
      errorMessage,
      label,
      grid,
      options = [],
      isMandatory,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(value || null);

    const handleChange = (_: unknown, newValue: OptionType | null) => {
      setSelectedValue(newValue);
      if (onChange) {
        onChange(newValue); // Call the parent's onChange function
      }
    };

    useEffect(() => {
      if (value !== selectedValue) {
        setSelectedValue(value ?? null);
      }
    }, [value]);

    return (
      <Grid size={{ xs: grid || 12 }}>
        <Stack direction="column">
          {label && (
            <InputLabel sx={{ fontSize: "14px", marginBottom: 1 }}>
              {label}{" "}
              {isMandatory && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>
          )}
          <Autocomplete
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                padding: "1px",
              },

              // "& .MuiOutlinedInput-notchedOutline": {
              //   border: "1px solid #ccc !important",
              // },
            }}
            options={options}
            getOptionLabel={(option) => option.label}
            value={selectedValue}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!errorMessage}
                helperText={errorMessage}
                inputRef={ref}
                {...props}
              />
            )}
          />
        </Stack>
      </Grid>
    );
  }
);

export default CentralizedSelectInput;
