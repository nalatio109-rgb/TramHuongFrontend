import React from 'react';
import { Outlet, Navigate, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { PlusCircle, LogOut, Package, List, ShoppingBag, FileText, Edit3 } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout, loading } = useUserAuth();

  if (loading) {
    return <div>Đang kiểm tra quyền truy cập...</div>;
  }

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Nếu người dùng vào thẳng /admin, điều hướng sang /admin/products
  if (location.pathname === '/admin' || location.pathname === '/admin/') {
    return <Navigate to="/admin/products" replace />;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Rin Trầm Admin</h2>
        </div>
        
        <nav className="admin-nav">
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <List size={20} />
            Danh sách sản phẩm
          </NavLink>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <ShoppingBag size={20} />
            <span>Đơn hàng</span>
          </NavLink>
          <NavLink 
            to="/admin/add-product" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <PlusCircle size={20} />
            Thêm sản phẩm
          </NavLink>
          <NavLink 
            to="/admin/blogs" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <FileText size={20} />
            Bài viết
          </NavLink>
          <NavLink 
            to="/admin/add-blog" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Edit3 size={20} />
            Thêm bài viết
          </NavLink>
          <NavLink 
            to="/" 
            className="admin-nav-item"
            target="_blank"
          >
            <Package size={20} />
            Về trang chủ
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
