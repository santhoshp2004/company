import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext(null);

const STORAGE_KEY = 'beta_admin_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persistSession = useCallback((session) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    if (session.token) localStorage.setItem('beta_admin_token', session.token);
    setUser(session);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    try {
      const response = await api.login({ email, password });
      if (response?.token) {
        persistSession({
          id: response.user._id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          token: response.token,
        });
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials.' };
    } catch (error) {
      return { success: false, error: error.message || 'Authentication failed.' };
    }
  }, [persistSession]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('beta_admin_token');
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
