import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ordering from './containers/Ordering';
import ProductForm from './containers/ProductForm';
import GlobalSnackbar from './components/GlobalSnackbar';
import ModifierForm from './containers/ModifierForm';

function App() {
  return (
    <div className="navContainer">
      <Navbar />

      <Routes>
        <Route path="/"  element={<Ordering/>} />
        <Route path="/create-product"  element={<ProductForm/>}/>
        <Route path="/create-modifier"  element={<ModifierForm/>}/>
      </Routes>
      <GlobalSnackbar />
    </div>
  )
}

export default App;
