import React from "react";
import {
  Box,
  IconButton,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";
import { TransitionProps } from "@mui/material/transitions";
interface ModelProps {
  open: boolean;
  handleClose: () => void;
  handleLogout: any;
}
const LogoutModal: React.FC<ModelProps> = ({
  open,
  handleClose,
  handleLogout,
}) => {
  const theme = useTheme();
  const paperColor = theme.palette.mode === "dark" ? "#03ac9b" : "#7d4dfa";
  const FontColor = theme.palette.mode === "dark" ? "white" : "black";
  const btnColor =
    theme.palette.mode === "dark" ? "rgb(3, 172, 155)" : "#7d4dfa";
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const dialogStyle = {
    borderRadius: "20px",
    "& .MuiDialog-paper": {
      borderRadius: "15px",
      maxWidth: "40%",
      width: "90%",
    },
  };
  return (
    <Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        sx={dialogStyle}
        disableScrollLock
      >
        <Box>
          <Box
            sx={{
              fontSize: "16px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "2px 10px",
              backgroundColor: paperColor,
            }}
          >
            <Box>
              <DialogTitle sx={{ color: 'white', padding: " 10px " }}>
                Logout
              </DialogTitle>
            </Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ fontSize: "1.2rem", color: 'white' }} />
              </IconButton>
            </Box>
          </Box>
          <DialogContent>
            <DialogContentText sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "14px", color: "black" }}>
                Are you sure you want to logout
              </Typography>
            </DialogContentText>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
              mt={2}
            >
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: "transparent",
                  color: FontColor,
                  padding: "3px 14px ",
                  fontSize: "12px",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  backgroundColor: btnColor,
                  color: 'white',
                  borderRadius: "25px",
                  fontSize: "12px",
                  padding: "0px 30px",
                }}
              >
                Ok
              </Button>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
};
export default LogoutModal;
