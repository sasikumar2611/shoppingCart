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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";
import { TransitionProps } from "@mui/material/transitions";
interface ModelProps {
  open: boolean;
  onClose: any;
  handleClose: () => void;
  bodycontent: React.ReactNode;
  modelHeadName: string;
}
const CentralizedModal: React.FC<ModelProps> = ({
  open,
  handleClose,
  modelHeadName,
  bodycontent,
}) => {
  const theme = useTheme();
  const paperColor = theme.palette.mode === "dark" ? "#03ac9b" : "#7d4dfa";
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
      maxWidth: "50%",
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
              <DialogTitle sx={{ color: "white", padding: " 10px " }}>
                {modelHeadName}
              </DialogTitle>
            </Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ fontSize: "1.2rem", color: "white" }} />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              borderColor: (theme) => theme.palette.divider,
            }}
          />
          <DialogContent>
            <DialogContentText sx={{ textAlign: "left" }}>
              {bodycontent}
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
};
export default CentralizedModal;
