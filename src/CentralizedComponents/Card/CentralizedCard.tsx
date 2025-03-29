import React from "react";
import Card from "@mui/material/Card";
import { CardContent, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../button/commonButton";

interface CardComponentProps {
  bodyContent: React.ReactNode;
  title: string;
  sx?: object;
  viewAll?: boolean;
  viewBack?: boolean;
}
export const CentralizedCard: React.FC<CardComponentProps> = ({
  bodyContent,
  title,
  sx,
  viewAll = true,
  viewBack = false,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "15px",
        padding: "15px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        ...sx,
      }}
    >
      <CardContent sx={{ padding: "0px  !important", height: "100%" }}>
        <Stack direction={"column"} gap={2} height={"100%"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6" sx={{ color: "black" }}>
              {title}
            </Typography>
            {viewAll && (
              <CommonButton
                label="View All"
                onClick={() => navigate(`/Pages/${title}`)}
                disableElevation
                sx={{ color: "#7d4dfa", backgroundColor: "transparent" }}
              />
            )}
            {viewBack && (
              <CommonButton
                label="Back"
                onClick={() => navigate(-1)}
                disableElevation
                sx={{ color: "#7d4dfa", backgroundColor: "transparent" }}
              />
            )}
          </Stack>
          <Divider />

          {bodyContent}
        </Stack>
      </CardContent>
    </Card>
  );
};
