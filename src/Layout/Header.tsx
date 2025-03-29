import {
  FavoriteRounded,
  LocalGroceryStore,
  Search,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import ProfileDrawer from "../Profiledrawer/ProfileDrawer";
import { searchBarStyle } from "../common/commonStyle";
import { AppDispatch, RootState } from "../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { getCartList, getFavouriteList } from "../store/action/product";
import { toggleDrawer } from "../common/commonMethods";
const Header = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchProducts, setSearchProducts] = useState("");

  // const [preview, setPreview] = useState<string | null>(null);

  // const drawerOpen = useSelector(
  //   (state: RootState) => state.product.drawerOpen
  // );

  const isFavourite = useSelector(
    (state: RootState) => state.product.isFavourite
  );
  const isAddedToCart = useSelector(
    (state: RootState) => state.product.isAddedToCart
  );

  const favouriteList =
    useSelector((state: RootState) => state.product.favoriteList) || [];
  const cartList =
    useSelector((state: RootState) => state.product.cartList) || [];

  const [favListCount, setFavListCount] = useState(0);
  const [cartListCount, setCartListCount] = useState(0);

  useEffect(() => {
    setFavListCount(favouriteList.length);
    setCartListCount(cartList.length);
  }, [favouriteList, cartList]);

  useEffect(() => {
    if (isFavourite) {
      dispatch(getFavouriteList());
    }
    if (isAddedToCart) {
      dispatch(getCartList());
    }
  }, [
    isFavourite,
    isAddedToCart,
    dispatch,
    favouriteList.length,
    cartList.length,
  ]);

  return (
    <>
      <Box
        sx={{
          transition: "all 0.3s ease-in-out",
          position: "sticky",
          top: 20,
          zIndex: 100,
         
        
        }}
      >
        <Box
          sx={{
            backgroundColor: "#7d4dfa",
            padding: "15px",
            borderRadius: "15px",
            width: "100%",
            transition: "all 0.3s ease-in-out",
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
            }}
          >
            <TextField
              placeholder="Search Products..."
              value={searchProducts}
              onChange={(e) => {
                setSearchProducts(e.target.value);
              }}
              sx={searchBarStyle}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search
                        sx={{ fontSize: "28px !important", color: "white" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              onClick={() => dispatch(toggleDrawer(true, "favouriteList"))}
            >
              <Badge badgeContent={favListCount} color="primary">
                <FavoriteRounded sx={{ color: "white", fontSize: "24px" }} />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => dispatch(toggleDrawer(true, "cartList"))}
            >
              <Badge badgeContent={cartListCount} color="primary">
                <LocalGroceryStore sx={{ color: "white", fontSize: "24px" }} />
              </Badge>
            </IconButton>
            {/* <Avatar
              alt="Remy Sharp"
              src={`${preview}`}
              sx={{ width: 26, height: 26 }}
              onClick={toggleDrawer(true, "profile")}
            /> */}
          </Box>
        </Box>
      </Box>
      <ProfileDrawer />
    </>
  );
};
export default Header;
