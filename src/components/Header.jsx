import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../Auth/auth";
import { clearUser } from "../redux/authSlice";
import ProfileMenu from "../components/ProfileMenu";

const Header = ({ sidebarWidth }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const menuOpen = Boolean(anchorEl);

  const displayName = useMemo(() => {
    if (user?.name) return user.name;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  }, [user]);

  const initials = useMemo(() => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: "56px",
          ml: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: "margin-left 250ms ease, width 250ms ease",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: "56px",
            px: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left placeholder (keeps avatar position stable) */}
          <Box sx={{ width: 160 }} />

          {/* Right User Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", sm: "block" },
                maxWidth: 160,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayName}
            </Typography>

            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "#8e0000", width: 36, height: 36 }}>
                {initials}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Reusable Profile Menu */}
      <ProfileMenu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
        onLogout={handleLogout}
        displayName={displayName}
        email={user?.email}
      />
    </>
  );
};

export default Header;
