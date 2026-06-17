import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';

export default function AdminLayout() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <div className="section-container py-24 xl:flex xl:gap-8">
        <AdminSidebar />
        <div className="flex-1 space-y-6">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}
