import { API_BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminProducts.css';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      // Admin should be able to see all products, even inactive ones.
      // Assuming your backend /api/products returns all or you have an admin endpoint.
      // For now we use /api/products.
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
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
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    
    try {
      setDeleteLoading(id);
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (data.success) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        alert(data.message || 'Lỗi khi xóa sản phẩm');
      }
    } catch (err) {
      alert('Lỗi kết nối server');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="admin-products-container">
      <div className="admin-page-header">
        <h1>Danh Sách Sản Phẩm</h1>
        <p>Quản lý các sản phẩm hiển thị trên trang web</p>
      </div>

      {error && <div className="message-banner error">{error}</div>}

      <div className="table-container">
        {loading ? (
          <div className="loading-state">Đang tải dữ liệu...</div>
        ) : products.length === 0 ? (
          <div className="empty-state">Chưa có sản phẩm nào trong hệ thống.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="table-img-wrapper">
                      <img src={product.image || '/images/vong_tay.png'} alt={product.name} />
                    </div>
                  </td>
                  <td className="product-title-cell">{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.priceDisplay}</td>
                  <td>
                    <span className={`badge-status ${product.isActive ? 'active' : 'inactive'}`}>
                      {product.isActive ? 'Hiển thị' : 'Đã ẩn'}
                    </span>
                    {product.isBestSeller && (
                      <span className="badge-status bestseller">Bán chạy</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon edit" 
                        onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                        title="Sửa"
                        style={{ marginRight: '8px' }}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="btn-icon delete" 
                        onClick={() => handleDelete(product._id)}
                        disabled={deleteLoading === product._id}
                        title="Xóa"
                      >
                        {deleteLoading === product._id ? '...' : <Trash2 size={18} />}
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

export default AdminProducts;
