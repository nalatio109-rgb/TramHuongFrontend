import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const UserAuthContext = createContext();

export const useUserAuth = () => useContext(UserAuthContext);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);
  const [loading, setLoading] = useState(true);

  // You should get the API URL from the environment or a config file
  const API_URL = `${API_BASE_URL}/api`;

  useEffect(() => {
    if (token) {
      localStorage.setItem('userToken', token);
      fetchUser(token);
    } else {
      localStorage.removeItem('userToken');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async (authToken) => {
    try {
      const response = await fetch(`${API_URL}/user-auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
      } else {
        setToken(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/user-auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setToken(data.data.token);
        setUser(data.data.user);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/user-auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.success) {
        setToken(data.data.token);
        setUser(data.data.user);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};
