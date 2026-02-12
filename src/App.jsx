import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Product from './pages/Product'
import Protect from './components/Protect'
import DashboardLayout from './components/DashboardLayout'
import Cart from './pages/Cart'
import OrderSuccess from './pages/orderSuccessPage'
import Orders from './pages/myOrder'
import Profile from './pages/Profile'
import PublicRoute from './components/PublicRoute'
import LandingPage from './pages/LandingPage'
import AdminLayout from './components/AdminLayout'
import Ringkasan from './pages/Ringkasan'
import AdminProduct from './pages/AdminProduct'
import Pesanan from './pages/Pesanan'
import Users from './pages/Users'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      {/* PUBLIC: Hanya yang belum login */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* PRIVATE: Harus punya token (User & Admin) */}
      <Route element={<Protect allowedRoles={['user', 'admin']} />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Product />} />
          <Route path="orders" element={<Orders />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="order-success/:id" element={<OrderSuccess />} />
      </Route>

      {/* ADMIN ONLY: Benar-benar dikunci untuk Role Admin saja */}
      <Route element={<Protect allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Ringkasan />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<Pesanan />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      {/* LANDING */}
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App;
