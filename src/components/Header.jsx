import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Sản phẩm', href: '/products' },
    { label: 'Kiến thức trầm', href: '/blog' },
    { label: 'Liên hệ', href: '/contact' },
  ];

  return (
    <header className="fixed-header">
      <div className="container header-container">
        {/* Logo and Slogan */}
        <a href="#home" className="logo-area">
          <img src="/logo.png" alt="Rin Trầm Logo" className="brand-logo" />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link, idx) => (
            link.href.startsWith('/') ? (
              <Link key={idx} to={link.href} className="nav-link">
                {link.label}
              </Link>
            ) : (
              <a key={idx} href={link.href} className="nav-link">
                {link.label}
              </a>
            )
          ))}
        </nav>

        {/* Right side search + cart + actions */}
        <div className="header-actions">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Tìm trầm hương..."
              value={searchValue}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-btn" aria-label="Tìm kiếm">
              <Search size={18} />
            </button>
          </form>

          {/* Cart Icon */}
          <div className="cart-icon-wrapper">
            <button className="cart-btn" aria-label="Giỏ hàng" onClick={() => navigate('/cart')}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>

          {/* Zalo Icon Button */}
          <a
            href="https://zalo.me/0961244567"
            target="_blank"
            rel="noopener noreferrer"
            className="zalo-action-btn"
            title="Chat Zalo"
          >
            <MessageSquare size={18} />
            <span className="zalo-btn-text">Zalo</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((link, idx) => (
            link.href.startsWith('/') ? (
              <Link
                key={idx}
                to={link.href}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={idx}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          ))}
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <input
              type="text"
              placeholder="Tìm trầm..."
              value={searchValue}
              onChange={handleSearchChange}
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-btn">
              <Search size={18} />
            </button>
          </form>
          {/* Mobile Zalo link */}
          <a
            href="https://zalo.me/0961244567"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-zalo-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <MessageSquare size={18} />
            <span>Liên hệ Zalo tư vấn phong thủy</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
