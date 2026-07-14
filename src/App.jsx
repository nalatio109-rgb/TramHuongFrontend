import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
import Blog from './components/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import AdminLayout from './components/admin/AdminLayout';
import AddProduct from './pages/admin/AddProduct';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminBlogs from './pages/admin/AdminBlogs';
import AddBlog from './pages/admin/AddBlog';
import EditBlog from './pages/admin/EditBlog';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ContactWidget from './components/ContactWidget';
import { CartProvider } from './context/CartContext';
import { UserAuthProvider } from './context/UserAuthContext';
import Auth from './pages/Auth';

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
  <div className="app-wrapper">
    <Header />
    {children}
    <Footer />
    <ContactWidget />
  </div>
);

function App() {
  return (
    <UserAuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Các route dành cho Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="products" element={<AdminProducts />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="add-blog" element={<AddBlog />} />
              <Route path="edit-blog/:id" element={<EditBlog />} />
            </Route>

            {/* Các route dành cho người dùng (Public) */}
            <Route path="/*" element={
              <PublicLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/san-pham" element={<Products />} />
                  <Route path="/san-pham/:id" element={<ProductDetail />} />
                  <Route path="/gioi-thieu" element={<About />} />
                  <Route path="/kien-thuc" element={<Blog />} />
                  <Route path="/kien-thuc/:id" element={<BlogDetail />} />
                  <Route path="/lien-he" element={<Contact />} />
                  <Route path="/gio-hang" element={<Cart />} />
                  <Route path="/thanh-toan" element={<Checkout />} />
                  <Route path="/tai-khoan" element={<Auth />} />
                </Routes>
              </PublicLayout>
            } />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserAuthProvider>
  );
}

export default App;
