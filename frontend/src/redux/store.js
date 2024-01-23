import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productActions';

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
