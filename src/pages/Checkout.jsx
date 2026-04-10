import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { getProduct } from '../data/products.js';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOptions.js';
import '../styles/checkout.css';

function Checkout({ onUpdateCart }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subtotalCents, setSubtotalCents] = useState(0);
  const [shippingCents, setShippingCents] = useState(0);
  const [totalCents, setTotalCents] = useState(0);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const items = cart.map((cartItem) => {
      const product = getProduct(cartItem.productId);
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      return {
        ...cartItem,
        product,
        deliveryOption
      };
    });
    setCartItems(items);
    calculateTotals(items);
  };

  const calculateTotals = (items) => {
    let subtotal = 0;
    let shipping = 0;
    items.forEach((item) => {
      subtotal += item.product.priceCents * item.quantity;
      shipping += item.deliveryOption.priceCents;
    });
    const total = subtotal + shipping;
    setSubtotalCents(subtotal);
    setShippingCents(shipping);
    setTotalCents(total);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    loadCartItems();
    onUpdateCart();
  };

  const handleDeliveryOptionChange = (productId, deliveryOptionId) => {
    updateDeliveryOption(productId, deliveryOptionId);
    loadCartItems();
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="main">
        <h1 className="page-title">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="main">
      <h1 className="page-title">Shopping Cart ({cartItems.length} items)</h1>
      <div className="checkout-grid">
        <div className="order-summary">
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item-container">
              <div className="cart-item-details-grid">
                <img className="cart-item-image" src={`/BuyNest${item.product.image}`} alt={item.product.name} />
                <div>
                  <div className="product-name">{item.product.name}</div>
                  <div className="product-price">${(item.product.priceCents / 100).toFixed(2)}</div>
                  <div className="quantity-label">Quantity: <span className="quantity-value">{item.quantity}</span></div>
                  <button className="button-secondary" onClick={() => handleRemoveItem(item.productId)} style={{ marginTop: '10px', padding: '8px 16px', fontSize: '14px' }}>
                    Remove
                  </button>
                </div>
                <div>
                  <div className="delivery-date">Delivery: {item.deliveryOption.deliveryDays} days</div>
                  <div className="delivery-options">
                    <div className="delivery-options-title">Choose delivery speed:</div>
                    {deliveryOptions.map((option) => (
                      <label key={option.id} className="delivery-option">
                        <input
                          type="radio"
                          name={`delivery-${item.productId}`}
                          className="delivery-option-input"
                          checked={item.deliveryOptionId === option.id}
                          onChange={() => handleDeliveryOptionChange(item.productId, option.id)}
                        />
                        <div>
                          <div className="delivery-option-date">{option.deliveryDays} days</div>
                          <div className="delivery-option-price">
                            {option.priceCents === 0 ? 'FREE' : `$${(option.priceCents / 100).toFixed(2)}`}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="payment-summary">
          <div className="payment-summary-title">Order Summary</div>
          <div className="payment-summary-row">
            <div>Subtotal:</div>
            <div className="payment-summary-money">${(subtotalCents / 100).toFixed(2)}</div>
          </div>
          <div className="payment-summary-row">
            <div>Shipping:</div>
            <div className="payment-summary-money">${(shippingCents / 100).toFixed(2)}</div>
          </div>
          <div className="payment-summary-row subtotal-row">
            <div>Total:</div>
            <div className="payment-summary-money">${(totalCents / 100).toFixed(2)}</div>
          </div>
          <button className="place-order-button button-primary" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
