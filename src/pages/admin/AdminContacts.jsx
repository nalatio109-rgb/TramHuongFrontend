import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import { useUserAuth } from '../../context/UserAuthContext';
import { Mail, MailOpen, Trash2, CheckCircle } from 'lucide-react';
import './AdminContacts.css';

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUserAuth();
  const [filter, setFilter] = useState('all'); // all, unread, read

  const fetchMessages = async () => {
    try {
      setLoading(true);
      let url = `${API_BASE_URL}/api/contact?limit=100`;
      if (filter === 'unread') url += '&isRead=false';
      if (filter === 'read') url += '&isRead=true';

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMessages();
    }
  }, [token, filter]);

  const handleMarkAsRead = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${id}/read`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.map(msg => msg._id === id ? { ...msg, isRead: true } : msg));
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter(msg => msg._id !== id));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="admin-contacts">
      <div className="admin-header">
        <h1>Tin Nhắn Liên Hệ</h1>
        <div className="contact-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
          <button 
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Chưa đọc
          </button>
          <button 
            className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Đã đọc
          </button>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">Đang tải tin nhắn...</div>
      ) : messages.length === 0 ? (
        <div className="admin-empty">Không có tin nhắn nào.</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Trạng thái</th>
                <th>Khách hàng</th>
                <th>Liên hệ</th>
                <th>Nội dung</th>
                <th>Ngày gửi</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className={!msg.isRead ? 'unread-row' : ''}>
                  <td className="status-cell">
                    {!msg.isRead ? (
                      <span className="status-badge unread"><Mail size={14} /> Mới</span>
                    ) : (
                      <span className="status-badge read"><MailOpen size={14} /> Đã đọc</span>
                    )}
                  </td>
                  <td><strong>{msg.name}</strong></td>
                  <td>
                    <div>{msg.phone}</div>
                    {msg.email && <div className="contact-email">{msg.email}</div>}
                  </td>
                  <td className="message-content">{msg.message}</td>
                  <td className="date-cell">
                    {new Date(msg.createdAt).toLocaleDateString('vi-VN')}
                    <br/>
                    <small>{new Date(msg.createdAt).toLocaleTimeString('vi-VN')}</small>
                  </td>
                  <td className="actions-cell">
                    {!msg.isRead && (
                      <button 
                        className="action-btn check" 
                        onClick={() => handleMarkAsRead(msg._id)}
                        title="Đánh dấu đã đọc"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button 
                      className="action-btn delete" 
                      onClick={() => handleDelete(msg._id)}
                      title="Xóa tin nhắn"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
