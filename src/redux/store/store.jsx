import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slices/authSlice";
import messageReducer from "../slices/message";
import categorieReducer from "../slices/categorieSlice";
import produitReducer from "../slices/produitSlice";
import { authApi } from '../../service/authService';
import clientReducer from "../slices/clientSlice"
import commandeReducer from "../slices/commandeSlice"
import blogReducer from "../slices/blogSlice"
const reducer = {
  auth: authReducer,
  message: messageReducer,
  categorieKey:categorieReducer,
  produitKey:produitReducer,
  clientKey:clientReducer,
  commandeKey:commandeReducer,
  blogKey:blogReducer,
  [authApi.reducerPath]: authApi.reducer,
}

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
})

export default store;