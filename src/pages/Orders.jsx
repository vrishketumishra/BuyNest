import { Link } from 'react-router-dom';
import '../styles/orders.css';

function Orders() {
  const sampleOrders = [
    {
      id: '27cba69d-4c3d-4098-b42d-ac7fa62b7664',
      date: 'August 12',
      total: '$35.06',
      products: [
        {
          name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
          image: '/images/products/athletic-cotton-socks-6-pairs.jpg',
          deliveryDate: 'August 15',
          quantity: 1
        },
        {
          name: 'Adults Plain Cotton T-Shirt - 2 Pack',
          image: '/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
          deliveryDate: 'August 19',
          quantity: 2
        }
      ]
    },
    {
      id: 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d',
      date: 'June 10',
      total: '$41.90',
      products: [
        {
          name: 'Intermediate Size Basketball',
          image: '/images/products/intermediate-composite-basketball.jpg',
          deliveryDate: 'June 17',
          quantity: 2
        }
      ]
    }
  ];

  return (
    <div className="main">
      <h1 className="page-title">Your Orders</h1>
      <div className="orders-grid">
        {sampleOrders.map((order) => (
          <div key={order.id} className="order-container">
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>{order.date}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>{order.total}</div>
                </div>
              </div>
              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
              </div>
            </div>

            <div className="order-details-grid">
              {order.products.map((product, index) => (
                <div key={index} style={{ display: 'contents' }}>
                  <img className="order-product-image" src={product.image} alt={product.name} />
                  <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-delivery-date">Arriving on: {product.deliveryDate}</div>
                    <div className="product-quantity">Quantity: {product.quantity}</div>
                    <button className="buy-again-button button-primary">
                      <img className="buy-again-icon" src="/images/icons/buy-again.png" alt="Buy Again" />
                      <span>Buy it again</span>
                    </button>
                  </div>
                  <div className="product-actions">
                    <Link to={`/tracking?orderId=${order.id}&productId=${index}`}>
                      <button className="track-package-button button-secondary">
                        Track package
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
