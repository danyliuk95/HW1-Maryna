import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showSnackbar } from '@/store/slice/snackbarSlice';
import { BASE_URL } from '@/shared/utilities';

const initialState = {
  modifiers: [],
  selectedModifiers: [],
  isLoading: false,
  error: null,
};

export const fetchModifiers = createAsyncThunk(
  'modifiers/fetchModifiers',
  async () => {
    const res = await axios(`${BASE_URL}/modifiers`)
    return await res.data
  }
);

export const postModifier = createAsyncThunk(
  'modifiers/postModifier',
  async (data, { dispatch }) => {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/modifiers`,
      data: {name: data.name, price: +data.price}
    });
    dispatch(showSnackbar('Modifier created'));
    return await res.data
  }
);

export const modifiersSlice = createSlice({
  name: 'modifiers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchModifiers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchModifiers.fulfilled, (state, action) => {
      state.isLoading = false
      state.modifiers = action.payload
    })
    builder.addCase(fetchModifiers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(postModifier.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postModifier.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(postModifier.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
});
