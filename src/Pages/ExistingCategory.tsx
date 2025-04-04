import { Box, Stack } from "@mui/material";
import { CommonButton } from "../CentralizedComponents/button/commonButton";
import CentralizedTextArea from "../CentralizedComponents/inputs/CentralizedTextArea";
import CentralizedTextInput from "../CentralizedComponents/inputs/CentralizedTextInput";
import Grid from "@mui/material/Grid2";
import { useForm } from "react-hook-form";
import CentralizedSelectInput from "../CentralizedComponents/inputs/CentralizedSelect";
import { useState } from "react";

const ExistingCategory = () => {
  const [value, _setValue] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: null,
      mobileNumber: "",
      email: "",
      city: "",
      zipCode: "",
      state: "",
      address: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Grid container spacing={2}>
                <CentralizedSelectInput
                label="Category"
                options={[
                  { label: "Category 1", id: 1 },
                  { label: "Category 2", id: 2 },
                ]}
                value={value}
                error={!!errors.category}
                helperText={errors.category?.message}
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
              onClick={() => {}}
            />
            <CommonButton type="submit" label={"Submit"} />
          </Stack>
        </Grid>
      </form>
    </Box>
  );
};

export default ExistingCategory;
