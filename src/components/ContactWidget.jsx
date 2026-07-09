import React, { useState } from 'react';
import { PhoneCall, MessageCircle, Headphones } from 'lucide-react';
import './ContactWidget.css';

const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`contact-widget-container ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Expandable Action Buttons */}
      <div className="contact-actions">
        {/* Messenger */}
        <a href="https://m.me/rintramhuong" target="_blank" rel="noreferrer" className="contact-action-btn btn-mess" title="Chat Messenger">
          <MessageCircle size={22} />
        </a>

        {/* Zalo */}
        <a href="https://zalo.me/0901234567" target="_blank" rel="noreferrer" className="contact-action-btn btn-zalo" title="Chat Zalo">
          <span className="zalo-text">Zalo</span>
        </a>

        {/* Phone */}
        <a href="tel:0901234567" className="contact-action-btn btn-phone" title="Gọi Điện Thoại">
          <PhoneCall size={22} />
        </a>
      </div>

      {/* Main Toggle Button */}
      <button className="contact-toggle-btn">
        <div className="btn-icon">
          <Headphones size={28} />
        </div>
        <div className="btn-pulse"></div>
        <div className="btn-pulse pulse-delay"></div>
      </button>
    </div>
  );
};

export default ContactWidget;
