import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import { Check, Edit2, X, Trash2 } from 'lucide-react';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  const statusMap = {
    'Chờ xử lý': 'pending',
    'Đang giao': 'processing',
    'Đã giao': 'delivered',
    'Đã hủy': 'cancelled'
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Không có quyền truy cập');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.message || 'Lỗi khi tải danh sách đơn hàng');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: editStatus })
      });

      const data = await response.json();
      if (data.success) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: editStatus } : o));
        setEditingId(null);
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (err) {
      alert('Lỗi khi cập nhật trạng thái');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) return <div style={{ padding: '2rem', color: '#fff' }}>Đang tải danh sách đơn hàng...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#ff4d4f' }}>{error}</div>;

  return (
    <div className="admin-orders-page">
      <div className="admin-header">
        <h1>Quản lý Đơn hàng</h1>
      </div>

      <div className="admin-orders-table-container">
        {orders.length === 0 ? (
          <div className="empty-state">Chưa có đơn hàng nào.</div>
        ) : (
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <span style={{ fontFamily: 'monospace', color: '#dfba73' }}>
                      {order.orderId}
                    </span>
                  </td>
                  <td className="customer-info">
                    <p className="customer-name">{order.customerName}</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>{order.customerPhone}</p>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                      {order.paymentMethod === 'cod' ? 'Thanh toán COD' : 'Chuyển khoản'}
                    </p>
                  </td>
                  <td>
                    <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ fontWeight: '600' }}>{formatPrice(order.totalAmount)}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    {editingId === order._id ? (
                      <select 
                        className="status-select"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="Chờ xử lý">Chờ xử lý</option>
                        <option value="Đang giao">Đang giao</option>
                        <option value="Đã giao">Đã giao</option>
                        <option value="Đã hủy">Đã hủy</option>
                      </select>
                    ) : (
                      <span className={`status-badge status-${statusMap[order.status] || 'pending'}`}>
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingId === order._id ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className="btn-icon save-mode" 
                          onClick={() => handleUpdateStatus(order._id)}
                          title="Lưu"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          className="btn-icon" 
                          onClick={() => setEditingId(null)}
                          title="Hủy"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="btn-icon edit-mode" 
                        onClick={() => {
                          setEditingId(order._id);
                          setEditStatus(order.status);
                        }}
                        title="Đổi trạng thái"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
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

export default AdminOrders;
