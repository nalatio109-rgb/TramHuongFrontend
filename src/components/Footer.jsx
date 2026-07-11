import React from 'react';
import { Phone, Mail, MapPin, Facebook, ShoppingBag, MessageSquare, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="footer-section">
      <div className="container footer-grid">
        {/* Brand Description Column */}
        <div className="footer-column brand-column reveal reveal-up">
          <div className="footer-logo-row">
            <span className="footer-brand-name gold-text-gradient">Rin Trầm</span>
            <span className="footer-brand-slogan">TRẦM HƯƠNG TỰ NHIÊN</span>
          </div>
          <p className="footer-brand-desc">
            Chuyên cung cấp các sản phẩm nhang trầm sạch, nụ trầm xông nhà, vòng tay và chuỗi hạt trầm hương kiến tự nhiên cao cấp.
            Mỗi sản phẩm chế tác thủ công tinh xảo, trọn vẹn chất lượng phong thủy.
          </p>
          <div className="operating-hours">
            <Clock size={16} className="text-gold" />
            <span>Mở cửa: 07:30 - 22:00 (Hàng ngày)</span>
          </div>
        </div>

        {/* Contact Information Column */}
        <div className="footer-column contact-column reveal reveal-up delay-200">
          <h3 className="footer-title">Thông Tin Liên Hệ</h3>
          <div className="footer-divider"></div>

          <ul className="contact-list">
            <li>
              <div className="contact-icon-box">
                <MapPin size={18} />
              </div>
              <span className="contact-text">
                Võ Quang Rin - Tiên Phước, Quảng Nam, Việt Nam
              </span>
            </li>
            <li>
              <a href="tel:0961244567" className="contact-link-item">
                <div className="contact-icon-box">
                  <Phone size={18} />
                </div>
                <span className="contact-text">Hotline: 096 124 45 67</span>
              </a>
            </li>
            <li>
              <a href="https://zalo.me/0961244567" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <div className="contact-icon-box">
                  <MessageSquare size={18} />
                </div>
                <span className="contact-text">Zalo: 096 124 45 67 (Võ Quang Rin)</span>
              </a>
            </li>
            <li>
              <a href="mailto:voquangrin1992@gmail.com" className="contact-link-item">
                <div className="contact-icon-box">
                  <Mail size={18} />
                </div>
                <span className="contact-text">Email: voquangrin1992@gmail.com</span>
              </a>
            </li>
          </ul>

          <div className="social-links-row">
            <a
              href="https://www.facebook.com/rintramhuongg/?locale=vi_VN"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://shopee.vn/voquangrin1992"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="Shopee"
            >
              <ShoppingBag size={18} />
            </a>
            <a
              href="https://zalo.me/0961244567"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="Zalo Chat"
            >
              <MessageSquare size={18} />
            </a>
          </div>
        </div>

        {/* Google Maps Column */}
        <div className="footer-column maps-column reveal reveal-up delay-400">
          <h3 className="footer-title">Bản Đồ Chỉ Đường</h3>
          <div className="footer-divider"></div>

          <div className="map-iframe-container gold-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.163351988898!2d108.3079860742183!3d15.421711252119934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3169f464c18f0cc3%3A0xc07a8bdfa14b5ea1!2zVGnDqm4gUGjGsOG7m2MsIFF14bqjbmcgTmFtLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1719234567890!5m2!1svi!2s"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Địa chỉ Rin Trầm tại Tiên Phước, Quảng Nam"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© {new Date().getFullYear()} VÕ QUANG RIN - TRẦM HƯƠNG TỰ NHIÊN. Tất cả các quyền được bảo lưu.</p>
          <p className="credit-text">Thiết kế bởi Antigravity • Tiêu chuẩn Trang sức Cao cấp Á Đông</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
