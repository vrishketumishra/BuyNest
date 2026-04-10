import { Link } from 'react-router-dom';
import '../styles/buynest-header.css';

const BASE_URL = import.meta.env.BASE_URL;

function Header({ cartQuantity }) {
  return (
    <header className="buynest-header">
      <div className="buynest-header-left-section">
        <Link to="/" className="header-link">
          <div className="buynest-logo">
            <span className="logo-buy">Buy</span>
            <span className="logo-nest">Nest</span>
          </div>
        </Link>
      </div>

      <div className="buynest-header-middle-section">
        <input className="search-bar" type="text" placeholder="Search products..." />
        <button className="search-button">
          <img className="search-icon" src={`${BASE_URL}images/icons/search-icon.png`} alt="Search" />
        </button>
      </div>

      <div className="buynest-header-right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="returns-text">Returns</span>
          <span className="orders-text">& Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={`${BASE_URL}images/icons/cart-icon.png`} alt="Cart" />
          <span className="cart-text">Cart</span>
          {cartQuantity > 0 && (
            <div className="cart-quantity">{cartQuantity}</div>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
