// import {
//   FormControl,
//   TextField,
//   MenuItem,
//   InputAdornment,
//   IconButton,
//   useTheme,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { PlagiarismOutlined } from "@mui/icons-material";
// const CentralizedDropdown = ({

//   value,
//   onChange,
//   options,
//   placeholder = "Select project",
//   minWidth = 200,
//   bgColor = "#e3e2e2",
//   borderRadius = "25px",
//   fontSize = "12px",
//   clearable = true,
// }) => {
//   const theme = useTheme();
//   const backgColor = theme.palette.mode === "dark" ? "#03ac9b" : "#7d4dfa";
//   const FontColor = theme.palette.mode === "dark" ? "white" : "black";

//   return (
//     <FormControl sx={{ minWidth }}>
//       <TextField
//         select
//         size="small"
//         value={value}
//         onChange={onChange}
//         InputProps={{
//           sx: {
//             backgroundColor: bgColor,
//             borderRadius,
//             padding: "0px 5px",
//             "& .MuiInputBase-input": {
//               padding: "7px 0px !important",
//               color: "black",
//               fontSize,
             
//             },
//             "& .MuiSvgIcon-root": {
//               fontSize: "20px",
//               backgroundColor: backgColor,
//               padding: "3px",
//               borderRadius: "25px",
//               color: FontColor,
//             },
//             "& .MuiOutlinedInput-notchedOutline": {
//               border: "none",
//             },
//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               border: "none",
//             },
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               border: "none",
//             },
//             "& .MuiSelect-icon": {
//               display: "none !important ",
//             },
//           },
//           endAdornment: clearable && value !== "0"  && (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={() => onChange({ target: { value: "0" } })} 
//                 aria-label="clear"
//               >
//                 <CloseIcon
//                   sx={{
//                     fontSize: "14px !important",
//                     color: "white !important",
//                   }}
//                 />
//               </IconButton>
//             </InputAdornment>
//           ),
//           startAdornment: (
//             <InputAdornment position="start">
//               <PlagiarismOutlined
//                 sx={{ fontSize: "18px", color: "white !important" }}
//               />
//             </InputAdornment>
//           ),
//         }}
//         SelectProps={{
//           MenuProps: {
//             PaperProps: {
//               sx: {
//                 maxHeight: "150px",
//                 width: "140px",
//                 borderRadius: "15px",
//                 "& .MuiMenu-list": {
//                   padding: "0px !important",
//                 },
//                 "& .MuiMenuItem-root": {
//                   fontSize: "13px",
//                   padding: "4px 15px",
//                 },
//                 "&::-webkit-scrollbar": {
//                   display: "none",
//                 },
//                 "-ms-overflow-style": "none",
//                 "scrollbar-width": "none",
//               },
//             },
//           },
//           renderValue: (selected) => {
//             if (selected === "0" || !selected) {
//               return <em style={{ fontSize, color: "gray" }}>{placeholder}</em>;
//             }
//             const selectedOption = options.find((opt:any) => opt.id === selected);
//             return selectedOption?.projectName || selected;
//           },
//         }}
//       >
//         {options.map((option:any) => (
//           <MenuItem key={option.id} value={option.id} sx={{ color: "black" }}>
//             {option.projectName}
//           </MenuItem>
//         ))}
//       </TextField>
//     </FormControl>
//   );
// };
// export default CentralizedDropdown;
