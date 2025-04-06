// import { Box } from "@mui/material";
// import  { useEffect } from "react";
// import Grid from "@mui/material/Grid2";
// import { CentralizedCard } from "../../CentralizedComponents/Card/CentralizedCard";
// import { Productcard } from "../../CentralizedComponents/Card/Productcard";


// import { useParams } from "react-router-dom";
// import { handleCartChange, handleFavouriteChange, handleVisit } from "../../common/commonMethods";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrderHistory, getProductList } from "../../store/action/product";
// import { AppDispatch, RootState } from "../../store/Store";

// const YourOrder = () => {
// const userEmail=localStorage.getItem('userEmail')
//   const dispatch=useDispatch<AppDispatch>()
//    const orderHistory=useSelector((state:RootState)=> state.product.ordersHisoryList)
//  const customerOrderHistory=orderHistory.filter((order)=> {
//   order.customerEmail=== userEmail
//  })

// useEffect(()=>{
//   dispatch(getOrderHistory())
// },[dispatch])

//   return (
//     <Box sx={{ width: "100%", height: "100%" }}>
//       <Grid container spacing={2}>
//         <Grid size={{ xs: 12 }} key={`${categoryData.id}-${categoryData.category}`}>
//           <CentralizedCard
//             title={"26-11-2001"}
//             viewAll={false}
//             viewBack={true}
//             bodyContent={
//               <Grid container spacing={3} alignItems="center">
                
//                 <Grid size={{ xs: 12 }}>
//                   <Grid container spacing={2}>
//                     {categoryData?.items.map((item:any) => (
//                       <Grid size={{ xs: 12,sm: 6, md: 3 }} key={`${categoryData.id}-${categoryData.category}`}>
//                         <Productcard
//                         categoryId={categoryData?.id}
//                           handleVisit={handleVisit}
//                           handleCartChange={handleCartChange}
//                           handleFavouriteChange={handleFavouriteChange}
//                           category={categoryData.category}
//                           item={item}
                         
//                         />
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Grid>
//               </Grid>
//             }
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default YourOrder;

const YourOrder=()=>{
  return(
    <div>
      yourOrder
    </div>
  )
}

  export default YourOrder;