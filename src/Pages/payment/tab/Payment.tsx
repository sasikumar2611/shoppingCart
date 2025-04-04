import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { CentralizedCard } from "../../../CentralizedComponents/Card/CentralizedCard";
import OrederedProducts from "../OrederedProducts";
import ShippingDetails from "../ShippingDetails";
import PaymentMethod from "../PaymentMethod";
import {
  ExpandMore,
  LocalShipping,
  Payment,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { getOrderedProductList } from "../../../store/action/product";
import { paymentTabStyle } from "../../../common/commonStyle";
import { CommonButton } from "../../../CentralizedComponents/button/commonButton";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const TabPanel = ({ children, value, index }: any) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{
        p: "0 16px ",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {value === index && <>{children}</>}
    </Box>
  );
};

const PaymentPage = () => {
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("");

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  const data = [
    {
      icon: <ProductionQuantityLimits />,
      label: "Ordered Products",
      children: <OrederedProducts setValue={setValue} />,
    },
    {
      label: "Shipping Details",
      icon: <LocalShipping />,
      children: <ShippingDetails setValue={setValue} />,
    },
    {
      icon: <Payment />,
      label: "Payment",
      children: <PaymentMethod status={status} />,
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel: boolean) => {
    setExpanded(panel);
  };
  const dispatch = useDispatch<AppDispatch>();
  const confirmOrder = useSelector(
    (state: RootState) => state?.product?.confirmOrder
  );

  const color = useSelector((state: RootState) => state.product.color);

  const userEmail = localStorage.getItem("userEmail");

  const orderList = useSelector((state: RootState) => state?.product?.orders);

  const userOrder = orderList.find((item) => item.customerEmail === userEmail);

  console.log(userOrder);

  const handlePayment = () => {
    if (!userOrder) return;
    // setValue((prev) => prev + 1);
    const options = {
      key: "rzp_live_qFPlkpifkyhh22",
      key_secret: "r7dNauZ24rIlUFiZs0oZGovr",
      amount: 1 * 100,
      currency: "INR",
      name: "Amazon",
      description: "Order Payment",
      handler: (response: any) => {
        console.log("Payment Success:", response);
        alert("Payment ID: " + response?.razorpay_payment_id);
        setValue((prev) => prev + 1);
        setStatus("success");


      },
      prefill: {
        name: userOrder?.customerName,
        email: userOrder?.customerEmail,
        contact: userOrder?.customerMobileNumber,
      },
      notes: {
        address: userOrder?.customerAddress,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          console.log("Payment cancelled or failed");
          setStatus("failed");
        },
      },
    };
    console.log(options);

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  useEffect(() => {
    dispatch(getOrderedProductList());
  }, [dispatch]);

  return (
    <Grid size={{ xs: 12 }} sx={{ height: "100%", width: "100%" }}>
      <CentralizedCard
        title={"Payment & Delivery"}
        viewAll={false}
        viewBack={true}
        bodyContent={
          <Stack direction={"row"} width={"100%"} height={"100%"}>
            {/* Left Content (70%) */}
            <Box
              sx={{
                boxSizing: "border-box",
                display: "flex",
                width: "75%",
                height: "100%",
              }}
            >
              <Box
                sx={{ width: "10%", boxSizing: "border-box", height: "100%" }}
              >
                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  sx={paymentTabStyle(color)}
                >
                  {data.map((item, index) => (
                    <Tooltip title={item.label} placement="right" key={index}>
                      <Tab
                        sx={{
                          padding: 0,
                          display: "flex",
                          justifyContent: "center",
                          
                        }}
                        icon={item.icon}
                        key={index}
                        // disabled={value !== index}
                      />
                    </Tooltip>
                  ))}
                </Tabs>
              </Box>
              <Box
                sx={{ width: "90%", boxSizing: "border-box", height: "100%" }}
              >
                {data.map((item, index) => (
                  <TabPanel value={value} index={index} key={index}>
                    {item.children}
                  </TabPanel>
                ))}
              </Box>
            </Box>

            {/* Right Sidebar (30%) */}
            <Stack direction={"column"} width={"25%"} gap={2}>
              {/* Accordion for Items */}
              <Accordion
                expanded={expanded}
                onChange={() => handleAccordionChange(!expanded)}
                sx={{ width: "100%" }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography component="span" sx={{ fontSize: "14px" }}>
                    Items x{userOrder?.customerProducts?.length}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction={"column"} gap={1}>
                    {userOrder?.customerProducts?.map((item: any) => (
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        key={item.name}
                      >
                        <Typography sx={{ fontSize: "14px" }}>
                          {item.name}{" "}
                          <span style={{ fontSize: "12px" }}>
                            &nbsp;&nbsp;x{item.quantity}
                          </span>
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          <span style={{ fontSize: "12px" }}>&#8377;</span>{" "}
                          {item.price}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Order Total */}
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                padding={"0px 16px"}
              >
                <Typography sx={{ fontSize: "14px" }}> Order Total </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  <span style={{ fontSize: "12px" }}>&#8377;</span>{" "}
                  {userOrder?.orderTotalAmount.toFixed(2)}
                </Typography>
              </Stack>
              {confirmOrder && (
                <CommonButton label="Confirm Order" onClick={handlePayment} />
              )}
            </Stack>
          </Stack>
        }
      />
    </Grid>
  );
};

export default PaymentPage;
