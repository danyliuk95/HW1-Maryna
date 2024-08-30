import { useDispatch, useSelector } from 'react-redux';
import { Grid, Pagination, Paper, Typography } from '@mui/material';
import '@/containers/Ordering/ProductsList/index.scss'
import { selectProduct } from '@/store/slice/productsSlice';
import { useState } from 'react';

const ProductsList = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.productsReducer.products);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const addProduct = (product) => {
    dispatch(selectProduct(product));
  }

  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <Grid container spacing={2}>
        {paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id} onClick={() => addProduct(product)} className="grid-item">
            <Paper elevation={3} style={{ padding: 16 }}>
              <Typography variant="h6">{product.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  )
};

export default ProductsList;
