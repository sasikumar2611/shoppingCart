import React from "react";
import { useState } from "react";
import { Box, IconButton, Drawer, Tabs, Tab, Typography, Stack } from "@mui/material";
import {
  Dashboard,
  FormatListBulleted,
  Home,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Logout,
  Person,
  Settings,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { sidebarStyle } from "../common/commonStyle";
import logo from '../assets/sk-high-resolution-logo.png'
const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();
  const SidebarData = [
    {
      icon: <FormatListBulleted sx={{ marginRight: 2 }} />,
      text: "Products",
      value: "products",
      path: "/Pages/Products",
    },
    {
      icon: <Home sx={{ marginRight: 2 }} />,
      text: "Home",
      value: "home",
      path: "/Pages/Home",
    },
    {
      icon: <Person sx={{ marginRight: 2 }} />,
      text: "Profile",
      value: "profile",
      path: "/Pages/Profile",
    },
    {
      icon: <Settings sx={{ marginRight: 2 }} />,
      text: "Settings",
      value: "settings",
      path: "/Pages/Settings",
    },
    {
      icon: <Dashboard sx={{ marginRight: 2 }} />,
      text: "Dashboard",
      value: "dashboard",
      path: "/Pages/Dashboard",
    },
    {
      icon: <Logout sx={{ marginRight: 2 }} />,
      text: "Logout",
      value: "logout",
      path: "/Pages/Logout",
    },
  ];
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const activeIndex = SidebarData.findIndex(
    (item) => `${item.path}` === location.pathname
  );
  console.log(activeIndex);
  return (
    <Box
      sx={{
          display: {
          xs: "none",
          sm: "flex",
        },
      }}
    >
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: "fixed",
          top: 45,
          left: isOpen ? 185 : 45,
          transition: "left 0.3s ease-in-out",
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: " #001f3f",
          borderRadius: "50%",
          zIndex: 1300,
          "&:hover": { backgroundColor: "#000" },
        }}
      >
        {isOpen ? (
          <KeyboardArrowLeft sx={{ color: "#fff", fontSize: "18px" }} />
        ) : (
          <KeyboardArrowRight sx={{ color: "#fff", fontSize: "18px" }} />
        )}{" "}
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          width: isOpen ? 200 : 60,
         
          transition: "width 0.3s ease-in-out",
          position: "relative",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
           
            width: isOpen ? 200 : 60,
            transition: "width 0.3s ease-in-out",
            backgroundColor: "#7d4dfa",
            boxSizing: "border-box",
          },
          
        }}
      >
        <Box sx={{ padding: "10px",height:'80px', mb: 1 }}>
          <Stack direction={"row"} gap={1}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "40px", height: "30px" }}
            />
             <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "bold",
            
              color: "white ",
              whiteSpace: "nowrap",
            }}
          >
            {isOpen && "Shopy kart"}
          </Typography>
          </Stack>
         
        </Box>
        <Tabs
          orientation="vertical"
          value={selectedTab === activeIndex ? selectedTab : activeIndex}
          onChange={handleTabChange}
          sx={sidebarStyle}
        >
          {SidebarData.map((item, index) => (
            <Tab
              disableRipple
              key={index}
              value={index}
              component={Link}
              to={item.path}
              sx={{ minWidth: 65, mb: 1 }}
              label={
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        {isOpen && item.text}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Drawer>
    </Box>
  );
};
export default Sidebar;
