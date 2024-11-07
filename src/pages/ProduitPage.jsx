import React, { useEffect } from 'react'
import { Box, Container, Divider, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProduit,
} from "../redux/slices/produitSlice";
import {
    fetchCategorie,
} from "../redux/slices/categorieSlice";
import CardProduit from '../components/CardProduit';
function ProduitPage() {
    const dispatch = useDispatch()
    const { loading, produitList, error, updateState, response } = useSelector(
        (state) => state.produitKey
    );
    const { categorieList } = useSelector(
        (state) => state.categorieKey
    );
    useEffect(() => {
        dispatch(fetchProduit());
        dispatch(fetchCategorie());
    }, [dispatch]);
    return (
        <Box component="div">
            <Container maxWidth="lg" component="main" >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography component='h2' variant='h4' sx={{ my: 5 }}>Nos produits</Typography>
                    <Typography component='h6' variant='h8'>Toutes catégories</Typography>
                    {categorieList.map((categorie) => {
                        return (
                            <Typography component='h6' variant='h8'>{categorie.nom_categorie}</Typography>)

                    })}
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch' }}>
                        {produitList.map((produit) => {
                            return (
                                <CardProduit key={produit.id} data={produit} sx={{ flexGrow: 1 }} />
                            )

                        })}
                    </Box>

                </Box>
            </Container>

        </Box>
    )
}

export default ProduitPage