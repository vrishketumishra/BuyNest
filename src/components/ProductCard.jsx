import { useState } from 'react';
import { addToCart } from '../data/cart.js';

function ProductCard({ product, onAddToCart }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    setAddedToCart(true);
    onAddToCart();
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={`.${product.image}`} alt={product.name} />
      </div>

      <div className="product-name">{product.name}</div>

      <div className="product-rating-container">
        <img className="product-rating-stars" src={`.${product.getStarsUrl()}`} alt="Rating" />
        <div className="product-rating-count">{product.rating.count}</div>
      </div>

      <div className="product-price">${(product.priceCents / 100).toFixed(2)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {product.extraInfoHTML() && (
        <div dangerouslySetInnerHTML={{ __html: product.extraInfoHTML().replace('href="images/', 'href="./images/') }} />
      )}

      <div className="product-spacer"></div>

      <div className={`added-to-cart ${addedToCart ? 'show' : ''}`}>
        <img src="./images/icons/checkmark.png" alt="Added" />
        <span>Added to cart</span>
      </div>

      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;