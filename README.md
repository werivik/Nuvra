# Nuvra

A modern and responsive ecommerce web application built with React.js for browsing products, managing shopping cart functionality, and completing purchases through an intuitive user interface.

## Description

Nuvra is a fully functional online shop developed as a school project to demonstrate React.js concepts and API integration. The application provides a complete shopping experience from product browsing to checkout, utilizing the Noroff Online Shop API for product data management.

Key features include:
- Dynamic product browsing with search functionality
- Detailed product pages with ratings and discount information
- Shopping cart management with quantity adjustments
- Complete checkout flow with form validation
- Responsive design for optimal user experience across devices

## Built With

- [React.js](https://reactjs.org/) - Core library for building UI components
- [React Router](https://reactrouter.com/) - For routing between pages
- [CSS Modules](https://github.com/css-modules/css-modules) - For component-specific styling
- [Noroff Online Shop API](https://docs.noroff.dev/) - Provides product data

## Getting Started

### Installing

To get started with this project, you'll need to clone the repository and install the dependencies.

1. Clone the repo:
```bash
git clone [your-repo-url]
```

2. Navigate to the project directory:
```bash
cd nuvra
```

3. Install the dependencies:
```bash
npm install
```

### Running

To run the app in development mode:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

If you encounter any issues, try installing React dependencies separately:
```bash
npm install react react-dom react-router-dom
```

## Features

**Homepage**
- Displays a curated list of products from the API
- Dynamic search bar for filtering products
- Load more functionality (shows 8 products initially)

**All Products Page**
- Complete product catalog with search functionality
- Pagination with load more feature (shows 10 products initially)

**Product Page**
- Detailed product information including title, description, images
- Price display with discount calculations
- Product ratings and reviews
- Add to cart functionality

**Shopping Cart Page**
- Cart item management with quantity adjustments
- Remove items functionality
- Real-time total price calculations

**Shipping Page**
- User information collection form
- Input validation for all fields
- Secure checkout process

**Checkout Success Page**
- Order confirmation with item summary
- Cart clearing functionality

**Contact Page**
- Contact form with validation
- Fields for full name, subject, email, and message

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style conventions and includes appropriate tests.

## Contact

[LinkedIn](https://www.linkedin.com/in/weronika-vik-0844022a6/)
[GitHub](https://github.com/werivik)

## License

This project is created for educational purposes as part of a school assignment.

## Acknowledgments

- Noroff School for providing the project requirements and API
- The React.js community for excellent documentation and resources
- All contributors who helped improve this project