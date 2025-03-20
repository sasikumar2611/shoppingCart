import { forwardRef } from "react";
import {
  Autocomplete,
  Box,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import "../App.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/material/styles";
import { AutoCompleteStyle } from "../common/commonStyle";
interface InputSelectProps {
  name: string;
  control: any;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  readOnly?: boolean;
  options?: any;
  onchange?: any;
  getOptionLabelKey?: any;
  label?: any;
  multiple?: boolean;
}
const SelectArrow = styled(KeyboardArrowDownIcon)(() => ({
  fontSize: "16px",
}));
const CentralizeAutoComplete = forwardRef<HTMLInputElement, InputSelectProps>(
  ({
    name,
    control,
    placeholder = "Multi Select",
    label,
    required = false,
    readOnly = false,
    options,
    onchange,
    multiple = false,
    getOptionLabelKey,
  }) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel sx={{ fontSize: "12px", margin: "13px 0px 17px 0px" }}>
          <Typography sx={{ fontSize: "12px", color: "black" }}>
            {label}
          </Typography>
        </FormLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={multiple ? [] : ""}
          rules={{
            required: required ? `${placeholder} is required` : false,
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Autocomplete
                value={field.value || []}
                size="small"
                sx={{
                  ...AutoCompleteStyle,
                  '& .MuiAutocomplete-paper':{
                    color:'black important'
                  } 
                }}
                multiple={multiple}
                options={options || []}
                getOptionLabel={(option) => option[getOptionLabelKey]}
                filterSelectedOptions
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id
                }
                onChange={(_event, newValue) => {
                  field.onChange(newValue);
                  if (onchange) {
                    onchange(newValue);
                  }
                }}
                readOnly={readOnly}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={placeholder}
                    InputProps={{
                      ...params.InputProps,
                      style: {
                        color: "black",
                      
                      },
                      endAdornment: (
                        <>
                          <SelectArrow />
                        </>
                      ),
                    }}
                  />
                )}
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
export default CentralizeAutoComplete;
