import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Clock, Send } from 'lucide-react';
import './Contact.css';

import { API_BASE_URL } from '../config';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message || 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        alert(data.message || 'Gửi tin nhắn thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      alert('Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <div className="contact-header-bg">
        <div className="global-fixed-overlay" />
      </div>
      
      <div className="container contact-container">
        <div className="section-header reveal reveal-up">
          <span className="section-subtitle">KẾT NỐI VỚI CHÚNG TÔI</span>
          <h1 className="section-title gold-text-gradient">Liên Hệ Rin Trầm</h1>
          <div className="zen-divider"></div>
          <p className="section-desc">
            Võ Quang Rin luôn sẵn sàng lắng nghe và tư vấn chi tiết về các sản phẩm trầm hương phong thủy cao cấp, phù hợp nhất với bản mệnh của bạn.
          </p>
        </div>

        <div className="contact-grid">
          {/* Thông tin liên hệ */}
          <div className="contact-info-card gold-border reveal reveal-left">
            <h3>Thông Tin Trực Tiếp</h3>
            <div className="contact-list">
              <div className="contact-item">
                <div className="contact-icon"><MapPin size={20} /></div>
                <div>
                  <h4>Địa Chỉ Xưởng</h4>
                  <p>Tiên Phước, Quảng Nam, Việt Nam</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Phone size={20} /></div>
                <div>
                  <h4>Hotline Tư Vấn</h4>
                  <p>096 124 45 67</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><MessageSquare size={20} /></div>
                <div>
                  <h4>Zalo (Võ Quang Rin)</h4>
                  <p>096 124 45 67</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Mail size={20} /></div>
                <div>
                  <h4>Email</h4>
                  <p>voquangrin1992@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Clock size={20} /></div>
                <div>
                  <h4>Giờ Làm Việc</h4>
                  <p>07:30 - 22:00 (Hàng ngày)</p>
                </div>
              </div>
            </div>
            
            <a 
              href="https://zalo.me/0961244567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-gold contact-zalo-btn"
            >
              <MessageSquare size={18} /> Chat Zalo Ngay
            </a>
          </div>

          {/* Form Liên hệ */}
          <div className="contact-form-card gold-border reveal reveal-right delay-200">
            <h3>Gửi Tin Nhắn Cho Chúng Tôi</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Họ và tên *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Nhập tên của bạn"
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div className="form-group">
                <label>Nội dung cần tư vấn *</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows="5"
                  placeholder="Bạn quan tâm đến vòng tay, nhang trầm hay cần tư vấn phong thủy?"
                ></textarea>
              </div>
              <button type="submit" className="btn-gold submit-btn" disabled={isSubmitting}>
                <Send size={18} /> {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
              </button>
            </form>
          </div>
        </div>

        {/* Bản đồ */}
        <div className="contact-map reveal reveal-up delay-300">
          <h3 className="map-title">Bản Đồ Chỉ Đường</h3>
          <div className="map-iframe-container gold-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.163351988898!2d108.3079860742183!3d15.421711252119934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3169f464c18f0cc3%3A0xc07a8bdfa14b5ea1!2zVGnDqm4gUGjGsOG7m2MsIFF14bqjbmcgTmFtLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1719234567890!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rin Trầm Location"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
