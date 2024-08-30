import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    open: false,
    message: '',
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
