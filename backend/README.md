# BuyNest Backend

Simple Node.js/Express backend API for the BuyNest e-commerce application.

## Features

- RESTful API for products and orders
- CORS enabled for frontend integration
- In-memory order storage
- Health check endpoint

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product by ID |
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get single order by ID |
| GET | `/api/health` | Health check |

## Installation

```bash
npm install
```

## Usage

### Development (with auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3001`

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **ES Modules** - Modern JavaScript module system
