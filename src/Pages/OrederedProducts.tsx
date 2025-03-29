import { Box, Divider, Stack, Typography } from "@mui/material";
import CenteralizeDataGrid from "../CentralizedComponents/table/CentralizedDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { CommonButton } from "../CentralizedComponents/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";
import { useEffect } from "react";
import { getOrderedProductList } from "../store/action/product";
import { useNavigate } from "react-router-dom";
import { toggleDrawer } from "../common/commonMethods";

const OrederedProducts = ({ setValue }: { setValue: React.Dispatch<React.SetStateAction<number>> }) => {
  const columns: GridColDef[] = [
    {
      field: "Si",
      headerName: "SI.No",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      minWidth: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <img
            src={params.row.image}
            alt=""
            style={{ width: "50px", height: "50px", objectFit: "contain" }}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "quantity",
      headerName: "Count",
      flex: 1,
      minWidth: 120,
      align: "left",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Typography
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            height={"100%"}
            sx={{ fontSize: "14px" }}
          >
            x{params.row.quantity}
          </Typography>
        );
      },
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Typography
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            height={"100%"}
            sx={{ fontSize: "14px" }}
          >
            <span style={{ fontSize: "14px" }}>&#8377; </span>
            {params.row.totalAmount}
          </Typography>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const orderedData = useSelector((state: RootState) => state?.product?.orders);
  console.log(orderedData);

  const finalAmount = useSelector(
    (state: RootState) => state?.product?.finalAmount
  );
  console.log(finalAmount);


  useEffect(() => {
    dispatch(getOrderedProductList());
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <CenteralizeDataGrid data={orderedData ?? []} columns={columns} />
      <Stack
        width={"100%"}
        height={"100px"}
        direction={"column"}
        gap={1}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
        }}
      >
        <Stack direction={"column"} width={"100%"} justifyContent={"center"}>
          <Divider />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              variant="h6"
              m={"10px 0"}
              sx={{ color: "black", fontSize: "16px" }}
            >
              {/* SubTotal({list?.length} Items): */}
              SubTotal( {orderedData?.length} Items):
            </Typography>
            <Typography
              variant="h6"
              m={"10px 0"}
              sx={{ color: "black", fontSize: "14px" }}
            >
              <span style={{ fontSize: "12px" }}>&#8377; </span>{" "}
              {finalAmount.toFixed(2)}
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
              label="Back to Cart"
              sx={{ color: "#7d4dfa", backgroundColor: "transparent" }}
              onClick={() => {
                navigate(-1);
                dispatch(toggleDrawer(true, "cartList"));
              }}
            />
            <CommonButton
              label="Confirm Products"
              onClick={() => setValue((prev) => prev + 1)}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrederedProducts;
