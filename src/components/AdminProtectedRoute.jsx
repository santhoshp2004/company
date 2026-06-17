import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary-500/30 border-t-primary-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-dark-900 px-4 py-24 text-center text-white">
        <h1 className="text-3xl font-black mb-4">Access Denied</h1>
        <p className="text-gray-400 mb-6">Your role does not have permission to access this section.</p>
      </div>
    );
  }

  return children;
}
