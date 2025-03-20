// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Box, Typography } from "@mui/material";
// import { Controller } from "react-hook-form";
// import { styled } from "@mui/system";
// interface CentralizedTextEditorProps {
//   name: string;
//   control: any;
//   required?: boolean;
//   defaultValue?: string;
//   sx?: object;
// }
// const EditorContainer = styled(Box)(() => ({
//   width: "100%",
//   maxWidth: "600px",
//   margin: "0 auto",
//   display: "flex",
//   flexDirection: "column",
//   padding: "16px",
// }));
// const CentralizedTextEditor: React.FC<CentralizedTextEditorProps> = ({
//   name,
//   control,
//   defaultValue = "",
// }) => {
//   const [editorValue, setEditorValue] = useState(defaultValue);
//   const handleEditorChange = (value: string) => {
//     setEditorValue(value);
//   };
//   return (
//     <EditorContainer
//       sx={{
//         padding: "0px",
//         margin: "0px",
//         width: "100% !important",
//         maxWidth: "100% !important",
//         borderRadius: "15px",
//         mt: 2,
//       }}
//     >
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={defaultValue}
//         render={({ field, fieldState: { error } }) => (
//           <>
//             <ReactQuill
//               {...field}
//               value={editorValue}
//               onChange={(value :any) => {
//                 handleEditorChange(value);
//                 field.onChange(value);
//               }}
//               modules={{
//                 toolbar: [
//                   [{ header: "1" }, { header: "2" }, { font: [] }],
//                   [{ list: "ordered" }, { list: "bullet" }],
//                   ["bold", "italic", "underline"],
//                   ["link"],
//                   [{ align: [] }],
//                   ["clean"],
//                 ],
//               }}
//             />
//             {error && (
//               <Typography
//                 color="error"
//                 variant="body2"
//                 sx={{ marginTop: "8px" }}
//               >
//                 {error.message}
//               </Typography>
//             )}
//           </>
//         )}
//       />
//     </EditorContainer>
//   );
// };
// export default CentralizedTextEditor;
