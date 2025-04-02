import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import CentralizedTextInput from "../CentralizedComponents/inputs/CentralizedTextInput";
import Grid from "@mui/material/Grid2";
import CentralizedTextArea from "../CentralizedComponents/inputs/CentralizedTextArea";
import { CommonButton } from "../CentralizedComponents/button/commonButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";
import { getSignedUpUser } from "../store/action/product";

interface ShippingDetailsProps {
  Name: string;
  mobileNumber: string;
  email: string;

  city: string;
  zipCode: string;
  state: string;

  address: string;
}

const ShippingDetails = ({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
const dispatch =useDispatch<AppDispatch>()
 const userObj = useSelector((state: RootState) => state.product.user);
  console.log(userObj);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingDetailsProps>({
    defaultValues: {
      Name: userObj?.Username,
      mobileNumber: "",
      email: userObj?.Email,
      city: "",
      zipCode: "",
      state: "",
      address: "",
    },
  });



  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    //     try{
    //     const payload = {
    //       employeeCode: data.employeeCode,
    //       password: data.password,
    //     }
    //    const response= login(payload);
    // console.log(response);
    // // const token = response.data.accessToken;
    // // const refreshToken = response.data.refreshToken;
    // // console.log(token);
    // // console.log(refreshToken);
    // // localStorage.setItem("token", token);
    // // localStorage.setItem("refreshToken", refreshToken);
    // // const userId = jwtDecode(token);
    // // console.log(userId);
    // // localStorage.setItem("userId", userId["id"]);

    // navigate("/pages/managerProjects");
    // } catch (error) {
    //   console.error("Login error:", error);
    // }
  };

  useEffect(()=>{
    dispatch(getSignedUpUser());
  },[])
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(80vh - 100px)", // Ensures scrolling within page
        overflowY: "auto", // Enables scrolling when overflowing
       
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Grid container spacing={2}>
              <CentralizedTextInput
                label="Name"
                {...register("Name", {
                  required: "Name is required",
                })}
                error={!!errors.Name}
                helperText={errors.Name?.message}
              />

              <CentralizedTextInput
                label="Email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <CentralizedTextInput
                label="ZipCode"
                {...register("zipCode", {
                  required: "ZipCode required",

                })}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Grid container spacing={2}>
              <CentralizedTextInput
                label="Mobile Number"
                {...register("mobileNumber", {
                  required: "Mobile Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber?.message}
              />

              <CentralizedTextInput
                label="City"
                {...register("city", {
                  required: "City is required",
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />

              <CentralizedTextInput
                label="State"
                {...register("state", {
                  required: "State is required",
                })}
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CentralizedTextArea
              label="Address"
              {...register("address", {
                required: "Address is required",
              })}
              error={errors.address?.message}
            />
          </Grid>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <CommonButton
              label="Back to Orders"
              sx={{ color: "#7d4dfa", backgroundColor: "transparent" }}
              onClick={() => setValue((prev) => prev - 1)}
            />
            <CommonButton type="submit" label={"Submit"} />
          </Stack>
        </Grid>
      </form>
    </Box>
  );
};

export default ShippingDetails;
