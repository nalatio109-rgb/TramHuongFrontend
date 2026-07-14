import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, MessageSquare, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';
import { API_BASE_URL } from '../config';
import ConfirmModal from './ConfirmModal';

const Header = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const searchRef = useRef(null);
  
  const { cartCount } = useCart();
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const result = await response.json();
        if (result.success) {
          setAllProducts(result.data);
        }
      } catch (err) {
        console.error('Lỗi tải sản phẩm cho tìm kiếm:', err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const removeAccents = (str) => {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D')
              .toLowerCase();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/san-pham?search=${encodeURIComponent(searchValue.trim())}`);
      setIsMobileMenuOpen(false);
    }
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    
    if (val.trim()) {
      const query = removeAccents(val);
      const filtered = allProducts.filter(p => {
        const name = removeAccents(p.name || '');
        const desc = removeAccents(p.description || '');
        const category = removeAccents(p.category || '');
        return name.includes(query) || desc.includes(query) || category.includes(query);
      });
      setSearchResults(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }

    if (onSearch) {
      onSearch(val);
    }
  };

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/gioi-thieu' },
    { label: 'Sản phẩm', href: '/san-pham' },
    { label: 'Kiến thức trầm', href: '/kien-thuc' },
    { label: 'Liên hệ', href: '/lien-he' },
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
          <div className="search-container" ref={searchRef} style={{ position: 'relative' }}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Tìm trầm hương..."
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => { if (searchValue.trim()) setShowSuggestions(true); }}
                className="search-input"
              />
              <button type="submit" className="search-btn" aria-label="Tìm kiếm">
                <Search size={18} />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchResults.length > 0 && (
              <div className="search-suggestions" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'var(--bg-primary-zen)',
                border: '1px solid var(--color-gold-500)',
                borderRadius: '4px',
                marginTop: '8px',
                zIndex: 1000,
                maxHeight: '400px',
                overflowY: 'auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}>
                {searchResults.map((product) => (
                  <div key={product._id} className="suggestion-item" 
                       onClick={() => {
                         navigate(`/san-pham/${product.slug || product._id}`);
                         setShowSuggestions(false);
                         setSearchValue('');
                       }}
                       style={{
                         display: 'flex',
                         alignItems: 'center',
                         padding: '10px',
                         borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                         cursor: 'pointer',
                         transition: 'background-color 0.2s'
                       }}
                       onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary-zen)'}
                       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <img src={product.image || '/images/vong_tay.png'} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ color: 'var(--color-gold-300)', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                      <div style={{ color: '#a89f91', fontSize: '0.8rem' }}>{product.priceDisplay}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Icon */}
          <div className="user-icon-wrapper" style={{ marginLeft: '15px', position: 'relative' }}>
            {user ? (
              <div 
                className="user-profile-menu"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--color-gold-500)' }}
                onClick={() => {
                  setShowLogoutConfirm(true);
                }}
                title={`Đăng xuất (${user.fullName})`}
              >
                <LogOut size={20} />
              </div>
            ) : (
              <button className="user-btn" aria-label="Đăng nhập" onClick={() => navigate('/tai-khoan')} style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer', padding: '5px' }}>
                <User size={20} />
              </button>
            )}
          </div>

          {/* Cart Icon */}
          <div className="cart-icon-wrapper" style={{ marginLeft: '15px' }}>
            <button className="cart-btn" aria-label="Giỏ hàng" onClick={() => navigate('/gio-hang')}>
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
          
          {/* Mobile User Auth */}
          {user ? (
            <div className="mobile-nav-link" style={{ color: 'var(--color-gold-500)', cursor: 'pointer' }} onClick={() => {
              setShowLogoutConfirm(true);
            }}>
              <LogOut size={18} style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
              Đăng xuất ({user.fullName})
            </div>
          ) : (
            <Link
              to="/tai-khoan"
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={18} style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
              Đăng nhập / Đăng ký
            </Link>
          )}

          {/* Mobile Search */}
          <div className="mobile-search-container" style={{ position: 'relative', width: '100%', padding: '0 20px', marginBottom: '20px' }}>
            <form onSubmit={handleSearchSubmit} className="mobile-search-form" style={{ margin: 0 }}>
              <input
                type="text"
                placeholder="Tìm trầm..."
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => { if (searchValue.trim()) setShowSuggestions(true); }}
                className="mobile-search-input"
              />
              <button type="submit" className="mobile-search-btn">
                <Search size={18} />
              </button>
            </form>
            
            {showSuggestions && searchResults.length > 0 && (
              <div className="search-suggestions" style={{
                position: 'absolute',
                top: '100%',
                left: '20px',
                right: '20px',
                backgroundColor: 'var(--bg-primary-zen)',
                border: '1px solid var(--color-gold-500)',
                borderRadius: '4px',
                marginTop: '8px',
                zIndex: 1000,
                maxHeight: '300px',
                overflowY: 'auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}>
                {searchResults.map((product) => (
                  <div key={product._id} className="suggestion-item" 
                       onClick={() => {
                         navigate(`/san-pham/${product.slug || product._id}`);
                         setShowSuggestions(false);
                         setSearchValue('');
                         setIsMobileMenuOpen(false);
                       }}
                       style={{
                         display: 'flex',
                         alignItems: 'center',
                         padding: '10px',
                         borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                         cursor: 'pointer'
                       }}
                  >
                    <img src={product.image || '/images/vong_tay.png'} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ color: 'var(--color-gold-300)', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                      <div style={{ color: '#a89f91', fontSize: '0.8rem' }}>{product.priceDisplay}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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

      {/* Logout Confirm Modal */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất không?"
        onConfirm={() => {
          logout();
          navigate('/');
          setShowLogoutConfirm(false);
          setIsMobileMenuOpen(false);
        }}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </header>
  );
};

export default Header;
