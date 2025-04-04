import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getOrderedProductList } from "../../store/action/product";
import paymentSuccess from "../../assets/animatedLogo/paymentSuccess.json";
import Lottie from "lottie-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}
interface PaymentMethodProps {
  status: string;
}

const PaymentMethod = ({ status }: PaymentMethodProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const userEmail = localStorage.getItem("userEmail");
  // const [orderConfirmed, setOrderConfirmed] = useState(false);
  const orderList = useSelector((state: RootState) => state?.product?.orders);

  const userOrder = orderList.find((item) => item.customerEmail === userEmail);
  console.log(userOrder);

  useEffect(() => {
    dispatch(getOrderedProductList());
  }, [dispatch]);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        {status === "success" ? (
          <>
            <Lottie
              animationData={paymentSuccess}
              loop={false}
              style={{ width: 100 }}
            />
            <Box sx={{ mt: 2, fontWeight: 600, color: "green" }}>
              Payment Successful!
            </Box>
          </>
        ) : (
          <>
            <Lottie
              animationData={paymentSuccess}
              loop={false}
              style={{ width: 250 }}
            />
            <Box sx={{ mt: 2, fontWeight: 600, color: "red" }}>
              Payment Failed!
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default PaymentMethod;
