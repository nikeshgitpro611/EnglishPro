import { SIDEBAR_WIDTHS } from './SideBarStatic';

// Return width based on hover state (pure helper)
export const getSidebarWidth = (isHovered, widths = SIDEBAR_WIDTHS) =>
  isHovered ? widths.expanded : widths.collapsed;

// Create a navigation handler bound to router navigate and mobile state setter
export const createNavigationHandler = (navigate, setMobileOpen, isMobile) => (path) => {
  navigate(path);
  if (isMobile && typeof setMobileOpen === 'function') {
    setMobileOpen(false);
  }
};

// Generate a unique key for list items (fallback to path)
export const uniqueKey = (item) => item.path || item.text;
