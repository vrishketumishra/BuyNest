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

const localProductsData = [
  {
    "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
    "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
    "rating": { "stars": 4.5, "count": 87 },
    "priceCents": 1090
  },
  {
    "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    "image": "images/products/intermediate-composite-basketball.jpg",
    "name": "Intermediate Size Basketball",
    "rating": { "stars": 4, "count": 127 },
    "priceCents": 2095
  },
  {
    "id": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    "image": "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    "name": "Adults Plain Cotton T-Shirt - 2 Pack",
    "rating": { "stars": 4.5, "count": 56 },
    "priceCents": 799,
    "type": "clothing",
    "sizeChartLink": "images/clothing-size-chart.png"
  },
  {
    "id": "54e0eccd-8f36-462b-b68a-8182611d9add",
    "image": "images/products/black-2-slot-toaster.jpg",
    "name": "2 Slot Toaster - Black",
    "rating": { "stars": 5, "count": 2197 },
    "priceCents": 1899
  },
  {
    "id": "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    "image": "images/products/6-piece-white-dinner-plate-set.jpg",
    "name": "6 Piece White Dinner Plate Set",
    "rating": { "stars": 4, "count": 37 },
    "priceCents": 2067
  },
  {
    "id": "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    "image": "images/products/6-piece-non-stick-baking-set.webp",
    "name": "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
    "rating": { "stars": 4.5, "count": 175 },
    "priceCents": 3499
  },
  {
    "id": "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    "image": "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    "name": "Plain Hooded Fleece Sweatshirt",
    "rating": { "stars": 4.5, "count": 317 },
    "priceCents": 2400
  },
  {
    "id": "77919bbe-0e56-475b-adde-4f24dfed3a04",
    "image": "images/products/luxury-tower-set-6-piece.jpg",
    "name": "Luxury Towel Set - Graphite Gray",
    "rating": { "stars": 4.5, "count": 144 },
    "priceCents": 3599
  },
  {
    "id": "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    "image": "images/products/liquid-laundry-detergent-plain.jpg",
    "name": "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
    "rating": { "stars": 4.5, "count": 305 },
    "priceCents": 2899
  },
  {
    "id": "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    "image": "images/products/knit-athletic-sneakers-gray.jpg",
    "name": "Waterproof Knit Athletic Sneakers - Gray",
    "rating": { "stars": 4, "count": 89 },
    "priceCents": 3390
  }
];

// Initialize products immediately
products = localProductsData.map((productDetails) => {
  if (productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }
  return new Product(productDetails);
});

export function loadProductsFetch() {
  // Try to load from local backend first, then fallback to external
  const backendUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api/products' 
    : 'https://supersimplebackend.dev/products';

  fetch(backendUrl)
    .then((response) => response.json())
    .then((productsData) => {
      products = productsData.map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
      console.log('Updated products from backend');
    })
    .catch((error) => {
      console.log('Using local products (backend not available)');
    });
  
  // Return immediately since products are already loaded
  return Promise.resolve();
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
