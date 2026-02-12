import React, { useState, useEffect } from 'react';
import { 
  HiOutlineBanknotes, 
  HiOutlineClipboardDocumentList, 
  HiOutlineUserGroup,
  HiOutlineArrowPath,
  HiOutlinePresentationChartLine,
  HiOutlineClock
} from 'react-icons/hi2';
import api from '../api/axios';

const Ringkasan = () => {
  const [data, setData] = useState({
    omzet: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: [],
    weeklyStats: []
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [resOrders, resUsers] = await Promise.all([
        api.get('/orders'),
        api.get('/users')
      ]);

      const allOrders = resOrders.data?.data || [];
      const allUsers = resUsers.data?.data || [];

      const totalOmzet = allOrders
        .filter(o => o.status === 'selesai')
        .reduce((sum, o) => sum + (Number(o.totalBayar) || 0), 0);

      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      const stats = [];
      
      // PERBAIKAN LOGIKA TANGGAL
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setHours(0, 0, 0, 0); // Reset waktu ke jam 00:00:00 hari ini
        d.setDate(d.getDate() - i); // Mundur i hari
        
        // Gunakan locale date string (YYYY-MM-DD) untuk perbandingan yang akurat dengan waktu lokal
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const date = String(d.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${date}`;
        
        const dayLabel = days[d.getDay()];
        
        const count = allOrders.filter(o => {
          // Konversi createdAt ke waktu lokal user agar sinkron dengan d.getDate()
          const orderDateObj = new Date(o.createdAt);
          const oYear = orderDateObj.getFullYear();
          const oMonth = String(orderDateObj.getMonth() + 1).padStart(2, '0');
          const oDate = String(orderDateObj.getDate()).padStart(2, '0');
          const oDateKey = `${oYear}-${oMonth}-${oDate}`;
          
          return oDateKey === dateKey;
        }).length;

        stats.push({ dayName: dayLabel, count: count });
      }

      setData({
        omzet: totalOmzet,
        totalOrders: allOrders.length,
        totalUsers: allUsers.length,
        recentOrders: [...allOrders]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 6),
        weeklyStats: stats
      });
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const maxVal = Math.max(...data.weeklyStats.map(s => s.count), 5);

  if (loading) return (
    <div className="flex flex-col justify-center items-center py-40 gap-4">
      <div className="w-10 h-10 border-4 border-[#ff9900] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Memuat Analisis...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Core <span className="text-[#ff9900]">Intelligence</span></h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Laporan Aktivitas Sistem</p>
        </div>
        <button onClick={fetchDashboardData} className="p-3 bg-white border border-slate-200 rounded-2xl hover:text-[#ff9900] transition-all shadow-sm group">
          <HiOutlineArrowPath size={20} className="text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'Revenue', val: `Rp ${data.omzet.toLocaleString('id-ID')}`, icon: <HiOutlineBanknotes />, color: 'bg-blue-600' },
          { label: 'Orders', val: data.totalOrders, icon: <HiOutlineClipboardDocumentList />, color: 'bg-[#ff9900]' },
          { label: 'Users', val: data.totalUsers, icon: <HiOutlineUserGroup />, color: 'bg-slate-900' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-100`}>
              {React.cloneElement(item.icon, { size: 28 })}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{item.label}</p>
              <h3 className="text-xl font-black text-slate-900 leading-none">{item.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* CHART SECTION */}
        <section className="lg:col-span-3 bg-white rounded-[3rem] border border-slate-100 p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-14">
            <div className="bg-slate-900 text-[#ff9900] p-3 rounded-2xl"><HiOutlinePresentationChartLine size={24} /></div>
            <div>
               <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">Traffic Penjualan</h3>
               <p className="text-[9px] font-bold text-slate-400 uppercase">Statistik 7 Hari Terakhir</p>
            </div>
          </div>

          <div className="relative h-64 flex items-end justify-between gap-3 px-2">
            <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
              {[...Array(6)].map((_, i) => <div key={i} className="w-full border-t border-slate-900"></div>)}
            </div>

            {data.weeklyStats.map((day, i) => {
              const heightPercentage = (day.count / maxVal) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center h-full group relative">
                  <div className="mb-2 text-[10px] font-black text-slate-900 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all z-20">
                    {day.count}
                  </div>

                  <div className="relative w-full h-full flex items-end justify-center">
                    <div 
                      style={{ height: `${Math.max(heightPercentage, 6)}%` }}
                      className={`w-4 md:w-8 rounded-t-xl transition-all duration-1000 ease-out z-10
                        ${i === 6 
                          ? 'bg-[#ff9900] shadow-xl shadow-orange-100' 
                          : 'bg-slate-200 group-hover:bg-slate-900'}`}
                    ></div>
                  </div>

                  <span className={`text-[9px] md:text-[10px] font-black uppercase mt-5 tracking-tighter ${i === 6 ? 'text-[#ff9900]' : 'text-slate-400'}`}>
                    {day.dayName}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 p-8 md:p-10 shadow-sm overflow-hidden">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-10">Aktivitas Live</h3>
          <div className="space-y-6">
            {data.recentOrders.length > 0 ? (
              data.recentOrders.map((o) => (
                <div key={o._id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[11px] font-black border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all uppercase italic">
                      {o.orderId?.slice(-3) || 'ID'}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 uppercase mb-1">{o.user?.username || 'Guest'}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <HiOutlineClock size={12} /> {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-black text-slate-900 tracking-tighter">Rp {o.totalBayar?.toLocaleString('id-ID')}</p>
                </div>
              ))
            ) : (
              <p className="text-[10px] font-bold text-slate-400 uppercase text-center py-20">Belum ada pesanan</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Ringkasan;
