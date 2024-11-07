import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = 'http://localhost:8000/api/commandes/';
const commandeState = {
    updateState: false,
    loading: false,
    commandeList: [],
    error: null,
    response: "",
    status: 'idle',
};
export const fetchCommande = createAsyncThunk(
    "commande/fetchCommande",
    async () => {
        const response = await axios.get("http://localhost:8000/api/commandes/all/");
        return response.data;
    }
);
export const sendCartData = createAsyncThunk(
    'cart/sendCartData',
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, cartData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const removeCommande = createAsyncThunk(
    "commande/removeComnande",
    async (data) => {
        const response = await axios.delete(
            `http://localhost:8000/api/commandes/delete/${data}/`
        );
        return data
    }
);

const commandeSlice = createSlice({
    name: 'commande',
    initialState: commandeState,
    reducers: {
        changeStateTrue: (state) => {
            state.updateState = true;
        },
        changeStateFalse: (state) => {
            state.updateState = false;
        },
        clearResponse: (state) => {
            state.response = "";
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchCommande.fulfilled, (state, action) => {
                state.commandeList = action.payload;
            })
            .addCase(fetchCommande.rejected, (state, action) => {
                state.error = action.error.message;
            });
        builder
            .addCase(sendCartData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendCartData.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(sendCartData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        builder.addCase(removeCommande.fulfilled, (state, action) => {
            state.commandeList = state.commandeList.filter(
                (item) => item.id != action.payload
            );
            state.response = "delete";
        });
    },
});
export default commandeSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
    commandeSlice.actions;
