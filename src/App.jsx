import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './pages/Contact';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import AddProduct from './pages/admin/AddProduct';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

// Component để tự động cuộn lên đầu trang khi chuyển route và xử lý hiệu ứng reveal
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Cuộn lên đầu trang
    window.scrollTo(0, 0);

    // 2. Xử lý hiệu ứng scroll reveal cho toàn bộ trang
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      const elementVisible = 100;

      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('is-visible');
        }
      });
    };

    // Khởi chạy ngay lần đầu
    setTimeout(handleReveal, 100);

    window.addEventListener('scroll', handleReveal);
    
    return () => {
      window.removeEventListener('scroll', handleReveal);
    };
  }, [pathname]);

  return null;
};

// Layout cho trang người dùng
const PublicLayout = ({ children }) => (
  <CartProvider>
    <div className="app-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  </CartProvider>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Các route dành cho Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* Các route dành cho người dùng (Public) */}
        <Route path="/*" element={
          <PublicLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </PublicLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
