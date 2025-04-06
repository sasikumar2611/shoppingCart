import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getOrderedProductList } from "../../store/action/product";
import paymentSuccess from "../../assets/animatedLogo/paymentSuccess.json";
import paymentFailed from "../../assets/animatedLogo/paymentFailed.json";
import Lottie from "lottie-react";
import { CommonButton } from "../../CentralizedComponents/button/commonButton";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any;
  }
}
interface PaymentMethodProps {
  status: string;
}

const PaymentMethod = ({ status }: PaymentMethodProps) => {
  const navigate =useNavigate()
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
        width={'100%'}
        height={"100%"}
      >
        {status === "success" ? (
          <>
            <Stack direction={'column'} width={'100%'} height={'100%'} gap={10} alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'column'} width={'100%'}  gap={1} alignItems={'center'} justifyContent={'center'}>

              <Lottie
                animationData={paymentSuccess}
                loop={false}
                style={{ width: 100 }}
              />
              <Typography sx={{ fontWeight: 600, color: "green" }}>
                Payment Successful!
              </Typography>
              </Stack>
              <Stack direction={'row'} width={'100%'} justifyContent={'space-around'}>
<CommonButton label='Back to Products' onClick={()=> {navigate('/Pages/Products')}}/>
<CommonButton label='View Order' onClick={()=> {navigate('/Pages/yourOrder')}}/>
              </Stack>
            </Stack>
          </>
        ) : (
          <>
            <Stack direction={'column'} gap={1}
            alignItems={'center'} justifyContent={'center'}>

              <Lottie
                animationData={paymentFailed}
                loop={false}
                style={{ width: 100 }}
              />
              <Typography sx={{ fontWeight: 600, color: "red" }}>
                Payment Failed!
              </Typography>
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default PaymentMethod;
