import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = ({ searchQuery = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products (API should return active ones)
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const result = await response.json();

        if (result.success) {
          setProducts(result.data);
        } else {
          setError(result.message || 'Lỗi khi tải dữ liệu');
        }
      } catch (err) {
        setError('Không thể kết nối đến máy chủ');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const name = product.name ? product.name.toLowerCase() : '';
    const desc = product.description ? product.description.toLowerCase() : '';
    const category = product.category ? product.category.toLowerCase() : '';

    return name.includes(query) || desc.includes(query) || category.includes(query);
  });

  return (
    <section id="products" className="section-padding categories-section">
      <div className="container">
        {/* Section Title */}
        <div className="section-header reveal reveal-up">
          <span className="section-subtitle">Bộ Sưu Tập</span>
          <h2 className="section-title">DANH MỤC SẢN PHẨM NỔI BẬT</h2>
          <div className="zen-divider">
            <div className="zen-circle-dot" />
          </div>
          <p className="section-desc">
            Sản phẩm được chế tác hoàn toàn từ trầm tự nhiên Quảng Nam, mang hương vị đất trời thanh cao.
          </p>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#d4af37', fontSize: '1.2rem' }}>
            Đang tải sản phẩm...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
            Lỗi: {error}
          </div>
        )}

        {/* Catalog Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <div key={product._id} className={`product-card gold-border reveal reveal-up delay-${(index % 3 + 1) * 100}`}>
                {/* Image Container */}
                <div className="product-img-wrapper">
                  <img
                    src={product.image || '/images/vong_tay.png'}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  <div className="product-card-overlay">
                    <Link
                      to={`/product/${product._id}`}
                      className="quick-view-btn"
                      title="Xem chi tiết"
                    >
                      <Eye size={20} />
                    </Link>
                  </div>
                  <span className="product-category-tag">{product.category}</span>
                </div>

                {/* Info Container */}
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>

                  {/* Rating */}
                  <div className="product-rating">
                    <div className="stars-row">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < (product.rating || 5) ? 'star-icon active' : 'star-icon'}
                          fill={i < (product.rating || 5) ? 'var(--color-gold-300)' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="reviews-count">({product.reviews || 0} đánh giá)</span>
                  </div>

                  {/* Price */}
                  <div className="product-price-row">
                    <span className="product-price">{product.priceDisplay}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="product-actions-row">
                    <Link
                      to={`/product/${product._id}`}
                      className="product-detail-btn"
                      style={{ textDecoration: 'none' }}
                    >
                      <span>Xem Chi Tiết</span>
                    </Link>
                    <a
                      href={product.shopeeUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-shopee"
                    >
                      <ShoppingCart size={14} />
                      <span>Mua Trên Shopee</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="no-products-found">
            <p>Không tìm thấy sản phẩm trầm hương phù hợp với từ khóa của bạn.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
