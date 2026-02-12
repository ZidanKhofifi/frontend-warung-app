import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineUserCircle, 
  HiOutlinePhone, 
  HiOutlineShoppingBag, 
  HiOutlineArrowLeftOnRectangle,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftEllipsis,
  HiChevronRight,
  HiOutlineMapPin,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClock,
  HiOutlineGlobeAlt
} from 'react-icons/hi2';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSK, setShowSK] = useState(false);
  const [showCaraOrder, setShowCaraOrder] = useState(false);
  const navigate = useNavigate();

  const storeConfig = {
    alamat: "Jl. Raya Gorengan No. 123, Jakarta Tengah",
    mapsUrl: "https://maps.app.goo.gl/6zcpmPrFc3UBsNFS7",
    jamBuka: "08:00 - 21:00",
    instagram: "@foodhub.id"
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/me');
        setUser(res.data.data);
      } catch (err) {
        console.error("Gagal memuat profil", err);
        if (err.response?.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    } catch (err) {
      console.error("Gagal logout", err);
    }
  };

  const handleBantuan = () => {
    const pesan = "Halo Admin, saya butuh bantuan terkait pesanan saya.";
    window.open(`https://wa.me/6283806501905?text=${encodeURIComponent(pesan)}`, '_blank');
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-slate-100 border-t-orange-500"></div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memuat Profil...</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto pb-32 px-4 animate-in fade-in duration-500">
      
      {/* --- HEADER PROFIL --- */}
      <div className="relative mt-10 mb-8 flex flex-col items-center">
        <div className="group relative">
          <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-200 overflow-hidden border-4 border-white">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <HiOutlineUserCircle className="w-16 h-16 text-slate-200" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="mt-5 text-center">
          <h1 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
            {user?.username || "Pelanggan Setia"}
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
            Member Sejak {new Date(user?.createdAt).getFullYear() || '2024'}
          </p>
        </div>
      </div>

      {/* --- LOKASI & INFO OPERASIONAL --- */}
      <div className="bg-slate-900 rounded-[2.5rem] p-6 mb-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-orange-500">
                <HiOutlineMapPin size={16} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Lokasi Outlet</span>
              </div>
              <p className="text-xs font-bold leading-relaxed pr-10">{storeConfig.alamat}</p>
            </div>
            <a href={storeConfig.mapsUrl} target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-2xl hover:bg-orange-500 transition-colors">
              <HiOutlineGlobeAlt size={20} />
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HiOutlineClock className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">{storeConfig.jamBuka}</span>
            </div>
            <span className="text-[9px] font-black bg-green-500 px-3 py-1 rounded-full uppercase italic">Buka Sekarang</span>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-500/10 blur-2xl"></div>
      </div>

      {/* --- MENU NAVIGASI --- */}
      <div className="space-y-3">
        <p className="ml-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Pengaturan Akun</p>
        
        <button onClick={() => navigate('/dashboard/orders')} className="w-full bg-white p-4 rounded-2xl border border-slate-50 flex items-center justify-between group hover:border-orange-200 transition-all shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
              <HiOutlineShoppingBag size={20} />
            </div>
            <span className="font-bold text-slate-700 text-sm">Riwayat Pesanan</span>
          </div>
          <HiChevronRight className="text-slate-300" />
        </button>

        <button onClick={() => setShowCaraOrder(true)} className="w-full bg-white p-4 rounded-2xl border border-slate-50 flex items-center justify-between group hover:border-blue-200 transition-all shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
              <HiOutlineClipboardDocumentCheck size={20} />
            </div>
            <span className="font-bold text-slate-700 text-sm">Cara Pemesanan</span>
          </div>
          <HiChevronRight className="text-slate-300" />
        </button>

        <button onClick={handleBantuan} className="w-full bg-white p-4 rounded-2xl border border-slate-50 flex items-center justify-between group hover:border-green-200 transition-all shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
              <HiOutlineChatBubbleLeftEllipsis size={20} />
            </div>
            <span className="font-bold text-slate-700 text-sm">Bantuan & Komplain</span>
          </div>
          <HiChevronRight className="text-slate-300" />
        </button>

        <button onClick={() => setShowSK(true)} className="w-full bg-white p-4 rounded-2xl border border-slate-50 flex items-center justify-between group hover:border-slate-200 transition-all shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
              <HiOutlineDocumentText size={20} />
            </div>
            <span className="font-bold text-slate-700 text-sm">Syarat & Ketentuan</span>
          </div>
          <HiChevronRight className="text-slate-300" />
        </button>

        <button onClick={handleLogout} className="w-full mt-6 bg-red-50 p-4 rounded-2xl flex items-center justify-center gap-3 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100">
          <HiOutlineArrowLeftOnRectangle size={18} />
          Keluar Akun
        </button>
      </div>

      {/* --- MODAL CARA PEMESANAN --- */}
      {showCaraOrder && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[2.5rem] p-8 pb-12 sm:pb-8 shadow-2xl animate-in slide-in-from-bottom-20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Cara <span className="text-blue-500">Order</span></h2>
              <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest">Self-Pickup</div>
            </div>
            <div className="space-y-6">
              {[
                { step: "01", title: "Pilih Menu", desc: "Pilih gorengan favoritmu dan masukkan ke keranjang." },
                { step: "02", title: "Checkout", desc: "Tinjau pesanan dan tekan tombol buat pesanan." },
                { step: "03", title: "Ambil di Toko", desc: "Datang ke outlet kami sesuai lokasi yang tertera." },
                { step: "04", title: "Bayar & Nikmati", desc: "Lakukan pembayaran di kasir dan ambil gorengan hangatmu." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-2xl font-black text-blue-500 italic leading-none">{item.step}</span>
                  <div>
                    <h4 className="font-black text-slate-800 text-[11px] uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowCaraOrder(false)} className="w-full mt-10 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">Tutup</button>
          </div>
        </div>
      )}

      {/* --- MODAL S&K (DETAIL) --- */}
      {showSK && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[2.5rem] p-8 pb-12 sm:pb-8 shadow-2xl animate-in slide-in-from-bottom-20 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center sticky top-0 bg-white pb-4 mb-4 border-b border-slate-50">
                <h2 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Syarat & <span className="text-orange-500">Ketentuan</span></h2>
                <button onClick={() => setShowSK(false)} className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Tutup</button>
            </div>
            
            <div className="space-y-6 text-[11px] text-slate-500 leading-relaxed font-medium pb-4">
              <section>
                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[9px] mb-2">1. Ketentuan Umum</h4>
                <p>Layanan ini disediakan oleh FoodHub (Gorengan.biz) untuk memfasilitasi pemesanan produk secara daring dengan metode pengambilan di tempat (Self-Pickup). Dengan menggunakan layanan kami, anda dianggap menyetujui seluruh ketentuan ini.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[9px] mb-2">2. Akurasi Informasi</h4>
                <p>Pengguna wajib memberikan data yang akurat (Username dan Nomor WhatsApp). Kami tidak bertanggung jawab atas kegagalan komunikasi atau pesanan tertukar akibat kesalahan data yang anda input.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[9px] mb-2">3. Batas Waktu Pengambilan</h4>
                <p className="text-orange-600 font-bold">Penting: Pesanan harus diambil maksimal 2 jam setelah status berubah menjadi "Siap Ambil".</p>
                <p>Lewat dari waktu tersebut, kualitas produk mungkin menurun (dingin/lempem), dan kami tidak berkewajiban untuk menggantinya dengan produk baru.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[9px] mb-2">4. Pembatalan Pesanan</h4>
                <p>Pembatalan hanya dapat dilakukan jika status pesanan masih "Menunggu Konfirmasi". Jika pesanan sudah masuk status "Diproses", pembatalan tidak diperkenankan karena produk sudah dalam tahap penggorengan/penyiapan.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[9px] mb-2">5. Promo Beli 10 Gratis 1</h4>
                <p>Promo gratis 1 item berlaku untuk setiap pembelian kelipatan 10 item dalam satu nota (struk). Item gratis ditentukan oleh pihak outlet (biasanya item dengan harga terendah dalam pesanan tersebut).</p>
              </section>

              <section>
                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[9px] mb-2">6. Kualitas Produk</h4>
                <p>Kami menjamin produk yang anda terima adalah gorengan yang disiapkan sesuai standar kebersihan. Jika ada kerusakan produk yang signifikan saat diterima di kasir, harap segera laporkan sebelum meninggalkan outlet untuk penggantian segera.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[9px] mb-2">7. Privasi Data</h4>
                <p>Nomor WhatsApp dan riwayat pesanan anda disimpan dengan aman hanya untuk kepentingan operasional toko dan layanan bantuan pelanggan.</p>
              </section>
            </div>

            <button onClick={() => setShowSK(false)} className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate-200">
              Saya Memahami Seluruh Ketentuan
            </button>
          </div>
        </div>
      )}

      {/* --- FOOTER & SOSMED --- */}
      <div className="mt-12 text-center space-y-4">
        <div className="flex justify-center gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-4 py-2 rounded-xl">
            Instagram: {storeConfig.instagram}
          </span>
        </div>
        <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.4em]">
          FoodHub v1.0.2 • 2026
        </p>
      </div>
    </div>
  );
};

export default Profile;
