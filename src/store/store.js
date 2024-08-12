import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './slice/productsSlice';
import { modifiersSlice } from './slice/modifiersSlice';
import { snackbarSlice } from './slice/snackbarSlice';


export const store = configureStore({
  reducer: {
    productsReducer: productsSlice.reducer,
    modifiersReducer: modifiersSlice.reducer,
    snackbar: snackbarSlice.reducer,
  },
});
