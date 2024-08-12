import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import './index.css'
import { clearOrder, clickProduct, removeModifier, removeProduct } from '../../../store/slice/productsSlice';
import Button from '@mui/material/Button';
import { showSnackbar } from '../../../store/slice/snackbarSlice';

const OrderingList = () => {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(state => state.productsReducer.selectedProducts);
  const clickedProduct = useSelector(state => state.productsReducer.clickedProduct);

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const clickOnProduct = (selectedProduct) => {
    dispatch(clickProduct(selectedProduct));
  }

  const removeClick = (event, selectedProduct) => {
    event.stopPropagation();
    dispatch(removeProduct(selectedProduct))
  }

  const removeModifierClick = (event, selectedProduct, selectedModifier) => {
    event.stopPropagation();
    dispatch(removeModifier({productId: selectedProduct.id, modifierId: selectedModifier.id}));
  }

  const calcSum = () => {
    let sum = 0;
    selectedProducts.forEach(product => {
      sum += product.price
      product.modifiers.forEach(modifier => {
        sum += modifier.price;
      });
    });

    return sum;
  };

  const clearButton = () => {
    dispatch(clearOrder());
  };

  const pay = () => {
    clearButton();
    dispatch(showSnackbar('Thank you for your order!'));
  };

  return (
    <div>
      <Stack spacing={2}>
        {selectedProducts.map((selectedProduct) => (
          <Paper
            className={`paper ${selectedProduct.id === clickedProduct?.id ? 'clicked-product' : '' }`}
            elevation={3}
            key={selectedProduct.id}
            onClick={() => clickOnProduct(selectedProduct)}>
            <div className="paper-item">
              {selectedProduct.name} {USDollar.format(selectedProduct.price)}
              <Button variant="text" className="remove-button" onClick={(e) => removeClick(e, selectedProduct)}>X</Button>
            </div>
            <div>
              {selectedProduct.modifiers.map((selectedModifier) => (
                <div className="paper-item" key={selectedModifier.id}>
                  + {selectedModifier.name} {USDollar.format(selectedModifier.price)}
                  <Button variant="text"
                          className="remove-button"
                          onClick={(e) => removeModifierClick(e, selectedProduct, selectedModifier)}>X</Button>
                </div>
              ))}
            </div>

          </Paper>
        ))}
      </Stack>
      <Paper elevation={3}
             className="paper-sum">
        <div>Sum: </div>
        <div>{USDollar.format(calcSum())}</div>
      </Paper>
      <div className="paper-finish">
        <Paper>
          <Button onClick={clearButton}>Cancel</Button>
        </Paper>
        <Paper>
          <Button onClick={pay}>Pay</Button>
        </Paper>
      </div>
    </div>
  )
};

export default OrderingList;
