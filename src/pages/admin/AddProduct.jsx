import { API_BASE_URL } from '../../config';
import React, { useState } from 'react';
import { Plus, Trash2, Save, Upload, Link as LinkIcon, X } from 'lucide-react';
import './AddProduct.css';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    priceDisplay: '',
    category: 'Vòng tay',
    description: '',
    images: [],
    shopeeUrl: 'https://shopee.vn/voquangrin1992',
    isBestSeller: false,
    isActive: true,
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);

  const [specifications, setSpecifications] = useState([
    { name: 'Chất liệu', value: 'Trầm hương tự nhiên' }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Auto-generate slug from name if user types in name
    if (name === 'name') {
      const generateSlug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, slug: generateSlug }));
    }
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const addSpec = () => {
    setSpecifications([...specifications, { name: '', value: '' }]);
  };

  const removeSpec = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  // Image Handlers
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const formDataObj = new FormData();
    for (let i = 0; i < files.length; i++) {
      formDataObj.append('images', files[i]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formDataObj,
      });
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...data.urls]
        }));
        setMessage({ type: 'success', text: 'Tải ảnh thành công!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Lỗi tải ảnh' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Lỗi kết nối khi tải ảnh' });
    } finally {
      setUploadingImages(false);
      e.target.value = ''; // Reset
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrlInput.trim()]
      }));
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const productData = {
      ...formData,
      price: Number(formData.price),
      specifications: specifications.filter(s => s.name.trim() !== '' && s.value.trim() !== '')
    };

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Lỗi khi thêm sản phẩm');
      }

      setMessage({ type: 'success', text: 'Thêm sản phẩm thành công!' });
      
      // Reset form
      setFormData({
        name: '', slug: '', price: '', priceDisplay: '',
        category: 'Vòng tay', description: '', images: [],
        shopeeUrl: 'https://shopee.vn/voquangrin1992',
        isBestSeller: false, isActive: true
      });
      setSpecifications([{ name: 'Chất liệu', value: 'Trầm hương tự nhiên' }]);
      
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="admin-page-header">
        <h1>Thêm Sản Phẩm Mới</h1>
        <p>Điền thông tin chi tiết để thêm sản phẩm vào hệ thống</p>
      </div>

      {message && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-grid">
          {/* Cột trái */}
          <div className="form-column">
            <div className="form-card">
              <h3>Thông tin cơ bản</h3>
              
              <div className="form-group">
                <label>Tên sản phẩm *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              
              <div className="form-group">
                <label>Slug (URL) *</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá (VNĐ) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" />
                </div>
                <div className="form-group">
                  <label>Giá hiển thị (VD: 1.200.000đ) *</label>
                  <input type="text" name="priceDisplay" value={formData.priceDisplay} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Danh mục *</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="Vòng tay">Vòng tay</option>
                  <option value="Nhang trầm">Nhang trầm</option>
                  <option value="Trầm cảnh">Trầm cảnh</option>
                  <option value="Phụ kiện">Phụ kiện</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mô tả sản phẩm</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
              </div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="form-column">
            <div className="form-card">
              <h3>Hình ảnh Sản phẩm</h3>
              
              <div className="image-upload-section">
                <div className="image-upload-actions">
                  <div className="upload-btn-wrapper">
                    <button type="button" className="btn-upload" disabled={uploadingImages}>
                      <Upload size={16} /> {uploadingImages ? 'Đang tải...' : 'Tải ảnh lên'}
                    </button>
                    <input type="file" multiple accept="image/*" onChange={handleFileUpload} disabled={uploadingImages} />
                  </div>
                  <span className="or-divider">Hoặc</span>
                  <div className="link-input-wrapper">
                    <input 
                      type="url" 
                      placeholder="Dán link ảnh (https://...)" 
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddImageUrl} className="btn-add-link">
                      <LinkIcon size={16} /> Thêm
                    </button>
                  </div>
                </div>

                <div className="image-gallery-preview">
                  {formData.images.length === 0 ? (
                    <div className="empty-gallery">Chưa có hình ảnh nào được thêm</div>
                  ) : (
                    formData.images.map((img, index) => (
                      <div key={index} className="gallery-item">
                        <img src={img} alt={`Preview ${index}`} onError={(e) => e.target.src = 'https://via.placeholder.com/100'} />
                        <button type="button" className="btn-remove-image" onClick={() => handleRemoveImage(index)}>
                          <X size={14} />
                        </button>
                        {index === 0 && <span className="primary-badge">Ảnh chính</span>}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="form-group" style={{marginTop: '1.5rem'}}>
                <label>Link Shopee</label>
                <input type="url" name="shopeeUrl" value={formData.shopeeUrl} onChange={handleChange} />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="isBestSeller" checked={formData.isBestSeller} onChange={handleChange} />
                  Sản phẩm bán chạy (Best Seller)
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                  Hiển thị sản phẩm (Active)
                </label>
              </div>
            </div>

            <div className="form-card">
              <div className="spec-header">
                <h3>Thông số kỹ thuật</h3>
                <button type="button" onClick={addSpec} className="btn-add-spec">
                  <Plus size={16} /> Thêm
                </button>
              </div>
              
              {specifications.map((spec, index) => (
                <div key={index} className="spec-row">
                  <input 
                    type="text" 
                    placeholder="Tên (VD: Kích thước)" 
                    value={spec.name} 
                    onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Giá trị (VD: 10mm)" 
                    value={spec.value} 
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                  />
                  <button type="button" onClick={() => removeSpec(index)} className="btn-remove-spec">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading || uploadingImages}>
            <Save size={20} />
            {loading ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
