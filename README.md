# 🛒 React TypeScript E-Commerce Store

A modern, responsive e-commerce web app built with **React**, **TypeScript**, **Redux Toolkit**, and **React Query**.  
Products are sourced in real-time from the [FakeStore API](https://fakestoreapi.com/).  
Users can browse, filter by category, add items to their shopping cart, and simulate a seamless checkout experience.

---

## ✨ Features

### Product Catalog

- **Product Listing & Display**
  - Fetches all store products using React Query.
  - Displays product **title, price, category, description, rating, and image**.
  - "Add to Cart" button for each product.

- **Dynamic Category Navigation**
  - Categories dropdown is populated dynamically from the FakeStore API (not hardcoded).
  - Selecting a category filters products in real time.
  - Users can clear the filter to see all products.

### Shopping Cart

- **State Management**
  - Shopping cart state is managed using Redux Toolkit.
  - Add, update, or remove products from the cart from any part of the app.

- **Shopping Cart Component**
  - See all products in the cart with **title, image, quantity, and price**.
  - Remove items or clear the entire cart.
  - Cart total (items and price) updates in real time.

- **Session Persistence**
  - Cart data is synced to `sessionStorage` so the cart persists across page reloads and navigation.

- **Checkout Simulation**
  - "Checkout" button clears the cart in Redux and sessionStorage.
  - Users receive a visual confirmation that their cart has been cleared.

---

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/trevashworth/ecommerce.git
   cd ecommerce

   npm install

   npm run dev
