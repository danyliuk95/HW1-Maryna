import {Link} from 'react-router-dom';
import '@/components/Navbar/index.scss'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar__button'>
        <Link to="/">Ordering</Link>
      </div>
      <div className='navbar__button'>
        <Link to="/create-product">Create Product</Link>
      </div>
      <div className='navbar__button'>
        <Link to="/create-modifier">Create Modifier</Link>
      </div>
    </div>
  )
};

export default Navbar;
