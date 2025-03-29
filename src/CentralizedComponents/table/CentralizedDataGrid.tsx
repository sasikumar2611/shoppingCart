import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowSpacingParams } from "@mui/x-data-grid";
import React from "react";
interface CentralizedTableProps {
  data: any[];
  columns: GridColDef[];

  // onSelectionModelChange?: any;
  // selectionModel?: any;
}
const CenteralizeDataGrid: React.FC<CentralizedTableProps> = ({
  data,
  columns,
  // checkboxSelection,
  // onSelectionModelChange,
  // selectionModel,
}) => {
  const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 2,
      bottom: params.isLastVisible ? 0 : 2,
    };
  }, []);
  // const uniqueData = Array.from(new Map(data.map(item => [item.id, item])).values());
  // console.log(uniqueData);

  const rowsWithSi = data?.map((row, index) => ({
    ...row,
    id: index, // Ensure each row has a unique id
    Si: index + 1, // Correct serial number
  }));

  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <DataGrid
          rows={rowsWithSi ?? []}
          columns={columns}
          sx={{ height: "50vh" }}
          hideFooter
          disableDensitySelector
          disableColumnSelector
          disableColumnFilter
          disableColumnMenu
          disableRowSelectionOnClick
          disableAutosize
          disableColumnResize
          disableColumnSorting
          disableVirtualization
          disableMultipleRowSelection
          hideFooterSelectedRowCount
          getRowSpacing={getRowSpacing}
          // onRowSelectionModelChange={onSelectionModelChange}
          // rowSelectionModel={selectionModel}
        />
      </Box>
    </>
  );
};
export default CenteralizeDataGrid;
