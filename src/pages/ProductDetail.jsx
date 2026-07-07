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
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, 1);
      navigate('/checkout');
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
                className={`gallery-thumbnail ${activeImage === img && index === 0 ? 'active' : ''}`}
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
            <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Sản phẩm</Link>
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
            {product.priceDisplay}
          </div>

          <p className="product-detail-description">
            {product.description}
          </p>

          {product.specifications && product.specifications.length > 0 && (
            <div className="product-detail-specs-card">
              <ul className="spec-list">
                {product.specifications.map((spec, index) => (
                  <li key={index}>
                    <span className="spec-name">{spec.name}</span>
                    <span className="spec-value">{spec.value}</span>
                  </li>
                ))}
              </ul>
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
    </div>
  );
};

export default ProductDetail;
