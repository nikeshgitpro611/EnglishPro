import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

const HEADER_HEIGHT = 56;
const COLLAPSED = 70;
const EXPANDED = 210;

const MainLayout = () => {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const sidebarWidth = isSidebarHovered ? EXPANDED : COLLAPSED;

  return (
    <>
      <Header sidebarWidth={sidebarWidth} />

      <SideBar
        onHoverChange={setIsSidebarHovered}
        width={sidebarWidth}
        top={HEADER_HEIGHT}
      />

      <Box
        component="main"
        sx={{
          mt: `${HEADER_HEIGHT}px`,
          ml: `${sidebarWidth}px`,
          transition: "margin-left 250ms ease",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
