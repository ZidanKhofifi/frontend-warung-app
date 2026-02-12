import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  HiOutlineTrash, 
  HiPlus, 
  HiMinus, 
  HiArrowRight, 
  HiOutlineShoppingBag,
  HiOutlineTicket, 
  HiXMark 
} from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    const orderData = {
      items: cartItems.map((item) => ({
        product: item._id,
        nama: item.nama,
        harga: item.harga,
        qty: item.qty
      })),
      totalBayar: cartItems.reduce((acc, item) => acc + item.harga * item.qty, 0)
    };

    try {
      const response = await api.post('/orders', orderData);
      if (response.data.success) {
        const orderId = response.data.data._id;
        const orderNumber = response.data.data.orderId;
        clearCart();
        navigate(`/order-success/${orderId}`, { state: { orderNumber } });
      }
    } catch (error) {
      console.error("Gagal Checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-10 text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-orange-50 rounded-[3rem] rotate-12 absolute inset-0"></div>
          <div className="w-32 h-32 bg-slate-50 rounded-[3rem] -rotate-6 flex items-center justify-center relative border-2 border-slate-100">
            <HiOutlineShoppingBag size={50} className="text-slate-200" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Kosong Melompong</h2>
        <p className="text-slate-400 text-sm mt-4 mb-10 font-medium">Gorengan hangatnya keburu dingin, yuk pesan sekarang!</p>
        <Link to="/dashboard" className="w-full max-w-xs bg-[#ff9900] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-100 active:scale-95 transition-all">
          Cari Gorengan
        </Link>
      </div>
    );
  }

  return (
    /* Menghapus pb-80 yang berlebihan, cukup pb-20 untuk mobile */
    <div className="min-h-full bg-transparent flex flex-col pb-32 md:pb-10">
      
      {/* --- TOP NAV --- */}
      <div className="bg-white/50 backdrop-blur-sm px-4 md:px-0 py-6 mb-6">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Pesanan</h1>
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">{cartItems.length} Macam Gorengan</p>
          </div>
          <button 
            onClick={clearCart}
            className="p-3 bg-red-50 text-red-500 rounded-2xl active:scale-90 transition-all border border-red-100"
          >
            <HiOutlineTrash size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 md:px-0 flex-1">
        
        {/* --- ITEMS LIST --- */}
        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white rounded-[2rem] p-4 flex items-center gap-5 border border-slate-100 shadow-sm relative group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-50">
                <img src={item.image} alt={item.nama} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-black text-slate-800 text-base md:text-lg tracking-tight leading-tight mb-1 uppercase italic truncate">{item.nama}</h3>
                  <button onClick={() => removeFromCart(item._id)} className="text-slate-300 hover:text-red-500 transition-colors ml-2">
                    <HiXMark size={20} strokeWidth={3} />
                  </button>
                </div>
                
                <p className="text-[#ff9900] font-black text-sm mb-4">
                  Rp {item.harga?.toLocaleString('id-ID')}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-1 border border-slate-100">
                    <button 
                      onClick={() => updateQty(item._id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-400 active:scale-90 transition-all"
                    >
                      <HiMinus size={12} strokeWidth={3} />
                    </button>
                    <span className="font-black text-slate-900 text-xs w-4 text-center">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item._id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-400 active:scale-90 transition-all"
                    >
                      <HiPlus size={12} strokeWidth={3} />
                    </button>
                  </div>
                  <span className="font-black text-slate-900 text-sm tracking-tighter">
                    Rp {(item.harga * item.qty).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- SUMMARY CARD --- */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200 mb-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff9900] rounded-full blur-[80px] opacity-20 -mr-10 -mt-10"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <HiOutlineTicket size={20} className="text-[#ff9900]" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rincian Tagihan</p>
          </div>

          <div className="space-y-4 border-b border-white/10 pb-6 mb-6">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-400">Total Harga Gorengan</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-400">Biaya Layanan</span>
              <span className="text-green-400 uppercase text-[10px] tracking-widest">Gratis</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs font-black uppercase tracking-widest text-[#ff9900]">Total Bayar</p>
            <p className="text-3xl font-black tracking-tighter">Rp {total.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* --- TOMBOL KONFIRMASI (SEKARANG MENGIKUTI ALUR KONTEN / TIDAK FIXED) --- */}
        <div className="space-y-4">
           <div className="flex justify-between items-center px-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Metode Ambil</p>
              <p className="text-xs font-black text-slate-900 uppercase italic">Ambil di Warung</p>
           </div>
           
           <button 
              disabled={loading}
              onClick={handleCheckout}
              className={`w-full h-16 rounded-[1.5rem] font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl text-xs uppercase tracking-widest
                ${loading 
                  ? 'bg-slate-100 text-slate-400' 
                  : 'bg-[#ff9900] text-black shadow-orange-100 hover:bg-slate-900 hover:text-white'
                }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
              ) : (
                <>
                  Konfirmasi Pesanan Sekarang
                  <HiArrowRight size={20} />
                </>
              )}
            </button>
            <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest pt-2">
              Pesanan akan langsung diproses oleh penjual
            </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
