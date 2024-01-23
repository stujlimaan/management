import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../apiService/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await getProducts();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createProductAction = createAsyncThunk(
  'products/createProduct',
  async (productData) => {
    try {
      const response = await createProduct(productData);
      return response.data;
    } catch (error) {
      // console.log(error.response, 'action');
      throw error;
    }
  }
);

export const updateProductAction = createAsyncThunk(
  'products/updateProduct',
  async ({ id, product }) => {
    try {
      console.log(id, product, 'redux action');
      const response = await updateProduct(id, product);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProductAction = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

const productApi = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createProductAction.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateProductAction.fulfilled, (state, action) => {
        console.log('jdsdhjbsd', state, action);
        const index = state.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteProductAction.fulfilled, (state, action) => {
        return state.filter((product) => product.id !== action.payload);
      });
  },
});

export default productApi.reducer;
