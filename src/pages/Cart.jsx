import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';
import './Cart.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/auth?redirect=/checkout');
    }
  };

  const handleQuantityChange = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty > 0) { 
      updateQuantity(id, newQty);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-wrapper empty-cart-wrapper">
        <div className="container text-center reveal reveal-up">
          <ShoppingBag size={64} className="empty-cart-icon mx-auto mb-4" />
          <h1 className="gold-text-gradient mb-3">Giỏ hàng trống</h1>
          <p className="mb-4">Bạn chưa chọn sản phẩm nào vào giỏ hàng.</p>
          <Link to="/products" className="btn-primary">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="container">
        <h1 className="gold-text-gradient text-center mb-4 reveal reveal-up">Giỏ hàng của bạn</h1>
        
        <div className="cart-grid">
          {/* Cột Danh sách sản phẩm */}
          <div className="cart-items-list reveal reveal-left delay-100">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item gold-border">
                <img 
                  src={item.image || '/images/vong_tay.png'} 
                  alt={item.name} 
                  className="cart-item-img"
                  onClick={() => navigate(`/product/${item.slug || item._id}`)}
                />
                
                <div className="cart-item-details">
                  <h3 
                    className="cart-item-name"
                    onClick={() => navigate(`/product/${item.slug || item._id}`)}
                  >
                    {item.name}
                  </h3>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item._id, item.quantity, -1)}><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, item.quantity, 1)}><Plus size={16} /></button>
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                      title="Xóa sản phẩm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="cart-item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Cột Tóm tắt đơn hàng */}
          <div className="cart-summary-wrapper reveal reveal-right delay-200">
            <div className="cart-summary gold-border">
              <h3 className="gold-text-gradient mb-3">Tóm tắt đơn hàng</h3>
              
              <div className="summary-row">
                <span>Tạm tính</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              
              <div className="zen-divider my-3"></div>
              
              <div className="summary-row total-row">
                <span>Tổng cộng</span>
                <span className="gold-text-gradient">{formatPrice(cartTotal)}</span>
              </div>
              
              <button 
                className="btn-primary w-100 mt-4 checkout-btn"
                onClick={handleCheckout}
              >
                Tiến hành thanh toán <ArrowRight size={20} className="ml-2" />
              </button>
              
              <div className="mt-4 text-center">
                <Link to="/products" className="continue-shopping-link">
                  &#8592; Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
