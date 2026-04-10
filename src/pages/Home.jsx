import { useState, useEffect } from 'react';
import { products, loadProductsFetch } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import '../styles/home.css';

function Home({ cartQuantity, onAddToCart }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadProductsFetch()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading products:', err);
        setError(true);
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

  if (error || products.length === 0) {
    return (
      <div className="main">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Unable to load products</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            The product server might be temporarily unavailable.
          </p>
          <button 
            className="button-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
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