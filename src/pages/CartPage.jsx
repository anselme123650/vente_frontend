import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, IconButton, InputAdornment, Typography, Box, Divider, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react'
import { useCart } from "react-use-cart";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { sendCartData } from '../redux/slices/commandeSlice'; 
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const navigate = useNavigate();
    const {
        isEmpty,
        cartTotal,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        emptyCart 
    } = useCart();
    const { userInfo } = useSelector((state) => state.auth)
    const {status,error} = useSelector(state => state.commandeKey);
    const dispatch = useDispatch()
    console.log(items)
    const envoyer=()=>{
        if(!userInfo){
            navigate('/login')
            return
        }
        const data ={
            user:userInfo.id,
            prix_total:cartTotal,
            commandes:[]
        }
        for(const produit in items){
            console.log(produit)
            const commande = {
                produit: items[produit].id,
                qte:items[produit].quantity
            };
        
            data.commandes.push(commande);
        }

        dispatch(sendCartData(data)).then((result) => {
            if (sendCartData.fulfilled.match(result)) {
                emptyCart();
            }
        });
    }

    if (isEmpty) return <p style={{color:'red'}}>Votre panier est vide</p>;

    return (
        <div style={{padding:5}}>
            <h1>Articles ({totalUniqueItems})</h1>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produit</TableCell>
                                    <TableCell align="right">prix</TableCell>
                                    <TableCell align="right">Quantité</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.nom_produit}
                                        </TableCell>
                                        <TableCell align="right">{item.prix}</TableCell>
                                        <TableCell align="right">
                                            <div style={{ justifyContent: 'center' }}>
                                                <IconButton onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)} >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <TextField
                                                    value={item.quantity}
                                                    type="number"
                                                    variant="outlined"
                                                    style={{ width: '60px', textAlign: 'center' }}
                                                    size='small'
                                                />
                                                <IconButton size='small' onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)} >
                                                    <AddIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">{item.itemTotal}</TableCell>
                                        <TableCell align="right">
                                            <IconButton size='small' onClick={() => removeItem(item.id)} >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box component={Paper}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5, width: '100%' }} >
                            <Typography>{totalUniqueItems} Article(s)</Typography>
                            <Typography>{cartTotal} Ar</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5, width: '100%' }} >
                            <Typography>Total </Typography>
                            <Typography>{cartTotal} Ar</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, width: '100%' }} >
                            <Button onClick={envoyer}>Confirmer commande</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default CartPage