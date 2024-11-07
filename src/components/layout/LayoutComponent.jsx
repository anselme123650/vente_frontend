import React, { useEffect,useState } from 'react';
import { AppBar, Button, Badge, CssBaseline, Grid, Toolbar, Typography, Link, Container, Box, GlobalStyles, IconButton, Avatar,Modal, List, ListItem, ListItemText, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from '../../service/authService'
import { logout, setCredentials } from '../../redux/slices/authSlice'
import { useCart } from 'react-use-cart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const footers = [
  {
    title: 'Resources',
    description: ['Produits', 'Blogs'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export default function LayoutComponent() {
  const {
    totalUniqueItems,
  } = useCart();
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  })


  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data))
    }
  }, [data, dispatch])
  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles
        styles={{
          'ul': {
            margin: 0,
            padding: 0,
            listStyle: 'none',
          },

        }}
      />
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            E-VAROTRA
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="/" sx={{ margin: (theme) => theme.spacing(1, 1.5), textDecoration: 'none' }}>
              Accueil
            </Link>
            <Link variant="button" color="textPrimary" href="/produits" sx={{ margin: (theme) => theme.spacing(1, 1.5), textDecoration: 'none' }}>
              Produits
            </Link>
            <Link variant="button" color="textPrimary" href="/blogs" sx={{ margin: (theme) => theme.spacing(1, 1.5), textDecoration: 'none' }}>
              Blogs
            </Link>
            <Link variant="button" color="textPrimary" href="/panier" sx={{ margin: (theme) => theme.spacing(1, 1.5), textDecoration: 'none' }}>
              <Badge
                badgeContent={totalUniqueItems} // Affiche le nombre d'articles
                color="error"  // Le badge sera rouge
                sx={{ position: 'relative' }}
              >
                <IconButton>
                  <AddShoppingCartIcon />
                </IconButton>
              </Badge>
            </Link>
          </nav>
          {!userInfo ? (
            <>
              <Button href='/register' color="primary" variant="outlined" sx={{ margin: (theme) => theme.spacing(1, 1.5), textDecoration: 'none' }}>
                S'inscrire
              </Button>
              <Button href='/login' color="primary" variant="outlined" sx={{ margin: (theme) => theme.spacing(1, 1.5), textDecoration: 'none' }}>
                Login
              </Button>
            </>
          ) : (
            <Avatar
              alt="Remy Sharp"
              src={userInfo.photo_url}
            />
          )}

        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Outlet />
      {/* Footer */}
      <Container maxWidth="lg" component="footer" sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}`, marginTop: (theme) => theme.spacing(8), paddingTop: (theme) => theme.spacing(3), paddingBottom: (theme) => theme.spacing(3) }}>
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary" sx={{ textDecoration: 'none' }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
