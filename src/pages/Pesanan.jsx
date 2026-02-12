import React, { useState, useEffect } from 'react';
import { 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineMegaphone,
  HiOutlineShoppingBag,
  HiOutlineArrowPath,
  HiOutlineBanknotes,
  HiOutlineMagnifyingGlass,
  HiOutlineXCircle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUser
} from 'react-icons/hi2';
import api from '../api/axios';
import Swal from 'sweetalert2';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders'); 
      setOrders(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil pesanan", err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, newStatus, orderId) => {
    if (newStatus === 'selesai') {
      const result = await Swal.fire({
        title: 'Konfirmasi Bayar?',
        text: `Pesanan #${orderId} telah dibayar lunas?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#16a34a',
        confirmButtonText: 'Ya, Lunas!',
        cancelButtonText: 'Batal'
      });
      if (!result.isConfirmed) return;
    }

    if (newStatus === 'dibatalkan') {
      const result = await Swal.fire({
        title: 'Batalkan Pesanan?',
        text: `Yakin ingin membatalkan pesanan #${orderId}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Ya, Batalkan',
        cancelButtonText: 'Kembali'
      });
      if (!result.isConfirmed) return;
    }

    try {
      await api.patch(`/orders/${id}`, { status: newStatus });
      Swal.fire({
        icon: 'success',
        title: 'Status Diperbarui',
        timer: 800,
        showConfirmButton: false
      });
      fetchOrders();
    } catch (err) {
      Swal.fire('Error', 'Gagal memperbarui status', 'error');
    }
  };

  // LOGIKA PESAN WHATSAPP: PENDING, SIAP AMBIL, & DIBATALKAN
  const hubungiPelanggan = (order) => {
    const phone = order.user?.noWa;
    const nama = order.user?.username || 'Pelanggan';
    const idOrder = order.orderId;
    
    if (!phone) return Swal.fire('Error', 'Nomor WA tidak terdaftar!', 'error');

    let pesan = "";
    if (order.status === 'pending') {
      pesan = `Halo kak ${nama}, pesanan *${idOrder}* sudah kami terima. Segera kami proses ya! 😊`;
    } else if (order.status === 'siap_ambil') {
      pesan = `Halo kak ${nama}, pesanan *${idOrder}* sudah SIAP DIAMBIL! Silakan ke kasir untuk pengambilan. Terima kasih! 🙏`;
    } else if (order.status === 'dibatalkan') {
      pesan = `Halo kak ${nama}, mohon maaf pesanan *${idOrder}* terpaksa kami BATALKAN karena alasan teknis/stok habis. Mohon maaf atas ketidaknyamanannya. 🙏`;
    }

    window.open(`https://wa.me/${phone.replace(/^0/, '62')}?text=${encodeURIComponent(pesan)}`, '_blank');
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'semua' ? true : order.status === filterStatus;
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (order.user?.username || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getStatusConfig = (status) => {
    switch(status) {
      case 'pending': return { color: 'bg-blue-100 text-blue-600', label: 'Menunggu' };
      case 'diproses': return { color: 'bg-orange-100 text-orange-600', label: 'Dimasak' };
      case 'siap_ambil': return { color: 'bg-green-500 text-white animate-pulse', label: 'Siap Ambil' };
      case 'selesai': return { color: 'bg-slate-100 text-slate-400', label: 'Selesai' };
      case 'dibatalkan': return { color: 'bg-red-100 text-red-500', label: 'Batal' };
      default: return { color: 'bg-slate-100 text-slate-600', label: status };
    }
  }

  if (loading) return <div className="p-20 text-center font-black text-slate-400 animate-pulse uppercase tracking-widest">Memuat Antrean...</div>;

  return (
    <div className="space-y-6 pb-32">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div>
          <h2 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">
            Antrean <span className="text-[#ff9900]">Pesanan</span>
          </h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Order Management</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="CARI KODE / NAMA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:border-[#ff9900] outline-none shadow-sm transition-all"
          />
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {['semua', 'pending', 'diproses', 'siap_ambil', 'selesai', 'dibatalkan'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap
              ${filterStatus === status 
                ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                : 'bg-white text-slate-400 border-slate-50 hover:border-slate-200'}`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* --- GRID LIST --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredOrders.map((order) => {
          const cfg = getStatusConfig(order.status);
          
          // ATURAN UPDATE: Tambahkan 'dibatalkan' ke dalam daftar canContact
          const canContact = ['pending', 'siap_ambil', 'dibatalkan'].includes(order.status);

          return (
            <div key={order._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200">
              
              <div className="p-6 flex justify-between items-center border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black italic text-xl ${cfg.color}`}>
                    {order.orderId?.slice(-2)}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-lg tracking-tighter">#{order.orderId}</h3>
                    <div className="flex items-center gap-2 text-slate-400">
                      <HiOutlineUser size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{order.user?.username || 'GUEST'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* TOMBOL HUBUNGI (PENDING / SIAP AMBIL / DIBATALKAN) */}
                  {canContact && (
                    <button 
                      onClick={() => hubungiPelanggan(order)}
                      className="group flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2.5 rounded-xl border border-green-100 hover:bg-green-600 hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      <HiOutlineChatBubbleLeftRight size={18} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Hubungi</span>
                    </button>
                  )}
                  
                  {/* TOMBOL BATAL (HANYA MUNCUL DI AWAL) */}
                  {['pending', 'diproses'].includes(order.status) && (
                    <button 
                      onClick={() => updateOrderStatus(order._id, 'dibatalkan', order.orderId)}
                      className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    >
                      <HiOutlineXCircle size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-3 bg-slate-50/40 flex-grow">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-bold uppercase italic">
                    <span className="text-slate-600"><span className="text-[#ff9900] mr-2">{item.qty}x</span> {item.nama}</span>
                    <span className="text-slate-400 text-[10px]">Rp {(item.harga * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white border-t border-slate-50">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Penerimaan</p>
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase italic">
                      <HiOutlineClock />
                      {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Total Biaya</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">Rp {order.totalBayar?.toLocaleString()}</p>
                  </div>
                </div>

                {/* WORKFLOW TOMBOL */}
                {order.status === 'siap_ambil' ? (
                  <button 
                    onClick={() => updateOrderStatus(order._id, 'selesai', order.orderId)}
                    className="w-full flex items-center justify-center gap-3 bg-green-600 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-green-100 hover:bg-slate-900 transition-all active:scale-95"
                  >
                    <HiOutlineBanknotes size={20} /> Konfirmasi & Selesai
                  </button>
                ) : order.status === 'selesai' ? (
                  <div className="w-full py-4 rounded-2xl bg-slate-100 flex items-center justify-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                    <HiOutlineCheckCircle size={18} /> Transaksi Berhasil
                  </div>
                ) : order.status === 'dibatalkan' ? (
                  <div className="w-full py-4 rounded-2xl bg-red-50 flex items-center justify-center gap-2 text-red-400 font-black text-[10px] uppercase tracking-widest">
                    <HiOutlineXCircle size={18} /> Pesanan Telah Dibatalkan
                  </div>
                ) : (
                  <button 
                    onClick={() => updateOrderStatus(order._id, order.status === 'pending' ? 'diproses' : 'siap_ambil', order.orderId)}
                    className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95
                      ${order.status === 'pending' 
                        ? 'bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700' 
                        : 'bg-[#ff9900] text-black shadow-orange-100 hover:bg-orange-500'}`}
                  >
                    {order.status === 'pending' ? 'Terima & Proses' : 'Pesanan Siap Ambil'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-50 flex flex-col items-center">
           <HiOutlineShoppingBag className="text-slate-100 mb-4" size={60} />
           <p className="text-slate-300 font-black uppercase tracking-widest text-[10px]">Antrean tidak ditemukan</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
