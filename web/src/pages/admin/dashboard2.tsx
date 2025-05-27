// pages/admin/dashboard.tsx
import AdminRouteGuard from '../../components/AdminRouteGuard';
import { useAuth } from '../../hooks/useAuth';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <AdminRouteGuard>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        {user && (
          <div className="mb-4">
            <p>Welcome, {user.firstName || user.email}!</p>
            <p>Your role: {user.role}</p>
          </div>
        )}
        {/* Admin content */}
      </div>
    </AdminRouteGuard>
  );
}