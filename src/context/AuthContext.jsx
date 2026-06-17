import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Auth context — manages user session globally for USEMETA platform
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('usemeta_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); }
      catch { localStorage.removeItem('usemeta_user'); }
    }
    setLoading(false);
  }, []);

  // Register — stores profile + credentials in localStorage
  const register = useCallback(({ name, email, password }) => {
    const newUser = {
      id: Date.now(),
      name,
      email,
      avatar: name.charAt(0).toUpperCase(),
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      plan: 'Free',
    };
    localStorage.setItem('usemeta_user', JSON.stringify(newUser));
    const creds = JSON.parse(localStorage.getItem('usemeta_credentials') || '[]');
    creds.push({ email, password });
    localStorage.setItem('usemeta_credentials', JSON.stringify(creds));
    setUser(newUser);
    return { success: true };
  }, []);

  // Login — validates credentials from localStorage
  const login = useCallback(({ email, password }) => {
    const creds = JSON.parse(localStorage.getItem('usemeta_credentials') || '[]');
    const match = creds.find((c) => c.email === email && c.password === password);
    if (!match) return { success: false, error: 'Invalid email or password.' };

    const stored = localStorage.getItem('usemeta_user');
    if (stored) {
      const u = JSON.parse(stored);
      if (u.email === email) { setUser(u); return { success: true }; }
    }
    const u = {
      id: Date.now(),
      name: email.split('@')[0],
      email,
      avatar: email.charAt(0).toUpperCase(),
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      plan: 'Free',
    };
    localStorage.setItem('usemeta_user', JSON.stringify(u));
    setUser(u);
    return { success: true };
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('usemeta_user');
    setUser(null);
  }, []);

  // Update profile
  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('usemeta_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
