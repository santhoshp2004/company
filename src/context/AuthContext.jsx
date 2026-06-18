import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Pure localStorage auth — no backend required.
// To migrate to an API later, replace the localStorage calls
// in login/logout/register with fetch() calls to your server.

const AuthContext = createContext(null);
const USER_KEY  = 'nexus_user';
const CREDS_KEY = 'nexus_credentials';

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      try { setUser(JSON.parse(stored)); }
      catch { localStorage.removeItem(USER_KEY); }
    }
    setLoading(false);
  }, []);

  // Register a new user
  const register = useCallback(({ name, email, password }) => {
    const newUser = {
      id:       Date.now(),
      name,
      email,
      avatar:   name.charAt(0).toUpperCase(),
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      plan:     'Free',
    };
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    const creds = JSON.parse(localStorage.getItem(CREDS_KEY) || '[]');
    creds.push({ email, password });
    localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
    setUser(newUser);
    return { success: true };
  }, []);

  // Sign in
  const login = useCallback(({ email, password }) => {
    const creds = JSON.parse(localStorage.getItem(CREDS_KEY) || '[]');
    const match = creds.find(c => c.email === email && c.password === password);
    if (!match) return { success: false, error: 'Invalid email or password.' };

    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.email === email) { setUser(u); return { success: true }; }
      } catch { /* fall through */ }
    }
    // Fallback: build a minimal session
    const u = {
      id:       Date.now(),
      name:     email.split('@')[0],
      email,
      avatar:   email.charAt(0).toUpperCase(),
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      plan:     'Free',
    };
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
    return { success: true };
  }, []);

  // Sign out
  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  // Update profile fields
  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
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
