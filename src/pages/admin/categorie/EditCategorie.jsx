import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import {
    modifiedCategorie,
    changeStateFalse,
} from "../../../redux/slices/categorieSlice";
import { useDispatch, useSelector } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function EditCategorie({ open, handleClose, data, onAlert }) {
    console.log(data)
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ id: data.id, nom: data.nom_categorie });
    const handleSubmit = () => {
        dispatch(
            modifiedCategorie(formData)
        );
        dispatch(changeStateFalse())
        onAlert()
        handleClose();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
                    Ajouter une catégorie des produits
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    name="nom"
                    label="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    variant="outlined"
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <Button onClick={handleClose} color="secondary" style={{ marginRight: '8px' }}>
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Modifier
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}
export default EditCategorie;