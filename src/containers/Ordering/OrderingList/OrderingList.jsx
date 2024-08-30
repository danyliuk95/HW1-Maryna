import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import '@/containers/Ordering/OrderingList/index.scss'
import { clearOrder } from '@/store/slice/productsSlice';
import Button from '@mui/material/Button';
import { showSnackbar } from '@/store/slice/snackbarSlice';
import { USDollar } from '@/shared/utilities';
import OrderItem from '@/components/OrderItem/OrderItem';

const OrderingList = () => {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(state => state.productsReducer.selectedProducts);
  const calcSum = () => {
   return selectedProducts.reduce((sum, product) => {
      const modifiersSum = product.modifiers.reduce((modifierSum, modifier) => {
        return modifierSum + modifier.price
      }, 0)
      return sum + product.price + modifiersSum
    }, 0)
  }

  const clear = () => {
    dispatch(clearOrder());
  };

  const pay = () => {
    clear();
    dispatch(showSnackbar('Thank you for your order!'));
  };

  return (
    <div>
      <Stack spacing={2}>
        {selectedProducts.map((selectedProduct) => (
          <OrderItem key={selectedProduct.id} selectedProduct={selectedProduct} />
        ))}
      </Stack>
      <Paper elevation={3}
             className="paper-sum">
        <div>Sum: </div>
        <div>{USDollar.format(calcSum())}</div>
      </Paper>
      <div className="paper-finish">
        <Paper>
          <Button onClick={clear}>Cancel</Button>
        </Paper>
        <Paper>
          <Button onClick={pay}>Pay</Button>
        </Paper>
      </div>
    </div>
  )
};

export default OrderingList;
