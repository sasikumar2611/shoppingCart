import React, { useState } from "react";
import Card from "@mui/material/Card";
import {
  Box,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import { TokenOutlined } from "@mui/icons-material";
interface CardComponentProps {
  bodyContent: React.ReactNode;
}
export const MailCard: React.FC<CardComponentProps> = ({ bodyContent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const paperColor =
    theme.palette.mode === "dark" ? "rgb(255, 255, 255)" : "#fff";
  const mailColor = theme.palette.mode === "dark" ? "#03ac9b" : "#7d4dfa";
  return (
    <Box sx={{ position: "relative" }}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: "100%",
          borderRadius: 2,
          boxShadow:
            "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out",
          zIndex: isHovered ? 1 : 0,
          transform: isHovered ? "translateY(-10px)" : "translateY(0)",
          backgroundColor: paperColor,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 70,
            backgroundColor: mailColor,
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          }}
        >
          {isHovered && (
            <CardHeader
              title={bodyContent}
              sx={{
                color: "white",
                padding: "0px 10px 0px 15px !important",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          )}
        </Box>
        {!isHovered && (
          <Box
            sx={{
              position: "absolute",
              top: 35,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: mailColor,
              width: 30,
              height: 30,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              border: "4px solid #ffffff",
            }}
          >
            <TokenOutlined sx={{ fontSize: 20,color:'white' }} />
          </Box>
        )}
        <CardContent sx={{ padding: "5px 10px 10px 10px  !important" }}>
          {bodyContent}
        </CardContent>
      </Card>
      <Box
        sx={{
          width: "96%",
          height: "100%",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          position: "absolute",
          top: 0,
          left: 4,
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
          transform: isHovered
            ? "scale(1) translateY(-35px)"
            : "scale(0.9) translateY(0px)",
          opacity: isHovered ? 1 : 0,
          zIndex: isHovered ? 0 : -1,
          backgroundColor: mailColor,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "12px", margin: "5px 10px", color: "black" }}
        >
          Project Details{bodyContent}
        </Typography>
      </Box>
    </Box>
  );
};
