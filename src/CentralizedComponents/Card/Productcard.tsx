import React from "react";
import Card from "@mui/material/Card";
import {
  Box,
  Button,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import noImage from "../../assets/no image.jpg";
import {
  Favorite,
  FavoriteBorder,
  RemoveRedEye,
  ShoppingCartCheckout,
  Visibility,
} from "@mui/icons-material";
import { btnstyle } from "../../common/commonStyle";
import { useNavigate } from "react-router-dom";
import CommonIconButton from "../button/CommonIconButton";
import { useDispatch } from "react-redux";

interface Product {
  id: number;
  image: string;
  name: string;
  rating: number;
  price: string;
}

interface CardComponentProps {
  item: Product;
  // isFavourite: boolean;
  // setIsFavourite: any;
  // isAddedToCart: boolean;
  // setIsAddedToCart: any;
  categoryId: number;
  category: string;
  handleVisit?: any;
  handleFavouriteChange?: any;
  handleCartChange?: any;
}
export const Productcard: React.FC<CardComponentProps> = ({
  item,
  category,
  handleVisit,
  categoryId,
  handleCartChange,
  handleFavouriteChange,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box sx={{ position: "relative" }}>
      <Card
        sx={{
          width: "100%",
          borderRadius: "15px",
          padding: "10px",
          boxshadow: 2,
          m: "10px 0px",
        }}
      >
        <CardContent sx={{ padding: "0px   !important" }}>
          <Stack direction={"column"}>
            <img
              src={item?.image || noImage}
              alt={item?.name}
              style={{ width: "100%", height: "200px", objectFit: "contain" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; 
                target.src = noImage;
              }}
            />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "black", fontSize: "14px" }}>
                {item?.name}
              </Typography>

              <CommonIconButton
                checkedIcon={<RemoveRedEye />}
                tooltipTitle="View Product"
                icon={<Visibility />}
                onClick={() =>
                  handleVisit({ item, category, categoryId, navigate })
                }
              />
            </Stack>
            <Stack
              direction={"row"}
              gap={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Rating name="read-only" value={item.rating} readOnly />
              <Box sx={{ display: "flex", gap: 1 }}>
                <CommonIconButton
                  icon={<FavoriteBorder />}
                  tooltipTitle="Add to Favourites"
                  color="error"
                  checkedIcon={<Favorite />}
                  onClick={() =>
                    handleFavouriteChange({
                      item,
                      category,
                      categoryId,
                      dispatch,
                    })
                  }
                />
                <CommonIconButton
                  icon={<ShoppingCartCheckout />}
                  tooltipTitle="Add to Cart"
                  checkedIcon={<ShoppingCartCheckout />}
                  onClick={() =>
                    handleCartChange({ item, category, categoryId, dispatch })
                  }
                />
              </Box>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "black", fontSize: "16px" }}>
                <span style={{ fontSize: "14px" }}>&#8377; </span> {item.price}
              </Typography>
              <Button sx={btnstyle} onClick={() => {}}>
                Buy Now
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
