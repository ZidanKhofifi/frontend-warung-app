import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { 
  HiCheckCircle, 
  HiOutlineClipboardDocumentList, 
  HiOutlineArrowRight,
  HiOutlineShoppingBag,
  HiOutlineTicket
} from 'react-icons/hi2';

const OrderSuccess = () => {
  const { state } = useLocation();
  const { id } = useParams();

  // Simulasi data jika state tidak terkirim (untuk kebutuhan testing UI)
  const orderNumber = state?.orderNumber || id || "HUB-XXXX";
  const totalAmount = state?.totalAmount || 0;

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4">
      
      {/* Container Utama dengan efek Shadow yang halus */}
      <div className="bg-white border border-slate-100 w-full max-w-md rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Dekorasi Background */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl opacity-60"></div>

        {/* Icon Success */}
        <div className="relative flex justify-center mb-8">
          <div className="w-24 h-24 bg-green-500 text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-green-200 animate-bounce">
            <HiCheckCircle size={56} />
          </div>
          {/* Badge melayang */}
          <div className="absolute bottom-0 right-1/3 bg-slate-900 text-white p-2 rounded-lg shadow-lg rotate-12">
            <HiOutlineTicket size={20} className="text-[#ff9900]" />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center relative z-10">
          <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] mb-2">Order Confirmed</p>
          <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter leading-none mb-4">
            Pesanan <span className="text-orange-500">Diterima!</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold leading-relaxed max-w-[250px] mx-auto uppercase">
            Silahkan tunjukkan kode di bawah ini ke kasir untuk proses pembayaran.
          </p>
        </div>

        {/* KODE ANTREAN (Style Struk Belanja) */}
        <div className="mt-10 mb-10 relative">
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-[2.5rem] text-center group hover:border-orange-300 transition-colors duration-300">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Kode Antrean / Receipt ID</span>
            <div className="text-5xl font-black text-slate-900 mt-2 tracking-tighter uppercase italic group-hover:text-orange-600 transition-colors">
              {orderNumber.split('-')[1] || orderNumber}
            </div>
            {totalAmount > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200 border-dotted">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimasi Total: </span>
                <span className="text-sm font-black text-slate-900">Rp {totalAmount.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          {/* Lubang Dekorasi Struk */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-100 rounded-full"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-100 rounded-full"></div>
        </div>

        {/* Tombol Navigasi */}
        <div className="flex flex-col gap-3 relative z-10">
          <Link 
            to="/dashboard/orders" 
            className="group bg-slate-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-xl shadow-slate-200"
          >
            <HiOutlineClipboardDocumentList size={20} />
            Pantau Pesanan
            <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to="/dashboard" 
            className="flex items-center justify-center gap-2 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            <HiOutlineShoppingBag size={18} />
            Pesan Menu Lainnya
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.5em]">FoodHub Management System v2.0</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
