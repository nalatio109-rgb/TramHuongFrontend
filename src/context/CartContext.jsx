import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Tải giỏ hàng từ localStorage khi khởi động
  useEffect(() => {
    const savedCart = localStorage.getItem('tramhuong_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from local storage:', error);
      }
    }
  }, []);

  // Lưu giỏ hàng vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem('tramhuong_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item._id === product._id);
      if (existingItemIndex >= 0) {
        // Tăng số lượng nếu đã có trong giỏ
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Thêm mới
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const triggerCartAnimation = (e, imageUrl) => {
    if (!e || !imageUrl) return;
    const cartIcon = document.querySelector('.cart-btn');
    if (!cartIcon) return;

    const btnRect = e.currentTarget.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingImg = document.createElement('img');
    flyingImg.src = imageUrl;
    flyingImg.style.position = 'fixed';
    flyingImg.style.zIndex = '9999';
    flyingImg.style.width = '60px';
    flyingImg.style.height = '60px';
    flyingImg.style.borderRadius = '50%';
    flyingImg.style.objectFit = 'cover';
    flyingImg.style.left = `${btnRect.left + btnRect.width / 2 - 30}px`;
    flyingImg.style.top = `${btnRect.top + btnRect.height / 2 - 30}px`;
    flyingImg.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    flyingImg.style.pointerEvents = 'none';
    flyingImg.style.boxShadow = '0 5px 15px rgba(212,175,55,0.5)';
    flyingImg.style.border = '2px solid #d4af37';

    document.body.appendChild(flyingImg);

    setTimeout(() => {
      flyingImg.style.left = `${cartRect.left + cartRect.width / 2 - 15}px`;
      flyingImg.style.top = `${cartRect.top + cartRect.height / 2 - 15}px`;
      flyingImg.style.width = '30px';
      flyingImg.style.height = '30px';
      flyingImg.style.opacity = '0.3';
      flyingImg.style.transform = 'scale(0.5) rotate(360deg)';
    }, 10);

    setTimeout(() => {
      if (document.body.contains(flyingImg)) {
        document.body.removeChild(flyingImg);
      }
      cartIcon.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.2)' },
        { transform: 'scale(1)' }
      ], { duration: 300 });
    }, 800);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      triggerCartAnimation
    }}>
      {children}
    </CartContext.Provider>
  );
};
