import { BrowserRouter as Router, Routes, Route } from 'react-dom';
import { ShoppingCartProvider } from './pages/ShoppingCart/ShoppingCart';

import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import Checkout from './pages/Checkout/Checkout';
import Contact from './pages/Contact/Contact';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <ShoppingCartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </ShoppingCartProvider>
  );
}

export default App;
