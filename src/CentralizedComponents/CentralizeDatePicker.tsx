// import React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { Controller } from "react-hook-form";
// import { centralizedDatePickerStyle } from "../common/commonStyle";
// interface CentralizeDatePickerProps {
//   name?: string;
//   value?: string | null;
//   onChange?: (value: string | null) => void;
//   control?: any;
//   defaultValue?: any;
//   sx?: object;
//   format?: "MM-YYYY" | "DD-MM-YYYY";
//   readOnly?: boolean;
// }
// const CentralizeDatePicker: React.FC<CentralizeDatePickerProps> = ({
//   name,
//   control,
//   defaultValue,
//   sx,
//   format = "MM-YYYY",
//   readOnly,
// }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={defaultValue}
//       render={({ field: { value, onChange } }) => (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             sx={{
//               ...sx,
//               ...centralizedDatePickerStyle
//             }}
//             views={format === "MM-YYYY" ? ["year", "month"] : undefined}
//             format={format}
//             value={value ? dayjs(value, format) : null}
//             onChange={(newValue) => {
//               if (newValue) {
//                 const formattedDate = dayjs(newValue).format(format);
//                 onChange(formattedDate);
//               } else {
//                 onChange(null);
//               }
//             }}
//             readOnly={readOnly}
//           />
//         </LocalizationProvider>
//       )}
//     />
//   );
// };
// export default CentralizeDatePicker;
