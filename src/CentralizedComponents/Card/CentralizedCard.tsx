import React, { useState } from "react";
import Card from "@mui/material/Card";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const [_isHovered, _setIsHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <Box>
      <Card
        sx={{
          width: "100%",
          borderRadius: "15px",
          padding: "15px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          ...sx,
        }}
      >
        <CardContent sx={{ padding: "0px  !important" }}>
          <Stack direction={"column"} gap={2}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ color: "black" }}>
                {title}
              </Typography>
              {viewAll && (
                <Button
                  sx={{
                    color: "#7d4dfa",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    textTransform: "none",
                  }}
                  onClick={() => navigate(`/Pages/${title}`)}
                >
                  View All
                </Button>
              )}
              {viewBack && (
                <Button
                  sx={{
                    color: "#7d4dfa",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    textTransform: "none",
                  }}
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              )}
            </Stack>
            <Divider />

            {bodyContent}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
