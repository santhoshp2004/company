import { Navigate, useLocation } from 'react-router-dom';
import { getAdminSession } from '../admin/adminStore';

/**
 * Guards all /admin/* routes.
 * Redirects to /admin/login if no valid session found in localStorage.
 * The 'roles' prop is accepted for future RBAC but not enforced yet.
 */
export default function AdminProtectedRoute({ children, roles }) {
  const location = useLocation();
  const session  = getAdminSession();

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
