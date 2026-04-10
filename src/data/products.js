import {formatCurrency} from '../utils/money.js';

const BASE_URL = import.meta.env.BASE_URL;

export function getProduct(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image.startsWith('http') 
      ? productDetails.image 
      : `${BASE_URL}${productDetails.image}`;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `${BASE_URL}images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}

export let products = [];

export function loadProductsFetch() {
  console.log('Loading products from:', `${BASE_URL}backend/products.json`);
  const promise = fetch(
    `${BASE_URL}backend/products.json`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }).then((productsData) => {
    console.log('Products data received:', productsData.length, 'items');
    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log(`✅ Successfully loaded ${products.length} products`);
  }).catch((error) => {
    console.error('❌ Error loading products:', error.message);
  });
  return promise;
}

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('load products');
    fun();
  });
  xhr.addEventListener('error', (error) => {
    console.log('Unexpected error. Please try again later.');
  });
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
