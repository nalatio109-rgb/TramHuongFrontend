import React from 'react';
import Categories from '../components/Categories';
import BestSellers from '../components/BestSellers';

function Products() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '80vh', backgroundColor: '#0d0a08' }}>
      <div className="section-header reveal reveal-up" style={{ paddingTop: '4rem', marginBottom: '0' }}>
        <h1 className="section-title" style={{ color: '#d4af37' }}>TẤT CẢ SẢN PHẨM</h1>
        <p className="section-desc" style={{ color: '#a89f91' }}>
          Khám phá bộ sưu tập trầm hương tự nhiên cao cấp từ Rin Trầm
        </p>
      </div>
      <BestSellers />
      <Categories />
    </main>
  );
}

export default Products;
