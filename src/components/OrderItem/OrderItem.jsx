import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { USDollar } from '@/shared/utilities';
import { clickProduct, removeModifier, removeProduct } from '@/store/slice/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

const OrderItem = ({selectedProduct}) => {
  const dispatch = useDispatch();
  const clickedProduct = useSelector(state => state.productsReducer.clickedProduct);

  const clickOnProduct = (selectedProduct) => {
    dispatch(clickProduct(selectedProduct));
  }

  const deleteProduct = (event, selectedProduct) => {
    event.stopPropagation();
    dispatch(removeProduct(selectedProduct))
  }

  const deleteModifier = (event, selectedProduct, selectedModifier) => {
    event.stopPropagation();
    dispatch(removeModifier({productId: selectedProduct.id, modifierId: selectedModifier.id}));
  }

  return (
    <Paper
      className={`paper ${selectedProduct.id === clickedProduct?.id ? 'clicked-product' : '' }`}
      elevation={3}
      onClick={() => clickOnProduct(selectedProduct)}>
      <div className="paper-item">
        {selectedProduct.name} {USDollar.format(selectedProduct.price)}
        <Button variant="text" className="remove-button" onClick={(e) => deleteProduct(e, selectedProduct)}>X</Button>
      </div>
      <div>
        {selectedProduct.modifiers.map((selectedModifier) => (
          <div className="paper-item" key={selectedModifier.id}>
            + {selectedModifier.name} {USDollar.format(selectedModifier.price)}
            <Button variant="text"
                    className="remove-button"
                    onClick={(e) => deleteModifier(e, selectedProduct, selectedModifier)}>X</Button>
          </div>
        ))}
      </div>
    </Paper>
  )
}

export default OrderItem;
