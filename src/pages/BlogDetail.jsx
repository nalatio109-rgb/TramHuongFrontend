import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './BlogDetail.css';

const defaultSvg = (
  <svg className="blog-svg-visual" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#111612" />
    {/* Abstract golden waves for premium feel */}
    <path d="M0 50 Q 25 30, 50 50 T 100 50 L 100 100 L 0 100 Z" fill="rgba(212, 175, 55, 0.03)" />
    <path d="M0 60 Q 35 40, 60 70 T 100 60 L 100 100 L 0 100 Z" fill="rgba(212, 175, 55, 0.05)" />
    <circle cx="70" cy="30" r="15" stroke="#dfba73" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
    <circle cx="30" cy="70" r="25" stroke="#c29d53" strokeWidth="1" opacity="0.2" />
  </svg>
);

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog/${id}`);
        const data = await response.json();
        if (data.success) {
          setPost(data.data);
        }
      } catch (error) {
        console.error('Error fetching blog detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="blog-detail-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-detail-not-found">
        <div className="container">
          <h2>Không tìm thấy bài viết!</h2>
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="blog-detail-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-bg">
          {post.coverImage ? (
            <img 
              src={post.coverImage} 
              alt={post.title} 
              onError={(e) => { 
                e.target.style.display = 'none'; 
                e.target.nextSibling.style.display = 'block'; 
              }}
            />
          ) : null}
          <div style={{ display: post.coverImage ? 'none' : 'block', width: '100%', height: '100%' }}>
            {defaultSvg}
          </div>
          <div className="blog-hero-overlay"></div>
        </div>

        <div className="container blog-hero-content-wrapper">
          <div className="blog-hero-content reveal reveal-up delay-150">
            <Link to="/" className="back-link glass-link">
              <ArrowLeft size={16} /> Về trang chủ
            </Link>
            
            <div className="blog-category-badge">{post.category}</div>
            
            <h1 className="blog-title-main">{post.title}</h1>
            
            <div className="blog-meta-main">
              <div className="meta-item">
                <Calendar size={16} />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="meta-item">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="blog-content-section section-padding">
        <div className="container">
          <div className="blog-content-wrapper reveal reveal-up delay-300">
            {post.summary && (
              <div className="blog-summary-lead">
                <div className="quote-icon">"</div>
                <p>{post.summary}</p>
              </div>
            )}
            
            <div className="blog-html-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <div className="blog-footer-actions">
              <div className="share-buttons">
                <span>Chia sẻ bài viết:</span>
                <button className="btn-share" onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Đã sao chép đường dẫn!'))}>
                  <Share2 size={18} /> Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogDetail;
