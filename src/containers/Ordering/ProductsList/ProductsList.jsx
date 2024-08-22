import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@mui/material';
import '@/containers/Ordering/ProductsList/index.scss'
import { selectProduct } from '@/store/slice/productsSlice';

const ProductsList = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.productsReducer.products);

  const addProduct = (product) => {
    dispatch(selectProduct(product));
  }

  return (
    <div>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id} onClick={() => addProduct(product)} className="grid-item">
            <Paper elevation={3} style={{ padding: 16 }}>
              <Typography variant="h6">{product.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
};

export default ProductsList;
