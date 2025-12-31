import React from "react";
import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

const ProfileMenu = ({
  anchorEl,
  open,
  onClose,
  onLogout,
  displayName,
  email,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          minWidth: 220,
          borderRadius: 2,
        },
      }}
    >
      {/* User Info */}
      <MenuItem disabled>
        <Box>
          <Typography fontWeight={600}>{displayName}</Typography>
          <Typography variant="caption" color="text.secondary">
            {email}
          </Typography>
        </Box>
      </MenuItem>

      <Divider />

      {/* Logout */}
      <MenuItem onClick={onLogout}>
        <LogoutOutlined fontSize="small" sx={{ mr: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
