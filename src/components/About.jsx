import React from 'react';
import { Leaf, Award, ShieldCheck, Heart, Sparkles, Droplet, ArrowRight, BookOpen, Crown } from 'lucide-react';
import './About.css';

function About() {
  return (
    <section className="about-page-wrapper">
      {/* Hero Banner */}
      <div className="about-hero">
        <div className="about-hero-bg" style={{ backgroundImage: `url('/images/hero_bg.png')` }}></div>
        <div className="about-hero-overlay"></div>
        <div className="container relative z-10 text-center reveal reveal-up">
          <span className="section-subtitle">TINH HOA TRẦM VIỆT – DI SẢN Á ĐÔNG</span>
          <h1 className="about-page-title gold-text-gradient">Về Chúng Tôi</h1>
          <div className="zen-divider mx-auto"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-content-container">
        
        {/* Intro */}
        <div className="container about-intro-premium reveal reveal-up delay-200">
          <div className="intro-quote-icon">❝</div>
          <div className="intro-content-split">
            {/* Top Center Leaf Ornament */}
            <div className="intro-leaf-ornament">
              <Leaf size={60} strokeWidth={1.2} className="animate-sway" />
            </div>
            
            <div className="intro-left">
              <p className="lead-text-premium">
                "Từ ngàn xưa, trầm hương đã được tôn vinh như báu vật trời đất – kết tinh từ thời gian, thiên nhiên và tâm linh, mang trong mình hương sắc linh thiêng cùng giá trị vượt thời gian."
              </p>
            </div>
            <div className="intro-divider"></div>
            <div className="intro-right">
              <p className="sub-lead-text-premium">
                Trầm hương là loại gỗ quý hiếm hình thành sau quá trình tụ nhựa gian nan. Từ mùi hương trầm ấm, thanh khiết, trầm hương không chỉ là món quà quý cho sức khỏe – giúp an thần, thư giãn – mà còn mang ý nghĩa phong thủy sâu sắc, thanh lọc uế khí, xua đuổi tà khí, mang lại bình an và may mắn cho gia chủ.
              </p>
            </div>
          </div>
        </div>

        {/* Z-Pattern Section: Hành trình */}
        <div className="z-pattern-section mt-6">
          <div className="container z-grid">
            <div className="z-text reveal reveal-left">
              <div className="z-icon-wrapper"><Leaf size={32} /></div>
              <h2 className="gold-text-gradient">Hành trình Rin Trầm Hương</h2>
              <p>
                Sinh ra tại xứ Quảng - cái nôi của những khối trầm hương danh tiếng, <strong>Rin Trầm Hương</strong> mang trong mình sứ mệnh bảo vệ những giá trị truyền thống và gìn giữ phương pháp chế tác thủ công được lưu truyền qua nhiều thế hệ.
              </p>
              <p className="mt-3">
                Chúng tôi không chỉ tiên phong trong việc cung cấp trầm hương tự nhiên, mà còn mong muốn lan toả văn hoá Trầm Việt đến với cộng đồng. Mỗi sản phẩm là kết tinh của giá trị văn hoá, kỹ thuật tinh xảo và tình yêu với di sản Phương Đông.
              </p>
            </div>
            <div className="z-image reveal reveal-right delay-200">
              <div className="image-frame gold-border">
                <img src="/images/vong_tay.png" alt="Hành trình Rin Trầm Hương" />
              </div>
            </div>
          </div>
        </div>

        {/* Z-Pattern Section: Chế tác độc bản (Reversed) */}
        <div className="z-pattern-section reversed">
          <div className="container z-grid">
            <div className="z-text reveal reveal-right delay-200">
              <div className="z-icon-wrapper"><Crown size={32} /></div>
              <h2 className="gold-text-gradient">Chế Tác Thủ Công – Thiết Kế Độc Bản</h2>
              <p>
                Tại <strong>Rin Trầm Hương</strong>, mỗi tác phẩm được chế tác hoàn toàn thủ công dưới bàn tay của nghệ nhân giàu kinh nghiệm, am hiểu sâu sắc chất liệu trầm và triết lý chế tác Á Đông. 
              </p>
              <p className="mt-3">
                Từng công đoạn từ tuyển chọn phôi trầm, định hình đến mài giũa đều được thực hiện tỉ mỉ, nhằm tôn vinh trọn vẹn vẻ đẹp tự nhiên của vân trầm và hương sắc nguyên bản. Mỗi thiết kế là một bản thể độc lập, mang dấu ấn riêng biệt không thể sao chép.
              </p>
            </div>
            <div className="z-image reveal reveal-left">
              <div className="image-frame gold-border">
                <img src="/images/brand_story.png" alt="Chế tác thủ công độc bản" />
              </div>
            </div>
          </div>
        </div>

        {/* Triết lý 3T */}
        <div className="container core-values-section mt-6">
          <div className="text-center reveal reveal-up">
            <h2 className="gold-text-gradient mb-1">Triết Lý Hoạt Động</h2>
            <div className="zen-divider mx-auto mb-4"></div>
            <p className="sub-lead-text mb-5" style={{ maxWidth: '800px', margin: '0 auto 3rem auto' }}>
              Tiếp nối hành trình của báu vật hội tụ linh khí đất trời, Rin Trầm Hương lựa chọn con đường lan tỏa tinh hoa Trầm Việt qua triết lý 3T.
            </p>
          </div>
          <div className="core-values-grid">
            <div className="value-box gold-border reveal reveal-up delay-100">
              <Sparkles className="value-icon" />
              <h3>TINH</h3>
              <p>Tinh là sự giao thoa giữa tinh hoa trầm hương truyền thống và kỹ thuật chế tác. Mỗi sản phẩm là một tác phẩm tinh xảo, trải qua tuyển chọn khắt khe để tôn vinh trọn vẹn vẻ đẹp tự nhiên.</p>
            </div>
            <div className="value-box gold-border reveal reveal-up delay-200">
              <ShieldCheck className="value-icon" />
              <h3>TÍN</h3>
              <p>Tín là lời cam kết vững vàng về chất lượng thật. Chúng tôi cam kết 100% trầm hương tự nhiên không tẩm ép, đảm bảo tính minh bạch và giá trị nguyên bản bền vững theo thời gian.</p>
            </div>
            <div className="value-box gold-border reveal reveal-up delay-300">
              <Heart className="value-icon" />
              <h3>TÂM</h3>
              <p>Tâm là gốc rễ của mọi hành trình. Chúng tôi đặt cái tâm chân thành vào từng sản phẩm, để trầm hương không chỉ có giá trị vật chất mà còn mang lại năng lượng bình an cho người sở hữu.</p>
            </div>
          </div>
        </div>

        {/* Sản phẩm */}
        <div className="container products-showcase-section mt-6 reveal reveal-up">
          <div className="showcase-inner gold-border">
            <h2 className="gold-text-gradient text-center mb-1">Tinh Hoa Hội Tụ</h2>
            <div className="zen-divider mx-auto mb-3"></div>
            
            <div className="products-grid-list">
              <div className="product-tag">Vòng tay trầm hương</div>
              <div className="product-tag">Chuỗi hạt trầm hương</div>
              <div className="product-tag">Nhang trầm</div>
              <div className="product-tag">Nụ trầm</div>
              <div className="product-tag">Bột trầm</div>
              <div className="product-tag">Trầm xông nhà</div>
              <div className="product-tag">Phụ kiện & Quà tặng</div>
            </div>
            
            <p className="text-center mt-3 showcase-desc">
              Toàn bộ sản phẩm được tuyển chọn kỹ lưỡng, giữ trọn vẹn hương thơm nguyên bản và <strong>tự nhiên 100%</strong>, nói không với trầm tẩm ép, hóa chất độc hại.
            </p>
          </div>
        </div>

        {/* Lời kết */}
        <div className="container commitments-section mt-6 mb-6">
          <div className="commitments-grid" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
            <div className="conclusion-box reveal reveal-up" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="conclusion-content gold-border" style={{ padding: '4rem 2rem', maxWidth: '900px', width: '100%' }}>
                <p style={{ maxWidth: '800px', margin: '0 auto 2rem auto', fontSize: '1.2rem', fontStyle: 'italic' }}>
                  "Chúng tôi tin rằng một sản phẩm tốt không chỉ nằm ở hương thơm, mà còn ở sự tận tâm của người làm nghề. Hy vọng mỗi tác phẩm trầm hương đến tay quý khách sẽ góp phần mang lại sự thư thái, bình an và vượng khí cho gia đạo."
                </p>
                <div className="signature" style={{ fontSize: '1.8rem' }}>Võ Quang Rin</div>
                <div style={{ color: '#d4af37', marginTop: '0.8rem', letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Người Sáng Lập Rin Trầm Hương</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default About;
