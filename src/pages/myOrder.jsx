import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { 
  HiOutlineClock, 
  HiOutlineShoppingBag,
  HiArrowPath,
  HiOutlineCheckCircle,
  HiOutlineTicket,
  HiOutlineCheckBadge,
  HiOutlineFunnel,
  HiOutlineXMark,
  HiOutlineHashtag,
  HiOutlineQrCode,
  HiOutlineTrash
} from 'react-icons/hi2';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('semua');
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [showCheckoutCode, setShowCheckoutCode] = useState(null); 

  // Fungsi memuat data pesanan
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/myorder');
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Gagal memuat pesanan", err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi membatalkan pesanan (Hanya jika status pending)
  const handleCancelOrder = async (id) => {
    const confirmCancel = window.confirm("Yakin ingin membatalkan pesanan ini?");
    if (!confirmCancel) return;

    try {
      const res = await api.put(`/orders/${id}/cancel`);
      if (res.data.success) {
        // Update state lokal agar tidak perlu hit API lagi atau panggil fetchOrders()
        setOrders(orders.map(order => 
          order._id === id ? { ...order, status: 'dibatalkan' } : order
        ));
      }
    } catch (err) {
      alert(err.response?.data?.message || "Gagal membatalkan pesanan");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Konfigurasi Visual Status
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending': 
        return { label: 'Menunggu', style: 'bg-amber-100 text-amber-600', dot: 'bg-amber-500', icon: <HiOutlineClock /> };
      case 'diproses': 
        return { label: 'Dimasak', style: 'bg-blue-100 text-blue-600', dot: 'bg-blue-500', icon: <HiArrowPath className="animate-spin" /> };
      case 'siap_ambil': 
        return { label: 'Siap Ambil', style: 'bg-green-500 text-white animate-bounce', dot: 'bg-white', icon: <HiOutlineTicket /> };
      case 'selesai': 
        return { label: 'Selesai', style: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400', icon: <HiOutlineCheckCircle /> };
      case 'dibatalkan': 
        return { label: 'Dibatalkan', style: 'bg-red-100 text-red-500', dot: 'bg-red-500', icon: <HiOutlineXMark /> };
      default: 
        return { label: status, style: 'bg-slate-50 text-slate-400', dot: 'bg-slate-300', icon: null };
    }
  };

  const filteredOrders = orders.filter(order => 
    activeFilter === 'semua' ? true : order.status === activeFilter
  );

  const filterOptions = [
    { id: 'semua', label: 'Semua' },
    { id: 'pending', label: 'Menunggu' },
    { id: 'diproses', label: 'Dimasak' },
    { id: 'siap_ambil', label: 'Siap' },
    { id: 'selesai', label: 'Selesai' },
    { id: 'dibatalkan', label: 'Batal' },
  ];

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-[4px] border-slate-200 border-t-orange-500"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Mensinkronkan Data...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 mt-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <HiOutlineCheckBadge size={20} />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">System History</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
            My <span className="text-orange-500 underline decoration-slate-200 underline-offset-8">Orders</span>
          </h1>
        </div>
        
        <button 
          onClick={fetchOrders} 
          className="group flex items-center gap-3 bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <HiArrowPath className="text-slate-400 group-hover:text-orange-500 group-hover:rotate-180 transition-all duration-500" size={20} />
          <span className="text-xs font-black uppercase tracking-widest text-slate-600">Refresh</span>
        </button>
      </div>

      {/* --- FILTERS --- */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 mb-8">
        <div className="flex-shrink-0 bg-slate-900 text-white p-4 rounded-2xl shadow-xl shadow-slate-200">
          <HiOutlineFunnel size={20} />
        </div>
        <div className="flex items-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2
                ${activeFilter === opt.id 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-100 scale-105' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- ORDERS LIST --- */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
            <HiOutlineShoppingBag size={48} />
          </div>
          <h3 className="text-xl font-black text-slate-400 uppercase italic">Kosong</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredOrders.map((order) => {
            const statusCfg = getStatusConfig(order.status);
            return (
              <div key={order._id} className="bg-white border border-slate-200 rounded-[2.5rem] p-1 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${statusCfg.style}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`}></span>
                        {statusCfg.label}
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        {new Date(order.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-2">
                      <HiOutlineHashtag className="text-orange-500" />
                      {order.orderId.toUpperCase()}
                    </h3>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1">
                      {order.items.length} Menu • {order.items[0]?.nama}
                    </p>
                  </div>

                  <div className="flex flex-col items-stretch md:items-end gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    <div className="text-left md:text-right mb-2">
                      <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1">Total Biaya</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">
                        <span className="text-orange-500 text-sm italic mr-1">Rp</span>
                        {order.totalBayar.toLocaleString('id-ID')}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* TOMBOL BATALKAN: Muncul hanya jika PENDING */}
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => handleCancelOrder(order._id)}
                          className="flex items-center justify-center gap-2 bg-red-50 text-red-500 border border-red-100 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          <HiOutlineTrash size={18} /> Batal
                        </button>
                      )}

                      {/* TOMBOL BAYAR & AMBIL: Muncul hanya jika SIAP_AMBIL */}
                      {order.status === 'siap_ambil' && (
                        <button 
                          onClick={() => setShowCheckoutCode(order)}
                          className="flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-green-100 animate-pulse active:scale-95"
                        >
                          <HiOutlineQrCode size={18} /> Bayar & Ambil
                        </button>
                      )}

                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-all shadow-xl shadow-slate-200 active:scale-95"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODAL BAYAR & AMBIL (TOKEN PENGAMBILAN) --- */}
      {showCheckoutCode && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setShowCheckoutCode(null)}></div>
          
          <div className="relative bg-white w-full max-w-sm rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-green-500">
                <HiOutlineTicket size={40} />
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">Kode Pengambilan</p>
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic mb-6">
                {showCheckoutCode.orderId.split('-')[1] || showCheckoutCode.orderId.toUpperCase()}
              </h2>
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-3xl mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Total Tagihan:</p>
                <p className="text-3xl font-black text-orange-500 mb-4">
                  Rp {showCheckoutCode.totalBayar.toLocaleString()}
                </p>
                <div className="h-px bg-slate-200 w-full mb-4"></div>
                <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase">
                  Tunjukkan ke kasir untuk <br/> <span className="text-green-600">Bayar & Ambil</span> makanan.
                </p>
              </div>
              <button 
                onClick={() => setShowCheckoutCode(null)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DETAIL (ITEMS LIST) --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-50 flex justify-between items-start bg-slate-50/50">
              <div>
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-1">Rincian Menu</p>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">#{selectedOrder.orderId.toUpperCase()}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-3 text-slate-400 hover:text-red-500 transition-colors">
                <HiOutlineXMark size={24} />
              </button>
            </div>
            <div className="p-8 max-h-[40vh] overflow-y-auto space-y-4 no-scrollbar">
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-sm font-black text-slate-800 uppercase italic">{item.qty}x {item.nama}</span>
                  <span className="text-sm font-black text-slate-900">Rp {(item.qty * item.harga).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Total Pembayaran</span>
              <span className="text-3xl font-black text-[#ff9900] italic">Rp {selectedOrder.totalBayar.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-20 opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[0.8em]">End of History</p>
      </div>

    </div>
  );
};

export default MyOrders;
