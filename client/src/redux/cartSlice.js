import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCartAsync = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await axios.get(`${API_URL}/api/cart/${userId}`);
  return response.data.items;
});

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartByProduct",
  async (body) => {
    try {
      const res = await axios.post(`${API_URL}/api/cart/add`, body);
      return res.data.items;
    } catch (error) {
      console.error("Error during axios.post:", error);
      throw error;
    }
  }
);

export const decreaseFromCartAsync = createAsyncThunk(
  "cart/decreaseFromCartByProduct",
  async (body) => {
    try {
      const res = await axios.post(`${API_URL}/api/cart/decrease`, body);
      return res.data.items;
    } catch (error) {
      console.error("Error during axios.post:", error);
      throw error;
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCart",
  async (userId) => {
    try {
      await axios.delete(`${API_URL}/api/cart/delete/${userId}`);
      return [];
    } catch (error) {
      console.error("Error during axios.post:", error);
      throw error;
    }
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(decreaseFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decreaseFromCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(decreaseFromCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(clearCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
