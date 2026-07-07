import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Eye, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BestSellers = ({ onViewDetail }) => {
  const [bestSellersList, setBestSellersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/best-sellers`);
        const result = await response.json();
        if (result.success) {
          setBestSellersList(result.data);
        }
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm bán chạy:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBestSellers();
  }, []);

  const renderProductCards = (isDuplicate = false) => {
    return bestSellersList.map((product) => {
      const uniqueId = isDuplicate ? `${product._id}-dup` : product._id;
      return (
        <div key={uniqueId} className="slider-item-card gold-border">
          {/* Image */}
          <div className="slider-img-wrapper">
            <img
              src={product.image || '/images/vong_tay.png'}
              alt={product.name}
              className="slider-item-image"
              loading="lazy"
            />
            <div className="slider-card-overlay">
              <Link
                to={`/product/${product._id}`}
                className="quick-view-btn"
                title="Xem chi tiết"
              >
                <Eye size={18} />
              </Link>
            </div>
            <span className="best-seller-badge">Bán chạy</span>
          </div>

          {/* Info */}
          <div className="slider-item-info">
            <h3 className="slider-item-name">{product.name}</h3>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < (product.rating || 5) ? 'star-icon active' : 'star-icon'}
                    fill={i < (product.rating || 5) ? 'var(--color-gold-300)' : 'none'}
                  />
                ))}
              </div>
              <span className="reviews-count">({product.reviews || 0})</span>
            </div>

            <div className="slider-price-row">
              <span className="slider-item-price">{product.priceDisplay}</span>
            </div>

            {/* Action */}
            <div className="slider-actions-row">
              <Link
                to={`/product/${product._id}`}
                className="slider-detail-btn"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Chi tiết
              </Link>
              <button
                onClick={() => {
                  addToCart(product, 1);
                  alert('Đã thêm vào giỏ hàng!');
                }}
                className="btn-shopee btn-shopee-small"
                style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37' }}
              >
                <PlusCircle size={12} />
                <span>Thêm</span>
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  if (loading || bestSellersList.length === 0) {
    return null; // Don't show the section if loading or empty
  }

  return (
    <section className="section-padding best-sellers-section bg-secondary-zen">
      <div className="container">
        {/* Section Header */}
        <div className="best-sellers-header reveal reveal-up">
          <div className="header-text">
            <span className="section-subtitle">Bán Chạy Nhất</span>
            <h2 className="section-title">SẢN PHẨM BÁN CHẠY</h2>
          </div>
        </div>

        <div className="zen-divider" style={{ margin: '1rem 0 3rem 0', justifyContent: 'flex-start' }}>
          <div className="zen-circle-dot" />
        </div>

        {/* Continuous Horizontal Marquee */}
        <div className="marquee-container reveal reveal-scale delay-200">
          <div className="marquee-track">
            <div className="marquee-group">
              {renderProductCards(false)}
            </div>
            <div className="marquee-group" aria-hidden="true">
              {renderProductCards(true)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
