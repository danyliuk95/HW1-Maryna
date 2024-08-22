import { useDispatch, useSelector } from 'react-redux';
import { Grid, Pagination, Paper, Typography } from '@mui/material';
import { addModifier } from '@/store/slice/productsSlice';
import { useState } from 'react';

const ModifiersList = () => {
  const dispatch = useDispatch();
  const modifiers = useSelector(state => state.modifiersReducer.modifiers);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedModifiers = modifiers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const addClickModifier = (modifier) => {
    dispatch(addModifier(modifier))
  };

  return (
    <div>
      <Grid container spacing={2}>
        {paginatedModifiers.map((modifier) => (
          <Grid item xs={12} sm={6} md={3} key={modifier.id} onClick={() => addClickModifier(modifier)} className="grid-item">
            <Paper elevation={3} style={{ padding: 16 }}>
              <Typography variant="h6">{modifier.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(modifiers.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  )
};

export default ModifiersList;
