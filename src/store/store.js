import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from '@/store/slice/productsSlice';
import { modifiersSlice } from '@/store/slice/modifiersSlice';
import { snackbarSlice } from '@/store/slice/snackbarSlice';


export const store = configureStore({
  reducer: {
    productsReducer: productsSlice.reducer,
    modifiersReducer: modifiersSlice.reducer,
    snackbar: snackbarSlice.reducer,
  },
});
