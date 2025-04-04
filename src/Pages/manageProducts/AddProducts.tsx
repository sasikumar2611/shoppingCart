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
import { CentralizedCard } from "../../CentralizedComponents/Card/CentralizedCard";

import {
  ExpandMore,
  LocalShipping,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getOrderedProductList } from "../../store/action/product";
import { paymentTabStyle } from "../../common/commonStyle";
import ExistingProduct from "../ExistingCategory";
import NewCategory from "../NewCategory";

const TabPanel = ({ children, value, index }: any) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ p: "0 16px ", width: "100%", boxSizing: "border-box" }}
    >
      {value === index && <>{children}</>}
    </Box>
  );
};

const AddProducts = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  const data = [
    {
      icon: <ProductionQuantityLimits />,
      label: "Existing Category",
      children: <ExistingProduct />,
    },
    {
      label: "New Category",
      icon: <LocalShipping />,
      children: <NewCategory />,
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

  const color = useSelector((state: RootState) => state.product.color);


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
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={paymentTabStyle(color)}
              >
                {data.map((item, index) => (
                  <Tooltip title={item.label} placement="right" key={index}>
                    <Tab
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        
                      }}
                      // icon={item.icon}
                      label={item.label}
                      key={index}
                      // disabled={value !== index}
                    />
                  </Tooltip>
                ))}
              </Tabs>
              {data.map((item, index) => (
                <TabPanel value={value} index={index} key={index}>
                  {item.children}
                </TabPanel>
              ))}
            </Box>

            {/* Right Sidebar (30%) */}
            <Stack
              direction={"column"}
              width={"25%"}
              gap={1}
              sx={{
                // Ensure scroll instead of overlap
                flex: 1, // Prevents shrinking
              }}
            >
              {/* Accordion for Items */}
              <Accordion
                expanded={expanded}
                onChange={() => handleAccordionChange(!expanded)}
                sx={{ width: "100%" }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography component="span" sx={{ fontSize: "14px" }}>
                    Items x{orderedData.length}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {orderedData.map((item: any) => (
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      key={item.name}
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        {item.name}{" "}
                        <span style={{ fontSize: "12px" }}>
                          x{item.quantity}
                        </span>
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        <span style={{ fontSize: "12px" }}>&#8377;</span>{" "}
                        {item.price}
                      </Typography>
                    </Stack>
                  ))}
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

export default AddProducts;
