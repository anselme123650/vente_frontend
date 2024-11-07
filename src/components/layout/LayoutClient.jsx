import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import { grey } from '@mui/material/colors';
import Footer from '../Footer';
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from '../../service/authService'
import { logout, setCredentials } from '../../redux/slices/authSlice'

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function LayoutClient(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  })

 
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data))
    }
  }, [data, dispatch])

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <CartProvider>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" >
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
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              MUI
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button  sx={{ color: '#fff', textTransform:'none' }}>
                S'inscrire
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%', bgcolor: grey[100], minHeight: '100vh' }}>
          <Toolbar />
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </CartProvider>
  );
}

LayoutClient.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default LayoutClient;
