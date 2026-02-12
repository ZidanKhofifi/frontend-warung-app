import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  HiOutlineShoppingBag, 
  HiOutlineClipboardDocumentList, 
  HiOutlineUser, 
  HiOutlineShoppingCart,
  HiOutlineBell,
  HiOutlineArrowLeftOnRectangle
} from 'react-icons/hi2'; 

const DashboardLayout = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const totalItems = cartItems?.reduce((acc, item) => acc + item.qty, 0) || 0;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  const menuItems = [
    { label: 'Explore', path: '/dashboard', icon: <HiOutlineShoppingBag size={24} /> },
    { label: 'Orders', path: '/dashboard/orders', icon: <HiOutlineClipboardDocumentList size={24} /> },
    { label: 'Cart', path: '/dashboard/cart', icon: <HiOutlineShoppingCart size={24} />, isCart: true },
    { label: 'Profile', path: '/dashboard/profile', icon: <HiOutlineUser size={24} /> },
  ];

  return (
    /* h-screen & overflow-hidden: Kunci agar window utama tidak scroll di desktop */
    <div className="h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* --- SIDEBAR (Desktop / md+) --- */}
      {/* Tetap di kiri, scroll internal jika menu kepanjangan */}
      <aside className="hidden md:flex w-64 xl:w-72 bg-white border-r border-slate-200 flex-col h-full overflow-y-auto z-50">
        
        {/* Logo Section */}
        <div className="p-8 flex items-center border-b border-slate-50 sticky top-0 bg-white z-10">
          <div className="flex items-center">
            <span className="text-2xl font-black text-slate-900 tracking-tighter">Food</span>
            <span className="ml-1 bg-[#ff9900] text-black text-xl font-black px-2 py-0.5 rounded-md leading-none">Hub</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <p className="px-4 text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-4">Main Menu</p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black transition-all duration-300 group relative
                  ${isActive 
                    ? 'bg-[#ff9900] text-white shadow-xl shadow-slate-200' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <div className="relative">
                  {item.icon}
                  {item.isCart && totalItems > 0 && (
                    <span className={`absolute -top-2 -right-2 text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 
                      ${isActive ? 'bg-[#ff9900] text-black border-slate-900' : 'bg-[#ff9900] text-black border-white'}`}>
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-[11px] uppercase tracking-widest">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-50 sticky bottom-0 bg-white">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest text-[11px]"
          >
            <HiOutlineArrowLeftOnRectangle size={24} />
            Logout
          </button>
        </div>
      </aside>

      {/* --- WRAPPER CONTENT --- */}
      {/* flex-1 & overflow-y-auto: Bagian ini yang akan scroll secara mandiri */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden scroll-smooth bg-slate-50">
        
        {/* --- TOP BAR --- */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center h-20 shrink-0">
          
          <div className="flex items-center md:hidden">
            <span className="text-xl font-black text-slate-900 tracking-tighter">Food</span>
            <span className="ml-1 bg-[#ff9900] text-black text-lg font-black px-1.5 py-0.5 rounded leading-none text-sm">Hub</span>
          </div>

          <div className="hidden md:block">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
              Dashboard / <span className="text-slate-900 uppercase tracking-tighter font-black italic">{menuItems.find(m => m.path === location.pathname)?.label || 'Overview'}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-slate-100 rounded-xl text-slate-500 relative hover:bg-slate-200 transition-all">
              <HiOutlineBell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ff9900] rounded-full border-2 border-white"></span>
            </button>

            <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-tight leading-none mb-1">Customer Mode</p>
                <div className="flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>

            <button onClick={handleLogout} className="md:hidden p-2.5 bg-red-50 rounded-xl text-red-500">
              <HiOutlineArrowLeftOnRectangle size={20} />
            </button>
          </div>
        </header>

        {/* --- MAIN AREA --- */}
        {/* Konten akan tampil di sini dan bisa di-scroll tanpa mengganggu sidebar */}
        <main className="p-6 md:p-10 lg:p-12 w-full max-w-7xl mx-auto min-h-full">
          <Outlet />
        </main>
      </div>

      {/* --- MOBILE NAVIGATION --- */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-100 px-2 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-end">
          {menuItems.map((item) => {
             const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard');
             return (
               <NavLink
                 key={item.path}
                 to={item.path}
                 className={`flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all duration-300 ${isActive ? 'text-[#ff9900]' : 'text-slate-300'}`}
               >
                 <div className={`relative p-2 rounded-xl transition-all duration-500 ${isActive ? 'bg-orange-50 scale-110' : ''}`}>
                    {item.icon}
                    {item.isCart && totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#ff9900] text-black text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                        {totalItems}
                      </span>
                    )}
                 </div>
                 <span className={`text-[9px] font-black uppercase tracking-widest mb-1 ${isActive ? 'text-black' : 'text-slate-300'}`}>
                   {item.label.split(' ')[0]}
                 </span>
               </NavLink>
             );
          })}
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;
