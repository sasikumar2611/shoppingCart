import React from "react";
import Card from "@mui/material/Card";
import {

  CardContent,
} from "@mui/material";


interface CardComponentProps {
  bodyContent: React.ReactNode;
sx?:object
}
export const CustomCard: React.FC<CardComponentProps> = ({
  bodyContent,
  sx,
}) => {

  return (
    
      <Card
        sx={{
          width: "100%",
          borderRadius: "15px",
          padding: "15px",
          height:'100%',
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          ...sx,
        }}
      >
        <CardContent sx={{ padding: "0px  !important",height:'100%' }}>
         

            {bodyContent}
        
        </CardContent>
      </Card>

  );
};
