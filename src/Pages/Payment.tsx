import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { CentralizedCard } from "../CentralizedComponents/Card/CentralizedCard";
import OrederedProducts from "./OrederedProducts";
import ShippingDetails from "./ShippingDetails";
import PaymentMethod from "./PaymentMethod";
import { ExpandMore } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";
import { getOrderedProductList } from "../store/action/product";

const TabPanel = ({ children, value, index }: any) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ p: "0 16px ", width: "100%" }}
    >
      {value === index && <>{children}</>}
    </Box>
  );
};

const PaymentPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  const data = [
    {
      label: "Ordered Products",
      children: <OrederedProducts setValue={setValue} />,
    },
    {
      label: "Shipping Details",
      children: <ShippingDetails setValue={setValue} />,
    },
    {
      label: "Payment",
      children: <PaymentMethod  />,
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel: boolean) => {
    setExpanded(panel);
  };
  const dispatch = useDispatch<AppDispatch>();
  const orderedData = useSelector((state: RootState) => state?.product?.orders);

  const finalAmount = useSelector(
    (state: RootState) => state?.product?.finalAmount
  );


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
            <Stack direction={"row"} width={"80%"} height={"100%"}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, width: "300px", borderColor: "divider" }}
              >
                {data.map((item, index) => (
                  <Tab
                    sx={{ textTransform: "capitalize" }}
                    label={item.label}
                    key={index}
                    disabled={value !== index}
                  />
                ))}
              </Tabs>
              {data.map((item, index) => (
                <TabPanel value={value} index={index} key={index}>
                  {item.children}
                </TabPanel>
              ))}
            </Stack>
            <Stack direction={"column"} width={"20%"} gap={1}>
              <Accordion
                expanded={expanded}
                onChange={() => handleAccordionChange(!expanded)}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography component="span" sx={{ fontSize: "14px" }}>
                    Items x{orderedData.length}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {orderedData.map((item: any) => (
                    <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography sx={{ fontSize: "14px" }}>
                      {item.name} <span style={{ fontSize: "12px" }}>x{item.quantity}</span>
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      <span style={{ fontSize: "12px" }}>&#8377;</span>{" "}
                      {item.price}
                    </Typography>
                  </Stack>
                  ))}
                  
                </AccordionDetails>
              </Accordion>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                padding={"0px 16px"}
              >
                <Typography sx={{ fontSize: "14px" }}> Order Total </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  <span style={{ fontSize: "12px" }}>&#8377;</span>{" "}
                  {finalAmount}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        }
      />
    </Grid>
  );
};

export default PaymentPage;
