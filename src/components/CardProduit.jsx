import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from "react-use-cart";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function CardProduit({ data }) {
  const { addItem } = useCart();
  const addProduct = (produit) => {
    const data = { ...produit, price: produit.prix }
    addItem(data)
  }
  return (
    <Card sx={{ width: 240, m: 1 }}>
      <CardMedia
        sx={{ height: 120 }}
        image={data.image_url}
        title={data.nom_produit}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.nom_produit}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {data.prix}Ar
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" startIcon={<AddShoppingCartIcon />} onClick={() => {
          addProduct(data)
        }}>Ajouter au panier</Button>
      </CardActions>
    </Card>
  );
}
