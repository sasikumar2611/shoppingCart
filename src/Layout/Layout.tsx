import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box sx={{ display: "flex", width: "100%",minHeight:'100vh' }}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box
        sx={{
          width: "100%",
          backgroundColor:'#f1e8f8',
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        
        }}
      >
        <Header />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
export default Layout;
