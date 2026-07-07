import React from 'react';
import { Sparkles } from 'lucide-react';

const brandValuesList = [
  {
    title: 'Trầm Hương Tự Nhiên',
    desc: 'Cam kết 100% trầm hương tự nhiên từ vùng đất Tiên Phước - Quảng Nam, tích trầm lâu năm, không hóa chất tạo mùi.',
    icon: (
      <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Leaf / Tree representation */}
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
        <path d="M12 22V12" />
        <path d="M12 12c2.5-2.5 4.5-2 5-1s-1.5 3.5-5 3c-3.5.5-5.5-2-5-3s2.5-1.5 5 1Z" />
      </svg>
    )
  },
  {
    title: 'Chế Tác Thủ Công',
    desc: 'Từng hạt trầm được mài giũa, chọn sớ, phối hạt tỉ mỉ bởi đôi bàn tay lành nghề của nghệ nhân Võ Quang Rin.',
    icon: (
      <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Artisan Tools / Hands concept */}
        <path d="m14 4 6 6" />
        <path d="m13.6 6.4-1.2-1.2c-.8-.8-2-.8-2.8 0L3.2 11.6c-.8.8-.8 2 0 2.8l1.2 1.2" />
        <path d="M18 14v6" />
        <path d="M15 17h6" />
        <path d="M7.6 12.4 12 16.8" />
        <path d="m12.4 7.6 4.4 4.4" />
      </svg>
    )
  },
  {
    title: 'Hương Thơm Thanh Khiết',
    desc: 'Hương thơm ngọt dịu, nhẹ nhàng mà thanh cao. Lưu giữ vĩnh viễn, càng đeo càng thơm khi tiếp xúc nhiệt độ cơ thể.',
    icon: (
      <Sparkles className="value-icon" size={32} />
    )
  },
  {
    title: 'Giao Hàng Toàn Quốc',
    desc: 'Đóng gói hộp gỗ sang trọng chống va đập, kiểm tra hàng thoải mái trước khi thanh toán, miễn phí vận chuyển cho đơn hàng lớn.',
    icon: (
      <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Delivery package */}
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    )
  },
  {
    title: 'Tư Vấn Phong Thủy',
    desc: 'Tư vấn chọn vòng trầm, chuỗi hạt hợp mệnh, hợp tuổi giúp kích hoạt cung tài lộc, cầu bình an cho gia chủ.',
    icon: (
      <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Yin Yang / Zen mandala */}
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 1 0 20" />
        <path d="M12 2a5 5 0 0 1 0 10 5 5 0 0 0 0 10" />
        <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        <circle cx="12" cy="17" r="1.5" fill="currentColor" />
      </svg>
    )
  }
];

const BrandValues = () => {
  return (
    <section className="section-padding values-section">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal reveal-up">
          <span className="section-subtitle">Cam Kết</span>
          <h2 className="section-title">GIÁ TRỊ THƯƠNG HIỆU</h2>
          <div className="zen-divider">
            <div className="zen-circle-dot" />
          </div>
        </div>

        {/* Grid List */}
        <div className="values-grid">
          {brandValuesList.map((val, idx) => (
            <div key={idx} className={`value-card gold-border reveal reveal-up delay-${(idx + 1) * 100}`}>
              <div className="value-icon-wrapper">
                {val.icon}
              </div>
              <h3 className="value-title">{val.title}</h3>
              <p className="value-desc">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
