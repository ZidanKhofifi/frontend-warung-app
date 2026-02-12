import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  HiOutlineSquares2X2, 
  HiOutlineClipboardDocumentList, 
  HiOutlineQueueList, 
  HiOutlineUserGroup,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineBell,
  HiOutlineCommandLine,
  HiOutlineChevronRight
} from 'react-icons/hi2';

const AdminLayout = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  const navItems = [
    { label: 'Beranda', path: '/admin', icon: <HiOutlineSquares2X2 />, end: true },
    { label: 'Pesanan', path: '/admin/orders', icon: <HiOutlineClipboardDocumentList />, end: false },
    { label: 'Produk', path: '/admin/products', icon: <HiOutlineQueueList />, end: false },
    { label: 'User', path: '/admin/users', icon: <HiOutlineUserGroup />, end: false },
  ];

  const activePage = navItems.find(item => 
    item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col md:flex-row">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen z-[60]">
        <div className="p-8 flex items-center">
          <div className="flex items-center">
            <span className="text-2xl font-black text-slate-900 tracking-tighter">Food</span>
            <span className="ml-1 bg-[#ff9900] text-black text-xl font-black px-2 py-0.5 rounded-md leading-none">Hub</span>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-1.5 mt-2">
          <p className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Control Panel</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `
                group flex items-center justify-between px-5 py-4 rounded-2xl font-black transition-all duration-300
                ${isActive 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 translate-x-2' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-4">
                    <span className={`${isActive ? 'text-[#ff9900]' : ''}`}>
                      {React.cloneElement(item.icon, { size: 22 })}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest">{item.label}</span>
                  </div>
                  <HiOutlineChevronRight 
                    size={14} 
                    className={`transition-transform duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} 
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-red-500 bg-red-50/50 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm uppercase tracking-widest text-[11px]"
          >
            <HiOutlineArrowLeftOnRectangle size={22} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR */}
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 flex justify-between items-center h-20">
          <div className="flex items-center md:hidden">
            <span className="text-xl font-black text-slate-900 tracking-tighter">Food</span>
            <span className="ml-0.5 bg-[#ff9900] text-black text-lg font-black px-1.5 py-0.5 rounded leading-none text-sm">Hub</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
             <div className="p-2 bg-slate-100 rounded-lg text-slate-400">
                <HiOutlineCommandLine size={18} />
             </div>
             <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">
                  Admin / <span className="text-[#ff9900]">{activePage?.label || 'Overview'}</span>
                </h2>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:border-[#ff9900] transition-all shadow-sm">
              <HiOutlineBell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ff9900] rounded-full border-2 border-white animate-ping"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden lg:block text-right">
                <p className="text-[11px] font-black uppercase tracking-tight leading-none">Ahmad Admin</p>
                <span className="text-[9px] text-[#ff9900] font-bold bg-orange-50 px-2 py-0.5 rounded-full mt-1 inline-block uppercase">Root Access</span>
              </div>
              <div className="w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center p-0.5 shadow-lg border-2 border-white">
                <img 
                  className="rounded-xl object-cover w-full h-full" 
                  src="https://ui-avatars.com/api/?name=Admin&background=0f172a&color=fff&bold=true" 
                  alt="admin avatar" 
                />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-10 lg:p-12 pb-28 md:pb-10">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        </main>
      </div>

      {/* --- MOBILE BOTTOM NAV (CLEAN STYLE) --- */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-[100] bg-white/80 backdrop-blur-lg border-t border-slate-200 flex justify-around items-center px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `
              relative flex flex-col items-center gap-1 transition-all duration-300 px-3 py-1
              ${isActive ? 'text-[#ff9900]' : 'text-slate-400'}
            `}
          >
            {({ isActive }) => (
              <>
                {/* Background Glow Effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-orange-50 rounded-full scale-125 blur-md -z-10 animate-in fade-in zoom-in duration-500"></div>
                )}
                
                <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1 scale-125' : ''}`}>
                  {React.cloneElement(item.icon, { size: 20 })}
                </div>
                
                <span className={`text-[9px] font-black uppercase tracking-widest transition-all ${isActive ? 'opacity-100 mt-1' : 'opacity-40'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
        
        <button 
          onClick={handleLogout} 
          className="flex flex-col items-center gap-1 text-red-300 active:text-red-500 transition-colors px-3 py-1"
        >
          <HiOutlineArrowLeftOnRectangle size={20} />
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Keluar</span>
        </button>
      </nav>

    </div>
  );
};

export default AdminLayout;
