import React from 'react';
import { Compass, Eye, Star, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import './About.css';

function About() {
  return (
    <section className="about-page-wrapper">
      {/* Hero Banner */}
      <div className="about-hero">
        <div className="about-hero-bg" style={{ backgroundImage: `url('/images/hero_bg.png')` }}></div>
        <div className="about-hero-overlay"></div>
        <div className="container relative z-10 text-center reveal reveal-up">
          <span className="section-subtitle">TINH HOA TỪ ĐẠI NGÀN</span>
          <h1 className="about-page-title gold-text-gradient">Về Rin Trầm Hương</h1>
          <div className="zen-divider mx-auto"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-content-container">
        
        {/* Intro */}
        <div className="container about-intro reveal reveal-up delay-200">
          <p className="lead-text">
            <strong>Rin Trầm Hương</strong> được hình thành với mong muốn mang đến những sản phẩm trầm hương tự nhiên, chất lượng và giá trị bền vững đến với mọi khách hàng. Chúng tôi tin rằng trầm hương không chỉ là một sản phẩm, mà còn là biểu tượng của sự an yên, tinh tế và kết nối giữa con người với thiên nhiên.
          </p>
          <p className="sub-lead-text">
            Ngay từ những ngày đầu, Rin Trầm Hương luôn đặt tiêu chí <strong>chất lượng – uy tín – minh bạch</strong> lên hàng đầu. Mỗi sản phẩm được tuyển chọn kỹ lưỡng từ nguồn nguyên liệu trầm hương tự nhiên, trải qua quá trình chế tác cẩn thận nhằm giữ được hương thơm nguyên bản và giá trị vốn có của gỗ trầm. Đây cũng là những giá trị được nhiều thương hiệu và tổ chức trong ngành trầm hương tại Việt Nam nhấn mạnh khi xây dựng uy tín lâu dài.
          </p>
        </div>

        {/* Z-Pattern Section: Sứ mệnh */}
        <div className="z-pattern-section mt-6">
          <div className="container z-grid">
            <div className="z-text reveal reveal-left">
              <div className="z-icon-wrapper"><Compass size={32} /></div>
              <h2 className="gold-text-gradient">Sứ mệnh</h2>
              <p>
                Mang vẻ đẹp và hương thơm của trầm hương Việt Nam đến gần hơn với mọi người thông qua những sản phẩm chất lượng, giúp khách hàng tận hưởng sự thư thái, cân bằng trong cuộc sống và lựa chọn được những món quà mang nhiều ý nghĩa.
              </p>
            </div>
            <div className="z-image reveal reveal-right delay-200">
              <div className="image-frame gold-border">
                <img src="/images/vong_tay.png" alt="Sứ mệnh Rin Trầm" />
              </div>
            </div>
          </div>
        </div>

        {/* Z-Pattern Section: Tầm nhìn (Reversed) */}
        <div className="z-pattern-section reversed">
          <div className="container z-grid">
            <div className="z-text reveal reveal-right delay-200">
              <div className="z-icon-wrapper"><Eye size={32} /></div>
              <h2 className="gold-text-gradient">Tầm nhìn</h2>
              <p>
                Rin Trầm Hương hướng đến trở thành thương hiệu được khách hàng tin tưởng trong lĩnh vực trầm hương, không ngừng nâng cao chất lượng sản phẩm, mở rộng danh mục và xây dựng trải nghiệm mua sắm chuyên nghiệp trên nền tảng trực tuyến.
              </p>
            </div>
            <div className="z-image reveal reveal-left">
              <div className="image-frame gold-border">
                <img src="/images/nhang_tram.png" alt="Tầm nhìn Rin Trầm" />
              </div>
            </div>
          </div>
        </div>

        {/* Giá trị cốt lõi */}
        <div className="container core-values-section mt-6">
          <div className="text-center reveal reveal-up">
            <h2 className="gold-text-gradient mb-1">Giá trị cốt lõi</h2>
            <div className="zen-divider mx-auto mb-4"></div>
          </div>
          <div className="core-values-grid">
            <div className="value-box gold-border reveal reveal-up delay-100">
              <Star className="value-icon" />
              <h3>Chất lượng</h3>
              <p>Ưu tiên lựa chọn nguyên liệu tốt và kiểm soát chất lượng trong từng sản phẩm.</p>
            </div>
            <div className="value-box gold-border reveal reveal-up delay-200">
              <ShieldCheck className="value-icon" />
              <h3>Uy tín</h3>
              <p>Luôn minh bạch thông tin, đặt quyền lợi khách hàng lên hàng đầu.</p>
            </div>
            <div className="value-box gold-border reveal reveal-up delay-300">
              <Heart className="value-icon" />
              <h3>Tận tâm</h3>
              <p>Hỗ trợ và tư vấn để khách hàng lựa chọn sản phẩm phù hợp với nhu cầu.</p>
            </div>
            <div className="value-box gold-border reveal reveal-up delay-400">
              <Sparkles className="value-icon" />
              <h3>Bền vững</h3>
              <p>Trân trọng giá trị truyền thống, không ngừng đổi mới đáp ứng thị trường hiện đại.</p>
            </div>
          </div>
        </div>

        {/* Sản phẩm */}
        <div className="container products-showcase-section mt-6 reveal reveal-up">
          <div className="showcase-inner gold-border">
            <h2 className="gold-text-gradient text-center mb-1">Sản phẩm của Rin Trầm Hương</h2>
            <div className="zen-divider mx-auto mb-3"></div>
            <p className="text-center mb-3">Rin Trầm Hương cung cấp đa dạng các dòng sản phẩm như:</p>
            
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
              Mỗi sản phẩm đều được lựa chọn với mong muốn mang đến trải nghiệm hương thơm tự nhiên, phù hợp cho thiền định, thư giãn, làm quà tặng hoặc sử dụng trong đời sống hằng ngày.
            </p>
          </div>
        </div>

        {/* Cam kết & Lời kết */}
        <div className="container commitments-section mt-6 mb-6">
          <div className="commitments-grid">
            <div className="commitments-list-box reveal reveal-left">
              <h2 className="gold-text-gradient mb-3">Cam kết của chúng tôi</h2>
              <ul className="premium-list">
                <li><CheckCircle2 className="list-icon" /> Cung cấp sản phẩm đúng với mô tả.</li>
                <li><CheckCircle2 className="list-icon" /> Hỗ trợ tư vấn tận tình trước và sau khi mua.</li>
                <li><CheckCircle2 className="list-icon" /> Không ngừng cải thiện chất lượng sản phẩm và dịch vụ.</li>
                <li><CheckCircle2 className="list-icon" /> Xây dựng niềm tin bằng sự chân thành trong từng đơn hàng.</li>
              </ul>
            </div>
            
            <div className="conclusion-box reveal reveal-right delay-200">
              <div className="conclusion-content gold-border">
                <p>
                  <strong>Rin Trầm Hương</strong> tin rằng một sản phẩm tốt không chỉ nằm ở hương thơm, mà còn ở sự tận tâm của người làm nghề. Chúng tôi mong muốn mỗi sản phẩm đến tay khách hàng sẽ góp phần mang lại sự thư thái, bình an và những giá trị tốt đẹp trong cuộc sống.
                </p>
                <div className="signature">Rin Trầm</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default About;
