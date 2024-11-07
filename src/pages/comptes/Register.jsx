import React, { useState,useRef  } from 'react';
import { Avatar, Button, TextField, Grid, Paper, Typography ,Box} from '@mui/material';
import { registerUser } from '../../redux/slices/authActions';
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    nom_complet: '',
    adresse: '',
    telephone: '',
    email: '',
    photo:null,
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData,photo:file, profileImage: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
    setFormData({
      username: '',
      password: '',
      password2: '',
      nom_complet: '',
      adresse: '',
      telephone: '',
      email: '',
      photo:null,
      profileImage: null });
  };
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{p:3}}>
      <Paper elevation={3} style={{ padding: '20px', width: '900px', margin: 'auto',display:'flex',flexDirection:'column' }}>
      <Typography variant="h5" component="h2" sx={{textAlign:'center'}} gutterBottom>
        Inscription
      </Typography>
      <hr/>
      <Grid container spacing={2}>
        <Grid item xs={4} container justifyContent="center" alignItems="center">
          <Avatar
            src={formData.profileImage}
            alt="Photo de profil"
            sx={{ width: 100, height: 100, marginBottom: 2, cursor: 'pointer' }}
            onClick={handleAvatarClick} 
          />
          <input
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageChange}
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                fullWidth
                label="Nom d'utilisateur"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type="password"
                label="Mot de passe"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type="password"
                label="Confirmation mot de passe"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Nom Complet"
                name="nom_complet"
                value={formData.nom_complet}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Téléphone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                S'inscrire
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Box>
  );
};

export default Register;
