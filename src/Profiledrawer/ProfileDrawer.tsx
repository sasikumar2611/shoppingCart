import {
  Add,
  Close,
  Dangerous,
  Delete,
  DeleteOutlined,
  Remove,
} from "@mui/icons-material";
import { Drawer, Box, Typography, Stack, Rating, Divider } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CommonIconButton from "../CentralizedComponents/button/CommonIconButton";
import { AppDispatch, RootState } from "../store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  handleBuy,
  handleCartChange,
  handleColorChange,
  handleDelete,
  toggleDrawer,
} from "../common/commonMethods";
import {
  getCartList,
  getFavouriteList,
  getSignedUpUser,
} from "../store/action/product";
import noImage from "../assets/no image.jpg";
import { CommonButton } from "../CentralizedComponents/button/commonButton";
import { setAmount } from "../store/store/productData";
import { useNavigate } from "react-router-dom";

interface ProfileDrawerProps {
  save?: boolean;
  setPreview?: (preview: string | null) => void;
  handleUpdateImage: (type: "save" | "delete") => void;
  preview?: string | null;
  handleImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const colorsData = [
  { color: "#7d4dfa" },
  { color: "#3366ff" },
  { color: "#3c64d0" },
  { color: "#2aa1af" },
  { color: "#009688" },
];

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  setPreview,
  save,
  handleUpdateImage,
  preview,
  handleImageChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const userObj = useSelector((state: RootState) => state.product.user);
  console.log(userObj);

  const drawerOpen = useSelector(
    (state: RootState) => state.product.drawerOpen
  );

  const favouriteList =
    useSelector((state: RootState) => state.product.favoriteList) || [];

  const validFavourites = favouriteList.filter(
    (item) => item && typeof item === "object"
  );

  const cartList =
    useSelector((state: RootState) => state.product.cartList) || [];

  const isFavourite = useSelector(
    (state: RootState) => state.product.isFavourite
  );

  const amount = useSelector((state: RootState) => state.product.amount);

  const color = useSelector(
    (state: RootState) => state.product.color
  );

  const isFavDelete = useSelector(
    (state: RootState) => state.product.deleteAddedToCart
  );

  const isCartDelete = useSelector(
    (state: RootState) => state.product.deleteFavourite
  );

  const listBoxHeight = drawerOpen.list === "favouriteList" ? "100%" : "70vh";

  const list =
    drawerOpen.list === "favouriteList"
      ? validFavourites
      : drawerOpen.list === "cartList"
      ? cartList
      : [];

  const [price, setPrice] = useState<{ [key: string]: number }>({});

  const increaseRating = (id: string, category: string) => {
    setPrice((prev) => ({
      ...prev,
      [`${category}/${id}`]: (prev[`${category}/${id}`] ?? 1) + 1,
    }));
  };

  const decreaseRating = (id: string, category: string) => {
    setPrice((prev) => ({
      ...prev,
      [`${category}/${id}`]: Math.max((prev[`${category}/${id}`] ?? 1) - 1, 1),
    }));
  };

  const payload = {
    customerEmail: userObj?.Email,
    orderTotalAmount: amount,
    paymentStatus: "Pending",
    orderDate: dayjs().format("YYYY-MM-DD"),
    customerProducts: list.map((item) => ({
      ...item,
      productId: item.id,
      quantity: price[`${item.category}/${item.id}`] || 1,
      totalAmount:
        Number(item.price) * price[`${item.category}/${item.id}`] || 1,
    })),
  };

  console.log(payload);

  useEffect(() => {
    if (list.length > 0) {
      const initialPrices = list.reduce((acc, item) => {
        acc[`${item.category}/${item.id}`] = 1;
        return acc;
      }, {} as { [key: string]: number });

      setPrice(initialPrices);
    }
  }, [list]);

  useEffect(() => {
    if (drawerOpen.list === "cartList") {
      const total = list.reduce((sum, item) => {
        const quantity = price[`${item?.category}/${item?.id}`] ?? 1;
        return sum + quantity * (item.price || 0);
      }, 0);

      dispatch(setAmount(total));
    }
  }, [list, price, drawerOpen.list, dispatch]);

  useEffect(() => {
    if (drawerOpen.list === "favouriteList" || isFavDelete) {
      dispatch(getFavouriteList());
    }
    if (drawerOpen.list === "cartList" || isCartDelete) {
      dispatch(getCartList());
    }
  }, [dispatch, isFavDelete, isCartDelete]);

  useEffect(() => {
    dispatch(getSignedUpUser());
  }, []);

  return (
    <Drawer
      anchor="right"
      open={drawerOpen.open}
      onClose={() => dispatch(toggleDrawer(false, ""))}
      sx={{
        "& .MuiDrawer-paper": {
          width: { md: "400px", sm: "400px", xs: "100%" },
          backgroundColor: "#fff",
          color: "white",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          height: "100%",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex" flexDirection="column" gap={1} height={"100%"}>
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <CommonIconButton
              color="error"
              size="small"
              sx={{ padding: 0 }}
              onClick={() => dispatch(toggleDrawer(false, ""))}
              icon={<Close />}
            />
          </Stack>
          {(drawerOpen.list === "favouriteList" ||
            drawerOpen.list === "cartList") && (
            <Stack direction={"column"}>
              <Typography gutterBottom variant="h5" sx={{ color: "black" }}>
                {drawerOpen.list === "favouriteList"
                  ? "Favourite List"
                  : drawerOpen.list === "cartList"
                  ? "Cart List"
                  : ""}
              </Typography>
              <Divider />
            </Stack>
          )}
          {(drawerOpen.list === "favouriteList" ||
            drawerOpen.list === "cartList") && (
            <Stack
              height={listBoxHeight}
              sx={{ overflowY: "auto" }}
              direction={"column"}
              gap={2}
            >
              {list &&
                list?.map((item: any) => {
                  const key = `${item.category}/${item.id}`;
                  const quantity = price[key] ?? 1;
                  const totalPrice = quantity * (item?.price || 0);
                  return (
                    <Stack
                      width="100%"
                      height="140px"
                      key={key}
                      direction={"column"}
                      gap={2}
                    >
                      <Box
                        width="100%"
                        height="100%"
                        sx={{ display: "flex", gap: 2 }}
                      >
                        <Box width="35%" height="100%">
                          <img
                            src={item?.image || noImage}
                            alt={item?.name || "Product Image"}
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
                        <Box width="65%" height="100%">
                          <Stack>
                            <Typography variant="h6" sx={{ color: "black" }}>
                              {item?.name || "Unnamed Product"}
                            </Typography>

                            {drawerOpen.list === "favouriteList" && (
                              <Stack direction={"column"}>
                                <Rating
                                  name="read-only"
                                  value={item.rating}
                                  readOnly
                                />
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  <span style={{ fontSize: "12px" }}>
                                    &#8377;{" "}
                                  </span>{" "}
                                  {totalPrice.toFixed(2)}
                                </Typography>
                              </Stack>
                            )}

                            {drawerOpen.list === "cartList" && (
                              <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Stack
                                  direction={"row"}
                                  gap={1}
                                  alignItems={"center"}
                                >
                                  <CommonIconButton
                                    size="small"
                                    onClick={() =>
                                      decreaseRating(item.id, item.category)
                                    }
                                    icon={<Remove />}
                                  />

                                  <Typography
                                    sx={{ fontSize: "14px", color: "black" }}
                                  >
                                    {quantity}
                                  </Typography>
                                  <CommonIconButton
                                    size="small"
                                    onClick={() =>
                                      increaseRating(item.id, item.category)
                                    }
                                    icon={<Add />}
                                  />
                                </Stack>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  <span style={{ fontSize: "12px" }}>
                                    &#8377;{" "}
                                  </span>{" "}
                                  {Number(item.price).toFixed(2)} x{quantity}
                                </Typography>
                              </Stack>
                            )}

                            <Stack direction={"row"} gap={1}>
                              {drawerOpen.list === "favouriteList" && (
                                <CommonButton
                                  label="Add to Cart"
                                  onClick={() => {
                                    handleCartChange({
                                      item,
                                      category: item.category,
                                      categoryId: item.categoryId,
                                      dispatch,
                                    });
                                  }}
                                />
                              )}
                              <CommonIconButton
                                tooltipTitle="Delete product"
                                isFavourite={isFavourite}
                                icon={<DeleteOutlined />}
                                checkedIcon={<Delete />}
                                onClick={() =>
                                  handleDelete(item, drawerOpen.list, dispatch)
                                }
                              />
                            </Stack>
                          </Stack>
                        </Box>
                      </Box>
                      <Divider />
                    </Stack>
                  );
                })}
            </Stack>
          )}
          {drawerOpen.list === "cartList" && (
            <Stack
              width={"100%"}
              height={"100px"}
              direction={"column"}
              gap={1}
              sx={{ position: "sticky", top: 0, backgroundColor: "white" }}
            >
              <Stack
                direction={"column"}
                width={"100%"}
                justifyContent={"center"}
              >
                <Divider />
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    variant="h6"
                    m={"10px 0"}
                    sx={{ color: "black", fontSize: "16px" }}
                  >
                    SubTotal({list?.length} Items):
                  </Typography>
                  <Typography
                    variant="h6"
                    m={"10px 0"}
                    sx={{ color: "black", fontSize: "14px" }}
                  >
                    <span style={{ fontSize: "12px" }}>&#8377; </span>{" "}
                    {amount.toFixed(2)}
                  </Typography>
                </Stack>
                <Divider />
              </Stack>

              <Stack direction={"column"} justifyContent={"center"}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <CommonButton
                    label="Cancel"
                    sx={{ color: "#7d4dfa", backgroundColor: "transparent" }}
                    onClick={() => {}}
                  />
                  <CommonButton
                    label="Proceed to Buy"
                    onClick={() => {
                      dispatch(toggleDrawer(false, ""));
                      handleBuy(payload, navigate, dispatch);
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          )}

          {drawerOpen.list === "profile" && (
            <Box display="flex" flexDirection="column" alignItems="center">
              {preview ? (
                <Box position="relative">
                  <Box
                    component="img"
                    src={preview}
                    alt="Preview"
                    sx={{
                      width: "100%",
                      height: "300px",
                      borderRadius: "15px",
                      objectFit: "cover",
                      mb: 1,
                    }}
                  />
                  <CommonIconButton
                    color="error"
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    icon={<Dangerous />}
                    disabled={!save && !!preview}
                    onClick={() => setPreview?.(null)}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "15px",

                    border: "1px dashed #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    Upload your image
                  </Typography>
                </Box>
              )}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{ width: "100%" }}
              >
                <CommonButton
                  sx={{ width: "50%" }}
                  disabled={!save && !!preview}
                  label="Upload Image"
                  type="file"
                  onChange={handleImageChange}
                />

                <CommonButton
                  sx={{ width: "50%" }}
                  disabled={!save && !preview}
                  label={save ? "Save" : preview && !save ? "Delete" : "Save"}
                  onClick={() =>
                    save
                      ? handleUpdateImage("save")
                      : handleUpdateImage("delete")
                  }
                />
              </Box>
            </Box>
          )}
          {drawerOpen.list === "settings" && (
            <Stack display="flex" flexDirection="column" gap={1}>
              <Typography gutterBottom variant="h6" sx={{ color: "black" }}>
                Change Color
              </Typography>
              <Stack
                direction={"row"}
                sx={{
                  border: "1px solid #bbb",
                  borderRadius: "10px",
                  padding: "5px",
                }}
                height={"100px"}
                gap={1}
              >
                {colorsData.map((item) => (
                  <CommonButton
                    onClick={() => {
                      dispatch(handleColorChange(item.color));
                    }}
                    key={item.color}
                    disabled={color == item.color}
                    sx={{
                      flex: 1,
                      height: "100%",
                      backgroundColor: item.color,
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
export default ProfileDrawer;
