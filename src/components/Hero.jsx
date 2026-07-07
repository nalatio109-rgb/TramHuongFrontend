import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero-section">

      {/* Hero Content */}
      <div className="container hero-container-content">
        <div className="hero-content-wrapper animate-fade-in-up">
          <div className="hero-badge">
            <span className="zen-circle-dot"></span>
            <span>Võ Quang Rin – Trầm Hương Tự Nhiên</span>
            <span className="zen-circle-dot"></span>
          </div>
          
          <h1 className="hero-title">
            <span className="gold-text-gradient">TINH HOA TRẦM HƯƠNG</span>
            <span className="hero-subtitle">KẾT NỐI GIÁ TRỊ TÂM LINH</span>
          </h1>

          <div className="zen-divider">
            <div className="zen-circle-dot" />
          </div>

          <p className="hero-description">
            Mang đến những sản phẩm trầm hương tự nhiên, chế tác tinh xảo, 
            giúp thư giãn, an yên và lan tỏa giá trị phong thủy tốt lành đến mọi gia đình.
          </p>

          <div className="hero-actions-group">
            <a href="#products" className="btn-gold">
              <span>Mua Ngay</span>
              <ArrowRight size={16} />
            </a>
            <a href="#story" className="btn-outline">
              <BookOpen size={16} />
              <span>Câu Chuyện Thương Hiệu</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Zen Scroll Indicator */}
      <div className="scroll-indicator animate-float">
        <span className="scroll-line"></span>
        <span className="scroll-text">Cuộn để khám phá</span>
      </div>
    </section>
  );
};

export default Hero;
