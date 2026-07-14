import { API_BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminBlogs.css';

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      // Thêm limit lớn để lấy nhiều bài viết trong admin
      const response = await fetch(`${API_BASE_URL}/api/blog?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data);
      } else {
        setError(data.message || 'Lỗi khi tải dữ liệu');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    
    try {
      setDeleteLoading(id);
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/api/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (data.success) {
        setBlogs(blogs.filter(b => b._id !== id));
      } else {
        alert(data.message || 'Lỗi khi xóa bài viết');
      }
    } catch (err) {
      alert('Lỗi kết nối server');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="admin-blogs-container">
      <div className="admin-page-header">
        <h1>Danh Sách Bài Viết</h1>
        <p>Quản lý các bài viết trên trang Kiến Thức Trầm Hương</p>
      </div>

      {error && <div className="message-banner error">{error}</div>}

      <div className="table-container">
        {loading ? (
          <div className="loading-state">Đang tải dữ liệu...</div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">Chưa có bài viết nào trong hệ thống.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Danh mục</th>
                <th>Tác giả</th>
                <th>Lượt xem</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="blog-title-cell">
                    <strong>{blog.title}</strong>
                    {blog.summary && <div className="blog-summary-hint">{blog.summary.substring(0, 50)}...</div>}
                  </td>
                  <td>{blog.category}</td>
                  <td>{blog.author}</td>
                  <td>{blog.viewCount || 0}</td>
                  <td>
                    <span className={`badge-status ${blog.isPublished ? 'active' : 'inactive'}`}>
                      {blog.isPublished ? 'Hiển thị' : 'Đã ẩn'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon edit" 
                        onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                        title="Sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="btn-icon delete" 
                        onClick={() => handleDelete(blog._id)}
                        disabled={deleteLoading === blog._id}
                        title="Xóa"
                      >
                        {deleteLoading === blog._id ? '...' : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
