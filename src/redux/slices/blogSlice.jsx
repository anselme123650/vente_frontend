import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const blogState = {
  updateState: false,
  loading: false,
  blogList: [],
  error: "",
  response: "",
};

export const fetchBlog = createAsyncThunk(
  "blog/fetchBlog",
  async () => {
    const response = await axios.get("http://localhost:8000/api/blogs/all/");
    return response.data;
  }
);

export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (data) => {
    const response = await axios.post("http://localhost:8000/api/blogs/", {
      titre: data.titre,
      date: data.date,
      description: data.description
    });
    return response.data;
  }
);

export const removeBlog = createAsyncThunk(
  "blog/removeBlog",
  async (data) => {
    const response = await axios.delete(
      `http://localhost:8000/api/blogs/${data}/`
    );
    return data
  }
);

export const modifiedBlog = createAsyncThunk(
  "blog/modifiedBlog",
  async (data) => {
    const response = await axios.put(
      `http://localhost:8000/api/blogs/${data.id}/`,
      {
        titre: data.titre,
        date: data.date,
        description: data.description
      }
    );
    return response.data;
  }
);

const BlogSlice = createSlice({
  name: "Blog",
  initialState: blogState,
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
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogList.push(action.payload);
        state.response = "add";
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.blogList = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder.addCase(removeBlog.fulfilled, (state, action) => {
      state.blogList = state.blogList.filter(
        (item) => item.id != action.payload
      );
      state.response = "delete";
    });

    builder.addCase(modifiedBlog.fulfilled, (state, action) => {
      const updateItem = action.payload;
      const index = state.blogList.findIndex(
        (item) => item.id === updateItem.id
      );
      if (index !== -1) {
        state.blogList[index] = updateItem;
      }
      state.response = "update";
    });
  },
});

export default BlogSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
  BlogSlice.actions;