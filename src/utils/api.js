const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('beta_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}

export const api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  analytics: {
    get: () => request('/analytics'),
  },
  products: {
    list: () => request('/products'),
    create: (payload) => request('/products', { method: 'POST', body: JSON.stringify(payload) }),
    update: (id, payload) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  },
};
