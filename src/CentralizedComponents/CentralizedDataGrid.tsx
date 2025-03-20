// import { Box, MenuItem, Pagination, PaginationItem, Select, useTheme } from "@mui/material";
// import { DataGrid, GridColDef, GridRowSpacingParams } from "@mui/x-data-grid";
// import React from "react";
// interface CentralizedTableProps {
//   data: any[];
//   columns: GridColDef[];
//   page?: number;
//   checkboxSelection?: boolean;
//   pageSize?: number;
//   recordCount?: number;
//   handleChangePage?: (
//     event: React.MouseEvent<HTMLButtonElement> | null,
//     newPage: number
//   ) => void;
//   handleChangeRowsPerPage?: (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => void;
//   onSelectionModelChange?: any;
//   selectionModel?: any;
// }
// const CenteralizeDataGrid: React.FC<CentralizedTableProps> = ({
//   data,
//   columns,
//   checkboxSelection,
//   onSelectionModelChange,
//   selectionModel,
//   page = 1,
//   pageSize = 10,
//   handleChangePage,
//   recordCount,
//   handleChangeRowsPerPage,
// }) => {
//   const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
//     return {
//       top: params.isFirstVisible ? 0 : 2,
//       bottom: params.isLastVisible ? 0 : 2,
//     };
//   }, []);
//   const theme = useTheme();
//     const fontColor = theme.palette.mode === "dark" ? "white" : "black";
//   const pageCount = Math.ceil(recordCount / pageSize);
//   const allowedPageSizes = [5, 10, 25, 50, 100];
//   const rowsWithSi = data?.map((row, index) => ({
//     ...row,
//     Si: (page - 1) * pageSize + index + 1,
//     id: row.id || `${page}-${index}`,
//   }));
//   return (
//     <>
//       <Box sx={{ width: "100%" }}>
//         <DataGrid
//           rows={rowsWithSi ?? []}
//           columns={columns}
//           checkboxSelection={checkboxSelection}
//           hideFooter
//           disableDensitySelector
//           disableColumnSelector
//           disableColumnFilter
//           disableColumnMenu
//           disableRowSelectionOnClick
//           disableAutosize
//           disableColumnResize
//           disableVirtualization
//           disableMultipleRowSelection
//           hideFooterSelectedRowCount
//           getRowSpacing={getRowSpacing}
//           onRowSelectionModelChange={onSelectionModelChange}
//           rowSelectionModel={selectionModel}
//           getRowClassName={() => "custom-row"}
          
//         />
//          <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="flex-end"
//           padding="12px"
//         >
//           <Select
//             value={pageSize}
//             onChange={handleChangeRowsPerPage}
//             sx={{
//               marginRight: "30px",
//               paddingRight:"5px",
//               color:fontColor,
//               fontSize: "12px",
//               backgroundColor:'transparent',
//               border: "1px solid #ccc",
//               borderRadius:'25px',
//               "& .MuiOutlinedInput-notchedOutline": {
//                 border: "none",
//               },
//               "&:focus-within .MuiOutlinedInput-notchedOutline": {
//                 border: "2px solid #1976d2", 
//   },
//             }}
//             size="small"
//           >
//             {allowedPageSizes.map((size) => (
//               <MenuItem key={size} value={size} sx={{ fontSize: "12px",color:'black' }}>
//                 {size}
//               </MenuItem>
//             ))}
//           </Select>
//           <Pagination
//             count={pageCount}
//             page={page}
            
//             onChange={handleChangePage}
//             renderItem={(item) => (
//               <PaginationItem
//                 {...item}
//                 components={{
//                   previous: () => <span style={{color:fontColor}}>Prev</span>,
//                   next: () => <span style={{color:fontColor}}>Next</span>,
//                 }}
//                 sx={{
//                   fontSize: "12px",
//                   color:'black !important',
//                   "&.Mui-selected": {
//                     backgroundColor: "#dcdcdc",
//                     color: "#000",
//                   },
//                 }}
//               />
//             )}
//           />
//         </Box>
//       </Box>
//     </>
//   );
// };
// export default CenteralizeDataGrid;
