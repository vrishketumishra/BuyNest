import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import Tracking from './pages/Tracking.jsx';
import { cart } from './data/cart.js';
import './styles/global.css';

function App() {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    updateCartQuantity();
  }, []);

  const updateCartQuantity = () => {
    let quantity = 0;
    cart.forEach((cartItem) => {
      quantity += cartItem.quantity;
    });
    setCartQuantity(quantity);
  };

  return (
    <Router>
      <div className="app">
        <Header cartQuantity={cartQuantity} />
        <Routes>
          <Route path="/" element={<Home cartQuantity={cartQuantity} onAddToCart={updateCartQuantity} />} />
          <Route path="/checkout" element={<Checkout onUpdateCart={updateCartQuantity} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;