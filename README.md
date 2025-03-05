# Nuvra
## Javascript Framework CA - React

### Project Overview

Nuvra is a modern and responsive Ecommerce web application built for a school project to apply React.js concepts. The goal of this project was to design and develop a fully functional online shop using React, React Router and API intergration.

The application interacts with the Noroff Online Shop API to fetch products, display product listings and manage shopping cart functionality. The app allows users to browse products, view individual product details, add items to their cart and proceed through a checckout flow.

### Features

- Homepage: Displays a list of products fetched from the API, with a dynamic search bar that filters products based on the user's input. Product list also limits the products shown to 8 and gives a button to load more.

- All Product Page: Displays a list of products fetched fom the API, with a dynamic search bar that filters products based on the user's input. Product list also limits the products shown to 10 and gives a button to load more.
 
 - Product Page: Shows detailed informaion about a product, including the title, description, image, price, rating and discount (if available). Users can add products to their cart from here. 

 - Shopping Cart Page: Displays products added to the cart by the user, allowing users to adjust quantities, remove items, and view their total price.

 - Shipping Page: Collects user's information such as First and Last name, address and payment details. Validates inputs and navigates to the checkout page upon successful submission.

 - Checkout Success Page: Lists all cart items, and confirms the user's order and clears the cart.

 - Contact Page: Includes a form with validation for full name, subject, email and text.

 ### Tech Stack

 - React.js: Core library for building UI components.
 - React Router: For routing between pages.
 - CSS Modules: For component-specific styling.
 - Noroff Online Shop API: Provides product data.

 ### Setup

 1. Install dependencies by writing "npm install" in the terminal.
 2. Start the development server by writing "npm start" in the terminal.

 If something goes wrong, try installing react dependencies by writing "npm install react"/ "npm install react-dom-router"/"npm install react react-router" in the terminal and try starting the server again.