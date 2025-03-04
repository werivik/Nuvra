import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import Checkout from './pages/Checkout/Checkout';
import Contact from './pages/Contact/Contact';
import Shipping from './pages/Shipping/Shipping';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { ShoppingCartProvider } from './pages/ShoppingCart/ShoppingCart';

function App() {
  return (
    <Router>
      <ShoppingCartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/checkoutsuccess" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping" element={<Shipping />} />
        </Routes>
        <Footer />
      </ShoppingCartProvider>
    </Router>
  );
}

export default App;


