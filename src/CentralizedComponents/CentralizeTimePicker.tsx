// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { Controller } from "react-hook-form";
// import { Box, FormLabel, Typography } from "@mui/material";
// import { styled } from "@mui/system";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// interface CentralizedTimePickerProps {
//   name: string;
//   control: any;
//   label: string;
//   required?: boolean;
//   readOnly?: boolean;
//   defaultValue?: string;
//   sx?: object;
// }
// const CentralizedTimePicker: React.FC<CentralizedTimePickerProps> = ({
//   name,
//   control,
//   readOnly,
//   label,
//   required = false,
//   defaultValue = "",
//   sx,
// }) => {
//   const convertToDate = (value: string | Date | null) => {
//     return value ? dayjs(value) : null;
//   };
//   const CustomTimePicker = styled(TimePicker)(() => ({
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "25px",
//       border: "none",
//       "& fieldset": {
//         border: "1px solid #ccc",
//       },
//     },
//     "& .MuiInputBase-input": {
//       padding: " 10px 14px !important",
//       borderRadius: "25px",
//       color: "black !important",
//     },
//     "& .MuiInputBase-input::placeholder": {
//       fontSize: "12px",
//       color: "#000 !important",
//     },
//   }));
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ display: "flex", flexDirection: "column" }}>
//         <FormLabel
//           sx={{ fontSize: "12px", margin: "13px 0px 16px 0px", color: "black" }}
//         >
//           <Typography sx={{ fontSize: "12px", color: "black", ml: 2 }}>
//             {label}
//           </Typography>
//         </FormLabel>
//         <Controller
//           name={name}
//           control={control}
//           defaultValue={convertToDate(defaultValue)}
//           rules={{
//             required: required ? `${label} is required` : false,
//           }}
//           render={({ field, fieldState: { error } }) => (
//             <>
//               <CustomTimePicker
//                 {...field}
//                 value={convertToDate(field.value)}
//                 onChange={(newValue:any) => field.onChange(newValue)}
//                 sx={{ ...sx, color: "black " }}
//                 readOnly={readOnly}
//               />
//               {error && (
//                 <p style={{ color: "red", fontSize: "10px" }}>
//                   {error.message}
//                 </p>
//               )}
//             </>
//           )}
//         />
//       </Box>
//     </LocalizationProvider>
//   );
// };
// export default CentralizedTimePicker;
