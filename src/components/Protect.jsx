import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Protect = ({ allowedRoles }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role; // Ambil role dari payload JWT

    // Jika rute ini butuh role spesifik (misal: admin) tapi user tidak punya
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Jika admin coba akses dashboard user, atau sebaliknya
      return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
    }

    return <Outlet />;
  } catch (error) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login" replace />;
  }
};

export default Protect;
