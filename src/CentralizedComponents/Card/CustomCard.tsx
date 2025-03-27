import React from "react";
import Card from "@mui/material/Card";
import {

  CardContent,
} from "@mui/material";


interface CardComponentProps extends React.ComponentProps<typeof Card> {
  bodyContent: React.ReactNode;
} 

export const CustomCard: React.FC<CardComponentProps> = ({
  bodyContent,
  sx,
  ...props
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
      {...props}
      >
        <CardContent sx={{ padding: "0px  !important",height:'100%' }}>
         

            {bodyContent}
        
        </CardContent>
      </Card>

  );
};
