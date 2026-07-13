import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const defaultSvgs = [
  (
    <svg className="blog-svg-visual" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#141c16" />
      <circle cx="50" cy="50" r="30" stroke="#dfba73" strokeWidth="1" opacity="0.3" />
      <circle cx="50" cy="50" r="20" stroke="#dfba73" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
      <path d="M50 25 L50 75 M25 50 L75 50" stroke="#c29d53" strokeWidth="0.5" opacity="0.5" />
      <circle cx="50" cy="50" r="5" fill="#dfba73" />
    </svg>
  ),
  (
    <svg className="blog-svg-visual" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#1b1512" />
      <path d="M20 50 C 35 20, 65 20, 80 50 C 65 80, 35 80, 20 50 Z" stroke="#dfba73" strokeWidth="1.5" opacity="0.7" />
      <circle cx="50" cy="50" r="12" stroke="#c29d53" strokeWidth="1" />
      <circle cx="50" cy="50" r="6" fill="#dfba73" />
    </svg>
  ),
  (
    <svg className="blog-svg-visual" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#120e0c" />
      <path d="M50 80 C 45 60, 55 50, 48 35 C 43 20, 55 10, 50 5" stroke="#dfba73" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M43 80 C 38 65, 48 55, 40 45" stroke="#c29d53" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M57 80 C 52 68, 62 60, 56 50" stroke="#c29d53" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  (
    <svg className="blog-svg-visual" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#112519" />
      <circle cx="50" cy="50" r="30" stroke="#dfba73" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="50" cy="20" r="5" fill="#facc15" title="Kim" />
      <circle cx="79" cy="41" r="5" fill="#4ade80" title="Mộc" />
      <circle cx="68" cy="74" r="5" fill="#60a5fa" title="Thủy" />
      <circle cx="32" cy="74" r="5" fill="#f87171" title="Hỏa" />
      <circle cx="21" cy="41" r="5" fill="#fb923c" title="Thổ" />
      <path d="M50 20 L79 41 L68 74 L32 74 L21 41 Z" stroke="#c29d53" strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
];

const Blog = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog?limit=4`);
        const data = await response.json();
        if (data.success) {
          setBlogPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

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
          {loading ? (
            <div style={{ textAlign: 'center', width: '100%', color: 'var(--gold-primary)' }}>Đang tải bài viết...</div>
          ) : blogPosts.length === 0 ? (
            <div style={{ textAlign: 'center', width: '100%', color: '#666' }}>Chưa có bài viết nào.</div>
          ) : (
            blogPosts.map((post, index) => (
              <article 
                key={post._id} 
                className={`blog-card gold-border reveal reveal-up delay-${(index + 1) * 150}`}
                onClick={() => navigate(`/blog/${post.slug || post._id}`)}
                style={{ cursor: 'pointer' }}
              >
                {/* Image/Visual wrapper */}
                <div className="blog-img-wrapper">
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => { 
                        e.target.style.display = 'none'; 
                        e.target.nextSibling.style.display = 'block'; 
                      }} 
                    />
                  ) : null}
                  <div style={{ display: post.coverImage ? 'none' : 'block', width: '100%', height: '100%' }}>
                    {defaultSvgs[index % defaultSvgs.length]}
                  </div>
                  <span className="blog-category-tag">{post.category}</span>
                </div>

                {/* Content */}
                <div className="blog-content">
                  {/* Meta details */}
                  <div className="blog-meta">
                    <div className="meta-item">
                      <Calendar size={12} />
                      <span>{formatDate(post.publishedAt)}</span>
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
                    <div className="read-more-btn">
                      <span>Đọc Thêm</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
