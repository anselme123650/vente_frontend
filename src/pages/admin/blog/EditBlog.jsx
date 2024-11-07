import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import {
    modifiedBlog,
    changeStateFalse,
} from "../../../redux/slices/blogSlice";
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

function EditBlog({ open, handleClose, data, onAlert }) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ id: data.id, titre: data.titre,date:data.date,description:data.description });
    const handleSubmit = () => {
        dispatch(
            modifiedBlog(formData)
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
                    name="titre"
                    label="Titre"
                    value={formData.titre}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    type='date'
                    margin="normal"
                    name="date"
                    value={formData.date}
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
export default EditBlog;