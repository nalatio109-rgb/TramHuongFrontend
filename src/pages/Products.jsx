import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Categories from '../components/Categories';
import BestSellers from '../components/BestSellers';

function Products() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <main style={{ paddingTop: '80px', minHeight: '80vh', backgroundColor: '#0d0a08' }}>
      <div className="section-header reveal reveal-up" style={{ paddingTop: '4rem', marginBottom: '0' }}>
        <h1 className="section-title" style={{ color: '#d4af37' }}>
          {searchQuery ? `KẾT QUẢ TÌM KIẾM CHO "${searchQuery.toUpperCase()}"` : 'TẤT CẢ SẢN PHẨM'}
        </h1>
        <p className="section-desc" style={{ color: '#a89f91' }}>
          {searchQuery ? 'Các sản phẩm phù hợp với tìm kiếm của bạn' : 'Khám phá bộ sưu tập trầm hương tự nhiên cao cấp từ Rin Trầm'}
        </p>
      </div>
      {!searchQuery && <BestSellers />}
      <Categories searchQuery={searchQuery} />
    </main>
  );
}

export default Products;
