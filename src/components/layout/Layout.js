import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  ShoppingCart,
  Inventory,
  Factory,
  LocalShipping,
  AttachMoney,
  Restaurant,
  ShoppingBag,
  Notifications,
  AccountCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

// All possible menu items
const allMenuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard', page: 'dashboard' },
  { text: 'Clients', icon: <People />, path: '/clients', page: 'clients' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/orders', page: 'orders' },
  { text: 'Sales', icon: <AttachMoney />, path: '/sales', page: 'sales' },
  { text: 'Production', icon: <Factory />, path: '/production', page: 'production' },
  { text: 'Delivery', icon: <LocalShipping />, path: '/delivery', page: 'delivery' },
  { text: 'Inventory', icon: <Inventory />, path: '/inventory', page: 'inventory' },
  { text: 'Recipes', icon: <Restaurant />, path: '/recipes', page: 'recipes' },
  { text: 'Raw Materials', icon: <ShoppingBag />, path: '/raw-materials', page: 'raw-materials' },
  { text: 'Users', icon: <People />, path: '/users', page: 'users' },
];

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { user, logout, hasPermission } = useAuth();

  // Filter menu items based on user permissions
  const menuItems = allMenuItems.filter(item => hasPermission(item.page));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  const getUserInitial = () => {
    return user?.name?.charAt(0)?.toUpperCase() || 'U';
  };

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main' }}>
          🏭 Food Champion
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (mobileOpen) handleDrawerToggle();
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              mb: 1,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Factory Control System {user?.role && `• ${user.role}`}
          </Typography>
          
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={0} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: user ? 'secondary.main' : 'grey.400',
                fontWeight: 'bold'
              }}
            >
              {user ? getUserInitial() : '?'}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled>
              <Box>
                <Typography variant="body2" fontWeight="bold" noWrap>
                  {user?.name || 'Not logged in'}
                </Typography>
                <Typography variant="caption" color="textSecondary" noWrap>
                  {user?.role || 'No role'} • {user?.department || 'No department'}
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem divider />
            <MenuItem onClick={handleClose}>
              <Typography variant="body2">Profile Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="body2">Change Password</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <Typography variant="body2" fontWeight="bold">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}