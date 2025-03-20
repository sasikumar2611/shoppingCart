import { Box } from "@mui/material";
import  { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { CentralizedCard } from "../CentralizedComponents/Card/CentralizedCard";
import { Productcard } from "../CentralizedComponents/Card/Productcard";


import { useParams } from "react-router-dom";
import { handleCartChange, handleFavouriteChange, handleVisit } from "../common/commonMethods";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../store/action/product";
import { AppDispatch, RootState } from "../store/Store";

const ProductsCategory = () => {
   const dispatch=useDispatch<AppDispatch>()
  // const [isFavourite, setIsFavourite] = useState(false);
  // const [isAddedToCart, setIsAddedToCart] = useState(false);
   const products=useSelector((state:RootState)=> state.product.productList)
  const params = useParams();
  const categoryData = products.find((item) => item.category === params.title);
  console.log(categoryData);
useEffect(()=>{
  dispatch(getProductList())
},[dispatch])

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }} key={categoryData?.category}>
          <CentralizedCard
            title={categoryData?.category || ""}
            viewAll={false}
            viewBack={true}
            bodyContent={
              <Grid container spacing={3} alignItems="center">
                {/* Left Navigation Button */}

                {/* Swipeable Product View */}
                <Grid size={{ xs: 12 }}>
                  <Grid container spacing={2}>
                    {categoryData?.items.map((item:any) => (
                      <Grid size={{ xs: 3 }} key={item.id}>
                        <Productcard
                        categoryId={categoryData.categoryId}
                          handleVisit={handleVisit}
                          handleCartChange={handleCartChange}
                          handleFavouriteChange={handleFavouriteChange}
                          category={categoryData.category}
                          item={item}
                         
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsCategory;
