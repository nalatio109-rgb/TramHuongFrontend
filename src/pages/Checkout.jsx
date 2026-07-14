import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';
import { API_BASE_URL } from '../config';
import { CheckCircle } from 'lucide-react';
import './Checkout.css';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, token } = useUserAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: user?.fullName || '',
    customerPhone: user?.phone || '',
    customerAddress: user?.address || '',
    note: '',
    paymentMethod: 'cod' // default payment method
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    setError('');

    try {
      const orderData = {
        ...formData,
        totalAmount: cartTotal,
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      };

      const headers = {
        'Content-Type': 'application/json'
      };
      // Nếu có user, có thể gửi kèm token (tùy backend hỗ trợ lưu userId cho order hay không)
      // Hiện tại backend model Order chưa có userId, nên cứ gửi bình thường
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setOrderId(result.data.orderId);
        setIsSuccess(true);
        clearCart();
        window.scrollTo(0, 0);
      } else {
        setError(result.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Error submitting order:', err);
      setError('Lỗi kết nối máy chủ. Vui lòng kiểm tra lại mạng của bạn.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-page-wrapper">
        <div className="container text-center reveal reveal-scale">
          <div className="success-box gold-border">
            <CheckCircle size={80} className="success-icon mx-auto mb-4" />
            <h1 className="gold-text-gradient mb-3">Đặt hàng thành công!</h1>
            <p className="mb-2">Cảm ơn bạn đã tin tưởng và ủng hộ Rin Trầm Hương.</p>
            <p className="mb-4">Mã đơn hàng của bạn là: <strong className="gold-text-gradient">{orderId}</strong></p>
            <p className="mb-4 text-sm opacity-80">Chúng tôi sẽ sớm liên hệ qua số điện thoại để xác nhận đơn hàng.</p>
            <Link to="/" className="btn-primary">
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page-wrapper">
        <div className="container text-center">
          <h2>Giỏ hàng trống</h2>
          <p className="mt-3">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
          <Link to="/products" className="btn-primary mt-4">Mua sắm ngay</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-wrapper">
      <div className="container">
        <h1 className="gold-text-gradient text-center mb-5 reveal reveal-up">Thanh toán</h1>
        
        {error && (
          <div className="error-alert mb-4">
            {error}
          </div>
        )}

        <div className="checkout-grid">
          {/* Form thông tin */}
          <div className="checkout-form-section reveal reveal-left delay-100">
            <h3 className="mb-4 border-bottom pb-2">Thông tin giao hàng</h3>
            <form onSubmit={handleSubmit} id="checkout-form">
              <div className="form-group">
                <label>Họ và tên *</label>
                <input 
                  type="text" 
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ và tên người nhận"
                />
              </div>
              
              <div className="form-group">
                <label>Số điện thoại *</label>
                <input 
                  type="tel" 
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  placeholder="Nhập số điện thoại liên hệ"
                />
              </div>
              
              <div className="form-group">
                <label>Địa chỉ nhận hàng *</label>
                <textarea 
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Ghi chú đơn hàng (Tùy chọn)</label>
                <textarea 
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Ví dụ: Giao hàng vào giờ hành chính..."
                ></textarea>
              </div>

              <h3 className="mt-5 mb-4 border-bottom pb-2">Phương thức thanh toán</h3>
              <div className="payment-methods">
                <label className={`payment-method-label ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>
                
                <label className={`payment-method-label ${formData.paymentMethod === 'transfer' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={handleChange}
                  />
                  <span>Chuyển khoản qua ngân hàng</span>
                </label>
              </div>
              
              {formData.paymentMethod === 'transfer' && (
                <div className="bank-info-box mt-3 mb-4">
                  <p>Vui lòng chuyển khoản tới tài khoản:</p>
                  <ul>
                    <li>Ngân hàng: <strong>Vietcombank</strong></li>
                    <li>Số tài khoản: <strong>0123456789</strong></li>
                    <li>Chủ tài khoản: <strong>VO QUANG RIN</strong></li>
                    <li>Nội dung ck: <strong>SĐT của bạn</strong></li>
                  </ul>
                  <p className="text-sm mt-2 opacity-80">Đơn hàng sẽ được xử lý ngay sau khi chúng tôi nhận được thanh toán.</p>
                </div>
              )}

            </form>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="checkout-summary-section reveal reveal-right delay-200">
            <div className="checkout-summary-box gold-border">
              <h3 className="mb-4 border-bottom pb-2">Đơn hàng của bạn</h3>
              
              <div className="checkout-items">
                {cartItems.map(item => (
                  <div key={item._id} className="checkout-item">
                    <div className="checkout-item-img-wrapper">
                      <img src={item.image || '/images/vong_tay.png'} alt={item.name} />
                      <span className="checkout-item-qty">{item.quantity}</span>
                    </div>
                    <div className="checkout-item-info">
                      <p className="checkout-item-name">{item.name}</p>
                      <p className="checkout-item-price">{formatPrice(item.price)}</p>
                    </div>
                    <div className="checkout-item-total">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="zen-divider my-3"></div>
              
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
                type="submit" 
                form="checkout-form"
                className="btn-primary w-100 mt-4 submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
