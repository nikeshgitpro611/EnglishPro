import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Tooltip,
} from '@mui/material';
import {
  Home as HomeIcon,
  ManageAccounts as ManageRoleIcon,
  Help as HelpIcon,
  Person as ProfileIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  menuItems as STATIC_MENU_ITEMS,
  bottomMenuItems as STATIC_BOTTOM_MENU_ITEMS,
  SIDEBAR_WIDTHS,
  TRANSITION as STATIC_TRANSITION,
  TEXT_DELAY as STATIC_TEXT_DELAY,
  BG_COLOR as STATIC_BG_COLOR,
  HOVER_BG as STATIC_HOVER_BG,
} from './SideBar/SideBarStatic';
import { getSidebarWidth, createNavigationHandler, uniqueKey } from './SideBar/SideBarFunctions';

const SideBar = ({ onHoveonHoverChange, width, toprChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Get user role from Redux store
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role;

  // Notify parent component when hover state changes
  const handleHoverChange = (hovered) => {
    setIsHovered(hovered);
    if (onHoverChange && !isMobile) {
      onHoverChange(hovered);
    }
  };

  // static menu items and constants are moved to SideBarStatic.js
  const menuItems = STATIC_MENU_ITEMS.map((it) => {
    // replace iconName with actual icons used in this component
    if (it.iconName === 'Home') return { ...it, icon: <HomeIcon /> };
    if (it.iconName === 'ManageRole') return { ...it, icon: <ManageRoleIcon /> };
    if (it.iconName === 'Help') return { ...it, icon: <HelpIcon /> };
    if (it.iconName === 'Profile') return { ...it, icon: <ProfileIcon /> };
    return it;
  }).filter((item) => {
    // Show "Manage Role" only if user is admin
    if (item.iconName === 'ManageRole' && userRole !== 'admin') {
      return false;
    }
    return true;
  });

  const bottomMenuItems = STATIC_BOTTOM_MENU_ITEMS.map((it) => {
    if (it.iconName === 'Home') return { ...it, icon: <HomeIcon /> };
    if (it.iconName === 'ManageRole') return { ...it, icon: <ManageRoleIcon /> };
    if (it.iconName === 'Help') return { ...it, icon: <HelpIcon /> };
    if (it.iconName === 'Profile') return { ...it, icon: <ProfileIcon /> };
    return it;
  }).filter((item) => {
    // Show "Manage Role" only if user is admin
    if (item.iconName === 'ManageRole' && userRole !== 'admin') {
      return false;
    }
    return true;
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const sidebarWidth = getSidebarWidth(isHovered, SIDEBAR_WIDTHS);
  const TRANSITION = STATIC_TRANSITION;
  const TEXT_DELAY = STATIC_TEXT_DELAY;
  const BG_COLOR = STATIC_BG_COLOR;
  const HOVER_BG = STATIC_HOVER_BG;

  // navigation handler factory (uses router navigate + mobile drawer state)
  const handleNavigation = createNavigationHandler(navigate, setMobileOpen, isMobile);

 
  const MobileSidebarContent = () => (
    <Box
      sx={{
        width: 210,
        height: '100%',
        backgroundColor: BG_COLOR,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Box
          sx={{
            width: 150,
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 60,
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              mb: 0.5,
            }}
          />
          <Box
            sx={{
              width: '100%',
              height: 25,
              backgroundColor: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 0.5,
            }}
          >
            <Box
              component="span"
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                letterSpacing: 1,
              }}
            >
              NK
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Top Menu Items */}
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={uniqueKey(item)} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: '#FFE5E5',
                  color: '#D32F2F',
                  '& .MuiListItemIcon-root': {
                    color: '#D32F2F',
                  },
                  '&:hover': {
                    backgroundColor: '#FFD5D5',
                  },
                },
                '&:hover': {
                  backgroundColor: HOVER_BG,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? '#D32F2F' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Bottom Menu Items */}
      <List sx={{ pb: 2 }}>
        {bottomMenuItems.map((item) => (
          <ListItem key={uniqueKey(item)} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: '#FFE5E5',
                  color: '#D32F2F',
                  '& .MuiListItemIcon-root': {
                    color: '#D32F2F',
                  },
                  '&:hover': {
                    backgroundColor: '#FFD5D5',
                  },
                },
                '&:hover': {
                  backgroundColor: HOVER_BG,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? '#D32F2F' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Desktop Sidebar content (collapsible on hover)
  const DesktopSidebarContent = () => (
    <Box
      onMouseEnter={() => handleHoverChange(true)}
      onMouseLeave={() => handleHoverChange(false)}
      sx={{
        width: sidebarWidth,
        height: '100%',
        backgroundColor: BG_COLOR,
        display: 'flex',
        flexDirection: 'column',
        transition: `width ${TRANSITION}`,
        willChange: 'width',
        overflow: 'hidden',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: isHovered ? 2 : 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: BG_COLOR,
          borderBottom: '1px solid #e0e0e0',
          transition: `padding ${TRANSITION}, min-height ${TRANSITION}`,
          willChange: 'padding, min-height',
          minHeight: isHovered ? 120 : 80,
        }}
      >
        {isHovered ? (
          <Box
            sx={{
              width: 150,
              height: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 60,
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                mb: 0.5,
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: 25,
                backgroundColor: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 0.5,
              }}
            >
              <Box
                component="span"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  letterSpacing: 1,
                }}
              >
                NK
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
        )}
      </Box>

      {/* Top Menu Items */}
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={uniqueKey(item)} disablePadding>
            <Tooltip title={!isHovered ? item.text : ''} placement="right" arrow>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  justifyContent: isHovered ? 'flex-start' : 'center',
                  transition: `padding ${TRANSITION}, background-color ${TRANSITION}, justify-content ${TRANSITION}`,
                  '&.Mui-selected': {
                    backgroundColor: '#FFE5E5',
                    color: '#D32F2F',
                    '& .MuiListItemIcon-root': {
                      color: '#D32F2F',
                    },
                    '&:hover': {
                      backgroundColor: '#FFD5D5',
                    },
                  },
                  '&:hover': {
                    backgroundColor: HOVER_BG,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isHovered ? 40 : 0,
                    justifyContent: 'center',
                    color: location.pathname === item.path ? '#D32F2F' : 'inherit',
                    transition: `min-width ${TRANSITION}, color ${TRANSITION}`,
                    overflow: 'hidden',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    }}
                    sx={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                      transition: `opacity ${TRANSITION} ${TEXT_DELAY}, transform ${TRANSITION} ${TEXT_DELAY}`,

                      whiteSpace: 'nowrap',
                    }}
                  />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Bottom Menu Items */}
      <List sx={{ pb: 2 }}>
        {bottomMenuItems.map((item) => (
          <ListItem key={uniqueKey(item)} disablePadding>
            <Tooltip title={!isHovered ? item.text : ''} placement="right" arrow>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  justifyContent: isHovered ? 'flex-start' : 'center',
                  transition: `padding ${TRANSITION}, background-color ${TRANSITION}, justify-content ${TRANSITION}`,
                  '&.Mui-selected': {
                    backgroundColor: '#FFE5E5',
                    color: '#D32F2F',
                    '& .MuiListItemIcon-root': {
                      color: '#D32F2F',
                    },
                    '&:hover': {
                      backgroundColor: '#FFD5D5',
                    },
                  },
                  '&:hover': {
                    backgroundColor: HOVER_BG,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isHovered ? 40 : 0,
                    justifyContent: 'center',
                    color: location.pathname === item.path ? '#D32F2F' : 'inherit',
                    transition: `min-width ${TRANSITION}, color ${TRANSITION}`,
                    overflow: 'hidden',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    }}
                    sx={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                      transition: `opacity ${TRANSITION} ${TEXT_DELAY}, transform ${TRANSITION} ${TEXT_DELAY}`,
                      whiteSpace: 'nowrap',
                    }}
                  />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile AppBar with Hamburger */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: '#fff',
            color: '#333',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {/* Mobile Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 30,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              />
              <Box
                sx={{
                  backgroundColor: '#1976d2',
                  px: 1,
                  py: 0.5,
                  borderRadius: 0.5,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    letterSpacing: 1,
                  }}
                >
                  NK
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 210,
            },
          }}
        >
          <MobileSidebarContent />
        </Drawer>
      ) : (
        // Desktop Sidebar with hover expand
        <Box
  sx={{
    width: sidebarWidth,
    position: "fixed",
    left: 0,
    top: `${top}px`,
    height: `calc(100vh - ${top}px)`,
    zIndex: 1200,
    borderRight: "1px solid #e0e0e0",
    backgroundColor: "#FFFFFF",
    transition: `width ${TRANSITION}`,
    willChange: "width",
  }}
>
  <DesktopSidebarContent />
</Box>

      )}
    </>
  );
};

export default SideBar;


