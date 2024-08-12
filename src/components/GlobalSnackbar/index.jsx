import React from 'react';
import { Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnackbar } from '../../store/slice/snackbarSlice';

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message } = useSelector((state) => state.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
    />
  );
};

export default GlobalSnackbar;
