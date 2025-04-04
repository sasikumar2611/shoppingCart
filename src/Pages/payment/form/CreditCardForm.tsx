import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import CentralizedTextInput from "../../../CentralizedComponents/inputs/CentralizedTextInput";
import { CommonButton } from "../../../CentralizedComponents/button/commonButton";

interface CardFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const CreditCardForm = ({
  onSubmit,
}: {
  onSubmit: (data: CardFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormData>();

  return (
    <Box
      sx={{ width: "100%", height: "100%" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <CentralizedTextInput
          label="Card Number"
          grid={6}
          {...register("cardNumber", {
            required: "Card Number is required",
          })}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber?.message}
        />
        <CentralizedTextInput
          label="Cardholder Name"
          {...register("cardholderName", {
            required: "Cardholder name is required",
          })}
          grid={6}
          error={!!errors.cardholderName}
          helperText={errors.cardholderName?.message}
        />

        <CentralizedTextInput
          label="Expiry Date (MM/YY)"
          grid={6}
          {...register("expiryDate", {
            required: "Expiry date is required",
            pattern: {
              value: /^(0[1-9]|1[0-2])\/\d{2}$/,
              message: "Invalid format (MM/YY)",
            },
          })}
          error={!!errors.expiryDate}
          helperText={errors.expiryDate?.message}
        />

        <CentralizedTextInput
          label="CVV"
          grid={6}
          type="password"
          {...register("cvv", {
            required: "CVV is required",
            pattern: {
              value: /^\d{3,4}$/,
              message: "CVV must be 3 or 4 digits",
            },
          })}
          error={!!errors.cvv}
          helperText={errors.cvv?.message}
        />
<Stack direction={"row"} justifyContent={'flex-end'} width={'100%'}>

        <CommonButton type="submit" label={" Submit Payment"} />
</Stack>
      </Grid>
      
    </Box>
  );
};

export default CreditCardForm;
