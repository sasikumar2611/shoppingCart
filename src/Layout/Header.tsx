import {
  FavoriteRounded,
  ListAlt,
  LocalGroceryStore,
  Logout,
  Search,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import ProfileDrawer from "../Profiledrawer/ProfileDrawer";
import { searchBarStyle } from "../common/commonStyle";
import { AppDispatch, RootState } from "../store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartList,
  getFavouriteList,
  getSignedUpUser,
  updateImage,
} from "../store/action/product";
import { toggleDrawer } from "../common/commonMethods";
import { useNavigate } from "react-router-dom";
const Header = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchProducts, setSearchProducts] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [save, setSave] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userObj = useSelector((state: RootState) => state.product.user);
  console.log(userObj);

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
 
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPreview(event.target.result as string);
        }
        setSave(true);
      };
      reader.readAsDataURL(file); 
    }
  };
  // const handledeleteImage = async () => {
  //   const payload = {
  //     ...userObj,
  //     Image: "",
  //   };
  //   try {
  //     await axios.put(`${UserList_API_URL}/${userData.id}`, payload);
  //     setSave(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setPreview("");
  // };
  const handleUpdateImage = async (type: string) => {
    const payload = {
      ...userObj,
      Image: preview,
    };
    try {
      const response = await updateImage(payload, type);
      if (type === "save" && response?.status === 200) {
        setSave(false);
      }
      if (type === "delete" && response?.status === 200) {
        setSave(false);
        setPreview?.(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const [preview, setPreview] = useState<string | null>(null);

  // const drawerOpen = useSelector(
  //   (state: RootState) => state.product.drawerOpen
  // );
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuData = [
    {
      icon: <Avatar src={userObj?.Image} sx={{ marginRight: 2 }} />,
      text: "Profile",
      value: "profile",
      
      func: () => {
        dispatch(toggleDrawer(true, "profile"));
        handleClose();
      },
    },
    {
      icon: <ListAlt sx={{ marginRight: 2 }} />,
      text: "Order History",
      value: "orderHistory",

      func: () => navigate("/Pages/OrderHistory"),
    },
    {
      icon: <Settings sx={{ marginRight: 2 }} />,
      text: "Settings",
      value: "settings",

      func: () => navigate("/Pages/Settings"),
    },
    {
      icon: <Logout sx={{ marginRight: 2 }} />,
      text: "Sign Out",
      value: "logout",

      func: () => navigate("/"),
    },
  ];

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
    dispatch(getSignedUpUser());
  }, [
    isFavourite,
    isAddedToCart,
    dispatch,
    favouriteList.length,
    cartList.length,
    preview,save
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

            <Avatar
              alt="Remy Sharp"
              src={userObj?.Image}
              sx={{ width: 26, height: 26 }}
              onClick={handleClick}
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 7,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {menuData.map((item, index) => (
                <MenuItem key={index} onClick={item.func}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Box>
      <ProfileDrawer
        preview={preview}
        setPreview={setPreview}
        handleImageChange={handleImageChange}
        save={save}
        handleUpdateImage={handleUpdateImage}
      />
    </>
  );
};
export default Header;
