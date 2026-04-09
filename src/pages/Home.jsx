import { useState, useEffect } from 'react';
import { products, loadProductsFetch } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import '../styles/home.css';

function Home({ cartQuantity, onAddToCart }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProductsFetch().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="main">
        <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <h1 className="page-title">Featured Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;
