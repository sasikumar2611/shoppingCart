import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { CentralizedCard } from "../../CentralizedComponents/Card/CentralizedCard";
import { Productcard } from "../../CentralizedComponents/Card/Productcard";
import { v4 as uuidv4 } from "uuid";
import {
  handleCartChange,
  handleFavouriteChange,
  handleVisit,
} from "../../common/commonMethods";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getProductList } from "../../store/action/product";
import { CustomCard } from "../../CentralizedComponents/Card/CustomCard";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cardsPerView = 4; // Show only 4 items at a time
  const products = useSelector((state: RootState) => state.product.productList);

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Stack
            width={"100%"}
            direction="row"
            spacing={2}
            sx={{
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              boxSizing: "border-box",
              scrollbarWidth: "none", // Hide scrollbar for Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Hide scrollbar for Chrome, Safari, Edge
              },
            }}
          >
            {products?.map((product) => (
              <Box
                key={`${product.id}-${product.category}-${uuidv4()}`}
                             >
                <CustomCard
                  sx={{ boxShadow:'none' }}
                  bodyContent={
                    <Typography sx={{ fontSize: "12px" }}>
                      {product.category}
                    </Typography>
                  }
                  onClick={() => navigate(`/Pages/${product.category}`)}
                />
              </Box>
            ))}
          </Stack>
        </Grid>

        {products.map((product) => (
          <Grid
            size={{ xs: 12 }}
            key={`${product.id}-${product.category}-${uuidv4()}`}
          >
            <CentralizedCard
              title={product.category}
              bodyContent={
                <Grid container spacing={2} alignItems="center">
                  {product.items.slice(0, cardsPerView).map((item: any) => (
                    <Grid
                      size={{ xs: 12, sm: 6, md: 3 }}
                      key={`${product.id}-${product.category}-${uuidv4()}`}
                    >
                      <Productcard
                        categoryId={product.id}
                        category={product.category}
                        handleVisit={handleVisit}
                        handleCartChange={handleCartChange}
                        handleFavouriteChange={handleFavouriteChange}
                        item={item}
                      />
                    </Grid>
                  ))}
                </Grid>
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllProducts;
