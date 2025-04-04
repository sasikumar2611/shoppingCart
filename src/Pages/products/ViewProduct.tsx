import { Box, Divider, Rating, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Favorite,
  FavoriteBorder,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { CustomCard } from "../../CentralizedComponents/Card/CustomCard";
import { CommonButton } from "../../CentralizedComponents/button/commonButton";
import CommonIconButton from "../../CentralizedComponents/button/CommonIconButton";
import noImage from "../../assets/no image.jpg";
import {
  handleCartChange,
  handleFavouriteChange,
} from "../../common/commonMethods";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getProductList } from "../../store/action/product";

const ViewProduct = () => {
  const navigate = useNavigate();
  const [isFavourite, _setIsFavourite] = useState(false);
  const [isAddedToCart, _setIsAddedToCart] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const products = useSelector((state: RootState) =>
    state.product.productList.find((item) => item.category === params.category)
  );


  const product = products?.items.find(
    (item: any) => item.id === Number(params.id)
  );


  const handleNavigate = () => {
    navigate(-1);
  };
  const handleBuy = () => {};
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%", 
        display: "flex",
        flex: 1,
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
                      flex: 1,
                      width: "100%",
                      height: "500px",
                    }}
                  >
                    <img
                      src={product?.image || noImage}
                      alt={product?.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = noImage;
                      }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }} sx={{ height: "100%" }}>
                  <Grid container spacing={2} sx={{ height: "100%" }}>
                    <Grid size={{ xs: 7 }}>
                      <Stack direction={"column"} gap={1}>
                        <Typography sx={{ fontSize: "30px" }}>
                          {product?.name}
                        </Typography>
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                          <Rating
                            name="read-only"
                            value={product?.rating}
                            readOnly
                            precision={0.5}
                          />
                          <Typography sx={{ fontSize: "14px" }}>
                            {product?.rating}
                          </Typography>
                        </Stack>
                        <Divider />
                        <Typography sx={{ fontSize: "22px" }}>
                          <span style={{ fontSize: "14px" }}>&#8377; </span>
                          {product?.price}
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
                            {product?.price}
                          </Typography>
                          <Stack direction={"row"} gap={2}>
                            <CommonIconButton
                              isFavourite={isFavourite}
                              icon={<FavoriteBorder />}
                              tooltipTitle="Add to Favourites"
                              color="error"
                              checkedIcon={<Favorite />}
                              onClick={() =>
                                handleFavouriteChange({
                                  item: product,
                                  category: products?.category,
                                  categoryId: products?.id,
                                  dispatch,
                                })
                              }
                            />
                            <CommonIconButton
                              isFavourite={isAddedToCart}
                              icon={<ShoppingCartCheckout />}
                              tooltipTitle="Add to Cart"
                              checkedIcon={<ShoppingCartCheckout />}
                              onClick={() =>
                                handleCartChange({
                                  item: product,
                                  category: products?.category,
                                  categoryId: products?.id,
                                  dispatch,
                                })
                              }
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
