import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import {
    addProduit,
} from "../../../redux/slices/produitSlice";
import {
    fetchCategorie,
} from "../../../redux/slices/categorieSlice";
import { useDispatch, useSelector } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddCategorie({ open, handleClose, onAlert }) {
    const dispatch = useDispatch();
    const { loading, error, response } = useSelector(
        (state) => state.produitKey
    );
    const { categorieList } = useSelector(
        (state) => state.categorieKey
    );
    const [formData, setFormData] = useState({ nom: '', prix: '', qte: '', description: '', categorie: '', photo: null });
    useEffect(() => {
        dispatch(fetchCategorie());
    }, [dispatch]);
    const handleSubmit = () => {
        dispatch(
          addProduit(formData)
        );
        onAlert()
        handleClose();
        setFormData({ nom:'',prix:'',description:'',qte:'',categorie:'',photo:null });
        console.log(formData)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const changeImage = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, photo: file });
    
        // const reader = new FileReader();
        // reader.onload = () => {
        //   setPhotoDisplay(reader.result);  // Définir l'aperçu de l'image
        // };
        // reader.readAsDataURL(file);
      };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Ajouter un produit
                </Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        label="Catégorie"
                        required
                    >
                        {categorieList.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.nom_categorie}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    name="nom"
                    label="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    type='number'
                    margin="normal"
                    name="prix"
                    label="Prix"
                    value={formData.prix}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    type='number'
                    margin="normal"
                    name="qte"
                    label="Quantité de stock"
                    value={formData.qte}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    type='file'
                    margin="normal"
                    name="photo"
                    label="Photo"
                    onChange={changeImage}
                    accept="image/*"
                    variant="outlined"
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <Button onClick={handleClose} color="secondary" style={{ marginRight: '8px' }}>
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Ajouter
                    </Button>
                </div>

            </Box>
        </Modal>
    );
}
export default AddCategorie;