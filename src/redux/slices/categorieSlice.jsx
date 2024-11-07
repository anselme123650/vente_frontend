import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const categorieState = {
  updateState: false,
  loading: false,
  categorieList: [],
  error: "",
  response: "",
};

export const fetchCategorie = createAsyncThunk(
  "categorie/fetchCategorie",
  async () => {
    const response = await axios.get("http://localhost:8000/api/categories/all/");
    return response.data;
  }
);

export const addCategorie = createAsyncThunk(
  "categorie/addCategorie",
  async (data) => {
    const response = await axios.post("http://localhost:8000/api/categories/", {
      nom_categorie: data.nom,
    });
    return response.data;
  }
);

export const removeCategorie = createAsyncThunk(
  "categorie/removeCategorie",
  async (data) => {
    const response = await axios.delete(
      `http://localhost:8000/api/categories/${data}/`
    );
    return data
  }
);

export const modifiedCategorie = createAsyncThunk(
  "categorie/modifiedCategorie",
  async (data) => {
    const response = await axios.put(
      `http://localhost:8000/api/categories/${data.id}/`,
      {
        nom_categorie: data.nom,
      }
    );
    return response.data;
  }
);

const categorieSlice = createSlice({
  name: "categorie",
  initialState: categorieState,
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
      .addCase(addCategorie.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategorie.fulfilled, (state, action) => {
        state.loading = false;
        state.categorieList.push(action.payload);
        state.response = "add";
      })
      .addCase(addCategorie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchCategorie.fulfilled, (state, action) => {
        state.categorieList = action.payload;
      })
      .addCase(fetchCategorie.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder.addCase(removeCategorie.fulfilled, (state, action) => {
      state.categorieList = state.categorieList.filter(
        (item) => item.id != action.payload
      );
      state.response = "delete";
    });

    builder.addCase(modifiedCategorie.fulfilled, (state, action) => {
      const updateItem = action.payload;
      const index = state.categorieList.findIndex(
        (item) => item.id === updateItem.id
      );
      if (index!==-1) {
        state.categorieList[index] = updateItem;
      }
      state.response = "update";
    });
  },
});

export default categorieSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
  categorieSlice.actions;