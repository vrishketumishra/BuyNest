# BuyNest - Modern E-Commerce Web Application

A fully functional e-commerce web application built with React, featuring a dynamic product catalog, shopping cart management, order tracking, and a complete checkout flow.

![BuyNest](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)

## 🌐 Live Demo

**[View Live Demo](https://vrishketumishra.github.io/BuyNest/)**

## ✨ Features

- **Product Catalog**: Browse 42+ products with detailed information, ratings, and pricing
- **Shopping Cart**: Add/remove items, update quantities, real-time cart count updates
- **Checkout Flow**: Complete order placement with delivery options
- **Order Management**: View order history and track package status
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **Fast Performance**: Optimized with Vite for lightning-fast development and production builds
- **Image Optimization**: Smart asset loading with environment-aware path resolution

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks and functional components
- **React Router DOM** - Client-side routing and navigation
- **Vite** - Next-generation frontend tooling and build tool
- **CSS3** - Custom styling with modern CSS features
- **JavaScript (ES6+)** - Modern JavaScript with classes and modules

### Deployment
- **GitHub Pages** - Static site hosting
- **Git** - Version control


## 🎯 Key Features Explained

### Product Management
- Products are loaded from a local JSON file containing 42 items
- Each product includes: ID, image, name, rating, price, and type
- Support for special product types (e.g., clothing with size charts)

### Shopping Cart
- Persistent cart state using localStorage
- Add/remove products with quantity management
- Real-time cart count in header
- Price calculations with proper currency formatting

### Routing & Navigation
- Client-side routing with React Router
- Smooth transitions between pages
- Back navigation support
- Deep linking to orders and tracking pages

### Image & Asset Handling
- Environment-aware asset paths using `import.meta.env.BASE_URL`
- Works seamlessly in both development and production
- Optimized for GitHub Pages deployment with custom base path

## 🌍 Deployment

### Deploy to GitHub Pages

1. Update `package.json` with your repository name
2. Run the deploy command:
   ```bash
   npm run deploy
   ```
3. Your site will be available at: `https://[username].github.io/[repository]/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready for deployment to any static hosting service.

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` file includes:
- React plugin for JSX support
- Development server on port 3000
- Production base path configuration for GitHub Pages

### Environment Variables

- `import.meta.env.BASE_URL` - Automatically set by Vite based on build configuration
- Development: `/`
- Production (GitHub Pages): `/BuyNest/`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Vrishketu Mishra**
- GitHub: [@vrishketumishra](https://github.com/vrishketumishra)
- LinkedIn: [vrishketumishra](https://linkedin.com/in/vrishketumishra)

## 🙏 Acknowledgments

- Inspired by Amazon's e-commerce platform
- Product images and data for educational purposes
- Built as part of web development learning journey

---

**⭐ Star this repo if you found it helpful!**
