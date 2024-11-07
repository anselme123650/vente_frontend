import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection = () => {
  return (
    <Box sx={{ backgroundColor: 'white', py: 8, px: 4, textAlign: 'center' }}>
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ mb: 4, fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3rem', lg: '4rem' } }}>
          We invest in the world’s potential
        </Typography>
        <Typography variant="body1" sx={{ mb: 8, color: 'text.secondary', fontSize: { xs: '1rem', lg: '1.25rem' } }}>
          Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ py: 2, px: 4 }}
            endIcon={<ArrowForwardIcon />}
          >
            Get started
          </Button>
          <Button
            variant="outlined"
            sx={{ py: 2, px: 4, color: 'text.primary', borderColor: 'grey.300' }}
          >
            Learn more
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
