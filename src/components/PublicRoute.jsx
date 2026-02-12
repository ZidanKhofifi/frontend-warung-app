import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  
  // Jika sudah ada token, lempar ke dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Jika tidak ada token, tampilkan halaman (LoginPage)
  // Outlet digunakan jika PublicRoute membungkus Route lain di App.jsx
  return children ? children : <Outlet />;
};

export default PublicRoute;
