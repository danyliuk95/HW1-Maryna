import { Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import ProductForm from '@/containers/ProductForm/ProductForm';
import GlobalSnackbar from '@/components/GlobalSnackbar/GlobalSnackbar';
import ModifierForm from '@/containers/ModifierForm/ModifierForm';
import Ordering from '@/containers/Ordering/Ordering';
import { ROUTES } from '@/shared/utilities';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path={ROUTES.ORDERING} element={<Ordering/>} />
        <Route path={ROUTES.CREATE_PRODUCT}  element={<ProductForm/>}/>
        <Route path={ROUTES.CREATE_MODIFIER}  element={<ModifierForm/>}/>
      </Routes>
      <GlobalSnackbar />
    </div>
  )
}

export default App;
