import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showSnackbar } from '@/store/slice/snackbarSlice';

const initialState = {
  products: [],
  selectedProducts: [],
  clickedProduct: null,
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await axios('http://localhost:5001/products')
    return await res.data
  }
);

export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (data, { dispatch }) => {
    const res = await axios({
      method: 'post',
      url:'http://localhost:5001/products',
      data: {name: data.name, price: +data.price}
    });
    dispatch(showSnackbar('Product created'));
    return await res.data
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct(state, action) {
      state.selectedProducts.push({...action.payload, id: state.selectedProducts.length ? state.selectedProducts[state.selectedProducts.length - 1].id + 1 : 1, modifiers: []});
    },
    clickProduct(state, action) {
      state.clickedProduct = action.payload;
    },
    removeProduct(state, action) {
      state.selectedProducts = state.selectedProducts.filter((filteredProduct) => filteredProduct.id !== action.payload.id);
    },
    addModifier(state, action) {
      const chosenProduct = state.selectedProducts.find((el) => el.id === state.clickedProduct?.id)
      if (chosenProduct) {
        chosenProduct.modifiers.push({...action.payload, id: chosenProduct.modifiers.length ? chosenProduct.modifiers[chosenProduct.modifiers.length - 1].id + 1 : 1});
      }
    },
    removeModifier(state, action) {
      const findProduct = state.selectedProducts.find((el) =>
        el.id === action.payload.productId);
      findProduct.modifiers = findProduct.modifiers.filter((filteredModifier) => filteredModifier.id !== action.payload.modifierId)
    },
    clearOrder(state, action) {
      state.selectedProducts = [];
      state.clickedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.products = action.payload
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(postProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(postProduct.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

  },
})

export const { selectProduct, clickProduct, removeProduct, addModifier, removeModifier, clearOrder } = productsSlice.actions
