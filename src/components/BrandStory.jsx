import React from 'react';

const BrandStory = () => {
  return (
    <section id="story" className="section-padding story-section bg-secondary-zen">
      <div className="container story-grid">
        {/* Left Side - Image with Premium Frame */}
        <div className="story-img-container reveal reveal-left">
          <div className="story-frame gold-border">
            <img 
              src="/images/brand_story.png" 
              alt="Nghệ nhân chế tác trầm hương Võ Quang Rin" 
              className="story-image"
              loading="lazy"
            />
            {/* Ambient gold glow behind image */}
            <div className="story-glow-effect" />
          </div>
          <div className="story-experience-badge">
            <span className="years">10+</span>
            <span className="text">Năm Chế Tác Thủ Công</span>
          </div>
        </div>

        {/* Right Side - Brand Narrative */}
        <div className="story-text-container reveal reveal-right delay-200">
          <span className="section-subtitle">Hành Trình Kiến Tạo</span>
          <h2 className="section-title">CÂU CHUYỆN THƯƠNG HIỆU</h2>
          <span className="story-author">Võ Quang Rin – Người Giữ Hồn Trầm Đất Việt</span>
          
          <div className="zen-divider" style={{ margin: '1rem 0 2rem 0', justifyContent: 'flex-start' }}>
            <div className="zen-circle-dot" />
          </div>

          <div className="story-paragraphs">
            <p>
              Sinh ra và lớn lên tại mảnh đất miền Trung đầy nắng gió - <strong>Quảng Nam</strong>, nơi được mệnh danh là 
              thủ phủ tích tụ tinh hoa trầm hương tốt bậc nhất thế giới. Từ thủa niên thiếu, tôi đã được nghe những câu 
              chuyện huyền thoại về hành trình dấn thân "ngậm ngải tìm trầm" của những bậc tiền bối đi trước.
            </p>
            <p>
              Nhận thấy thị trường trầm hương ngày càng xuất hiện nhiều sản phẩm tẩm ép hóa chất độc hại, làm mất đi 
              giá trị tâm linh nguyên bản và ảnh hưởng đến sức khỏe người tiêu dùng, tôi đã quyết định xây dựng thương 
              hiệu <strong>Rin Trầm</strong> với triết lý: <strong>"Chỉ bán Trầm Hương Tự Nhiên nguyên bản".</strong>
            </p>
            <p>
              Mỗi sản phẩm mang thương hiệu <strong>Rin Trầm</strong> là kết tinh từ tình yêu, lòng kính ngưỡng đối với 
              quà tặng của đất trời và quá trình chế tác thủ công tỉ mỉ. Chúng tôi không chỉ bán trang sức cao cấp, 
              chúng tôi mong muốn mang lại sự an yên trong tâm hồn, lan tỏa năng lượng tích cực và bảo tồn giá trị 
              tâm linh, phong thủy Á Đông sâu sắc.
            </p>
          </div>

          <div className="story-signature">
            <div className="signature-text">Võ Quang Rin</div>
            <div className="signature-title">Người Sáng Lập Rin Trầm</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
