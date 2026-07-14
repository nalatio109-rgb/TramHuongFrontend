import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import './Auth.css';

function Auth() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register, user } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        const searchParams = new URLSearchParams(location.search);
        const redirect = searchParams.get('redirect') || '/';
        navigate(redirect, { replace: true });
      }
    }
  }, [user, navigate, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    let result;
    if (activeTab === 'login') {
      result = await login(formData.email, formData.password);
    } else {
      if (formData.password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự.');
        setIsSubmitting(false);
        return;
      }
      result = await register(formData);
    }

    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
    }
    // If success, the useEffect above will trigger navigation
  };

  return (
    <div className="auth-page-wrapper">
      <div className="container">
        <div className="auth-container mx-auto">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => { setActiveTab('login'); setError(''); }}
            >
              Đăng nhập
            </button>
            <button
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => { setActiveTab('register'); setError(''); }}
            >
              Đăng ký
            </button>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form reveal reveal-up">
            {activeTab === 'register' && (
              <div className="form-group">
                <label htmlFor="fullName">Họ và tên *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Nhập địa chỉ email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder={activeTab === 'register' ? 'Ít nhất 6 ký tự' : 'Nhập mật khẩu'}
              />
            </div>

            {activeTab === 'register' && (
              <>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại (tuỳ chọn)"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ giao hàng (tuỳ chọn)"
                  />
                </div>
              </>
            )}

            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting
                ? 'Đang xử lý...'
                : activeTab === 'login'
                ? 'Đăng nhập'
                : 'Đăng ký tài khoản'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
