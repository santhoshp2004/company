import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard   from './AdminDashboard';
import AdminCareers     from './AdminCareers';
import AdminInternships from './AdminInternships';
import AdminProductsMgr from './AdminProductsMgr';
import AdminPartnersMgr from './AdminPartnersMgr';
import AdminSettings    from './AdminSettingsMgr';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route index                element={<AdminDashboard />}   />
          <Route path="careers"       element={<AdminCareers />}     />
          <Route path="internships"   element={<AdminInternships />} />
          <Route path="products"      element={<AdminProductsMgr />} />
          <Route path="partners"      element={<AdminPartnersMgr />} />
          <Route path="settings"      element={<AdminSettings />}    />
          <Route path="*"             element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
}
