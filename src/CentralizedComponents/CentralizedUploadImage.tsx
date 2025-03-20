import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { Controller } from "react-hook-form";
const UploadArea = styled(Box)(({ height }: { height: string }) => ({
  border: "1px solid #ccc",
  
  borderRadius: "15px",
  textAlign: "center",
  cursor: "pointer",
  height: height,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  "&:hover": {
    backgroundColor: "#f9f9f9",
  },
}));
interface CentralizedUploadImageProps {
  name: string;
  label: string;
  required?: boolean;
  readOnly?: boolean;
  defaultValue?: File | null;
  sx?: object;
  control: any;
  height?: string;
}
const  CentralizedUploadImage: React.FC<CentralizedUploadImageProps> = ({
  name,
  label,
  required = false,
  readOnly,
  defaultValue = null,
  control,
  sx,
  height = "120px",
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValue ? URL.createObjectURL(defaultValue as File) : null
  );
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange(file);
    } else {
      setPreviewUrl(null);
      onChange(null);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...sx,  }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || null}
        rules={{
          required: required ? `${label} is required` : false,
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <UploadArea
              height={height}
             
            >
              <input
                id={name}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, field.onChange)}
                disabled={readOnly}
              />
              {previewUrl ? (
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    maxHeight: "100%",
                    borderRadius: "15px",
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{ fontSize: "10px", color: "black" }}
                >
                  Attach image
                </Typography>
              )}
            </UploadArea>
            {error && (
              <Typography color="error" variant="body2">
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
};
export default CentralizedUploadImage;
