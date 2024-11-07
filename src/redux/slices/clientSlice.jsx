import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const clientState = {
  updateState: false,
  loading: false,
  clientList: [],
  error: "",
  response: "",
};

export const fetchClient = createAsyncThunk(
  "client/fetchClient",
  async () => {
    const response = await axios.get("http://localhost:8000/api/comptes/list/");
    return response.data;
  }
);

export const addClient = createAsyncThunk(
  "client/addClient",
  async (data) => {
    const response = await axios.post("http://localhost:8000/api/compte/register", {
      username: data.username,
      Password:data.password
    });
    return response.data;
  }
);

export const removeClient = createAsyncThunk(
  "client/removeClient",
  async (data) => {
    const response = await axios.delete(
      `http://localhost:8000/api/comptes/delete/${data}/`
    );
    return data
  }
);

// export const modifiedProduit = createAsyncThunk(
//   "produit/modifiedProduit",
//   async (data) => {
//     const response = await axios.put(
//       `http://localhost:8000/api/produits/${data.id}/`,
//       {
//         nom_produit: data.nom,
//       }
//     );
//     return response.data;
//   }
// );

const clientSlice = createSlice({
  name: "client",
  initialState: clientState,
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
      .addCase(addClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clientList.push(action.payload);
        state.response = "add";
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.clientList = action.payload;
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder.addCase(removeClient.fulfilled, (state, action) => {
      state.clientList = state.clientList.filter(
        (item) => item.id != action.payload
      );
      state.response = "delete";
    });

    // builder.addCase(modifiedProduit.fulfilled, (state, action) => {
    //   const updateItem = action.payload;
    //   const index = state.clientList.findIndex(
    //     (item) => item.id === updateItem.id
    //   );
    //   if (index!==-1) {
    //     state.clientList[index] = updateItem;
    //   }
    //   state.response = "update";
    // });
  },
});

export default clientSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
clientSlice.actions;