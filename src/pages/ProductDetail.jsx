import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, MessageSquare, ChevronRight, PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart, triggerCartAnimation } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    if (product) {
      if (product.hasVariants && !selectedVariant) {
        alert('Vui lòng chọn Kích thước (Size) trước khi thêm vào giỏ hàng.');
        return;
      }
      addToCart(product, 1, selectedVariant);
      triggerCartAnimation(e, activeImage || product.image || '/images/vong_tay.png');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      if (product.hasVariants && !selectedVariant) {
        alert('Vui lòng chọn Kích thước (Size) trước khi mua.');
        return;
      }
      addToCart(product, 1, selectedVariant);
      navigate('/thanh-toan');
    }
  };

  useEffect(() => {
    // Cuộn lên đầu trang khi vào trang chi tiết
    window.scrollTo(0, 0);
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
        setActiveImage(data.data.image || '/images/vong_tay.png');
      } else {
        setError('Không tìm thấy sản phẩm.');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="product-detail-loading">Đang tải thông tin sản phẩm...</div>;
  }

  if (error || !product) {
    return <div className="product-detail-error">{error || 'Không tìm thấy sản phẩm.'}</div>;
  }

  // Lấy mảng ảnh từ DB, nếu không có thì fallback sang ảnh đơn hoặc ảnh mặc định
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.image || '/images/vong_tay.png'];

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        
        {/* Left: Image */}
        <div className="product-detail-left">
          <div className="product-detail-image-wrapper">
            {product.isBestSeller && (
              <div className="product-badge">Bán Chạy Nhất</div>
            )}
            <img 
              src={activeImage} 
              alt={product.name} 
              className="product-detail-image"
            />
          </div>
          
          <div className="product-gallery">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className={`gallery-thumbnail ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="product-detail-info">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Trang chủ</Link>
            <ChevronRight size={16} />
            <Link to="/san-pham" style={{ color: 'inherit', textDecoration: 'none' }}>Sản phẩm</Link>
            <ChevronRight size={16} />
            <span className="current">{product.category}</span>
          </div>

          <h2 className="product-detail-category">{product.category}</h2>
          <h1 className="product-detail-name">{product.name}</h1>
          <div className="product-detail-divider"></div>
          
          <div className="product-detail-rating">
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < (product.rating || 5) ? '#d4af37' : 'none'}
                  color={i < (product.rating || 5) ? '#d4af37' : '#a89f91'}
                />
              ))}
            </div>
            <span className="reviews-count">
              ({product.reviews || 0} đánh giá thực tế)
            </span>
          </div>

          <div className="product-detail-price">
            {selectedVariant ? selectedVariant.priceDisplay : product.priceDisplay}
          </div>

          {product.hasVariants && product.variants && product.variants.length > 0 && (
            <div className="product-variants-section">
              <h3 className="variants-title">Kích thước (Size)</h3>
              <div className="variants-options">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`variant-btn ${selectedVariant?.size === variant.size ? 'selected' : ''}`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-detail-actions">
            <button 
              onClick={handleBuyNow}
              className="btn-buy-now"
            >
              <ShoppingCart size={20} />
              Mua ngay
            </button>
            
            <button 
              onClick={handleAddToCart}
              className="btn-buy-now"
              style={{ background: 'rgba(223, 186, 115, 0.1)', color: '#d4af37', border: '1px solid #d4af37' }}
            >
              <PlusCircle size={20} />
              Thêm vào giỏ
            </button>
          </div>
        </div>
        
      </div>

      {/* Bottom Section: Description & Specs */}
      <div className="product-detail-bottom">
        <div className="product-detail-description">
          {product.description && (() => {
            const text = product.description;
            const blocks = text.split(/(XIN CAM KẾT|THÔNG TIN SẢN PHẨM|SHOP CAM KẾT)/g).filter(Boolean);
            
            let currentHeader = '';
            const sections = [];
            
            blocks.forEach(block => {
              if (['XIN CAM KẾT', 'THÔNG TIN SẢN PHẨM', 'SHOP CAM KẾT'].includes(block.trim())) {
                currentHeader = block.trim();
              } else {
                sections.push({
                  header: currentHeader,
                  content: block.trim()
                });
                currentHeader = ''; 
              }
            });

            return sections.map((section, idx) => {
              const parts = section.content.split(/(?=\s[–-]\s|\s[–-](?!\s))/).filter(p => p.trim());
              
              return (
                <div key={idx} className="description-section">
                  {section.header && (
                    <h4 className="description-section-title">
                      <Star size={16} className="title-icon" />
                      {section.header}
                    </h4>
                  )}
                  <ul className="description-list">
                    {parts.map((part, j) => {
                      let cleanText = part.trim();
                      if (cleanText.startsWith('-') || cleanText.startsWith('–')) {
                        cleanText = cleanText.substring(1).trim();
                      }
                      if (!cleanText) return null;
                      
                      return (
                        <li key={j}>
                          <ChevronRight size={14} className="list-icon" />
                          <span>{cleanText}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            });
          })()}
        </div>

        {product.specifications && product.specifications.length > 0 && (
          <div className="product-detail-specs-card">
            <h3 className="specs-title">Thông Số Kỹ Thuật</h3>
            <ul className="spec-list">
              {product.specifications.map((spec, index) => (
                <li key={index}>
                  <span className="spec-name">{spec.name}</span>
                  <span className="spec-value">{spec.value}</span>
                </li>
              ))}
            </ul>
            
            <div className="shopee-button-container">
              <a 
                href={product.shopeeUrl || "https://shopee.vn/"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-shopee"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" alt="Shopee" className="shopee-icon" onError={(e) => e.target.style.display='none'} />
                <span>Mua trên Shopee</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
