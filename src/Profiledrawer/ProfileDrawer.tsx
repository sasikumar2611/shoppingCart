import { Close } from "@mui/icons-material";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputText from "../CentralizedComponents/InputText";
// import CentralizedUploadImage from "../CentralizedComponents/CentralizedUploadImage";
const ProfileDrawer = ({
  drawerOpen,
  toggleDrawer,
  userData,
  // image,
  handledeleteImage,
  // setImage,
  // setPreview,
  // setSave,
  save,
  handleImageSave,
  preview,
  handleImageChange,
}: any) => {
  const [isRead, setIsRead] = useState(true);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      userName: "",
      userEmail: "",
    },
  });
  // console.log("Image Data:", image);
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };
  const handleEdit = () => {
    setIsRead(false);
  };
  const handleSave = () => {
    setIsRead(true);
  };
 
  useEffect(() => {
    if (userData) {
      reset({
        userName: userData.Username || "",
        userEmail: userData.Email || "",
      });
    }
  }, [userData, reset]);
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: {
            xs: "200px",
            sm: "300px",
          },
          backgroundColor: "#fff",
          color: "white",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          padding: "15px",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              width: "100%",
              mb: 1,
            }}
          >
            <IconButton sx={{ padding: "0px" }} onClick={toggleDrawer(false)}>
              <Close sx={{ color: "black", fontSize: "22px" }} />
            </IconButton>
          </Box>
          {preview ? (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{
                width: "100%",
                height: "250px",
                borderRadius: "15px",
                objectFit: "cover",
                mb: 1,
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "250px",
                borderRadius: "15px",
                objectFit: "cover",
                border: "1px dashed #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: "#ccc" }}>
                Upload your image
              </Typography>
            </Box>
          )}
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ width: "100%" }}
          >
            <Button
              variant="contained"
              component="label"
              disableElevation
              disableRipple
              disabled={save && preview}
              sx={{
                borderRadius: "25px",
                padding: "8px 20px ",
                width: "50%",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                whiteSpace: "nowrap",
                textTransform: "none",
              }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            <Button
              disableElevation
              disableRipple
              variant="contained"
              disabled={!save&& !preview}
              sx={{
                borderRadius: "25px",
                padding: "8px 20px ",
                width: "50%",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                whiteSpace: "nowrap",
                textTransform: "none",
              }}
              onClick={save? handleImageSave: handledeleteImage}
            >
             {save? "Save":preview && !save ? "Delete" : "Save"}
            </Button>
          </Box>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={0} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <InputText
                  name="userEmail"
                  control={control}
                  placeholder="Enter"
                  label="Email"
                  readOnly={true}
                />
              </Grid>
              <Grid item xs={12}>
                <InputText
                  name="userName"
                  control={control}
                  placeholder="Enter"
                  label="User Name"
                  readOnly={isRead}
                />
              </Grid>
            </Grid>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              sx={{ width: "100%" }}
            >
              <Button
                disableElevation
                disableRipple
                variant="contained"
                disabled={!isRead}
                sx={{
                  borderRadius: "25px",
                  padding: "8px 20px ",
                  width: "50%",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  textTransform: "none",
                }}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                disableElevation
                disableRipple
                disabled={isRead}
                variant="contained"
                sx={{
                  borderRadius: "25px",
                  padding: "8px 20px ",
                  width: "50%",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  textTransform: "none",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Drawer>
  );
};
export default ProfileDrawer;
