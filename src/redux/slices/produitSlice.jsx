import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const produitState = {
  updateState: false,
  loading: false,
  produitList: [],
  error: "",
  response: "",
};
const config = {
  headers: {
    'Content-Type': 'multipart/form-data', 
  }
};
export const fetchProduit = createAsyncThunk(
  "produit/fetchProduit",
  async () => {
    const response = await axios.get("http://localhost:8000/api/produits/all/");
    return response.data;
  }
);

export const addProduit = createAsyncThunk(
  "produit/addProduit",
  async (data, { getState }) => {
    // Créer un objet FormData
    const formData = new FormData();
    formData.append('nom_produit', data.nom);
    formData.append('prix', data.prix);
    formData.append('description', data.description);
    formData.append('qte_stock', data.qte);
    formData.append('categorie', data.categorie);
    if (data.photo) {
      formData.append('image_url', data.photo); 
    }

    // Configuration des headers, notamment pour l'upload de fichiers
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };

    const response = await axios.post("http://localhost:8000/api/produits/", formData, config);
    return response.data;
  }
);

export const removeProduit = createAsyncThunk(
  "produit/removeProduit",
  async (data) => {
    const response = await axios.delete(
      `http://localhost:8000/api/produits/${data}/`
    );
    return data
  }
);

export const modifiedProduit = createAsyncThunk(
  "produit/modifiedProduit",
  async (data) => {
    const response = await axios.put(
      `http://localhost:8000/api/produits/${data.id}/`,
      {
        nom_produit: data.nom,
      }
    );
    return response.data;
  }
);

const produitSlice = createSlice({
  name: "produit",
  initialState: produitState,
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
      .addCase(addProduit.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduit.fulfilled, (state, action) => {
        state.loading = false;
        state.produitList.push(action.payload);
        state.response = "add";
      })
      .addCase(addProduit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchProduit.fulfilled, (state, action) => {
        state.produitList = action.payload;
      })
      .addCase(fetchProduit.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder.addCase(removeProduit.fulfilled, (state, action) => {
      state.produitList = state.produitList.filter(
        (item) => item.id != action.payload
      );
      state.response = "delete";
    });

    builder.addCase(modifiedProduit.fulfilled, (state, action) => {
      const updateItem = action.payload;
      const index = state.produitList.findIndex(
        (item) => item.id === updateItem.id
      );
      if (index!==-1) {
        state.produitList[index] = updateItem;
      }
      state.response = "update";
    });
  },
});

export default produitSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
produitSlice.actions;