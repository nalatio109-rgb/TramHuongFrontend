import { API_BASE_URL } from '../../config';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import './AddBlog.css';

const AddBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: 'Võ Quang Rin',
    category: 'Kiến Thức',
    readTime: '5 phút đọc',
    coverImage: '',
    isPublished: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.title) {
      setError('Vui lòng nhập tiêu đề bài viết');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${API_BASE_URL}/api/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Thêm bài viết thành công!');
        setTimeout(() => {
          navigate('/admin/blogs');
        }, 1500);
      } else {
        setError(data.message || 'Lỗi khi thêm bài viết');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-blog-container">
      <div className="admin-page-header">
        <div className="header-title-group">
          <button onClick={() => navigate('/admin/blogs')} className="btn-icon back-btn">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>Thêm Bài Viết Mới</h1>
            <p>Tạo nội dung mới cho chuyên mục Kiến Thức Trầm Hương</p>
          </div>
        </div>
      </div>

      {error && <div className="message-banner error">{error}</div>}
      {success && <div className="message-banner success">{success}</div>}

      <form onSubmit={handleSubmit} className="add-blog-form">
        <div className="form-layout">
          {/* Cột chính */}
          <div className="form-main">
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="title">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nhập tiêu đề..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="summary">Tóm tắt (hiển thị ở trang danh sách)</label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Đoạn tóm tắt ngắn khoảng 2-3 câu..."
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="content">Nội dung chi tiết (hỗ trợ HTML/Markdown)</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Nhập nội dung bài viết..."
                  rows="15"
                  className="content-textarea"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Cột phụ (Sidebar của form) */}
          <div className="form-sidebar">
            <div className="form-section">
              <h3>Cài đặt bài viết</h3>
              
              <div className="form-group">
                <label htmlFor="category">Danh mục</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Kiến Thức">Kiến Thức</option>
                  <option value="Phong Thủy">Phong Thủy</option>
                  <option value="Hướng Dẫn">Hướng Dẫn</option>
                  <option value="Tin Tức">Tin Tức</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="author">Tác giả</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="readTime">Thời gian đọc ước tính</label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="Ví dụ: 5 phút đọc"
                />
              </div>

              <div className="form-group">
                <label htmlFor="coverImage">URL Hình ảnh Cover (Tùy chọn)</label>
                <input
                  type="text"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://..."
                />
                {formData.coverImage && (
                  <div style={{ marginTop: '10px', height: '160px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dcd3c6' }}>
                    <img 
                      src={formData.coverImage} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div style="padding:1rem;color:#ef4444;text-align:center;font-size:0.9rem">URL ảnh không hợp lệ hoặc lỗi tải ảnh</div>'; }}
                    />
                  </div>
                )}
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                />
                <label htmlFor="isPublished">Hiển thị công khai (Xuất bản ngay)</label>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-outline" 
                onClick={() => navigate('/admin/blogs')}
              >
                Hủy
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                <Save size={18} />
                {loading ? 'Đang lưu...' : 'Lưu bài viết'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
