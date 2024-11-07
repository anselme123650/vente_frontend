import { Box, Container, Divider, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React, { useState,useEffect } from 'react'
import CardProduit from '../components/CardProduit'
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduit,
} from "../redux/slices/produitSlice";
import {
  fetchBlog,
} from "../redux/slices/blogSlice";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
const blogs = [
  { id: 1, title: 'Apprendre React', date: '2024-11-01', description: 'Un guide complet pour apprendre React.' },
  { id: 2, title: 'Les bases de JavaScript', date: '2024-10-25', description: 'Un article détaillant les bases du langage JavaScript.' },
  { id: 3, title: 'Introduction à Vue.js', date: '2024-09-30', description: 'Découvrir le framework Vue.js et ses avantages.' },
  { id: 4, title: 'Comprendre le CSS Flexbox', date: '2024-08-15', description: 'Les bases du layout CSS avec Flexbox.' },
  { id: 5, title: 'Déployer une application web', date: '2024-07-05', description: 'Un guide pour déployer une application web sur un serveur.' },
  // Ajoutez autant de blogs que nécessaire pour tester
];
function Home() {
  const [visibleCount, setVisibleCount] = useState(4);
  const dispatch = useDispatch();
  const { produitList } = useSelector(
    (state) => state.produitKey
  );
  const { blogList } = useSelector(
    (state) => state.blogKey
  );
  useEffect(() => {
    dispatch(fetchProduit());
    dispatch(fetchBlog());
  }, [dispatch]);
  return (
    <Box component="div">
      <Box sx={{ padding: (theme) => theme.spacing(8, 0, 6), bgcolor: "rgba(255, 0, 102, 0.2)", width: '100%', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Plus besoin de se déplacer,
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Veuillez passer votre commande maintenant
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Livraison gratuit pour toute le province
        </Typography>
      </Box>

      {/* Pricing Cards */}
      <Container maxWidth="lg" component="main" >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography component='h2' variant='h4' sx={{ my: 5 }}>Nos produits</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {produitList.slice(0, visibleCount).map((produit) => {
              return (
                <CardProduit key={produit.id} data={produit} sx={{ flexGrow: 1 }} />
              )

            })}
          </Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/produits"
            sx={{
              marginTop: 2, backgroundColor: '#FF00FF',  // Fuchsia (couleur en hexadécimal)
              '&:hover': {
                backgroundColor: '#D700D7',  // Une teinte plus foncée pour l'effet hover
              },
            }}
            endIcon={<ArrowCircleRightIcon />}
          >
            Voir plus
          </Button>
          <Typography component='h2' variant='h4' sx={{ my: 5 }}>Blogs</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {blogList.slice(0, 4).map(blog => (
              <BlogCard blog={blog} />
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/blogs"
            sx={{
              marginTop: 2, backgroundColor: '#FF00FF',  // Fuchsia (couleur en hexadécimal)
              '&:hover': {
                backgroundColor: '#D700D7',  // Une teinte plus foncée pour l'effet hover
              },
            }}
            endIcon={<ArrowCircleRightIcon />}
          >
            Voir plus
          </Button>

        </Box>
      </Container>

    </Box>
  )
}

export default Home