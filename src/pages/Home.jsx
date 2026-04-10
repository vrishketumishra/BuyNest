import { useState, useEffect } from 'react';
import { products, loadProductsFetch } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import '../styles/home.css';

function Home({ cartQuantity, onAddToCart }) {
  const [productsList, setProductsList] = useState(products);

  useEffect(() => {
    // Products are already loaded, just trigger a re-render if backend updates them
    loadProductsFetch().then(() => {
      setProductsList([...products]);
    });
  }, []);

  return (
    <div className="main">
      <h1 className="page-title">Featured Products</h1>
      <div className="products-grid">
        {productsList.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;
