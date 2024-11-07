import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://127.0.0.1:8000'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('nom_client', data.nom_complet);
      formData.append('adresse', data.adresse);
      formData.append('telephone', data.telephone);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('password2', data.password2);
      formData.append('role', "User");
      if (data.photo) {
        formData.append('photo_url', data.photo);
      }
      
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
        },
      }
      await axios.post(
        `${backendURL}/api/comptes/register/`,
        formData,
        config
      )
    
    } catch (error) {
      console.log(error)
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/comptes/token/`,
        { username, password },
        config
      )
      localStorage.setItem('userToken', data.access)
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)