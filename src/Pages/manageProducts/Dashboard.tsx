import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CustomCard } from "../../CentralizedComponents/Card/CustomCard";

const Dashboard = () => {
  // const navigate=useNavigate()
  const cardData=[
    {
      title:"Total Users",
      value:2,
     color:'green'
    },
    {
      title:"Total Categories",
      value:3,
     color:'red'
    },
    {
      title:"Total Products",
      value:15,
      color:'aqua'
    }
  ]



  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container spacing={2}>
        {cardData.map((card) => (
           <Grid size={{ xs: 4 }}>
           <CustomCard
             sx={{}}
             bodyContent={
               <Stack direction="column" gap={1}>
                 <Stack direction="row" justifyContent={"center"}>
                   <Typography>{card.title}</Typography>
                 </Stack>
                 <Stack direction="row" justifyContent={"center"}>
                   <Box
                     sx={{
                       width: "80px",
                       height: "80px",
                       border: `1px solid ${card.color}`,
                       borderRadius: "50%",
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                     }}
                   >
                     <Typography
                       variant="h6"
                       sx={{
                         fontWeight: "bold",
                       }}
                     >
                      {card.value}
                      </Typography>
                   </Box>
                 </Stack>
               </Stack>
             }
           />
         </Grid>
        ))}
       
       
      </Grid>
    </Box>
  );
};

export default Dashboard;
