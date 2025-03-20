import { Box, Divider, Rating, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Favorite,
  FavoriteBorder,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CustomCard } from "../CentralizedComponents/Card/CustomCard";
import { CommonButton } from "../CentralizedComponents/button/commonButton";
import CommonIconButton from "../CentralizedComponents/button/CommonIconButton";
import { handleCartChange, handleFavouriteChange } from "../common/commonMethods";

const ViewProduct = () => {
  //   const categoryData = products.find((item) => item.category === params.title);
  //   console.log(categoryData);
  const navigate = useNavigate();
  const [isFavourite, _setIsFavourite] = useState(false);
  const [isAddedToCart, _setIsAddedToCart] = useState(false);
  

  const handleNavigate = () => {
    navigate(-1);
  };
  const handleBuy = () => {};

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid size={{ xs: 12 }} sx={{ flex: 1 }}>
          <CustomCard
            bodyContent={
              <Grid
                container
                spacing={3}
                alignItems="center"
                sx={{ height: "100%" }}
              >
                <Grid size={{ xs: 6 }} sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }} sx={{ height: "100%" }}>
                  <Grid container spacing={2} sx={{ height: "100%" }}>
                    <Grid size={{ xs: 7 }}>
                      <Stack direction={"column"} gap={1}>
                        <Typography sx={{ fontSize: "30px" }}>Title</Typography>
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                          <Rating
                            name="read-only"
                            value={4.5}
                            readOnly
                            precision={0.5}
                          />
                          <Typography sx={{ fontSize: "14px" }}>
                            (4.5)
                          </Typography>
                        </Stack>
                        <Divider />
                        <Typography sx={{ fontSize: "22px" }}>
                          <span style={{ fontSize: "16px" }}>&#8377; </span>
                          Description
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 5 }} sx={{ height: "100%" }}>
                      <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        sx={{ height: "100%" }}
                      >
                        <Stack direction={"column"} gap={1}>
                          <Typography sx={{ fontSize: "22px" }}>
                            <span style={{ fontSize: "16px" }}>&#8377; </span>
                            Description
                          </Typography>
                          <Stack direction={"row"} gap={2}>
                            <CommonIconButton
                              isFavourite={isFavourite}
                              icon={<FavoriteBorder />}
                              tooltipTitle="Add to Favourites"
                              color="error"
                              checkedIcon={<Favorite />}
                              onClick={handleFavouriteChange}
                            />
                            <CommonIconButton
                              isFavourite={isAddedToCart}
                              icon={<ShoppingCartCheckout />}
                              tooltipTitle="Add to Cart"
                              checkedIcon={<ShoppingCartCheckout />}
                              onClick={handleCartChange}
                            />
                          </Stack>

                          <CommonButton label="Buy Now" onClick={handleBuy} />
                        </Stack>
                        <Stack>
                          <CommonButton label="Back" onClick={handleNavigate} />
                        </Stack>
                      </Stack>
                    </Grid>
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

export default ViewProduct;
