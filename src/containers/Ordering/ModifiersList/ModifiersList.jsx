import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@mui/material';
import { addModifier } from '@/store/slice/productsSlice';

const ModifiersList = () => {
  const dispatch = useDispatch();
  const modifiers = useSelector(state => state.modifiersReducer.modifiers);

  const addClickModifier = (modifier) => {
    dispatch(addModifier(modifier))
  };

  return (
    <div>
      <Grid container spacing={2}>
        {modifiers.map((modifier) => (
          <Grid item xs={12} sm={6} md={3} key={modifier.id} onClick={() => addClickModifier(modifier)} className="grid-item">
            <Paper elevation={3} style={{ padding: 16 }}>
              <Typography variant="h6">{modifier.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
};

export default ModifiersList;
