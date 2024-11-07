import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null
  const userInfo = localStorage.getItem('userInfo')
  ? localStorage.getItem('userInfo')
  : null

const initialState = {
  loading: false,
  userInfo: userInfo,
  userToken,
  userTokenRefresh: null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.userTokenRefresh = null
      state.error = null
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; 
        state.userToken = action.payload.access;
        state.userTokenRefresh = action.payload.refresh; 
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // enregistrement réussi
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})
export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer