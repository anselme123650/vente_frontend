import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import {
  addCategorie,
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

function AddCategorie({ open, handleClose,onAlert}) {
  const dispatch = useDispatch();
  const { loading,error,response } = useSelector(
    (state) => state.categorieKey
  );
  const [formData, setFormData] = useState({ nom: '' });
  const handleSubmit = () => {
    dispatch(
      addCategorie(formData)
    );
    onAlert()
    handleClose();
    setFormData({ nom:'' });
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
            Ajouter
          </Button>
        </div>
        
      </Box>
    </Modal>
  );
}
export default AddCategorie;