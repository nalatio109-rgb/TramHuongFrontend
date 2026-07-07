import React from 'react';
import { Calendar, User, ArrowUpRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Ý nghĩa phong thủy của trầm hương trong đời sống',
    summary: 'Trầm hương từ lâu đã được coi là vật phẩm chiêu tài dẫn lộc, hội tụ vương khí đất trời giúp xua đuổi ám khí, tăng cường sức khỏe và kích hoạt may mắn.',
    date: '24/06/2026',
    author: 'Võ Quang Rin',
    category: 'Phong Thủy',
    readTime: '5 phút đọc',
    // Simple SVG representation for visual texture
    svgVisual: (
      <svg className="blog-svg-visual" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#141c16" />
        <circle cx="50" cy="50" r="30" stroke="#dfba73" strokeWidth="1" opacity="0.3" />
        <circle cx="50" cy="50" r="20" stroke="#dfba73" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
        <path d="M50 25 L50 75 M25 50 L75 50" stroke="#c29d53" strokeWidth="0.5" opacity="0.5" />
        <circle cx="50" cy="50" r="5" fill="#dfba73" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Cách phân biệt trầm hương tự nhiên thật và trầm giả',
    summary: 'Hướng dẫn chi tiết từ nghệ nhân để phân biệt trầm tự nhiên với trầm ép dầu hóa chất thông qua màu sắc, đường vân gỗ và đặc biệt là mùi hương đốt.',
    date: '18/06/2026',
    author: 'Võ Quang Rin',
    category: 'Kiến Thức',
    readTime: '7 phút đọc',
    svgVisual: (
      <svg className="blog-svg-visual" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#1b1512" />
        <path d="M20 50 C 35 20, 65 20, 80 50 C 65 80, 35 80, 20 50 Z" stroke="#dfba73" strokeWidth="1.5" opacity="0.7" />
        <circle cx="50" cy="50" r="12" stroke="#c29d53" strokeWidth="1" />
        <circle cx="50" cy="50" r="6" fill="#dfba73" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Hướng dẫn sử dụng nhang và nụ trầm đúng cách',
    summary: 'Xông trầm thế nào để đạt hiệu quả thanh lọc tốt nhất? Tìm hiểu cách sử dụng thác khói, lư xông đồng và thời điểm thắp hương mang lại vượng khí tốt lành.',
    date: '12/06/2026',
    author: 'Võ Quang Rin',
    category: 'Hướng Dẫn',
    readTime: '4 phút đọc',
    svgVisual: (
      <svg className="blog-svg-visual" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#120e0c" />
        {/* Abstract incense smoke curves */}
        <path d="M50 80 C 45 60, 55 50, 48 35 C 43 20, 55 10, 50 5" stroke="#dfba73" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M43 80 C 38 65, 48 55, 40 45" stroke="#c29d53" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M57 80 C 52 68, 62 60, 56 50" stroke="#c29d53" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Bí quyết chọn vòng trầm hương theo mệnh phong thủy',
    summary: 'Mỗi cung mệnh Kim - Mộc - Thủy - Hỏa - Thổ sẽ phù hợp với loại vòng trầm phối charm đá quý nào? Đọc ngay để chọn chiếc vòng bổ trợ năng lượng phù hợp nhất.',
    date: '05/06/2026',
    author: 'Võ Quang Rin',
    category: 'Phong Thủy',
    readTime: '6 phút đọc',
    svgVisual: (
      <svg className="blog-svg-visual" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#112519" />
        {/* 5 elements representation */}
        <circle cx="50" cy="50" r="30" stroke="#dfba73" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="50" cy="20" r="5" fill="#facc15" title="Kim" />
        <circle cx="79" cy="41" r="5" fill="#4ade80" title="Mộc" />
        <circle cx="68" cy="74" r="5" fill="#60a5fa" title="Thủy" />
        <circle cx="32" cy="74" r="5" fill="#f87171" title="Hỏa" />
        <circle cx="21" cy="41" r="5" fill="#fb923c" title="Thổ" />
        <path d="M50 20 L79 41 L68 74 L32 74 L21 41 Z" stroke="#c29d53" strokeWidth="0.5" opacity="0.3" />
      </svg>
    )
  }
];

const Blog = () => {
  return (
    <section id="blog" className="section-padding blog-section">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal reveal-up">
          <span className="section-subtitle">Kiến Thức</span>
          <h2 className="section-title">KIẾN THỨC TRẦM HƯƠNG</h2>
          <div className="zen-divider">
            <div className="zen-circle-dot" />
          </div>
          <p className="section-desc">
            Nơi chia sẻ những kinh nghiệm quý báu, cách sử dụng và ý nghĩa tâm linh sâu sắc của Trầm hương.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className={`blog-card gold-border reveal reveal-up delay-${post.id * 150}`}>
              {/* Image/Visual wrapper */}
              <div className="blog-img-wrapper">
                {post.svgVisual}
                <span className="blog-category-tag">{post.category}</span>
              </div>

              {/* Content */}
              <div className="blog-content">
                {/* Meta details */}
                <div className="blog-meta">
                  <div className="meta-item">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <div className="meta-item">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-summary">{post.summary}</p>

                {/* Footer readmore */}
                <div className="blog-card-footer">
                  <span className="read-time">{post.readTime}</span>
                  <a href="#blog" className="read-more-btn" onClick={(e) => e.preventDefault()}>
                    <span>Đọc Thêm</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
