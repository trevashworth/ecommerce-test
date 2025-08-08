import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../Navbar.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const Navbar = () => {
  const { user } = useAuth();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);



  return (
    <div className="nav-container">
      <Link to="/" className="link">Home</Link>
      <Link to="cart" className="link cart-link">
        Cart
        {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
      </Link>
      


      {user ? (
        <>
          <Link to="profile" className="link">Profile</Link>
          <Link to="logout" className="link">Logout</Link>
        </>
      ) : (
        <>
          <Link to="register" className="link">Register</Link>
          <Link to="login" className="link">Login</Link>
        </>
      )}
    </div>
  );
}

export default Navbar