import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../redux/slices/authActions'
import { Box, Typography, FormControl, FormLabel, TextField, Button, Card, Paper } from "@mui/material";
import Error from "../../components/Error";



function Login() {
    const { loading, userToken, userInfo, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        if (userToken) {
            if (userInfo) {
                if (userInfo.userinfo.role == 'User') {
                    navigate('/')
                } else {
                    navigate('/admin/dashboard');
                }
            }

        }
    }, [navigate, userToken])
    const handleLogin = (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password
        }
        dispatch(userLogin(data))
    };
    return (
        <Box sx={{p:3}}>
                  <Typography variant="h5" component="h2" sx={{textAlign:'center'}} gutterBottom>
                Connexion
            </Typography>
      <Card sx={{ width: '600px', margin: 'auto'}}>
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2,  }}
            >
                <FormControl>
                    <FormLabel htmlFor="username">Nom'utilisateur</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        name="username"
                        autoComplete="Username"
                        variant="outlined"
                        placeholder="votre nom d'utilisateur"
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                        value={username}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Mot de passe</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="Votre mot de passe"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        value={password}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                >
                    se connecter
                </Button>
                {error && <Error>{error}</Error>}
            </Box>
        </Card>
      </Box>
        

    )
}

export default Login
