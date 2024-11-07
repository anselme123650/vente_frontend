import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { grey } from '@mui/material/colors';
// import DribbbleIcon from '@mui/icons-material/Dribbble';

const Footer = () => {
  return (
    <Box sx={{ bgcolor:grey[200], color: 'text.primary', py: 6 }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" mb={6}>
          <Box display="flex" alignItems="center">
            <Link href="https://flowbite.com/" underline="none">
              <img src="https://flowbite.com/docs/images/logo.svg" alt="FlowBite Logo" style={{ height: 32, marginRight: 8 }} />
              <Typography variant="h6" fontWeight="bold">
                Flowbite
              </Typography>
            </Link>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Resources
              </Typography>
              <Link href="https://flowbite.com/" underline="hover">Flowbite</Link><br />
              <Link href="https://tailwindcss.com/" underline="hover">Tailwind CSS</Link>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Follow us
              </Typography>
              <Link href="https://github.com/themesberg/flowbite" underline="hover">Github</Link><br />
              <Link href="https://discord.gg/4eeurUVvTy" underline="hover">Discord</Link>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Legal
              </Typography>
              <Link href="#" underline="hover">Privacy Policy</Link><br />
              <Link href="#" underline="hover">Terms & Conditions</Link>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            © 2023 <Link href="https://flowbite.com/" underline="hover">Flowbite™</Link>. All Rights Reserved.
          </Typography>
          <Box display="flex" mt={1}>
            <IconButton href="#" color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" color="inherit" sx={{ ml: 1 }}>
              <GitHubIcon />
            </IconButton>
            <IconButton href="#" color="inherit" sx={{ ml: 1 }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" color="inherit" sx={{ ml: 1 }}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="#" color="inherit" sx={{ ml: 1 }}>
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
